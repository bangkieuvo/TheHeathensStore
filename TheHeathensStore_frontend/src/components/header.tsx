import React, { useState } from 'react';
// @ts-ignore
import logo from '../assets/images/icons/logo.png';
// @ts-ignore
import iconClose from '../assets/images/icons/icon-close2.png';

const Header = () => {
    // --- Quản lý trạng thái (States) ---
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    return (
        <>
            <div className='animsition'>

                <header className="header-v4">
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
                                    <img src={logo} alt="IMG-LOGO" />
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
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11" onClick={() => setIsSearchOpen(true)}>
                                        <i className="zmdi zmdi-search"></i>
                                    </div>
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="2" onClick={() => setIsCartOpen(true)}>
                                        <i className="zmdi zmdi-shopping-cart"></i>
                                    </div>
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="2" onClick={() => setIsFavoriteOpen(true)}>
                                        <i className="zmdi zmdi-favorite-outline"></i>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Header Mobile */}
                    <div className="wrap-header-mobile">
                        <div className="logo-mobile">
                            <a href="/"><img src={logo} alt="IMG-LOGO" /></a>
                        </div>

                        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11" onClick={() => setIsSearchOpen(true)}>
                                <i className="zmdi zmdi-search"></i>
                            </div>
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="2" onClick={() => setIsCartOpen(true)}>
                                <i className="zmdi zmdi-shopping-cart"></i>
                            </div>
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="2" onClick={() => setIsFavoriteOpen(true)}>
                                <i className="zmdi zmdi-favorite-outline"></i>
                            </div>
                        </div>

                        <div className={`btn-show-menu-mobile hamburger hamburger--squeeze ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </div>
                    </div>

                    {/* Menu Mobile */}
                    <div className="menu-mobile" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
                        <ul className="topbar-mobile">
                            <li><div className="left-top-bar">Free shipping over $100</div></li>
                            <li><div className="right-top-bar flex-w h-full"><a href="/account" className="flex-c-m p-lr-10 trans-04">My Account</a></div></li>
                        </ul>
                        <ul className="main-menu-m">
                            <li><a href="/">Home</a></li>
                            <li>
                                <a href="/shop">Categories</a>
                                <ul className="sub-menu-m" style={{ display: isSubMenuOpen ? 'block' : 'none' }}>
                                    <li><a href="#">Category 1</a></li>
                                    <li><a href="#">Category 2</a></li>
                                </ul>
                                <span className={`arrow-main-menu-m ${isSubMenuOpen ? 'turn-arrow' : ''}`} onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </span>
                            </li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/cart">Payment</a></li>
                        </ul>
                    </div>

                    {/* Modal Search */}
                    <div className={`modal-search-header flex-c-m trans-04 ${isSearchOpen ? 'show-modal-search' : ''}`}>
                        <div className="container-search-header">
                            <button className="flex-c-m btn-hide-modal-search trans-04" onClick={() => setIsSearchOpen(false)}>
                                <img src={iconClose} alt="CLOSE" />
                            </button>
                            <form className="wrap-search-header flex-w p-l-15">
                                <button className="flex-c-m trans-04"><i className="zmdi zmdi-search"></i></button>
                                <input className="plh3" type="text" name="search" placeholder="Search..." />
                            </form>
                        </div>
                    </div>
                </header>
            </div>

            {/* Cart Panel */}
            <div className={`wrap-header-cart js-panel-cart ${isCartOpen ? 'show-header-cart' : ''}`}>
                <div className="s-full" onClick={() => setIsCartOpen(false)}></div>
                <div className="header-cart flex-col-l p-l-65 p-r-25">
                    <div className="header-cart-title flex-w flex-sb-m p-b-8">
                        <span className="mtext-103 cl2">Your Cart</span>
                        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04" onClick={() => setIsCartOpen(false)}>
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>
                    {/* ... (Nội dung giỏ hàng giữ nguyên) ... */}
                </div>
            </div>

            {/* Favorite Panel */}
            <div className={`wrap-header-favorite js-panel-favorite ${isFavoriteOpen ? 'show-header-favorite' : ''}`}>
                <div className="s-full" onClick={() => setIsFavoriteOpen(false)}></div>
                <div className="header-favorite flex-col-l p-l-65 p-r-25">
                    <div className="header-favorite-title flex-w flex-sb-m p-b-8">
                        <span className="mtext-103 cl2">Your Favorite</span>
                        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04" onClick={() => setIsFavoriteOpen(false)}>
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>
                    {/* ... (Nội dung yêu thích giữ nguyên) ... */}
                </div>
            </div>

        </>
    );
};

export default Header;