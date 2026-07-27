import logo from "../../../assets/images/icons/logo.png";
import {Link, matchPath, useLocation} from "react-router-dom";
import {useState} from "react";

const MENU_ITEMS = [
    {label: "Home", path: "/"},
    {label: "Shop", path: "/shop"},
    {label: "Cart", path: "/cart"},
    {label: "About", path: "/about"},
    {label: "Contact", path: "/contact"},
];

interface MenuDesktopProps {
    setIsCartOpen: (flag: boolean) => void;
    setIsFavoriteOpen: (flag: boolean) => void;
    setIsSearchOpen: (flag: boolean) => void;
    cartItemCount: number;
    favoriteItemCount: number;
    accountName: string;
    isUnauthenticated: boolean;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({
    setIsCartOpen,
    setIsFavoriteOpen,
    setIsSearchOpen,
    cartItemCount,
    favoriteItemCount,
    accountName,
    isUnauthenticated,
}) => {
    const {pathname} = useLocation();
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    return (
        <>
            {/* Header desktop */}
            <div className="container-menu-desktop">
                <div className="top-bar">
                    <div className="content-topbar flex-sb-m h-full container">
                        <div className="left-top-bar">
                            Free shipping for standard order over $100
                        </div>
                        <div className="right-top-bar flex-w h-full">
                            {isUnauthenticated ? (
                                <div
                                    className={`account-menu h-full${isAccountMenuOpen ? " is-open" : ""}`}
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
                                        className="account-menu-trigger flex-c-m trans-04 p-lr-25"
                                        aria-haspopup="menu"
                                        aria-expanded={isAccountMenuOpen}
                                        onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
                                    >
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                        &nbsp; {accountName}
                                    </button>
                                    <ul className="sub-menu account-sub-menu" role="menu">
                                        <li role="none"><Link to="/login" role="menuitem">Login</Link></li>
                                        <li role="none"><Link to="/register" role="menuitem">Register</Link></li>
                                    </ul>
                                </div>
                            ) : (
                                <Link to="/my-account" className="flex-c-m trans-04 p-lr-25">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    &nbsp; {accountName}
                                </Link>
                            )}
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
                                {MENU_ITEMS.map(({label, path}) => (
                                    <li
                                        key={path}
                                        className={matchPath({path, end: true}, pathname) ? "active-menu" : undefined}
                                    >
                                        <Link to={path}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="wrap-icon-header flex-w flex-r-m">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                                 onClick={() => setIsSearchOpen(true)}>
                                <i className="zmdi zmdi-search"></i>
                            </div>
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                                 data-notify={cartItemCount} onClick={() => setIsCartOpen(true)}>
                                <i className="zmdi zmdi-shopping-cart"></i>
                            </div>
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                                 data-notify={favoriteItemCount} onClick={() => setIsFavoriteOpen(true)}>
                                <i className="zmdi zmdi-favorite-outline"></i>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
};
export default MenuDesktop;
