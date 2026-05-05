import logo from "../../../assets/images/icons/logo.png";

interface MenuDesktopProps {
    setIsCartOpen: (flag: boolean) => void;
    setIsFavoriteOpen: (flag: boolean) => void;
    setIsSearchOpen: (flag: boolean) => void;
}
const MenuDesktop:React.FC<MenuDesktopProps> = ({setIsCartOpen,setIsFavoriteOpen,setIsSearchOpen}) => {
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
                            <a href="/my-account" className="flex-c-m trans-04 p-lr-25">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                &nbsp; My Account
                            </a>
                        </div>
                    </div>
                </div>

                <div className="wrap-menu-desktop how-shadow1">
                    <nav className="limiter-menu-desktop container">
                        <a href="/" className="logo">
                            <img src={logo} alt="IMG-LOGO"/>
                        </a>

                        <div className="menu-desktop">
                            <ul className="main-menu">
                                <li><a href="/">Home</a></li>
                                <li><a href="/shop">Shop</a></li>
                                <li>
                                    <a href="/shop">Categories</a>
                                    <ul className="sub-menu">
                                        <li><a href="/category-1">Category 1</a></li>
                                        <li><a href="/category-2">Category 2</a></li>
                                    </ul>
                                </li>
                                <li><a href="/cart">Payment</a></li>
                                <li className="active-menu"><a href="/about">About</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className="wrap-icon-header flex-w flex-r-m">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                                 onClick={() => setIsSearchOpen(true)}>
                                <i className="zmdi zmdi-search"></i>
                            </div>
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                                 data-notify="2" onClick={() => setIsCartOpen(true)}>
                                <i className="zmdi zmdi-shopping-cart"></i>
                            </div>
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                                 data-notify="2" onClick={() => setIsFavoriteOpen(true)}>
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