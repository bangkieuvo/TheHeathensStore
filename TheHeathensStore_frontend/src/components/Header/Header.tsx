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

interface HeaderProps {
    cart: Cart | null;
    favorite: Favorite | null;
    user: UserResponse | null;
    authStatus: AuthStatus;
}

const Header = ({cart, favorite, user, authStatus}: HeaderProps) => {
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
                <MenuMobile setIsCartOpen={setIsCartOpen}
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
