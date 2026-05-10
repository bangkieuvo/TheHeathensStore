import React, {useState, useEffect} from 'react'
import type {Cart} from "../../../types/cart.ts";
import {getCartByUserUuid} from "../../../service/cartService.ts";


interface CartPanelProps {
    isCartOpen: boolean;
    setIsCartOpen: (flag: boolean) => void;
}


const CartPanel: React.FC<CartPanelProps> = ({isCartOpen, setIsCartOpen}) => {
    const [cart, setCart] = useState<Cart | null>(null);
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const userUuid = "019da99e-dd5e-7ba2-9b93-2534968811dc";
                const response = await getCartByUserUuid(userUuid);
                setCart(response);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu giỏ hàng:", error);
            }
        };
        fetchCartData();
    }, []);
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
                        {cart && (
                            <>
                                <ul className="header-cart-wrapitem w-full">
                                    {cart.cartItems.map((item) => (
                                        <li key={item.id} className="header-cart-item flex-w flex-t m-b-12">
                                            <div className="header-cart-item-img">
                                                <img src={item.productInfo.thumbnailUrl} alt="IMG"/>
                                            </div>

                                            <div className="header-cart-item-txt p-t-8">
                                                <a href="assets/#"
                                                   className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                                    {item.productInfo.name}
                                                </a>

                                                <span className="header-cart-item-info">
                                        {item.quantity} x {item.productInfo.price}$
                                    </span>
                                            </div>
                                        </li>))}

                                </ul>

                                <div className="w-full">
                                    <div className="header-cart-total w-full p-tb-40">
                                        Total: {cart.cartTotal}$
                                    </div>

                                    <div className="header-cart-buttons flex-w w-full">
                                        <a href="assets/shoping-cart.html"
                                           className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                                            View Cart
                                        </a>

                                        <a href="assets/shoping-cart.html"
                                           className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                                            Check Out
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPanel