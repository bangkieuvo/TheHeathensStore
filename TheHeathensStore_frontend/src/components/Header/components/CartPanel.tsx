import type {Cart} from "../../../types/cart.ts";
import {Link} from 'react-router-dom';

interface CartPanelProps {
    cart: Cart | null;
    isLoggedIn: boolean;
    isCartOpen: boolean;
    setIsCartOpen: (flag: boolean) => void;
}

const CartPanel: React.FC<CartPanelProps> = ({cart, isLoggedIn, isCartOpen, setIsCartOpen}) => {
    const cartItems = cart?.cartItems ?? [];
    const hasCartItems = cartItems.length > 0;

    return (
        <>
            <div className={`wrap-header-cart js-panel-cart ${isCartOpen ? 'show-header-cart' : ''}`}>
                <div className="s-full" onClick={() => setIsCartOpen(false)}></div>
                <div className="header-cart flex-col-l p-l-65 p-r-25">
                    <div className="header-cart-title flex-w flex-sb-m p-b-8">
                        <span className="mtext-103 cl2">Your Cart</span>
                        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04"
                             onClick={() => setIsCartOpen(false)}>
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>
                    <div className="header-cart-content flex-w js-pscroll">
                        {!isLoggedIn ? (
                            <div className="header-panel-empty w-full txt-center">
                                <i className="zmdi zmdi-shopping-cart"></i>
                                <p className="stext-102 cl6 p-t-15">Please log in to view your cart</p>
                            </div>
                        ) : hasCartItems ? (
                            <>
                                <ul className="header-cart-wrapitem w-full">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="header-cart-item flex-w flex-t m-b-12">
                                            <div className="header-cart-item-img">
                                                <img src={item.productInfo.thumbnailUrl} alt="IMG"/>
                                            </div>

                                            <div className="header-cart-item-txt p-t-8">
                                                <Link to={`/product-detail/${item.productInfo.uuid}`}
                                                   onClick={() => setIsCartOpen(false)}
                                                   className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                                    {item.productInfo.name}
                                                </Link>

                                                <span className="header-cart-item-info">
                                                    {item.quantity} x {item.productInfo.price}$
                                                </span>
                                            </div>
                                        </li>))}
                                </ul>

                                <div className="w-full">
                                    <div className="header-cart-total w-full p-tb-40">
                                        Total: {cart?.cartTotal ?? 0}$
                                    </div>

                                    <div className="header-cart-buttons flex-w w-full">
                                        <Link to="/cart" onClick={() => setIsCartOpen(false)}
                                           className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                                            View Cart
                                        </Link>

                                        <Link to="/checkout" onClick={() => setIsCartOpen(false)}
                                           className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                                            Check Out
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="header-panel-empty w-full txt-center">
                                <i className="zmdi zmdi-shopping-cart"></i>
                                <p className="stext-102 cl6 p-t-15">Your cart is empty.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPanel
