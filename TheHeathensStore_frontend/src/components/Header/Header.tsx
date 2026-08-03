import {useState, useEffect} from 'react';


import MenuDesktop from './components/MenuDesktop'
import CartPanel from "./components/CartPanel.tsx";
import FavoritePanel from "./components/FavoritePanel.tsx";
import ModalSearch from "./components/ModalSearch.tsx";
import type {Cart} from "../../types/cart.ts";
import type {Favorite} from "../../types/favorite.ts";
import type {UserResponse} from "../../types/user.ts";
import type {AuthStatus} from "../../hooks/useCommerceState.ts";
import MenuMobile from './components/MenuMobile.tsx';
import './HeaderPanels.css';
import {canManageStore} from '../../types/user.ts';

interface HeaderProps {
    cart: Cart | null;
    favorite: Favorite | null;
    user: UserResponse | null;
    authStatus: AuthStatus;
    removeCartItem: (productUuid: string) => Promise<void>;
    removeFavoriteItem: (productUuid: string) => Promise<void>;
    isCartItemPending: (productUuid: string) => boolean;
    isFavoriteItemPending: (productUuid: string) => boolean;
}

const Header = ({cart, favorite, user, authStatus, removeCartItem, removeFavoriteItem, isCartItemPending, isFavoriteItemPending}: HeaderProps) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') { // 27 là mã phím Es
                setIsCartOpen(false);
                setIsFavoriteOpen(false);
                setIsSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const cartItemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0) ?? 0;
    const favoriteItemCount = favorite?.favoriteItems.length ?? 0;
    const accountName = user?.fullName?.trim() || user?.username || "My Account";
    const isAuthenticated = authStatus === "authenticated" && user !== null;
    const hasManagementAccess = canManageStore(user);

    return (
        <>
            <header className="header-v4">
                <MenuDesktop setIsCartOpen={setIsCartOpen}
                             setIsFavoriteOpen={setIsFavoriteOpen}
                             setIsSearchOpen={setIsSearchOpen}
                             cartItemCount={cartItemCount}
                             favoriteItemCount={favoriteItemCount}
                             accountName={accountName}
                             isAuthenticated={isAuthenticated}
                             hasManagementAccess={hasManagementAccess}/>
                <MenuMobile setIsCartOpen={setIsCartOpen}
                            setIsFavoriteOpen={setIsFavoriteOpen}
                            setIsSearchOpen={setIsSearchOpen}
                            cartItemCount={cartItemCount}
                            favoriteItemCount={favoriteItemCount}
                            accountName={accountName}
                            isAuthenticated={isAuthenticated}
                            hasManagementAccess={hasManagementAccess}/>
                <CartPanel cart={cart} isLoggedIn={user !== null} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}
                           removeItem={removeCartItem} isItemPending={isCartItemPending}/>
                <FavoritePanel favorite={favorite} isLoggedIn={user !== null} isFavoriteOpen={isFavoriteOpen} setIsFavoriteOpen={setIsFavoriteOpen}
                               removeItem={removeFavoriteItem} isItemPending={isFavoriteItemPending}/>
                <ModalSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
            </header>
        </>
    );
};
export default Header;
