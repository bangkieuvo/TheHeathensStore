<>
  <title>About</title>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {/*===============================================================================================*/}
  <link rel="icon" type="image/png" href="assets/images/icons/logo.png" />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/vendor/bootstrap/css/bootstrap.min.css"
  />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
  />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/fonts/iconic/css/material-design-iconic-font.min.css"
  />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/fonts/linearicons-v1.0.0/icon-font.min.css"
  />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/vendor/animate/animate.css"
  />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/vendor/css-hamburgers/hamburgers.min.css"
  />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/vendor/animsition/css/animsition.min.css"
  />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/vendor/select2/select2.min.css"
  />
  {/*===============================================================================================*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="assets/vendor/perfect-scrollbar/perfect-scrollbar.css"
  />
  {/*===============================================================================================*/}
  <link rel="stylesheet" type="text/css" href="assets/css/util.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/main.css" />
  {/*===============================================================================================*/}
  {/* Header */}
  <header className="header-v4">
    {/* Header desktop */}
    <div className="container-menu-desktop">
      {/* Topbar */}
      <div className="top-bar">
        <div className="content-topbar flex-sb-m h-full container">
          <div className="left-top-bar">
            Free shipping for standard order over $100
          </div>
          <div className="right-top-bar flex-w h-full">
            <a href="my-account" className="flex-c-m trans-04 p-lr-25">
              <i className="fa fa-user" aria-hidden="true" />
              &nbsp; My Account
            </a>
          </div>
        </div>
      </div>
      <div className="wrap-menu-desktop how-shadow1">
        <nav className="limiter-menu-desktop container">
          {/* Logo desktop */}
          <a href="index" className="logo">
            <img src="assets/images/icons/logo.png" alt="IMG-LOGO" />
          </a>
          {/* Menu desktop */}
          <div className="menu-desktop">
            <ul className="main-menu">
              <li>
                <a href="index">Home</a>
              </li>
              <li>
                <a href="shop">Shop</a>
              </li>
              <li>
                <a href="shop">Categories</a>
                <ul className="sub-menu">
                  <li>
                    <a href="assets/index.html" />
                  </li>
                  <li>
                    <a href="assets/home-02.html">Category 1</a>
                  </li>
                  <li>
                    <a href="assets/home-03.html">Category 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="cart">payment</a>
              </li>
              <li className="active-menu">
                <a href="about">About</a>
              </li>
              <li>
                <a href="contact">Contact</a>
              </li>
            </ul>
          </div>
          {/* Icon header */}
          <div className="wrap-icon-header flex-w flex-r-m">
            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
              <i className="zmdi zmdi-search" />
            </div>
            <div
              className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
              data-notify={2}
            >
              <i className="zmdi zmdi-shopping-cart" />
            </div>
            <div
              className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-favorite"
              data-notify={2}
            >
              <i className="zmdi zmdi-favorite-outline" />
            </div>
          </div>
        </nav>
      </div>
    </div>
    {/* Header Mobile */}
    <div className="wrap-header-mobile">
      {/* Logo moblie */}
      <div className="logo-mobile">
        <a href="index">
          <img src="assets/images/icons/logo.png" alt="IMG-LOGO" />
        </a>
      </div>
      {/* Icon header */}
      <div className="wrap-icon-header flex-w flex-r-m m-r-15">
        <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
          <i className="zmdi zmdi-search" />
        </div>
        <div
          className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
          data-notify={2}
        >
          <i className="zmdi zmdi-shopping-cart" />
        </div>
        <div
          className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-favorite"
          data-notify={2}
        >
          <i className="zmdi zmdi-favorite-outline" />
        </div>
      </div>
      {/* Button show menu */}
      <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </div>
    </div>
    {/* Menu Mobile */}
    <div className="menu-mobile">
      <ul className="topbar-mobile">
        <li>
          <div className="left-top-bar">
            Free shipping for standard order over $100
          </div>
        </li>
        <li>
          <div className="right-top-bar flex-w h-full">
            <a href="my-account" className="flex-c-m p-lr-10 trans-04">
              My Account
            </a>
          </div>
        </li>
      </ul>
      <ul className="main-menu-m">
        <li>
          <a href="index">Home</a>
        </li>
        <li>
          <a href="shop">Categories</a>
          <ul className="sub-menu-m">
            <li>
              <a href="#">category 1</a>
            </li>
            <li>
              <a href="#">category 2</a>
            </li>
            <li>
              <a href="#">category 3</a>
            </li>
          </ul>
          <span className="arrow-main-menu-m">
            <i className="fa fa-angle-right" aria-hidden="true" />
          </span>
        </li>
        <li>
          <a href="about">About</a>
        </li>
        <li>
          <a href="cart">Payment</a>
        </li>
      </ul>
    </div>
    {/* Modal Search */}
    <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
      <div className="container-search-header">
        <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
          <img src="assets/images/icons/icon-close2.png" alt="CLOSE" />
        </button>
        <form className="wrap-search-header flex-w p-l-15">
          <button className="flex-c-m trans-04">
            <i className="zmdi zmdi-search" />
          </button>
          <input
            className="plh3"
            type="text"
            name="search"
            placeholder="Search..."
          />
        </form>
      </div>
    </div>
  </header>
  {/* Cart */}
  <div className="wrap-header-cart js-panel-cart">
    <div className="s-full js-hide-cart" />
    <div className="header-cart flex-col-l p-l-65 p-r-25">
      <div className="header-cart-title flex-w flex-sb-m p-b-8">
        <span className="mtext-103 cl2">Your Cart</span>
        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
          <i className="zmdi zmdi-close" />
        </div>
      </div>
      <div className="header-cart-content flex-w js-pscroll">
        <ul className="header-cart-wrapitem w-full">
          <li className="header-cart-item flex-w flex-t m-b-12">
            <div className="header-cart-item-img">
              <img src="assets/images/item-cart-01.jpg" alt="IMG" />
            </div>
            <div className="header-cart-item-txt p-t-8">
              <a
                href="assets/#"
                className="header-cart-item-name m-b-18 hov-cl1 trans-04"
              >
                White Shirt Pleat
              </a>
              <span className="header-cart-item-info">1 x $19.00</span>
            </div>
          </li>
          <li className="header-cart-item flex-w flex-t m-b-12">
            <div className="header-cart-item-img">
              <img src="assets/images/item-cart-02.jpg" alt="IMG" />
            </div>
            <div className="header-cart-item-txt p-t-8">
              <a
                href="assets/#"
                className="header-cart-item-name m-b-18 hov-cl1 trans-04"
              >
                Converse All Star
              </a>
              <span className="header-cart-item-info">1 x $39.00</span>
            </div>
          </li>
          <li className="header-cart-item flex-w flex-t m-b-12">
            <div className="header-cart-item-img">
              <img src="assets/images/item-cart-03.jpg" alt="IMG" />
            </div>
            <div className="header-cart-item-txt p-t-8">
              <a
                href="assets/#"
                className="header-cart-item-name m-b-18 hov-cl1 trans-04"
              >
                Nixon Porter Leather
              </a>
              <span className="header-cart-item-info">1 x $17.00</span>
            </div>
          </li>
        </ul>
        <div className="w-full">
          <div className="header-cart-total w-full p-tb-40">Total: $75.00</div>
          <div className="header-cart-buttons flex-w w-full">
            <a
              href="assets/shoping-cart.html"
              className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
            >
              View Cart
            </a>
            <a
              href="assets/shoping-cart.html"
              className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
            >
              Check Out
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Favorite */}
  <div className="wrap-header-favorite js-panel-favorite">
    <div className="s-full js-hide-favorite" />
    <div className="header-favorite flex-col-l p-l-65 p-r-25">
      <div className="header-favorite-title flex-w flex-sb-m p-b-8">
        <span className="mtext-103 cl2">Your Favorite</span>
        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-favorite">
          <i className="zmdi zmdi-close" />
        </div>
      </div>
      <div className="header-favorite-content flex-w js-pscroll">
        <ul className="header-favorite-wrapitem w-full">
          <li className="header-favorite-item flex-w flex-t m-b-12">
            <div className="header-favorite-item-img">
              <img src="assets/images/item-cart-01.jpg" alt="IMG" />
            </div>
            <div className="header-favorite-item-txt p-t-8">
              <a
                href="assets/#"
                className="header-favorite-item-name m-b-18 hov-cl1 trans-04"
              >
                White Shirt Pleat
              </a>
              <span className="header-favorite-item-info">1 x $19.00</span>
            </div>
          </li>
          <li className="header-favorite-item flex-w flex-t m-b-12">
            <div className="header-favorite-item-img">
              <img src="assets/images/item-cart-02.jpg" alt="IMG" />
            </div>
            <div className="header-favorite-item-txt p-t-8">
              <a
                href="assets/#"
                className="header-favorite-item-name m-b-18 hov-cl1 trans-04"
              >
                Converse All Star
              </a>
              <span className="header-favorite-item-info">1 x $39.00</span>
            </div>
          </li>
          <li className="header-favorite-item flex-w flex-t m-b-12">
            <div className="header-favorite-item-img">
              <img src="assets/images/item-cart-03.jpg" alt="IMG" />
            </div>
            <div className="header-favorite-item-txt p-t-8">
              <a
                href="assets/#"
                className="header-favorite-item-name m-b-18 hov-cl1 trans-04"
              >
                Nixon Porter Leather
              </a>
              <span className="header-favorite-item-info">1 x $17.00</span>
            </div>
          </li>
        </ul>
        <div className="w-full">
          <div className="header-favorite-total w-full p-tb-40">
            Total: $75.00
          </div>
          <div className="header-favorite-buttons flex-w w-full">
            <a
              href="assets/shoping-cart.html"
              className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
            >
              View Cart
            </a>
            <a
              href="assets/shoping-cart.html"
              className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
            >
              Check Out
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*===============================================================================================*/}
  {/*===============================================================================================*/}
  {/*===============================================================================================*/}
  {/*===============================================================================================*/}
  {/*===============================================================================================*/}
  {/*===============================================================================================*/}
  {/*===============================================================================================*/}
</>
