import {useState, useEffect} from 'react';


import MenuDesktop from './components/MenuDesktop'
import CartPanel from "./components/CartPanel.tsx";
import FavoritePanel from "./components/FavoritePanel.tsx";
import ModalSearch from "./components/ModalSearch.tsx";
import {getCart} from "../../service/cartService.ts";
import {getFavorites} from "../../service/favoriteService.ts";
import type {Cart} from "../../types/cart.ts";
import type {Favorite} from "../../types/favorite.ts";
import {checkLogin} from "../../service/authService.ts";
import type {UserResponse} from "../../types/user.ts";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
    const [cart, setCart] = useState<Cart | null>(null);
    const [favorite, setFavorite] = useState<Favorite | null>(null);
    const [user, setUser] = useState<UserResponse | null>(null);
    const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
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

    useEffect(() => {
        let isMounted = true;

        const fetchHeaderData = async () => {
            let authenticatedUser: UserResponse;

            try {
                authenticatedUser = await checkLogin();
            } catch {
                if (isMounted) {
                    setUser(null);
                    setCart(null);
                    setFavorite(null);
                    setAuthStatus("unauthenticated");
                }
                return;
            }

            if (!isMounted) {
                return;
            }

            setUser(authenticatedUser);
            setAuthStatus("authenticated");

            try {
                const [cartData, favoriteData] = await Promise.all([
                    getCart(),
                    getFavorites(),
                ]);

                if (isMounted) {
                    setCart(cartData);
                    setFavorite(favoriteData);
                }
            } catch (error) {
                console.log("Failed to load header data:", error);
                if (isMounted) {
                    setCart(null);
                    setFavorite(null);
                }
            }
        };

        void fetchHeaderData();

        return () => {
            isMounted = false;
        };
    }, []);

    const cartItemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0) ?? 0;
    const favoriteItemCount = favorite?.favoriteItems.length ?? 0;

    return (
        <>
            <header className="header-v4">
                <MenuDesktop setIsCartOpen={setIsCartOpen}
                             setIsFavoriteOpen={setIsFavoriteOpen}
                             setIsSearchOpen={setIsSearchOpen}
                             cartItemCount={cartItemCount}
                             favoriteItemCount={favoriteItemCount}
                             accountName={user?.fullName ?? "My Account"}
                             isUnauthenticated={authStatus === "unauthenticated"}/>
                <CartPanel cart={cart} isLoggedIn={user !== null} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
                <FavoritePanel favorite={favorite} isLoggedIn={user !== null} isFavoriteOpen={isFavoriteOpen} setIsFavoriteOpen={setIsFavoriteOpen}/>
                <ModalSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
            </header>
        </>
    );
};
export default Header;
