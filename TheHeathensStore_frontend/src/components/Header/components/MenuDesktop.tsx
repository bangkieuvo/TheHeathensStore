import logo from "../../../assets/images/icons/logo.png";
import {Link, matchPath, useLocation} from "react-router-dom";
import {useState} from "react";
import {MAIN_MENU_ITEMS} from '../../../data/navigation.ts';

interface MenuDesktopProps {
    setIsCartOpen: (flag: boolean) => void;
    setIsFavoriteOpen: (flag: boolean) => void;
    setIsSearchOpen: (flag: boolean) => void;
    cartItemCount: number;
    favoriteItemCount: number;
    accountName: string;
    isAuthenticated: boolean;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({
    setIsCartOpen,
    setIsFavoriteOpen,
    setIsSearchOpen,
    cartItemCount,
    favoriteItemCount,
    accountName,
    isAuthenticated,
}) => {
    const {pathname} = useLocation();
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    return (
        <>
            {/* Header desktop */}
            <div className="container-menu-desktop">
                <div className="top-bar">
                    <div className="content-topbar content-topbar-centered flex-c-m h-full container">
                        <div className="left-top-bar topbar-promo">
                            <i className="fa fa-truck" aria-hidden="true"/>
                            Free shipping for standard order over $100
                        </div>
                    </div>
                </div>

                <div className="wrap-menu-desktop how-shadow1">
                    <nav className="limiter-menu-desktop container">
                        <Link to="/" className="logo">
                            <img src={logo} alt="IMG-LOGO"/>
                        </Link>

                        <div className="menu-desktop">
                            <ul className="main-menu">
                                {MAIN_MENU_ITEMS.map(({label, path}) => (
                                    <li
                                        key={path}
                                        className={matchPath({path, end: true}, pathname) ? "active-menu" : undefined}
                                    >
                                        <Link to={path}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="desktop-header-actions">
                            <div className="wrap-icon-header desktop-header-icons flex-w flex-r-m">
                            <button type="button" aria-label="Search" className="icon-header-item header-icon-button cl2 hov-cl1 trans-04 p-l-11 p-r-11"
                                 onClick={() => setIsSearchOpen(true)}>
                                <i className="zmdi zmdi-search"></i>
                            </button>
                            <button type="button" aria-label="Cart" className="icon-header-item header-icon-button cl2 hov-cl1 trans-04 p-l-11 p-r-11 icon-header-noti"
                                 data-notify={cartItemCount} onClick={() => setIsCartOpen(true)}>
                                <i className="zmdi zmdi-shopping-cart"></i>
                            </button>
                            <button type="button" aria-label="Wishlist" className="icon-header-item header-icon-button cl2 hov-cl1 trans-04 p-l-11 p-r-11 icon-header-noti"
                                 data-notify={favoriteItemCount} onClick={() => setIsFavoriteOpen(true)}>
                                <i className="zmdi zmdi-favorite-outline"></i>
                            </button>
                            </div>

                            <div className="header-account-shell">
                                {isAuthenticated ? (
                                    <Link
                                        to="/my-account"
                                        className="header-account-control"
                                        title={accountName}
                                        aria-label={`My account: ${accountName}`}
                                    >
                                        <span className="header-account-avatar" aria-hidden="true">
                                            <i className="fa fa-user"/>
                                        </span>
                                        <span className="header-account-copy">
                                            <small>My account</small>
                                            <strong>{accountName}</strong>
                                        </span>
                                    </Link>
                                ) : (
                                    <div
                                        className={`account-menu header-account-menu${isAccountMenuOpen ? " is-open" : ""}`}
                                        onBlur={(event) => {
                                            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                                                setIsAccountMenuOpen(false);
                                            }
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === "Escape") {
                                                setIsAccountMenuOpen(false);
                                                event.currentTarget.querySelector("button")?.focus();
                                            }
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="header-account-control"
                                            aria-label="Open account menu"
                                            aria-haspopup="menu"
                                            aria-expanded={isAccountMenuOpen}
                                            onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
                                        >
                                            <span className="header-account-avatar" aria-hidden="true">
                                                <i className="fa fa-user"/>
                                            </span>
                                            <span className="header-account-copy">
                                                <small>Welcome</small>
                                                <strong>Sign in</strong>
                                            </span>
                                            <i className="fa fa-angle-down header-account-chevron" aria-hidden="true"/>
                                        </button>
                                        <ul className="sub-menu account-sub-menu" role="menu">
                                            <li role="none"><Link to="/login" role="menuitem">Login</Link></li>
                                            <li role="none"><Link to="/register" role="menuitem">Create account</Link></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
};
export default MenuDesktop;
