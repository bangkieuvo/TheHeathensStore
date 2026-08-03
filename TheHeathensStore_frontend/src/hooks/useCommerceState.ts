import axios from 'axios';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {checkLogin, logout} from '../service/authService.ts';
import {addCartItem, deleteCartItem, getCart, updateCartItem} from '../service/cartService.ts';
import {addFavorite, deleteFavorite, getFavorites} from '../service/favoriteService.ts';
import type {Cart} from '../types/cart.ts';
import type {Favorite} from '../types/favorite.ts';
import type {ApiResponse} from '../types/generic/apiResponse.ts';
import type {UserResponse} from '../types/user.ts';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface CommerceState {
    authStatus: AuthStatus;
    user: UserResponse | null;
    cart: Cart | null;
    favorite: Favorite | null;
    actionError: string;
    clearActionError: () => void;
    isFavorite: (productUuid: string) => boolean;
    isInCart: (productUuid: string) => boolean;
    isFavoritePending: (productUuid: string) => boolean;
    isCartPending: (productUuid: string) => boolean;
    toggleFavorite: (productUuid: string) => Promise<void>;
    addProductToCart: (productUuid: string, quantity?: number) => Promise<void>;
    updateCartQuantity: (productUuid: string, quantity: number) => Promise<void>;
    removeCartItem: (productUuid: string) => Promise<void>;
    replaceCart: (cart: Cart) => void;
    setCurrentUser: (user: UserResponse) => void;
    signOut: () => Promise<void>;
}

const getRequestErrorMessage = (error: unknown, fallbackMessage: string): string => {
    if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
        return error.response?.data?.message || fallbackMessage;
    }
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return fallbackMessage;
};

export const useCommerceState = (): CommerceState => {
    const navigate = useNavigate();
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
    const [user, setUser] = useState<UserResponse | null>(null);
    const [cart, setCart] = useState<Cart | null>(null);
    const [favorite, setFavorite] = useState<Favorite | null>(null);
    const [actionError, setActionError] = useState('');
    const [favoritePendingUuids, setFavoritePendingUuids] = useState<ReadonlySet<string>>(() => new Set());
    const [cartPendingUuids, setCartPendingUuids] = useState<ReadonlySet<string>>(() => new Set());
    const favoriteRef = useRef<Favorite | null>(null);
    const favoritePendingRef = useRef(new Set<string>());
    const cartPendingRef = useRef(new Set<string>());
    const favoriteMutationQueueRef = useRef<Promise<void>>(Promise.resolve());
    const cartMutationQueueRef = useRef<Promise<void>>(Promise.resolve());

    useEffect(() => {
        let isMounted = true;

        const loadCommerceData = async () => {
            let authenticatedUser: UserResponse;

            try {
                authenticatedUser = await checkLogin();
            } catch {
                if (isMounted) {
                    setUser(null);
                    setCart(null);
                    setFavorite(null);
                    favoriteRef.current = null;
                    setAuthStatus('unauthenticated');
                }
                return;
            }

            if (!isMounted) {
                return;
            }

            setUser(authenticatedUser);

            try {
                const [cartData, favoriteData] = await Promise.all([getCart(), getFavorites()]);

                if (isMounted) {
                    setCart(cartData);
                    setFavorite(favoriteData);
                    favoriteRef.current = favoriteData;
                    setActionError('');
                }
            } catch (error) {
                if (isMounted) {
                    if (axios.isAxiosError(error) && error.response?.status === 401) {
                        setUser(null);
                        setCart(null);
                        setFavorite(null);
                        favoriteRef.current = null;
                        setAuthStatus('unauthenticated');
                        return;
                    }
                    setActionError(getRequestErrorMessage(error, 'Unable to load cart and favorite data.'));
                }
            }

            if (isMounted) {
                setAuthStatus('authenticated');
            }
        };

        void loadCommerceData();

        return () => {
            isMounted = false;
        };
    }, []);

    const clearActionError = useCallback(() => setActionError(''), []);

    const handleAuthenticationFailure = useCallback((error: unknown): boolean => {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
            return false;
        }

        setUser(null);
        setCart(null);
        setFavorite(null);
        favoriteRef.current = null;
        setAuthStatus('unauthenticated');
        navigate('/login');
        return true;
    }, [navigate]);

    const requireAuthentication = useCallback((): boolean => {
        if (authStatus === 'authenticated') {
            return true;
        }
        if (authStatus === 'unauthenticated') {
            navigate('/login');
        }
        return false;
    }, [authStatus, navigate]);

    const toggleFavorite = useCallback(async (productUuid: string): Promise<void> => {
        if (!requireAuthentication() || favoritePendingRef.current.has(productUuid)) {
            return;
        }

        favoritePendingRef.current.add(productUuid);
        setFavoritePendingUuids(new Set(favoritePendingRef.current));

        const mutation = favoriteMutationQueueRef.current.then(async () => {
            const isCurrentlyFavorite = favoriteRef.current?.favoriteItems.some(
                (item) => item.productInfo.uuid === productUuid,
            ) ?? false;
            const updatedFavorite = isCurrentlyFavorite
                ? await deleteFavorite(productUuid)
                : await addFavorite(productUuid);

            favoriteRef.current = updatedFavorite;
            setFavorite(updatedFavorite);
            setActionError('');
        });
        favoriteMutationQueueRef.current = mutation.catch(() => undefined);

        try {
            await mutation;
        } catch (error) {
            if (!handleAuthenticationFailure(error)) {
                setActionError(getRequestErrorMessage(error, 'Unable to update favorite. Please try again.'));
            }
        } finally {
            favoritePendingRef.current.delete(productUuid);
            setFavoritePendingUuids(new Set(favoritePendingRef.current));
        }
    }, [handleAuthenticationFailure, requireAuthentication]);

    const addProductToCart = useCallback(async (productUuid: string, quantity = 1): Promise<void> => {
        if (!requireAuthentication() || cartPendingRef.current.has(productUuid)) {
            return;
        }

        cartPendingRef.current.add(productUuid);
        setCartPendingUuids(new Set(cartPendingRef.current));

        const mutation = cartMutationQueueRef.current.then(async () => {
            const updatedCart = await addCartItem(productUuid, quantity);
            setCart(updatedCart);
            setActionError('');
        });
        cartMutationQueueRef.current = mutation.catch(() => undefined);

        try {
            await mutation;
        } catch (error) {
            if (!handleAuthenticationFailure(error)) {
                setActionError(getRequestErrorMessage(error, 'Unable to add product to cart. Please try again.'));
            }
        } finally {
            cartPendingRef.current.delete(productUuid);
            setCartPendingUuids(new Set(cartPendingRef.current));
        }
    }, [handleAuthenticationFailure, requireAuthentication]);

    const updateCartQuantity = useCallback(async (productUuid: string, quantity: number): Promise<void> => {
        if (!requireAuthentication() || cartPendingRef.current.has(productUuid)) {
            return;
        }
        cartPendingRef.current.add(productUuid);
        setCartPendingUuids(new Set(cartPendingRef.current));

        const mutation = cartMutationQueueRef.current.then(async () => {
            const updatedCart = await updateCartItem(productUuid, quantity);
            setCart(updatedCart);
            setActionError('');
        });
        cartMutationQueueRef.current = mutation.catch(() => undefined);

        try {
            await mutation;
        } catch (error) {
            if (!handleAuthenticationFailure(error)) {
                const message = getRequestErrorMessage(error, 'Unable to update cart item.');
                setActionError(message);
                throw new Error(message);
            }
        } finally {
            cartPendingRef.current.delete(productUuid);
            setCartPendingUuids(new Set(cartPendingRef.current));
        }
    }, [handleAuthenticationFailure, requireAuthentication]);

    const removeCartItem = useCallback(async (productUuid: string): Promise<void> => {
        if (!requireAuthentication() || cartPendingRef.current.has(productUuid)) {
            return;
        }
        cartPendingRef.current.add(productUuid);
        setCartPendingUuids(new Set(cartPendingRef.current));

        const mutation = cartMutationQueueRef.current.then(async () => {
            const updatedCart = await deleteCartItem(productUuid);
            setCart(updatedCart);
            setActionError('');
        });
        cartMutationQueueRef.current = mutation.catch(() => undefined);

        try {
            await mutation;
        } catch (error) {
            if (!handleAuthenticationFailure(error)) {
                const message = getRequestErrorMessage(error, 'Unable to remove cart item.');
                setActionError(message);
                throw new Error(message);
            }
        } finally {
            cartPendingRef.current.delete(productUuid);
            setCartPendingUuids(new Set(cartPendingRef.current));
        }
    }, [handleAuthenticationFailure, requireAuthentication]);

    const replaceCart = useCallback((nextCart: Cart) => setCart(nextCart), []);
    const setCurrentUser = useCallback((nextUser: UserResponse) => setUser(nextUser), []);
    const signOut = useCallback(async (): Promise<void> => {
        await logout();
        setUser(null);
        setCart(null);
        setFavorite(null);
        favoriteRef.current = null;
        setAuthStatus('unauthenticated');
        navigate('/');
    }, [navigate]);

    const isFavorite = useCallback((productUuid: string): boolean => (
        favorite?.favoriteItems.some((item) => item.productInfo.uuid === productUuid) ?? false
    ), [favorite]);

    const isInCart = useCallback((productUuid: string): boolean => (
        cart?.cartItems.some((item) => item.productInfo.uuid === productUuid) ?? false
    ), [cart]);

    const isFavoritePending = useCallback(
        (productUuid: string): boolean => favoritePendingUuids.has(productUuid),
        [favoritePendingUuids],
    );
    const isCartPending = useCallback(
        (productUuid: string): boolean => cartPendingUuids.has(productUuid),
        [cartPendingUuids],
    );

    return {
        authStatus,
        user,
        cart,
        favorite,
        actionError,
        clearActionError,
        isFavorite,
        isInCart,
        isFavoritePending,
        isCartPending,
        toggleFavorite,
        addProductToCart,
        updateCartQuantity,
        removeCartItem,
        replaceCart,
        setCurrentUser,
        signOut,
    };
};
