import React, { useState, useEffect } from 'react';
// @ts-ignore
import logo from '../../assets/images/icons/logo.png';
// @ts-ignore
import iconClose from '../../assets/images/icons/icon-close2.png';

import MenuDesktop from './components/MenuDesktop'
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    return (
        <>
            <header className="header-v4">
                <MenuDesktop
                    onOpenSearch={() => setIsSearchOpen(true)}
                    onOpenCart={() => setIsCartOpen(true)}
                />
            </header>

            {/* Các thành phần bổ trợ được tách riêng */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <FavoritePanel isOpen={isFavoriteOpen} onClose={() => setIsFavoriteOpen(false)} />
        </>
    );
};
export default Header;