import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from '../../../assets/images/icons/logo.png';
import {MAIN_MENU_ITEMS} from '../../../data/navigation.ts';

interface MenuMobileProps {
    setIsCartOpen: (flag: boolean) => void;
    setIsFavoriteOpen: (flag: boolean) => void;
    setIsSearchOpen: (flag: boolean) => void;
    cartItemCount: number;
    favoriteItemCount: number;
    accountName: string;
    isUnauthenticated: boolean;
}

const MenuMobile = ({setIsCartOpen, setIsFavoriteOpen, setIsSearchOpen, cartItemCount, favoriteItemCount, accountName, isUnauthenticated}: MenuMobileProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {pathname} = useLocation();
    return (
        <>
            <div className="wrap-header-mobile">
                <Link to="/" className="logo-mobile"><img src={logo} alt="The Heathens Store"/></Link>
                <div className="wrap-icon-header flex-w flex-r-m">
                    <button type="button" aria-label="Search" className="mobile-header-icon" onClick={() => setIsSearchOpen(true)}><i className="zmdi zmdi-search"/></button>
                    <button type="button" aria-label="Cart" data-notify={cartItemCount} className="mobile-header-icon icon-header-noti" onClick={() => setIsCartOpen(true)}><i className="zmdi zmdi-shopping-cart"/></button>
                    <button type="button" aria-label="Wishlist" data-notify={favoriteItemCount} className="mobile-header-icon icon-header-noti" onClick={() => setIsFavoriteOpen(true)}><i className="zmdi zmdi-favorite-outline"/></button>
                    <button type="button" aria-label="Toggle navigation" aria-expanded={isOpen} className={`mobile-menu-toggle ${isOpen ? 'is-open' : ''}`} onClick={() => setIsOpen((current) => !current)}><span/><span/><span/></button>
                </div>
            </div>
            <nav className={`mobile-navigation ${isOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">
                <ul>{MAIN_MENU_ITEMS.map((item) => <li key={item.path}><Link className={pathname === item.path ? 'is-active' : ''} to={item.path} onClick={() => setIsOpen(false)}>{item.label}</Link></li>)}</ul>
                <Link className="mobile-account-link" to={isUnauthenticated ? '/login' : '/my-account'} onClick={() => setIsOpen(false)}><i className="fa fa-user"/> {isUnauthenticated ? 'Login or register' : accountName}</Link>
            </nav>
        </>
    );
};

export default MenuMobile;
