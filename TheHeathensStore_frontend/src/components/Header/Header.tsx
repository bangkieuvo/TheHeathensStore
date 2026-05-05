import {useState, useEffect} from 'react';


import MenuDesktop from './components/MenuDesktop'
import CartPanel from "./components/CartPanel.tsx";
import FavoritePanel from "./components/FavoritePanel.tsx";
import ModalSearch from "./components/ModalSearch.tsx";

const Header = () => {
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
    return (
        <>
            <header className="header-v4">
                <MenuDesktop setIsCartOpen={setIsCartOpen}
                             setIsFavoriteOpen={setIsFavoriteOpen}
                             setIsSearchOpen={setIsSearchOpen}/>
                <CartPanel isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
                <FavoritePanel isFavoriteOpen={isFavoriteOpen} setIsFavoriteOpen={setIsFavoriteOpen}/>
                <ModalSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
            </header>
        </>
    );
};
export default Header;