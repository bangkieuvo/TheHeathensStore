import React, { useState, useEffect } from 'react'
interface CartPanelProps {
    isCartOpen: boolean;
    setIsCartOpen: (flag: boolean) => void;
}
const assetsURL: string = '../../../assets';
let names: string[] = ['item-cart-01', 'item-cart-02', 'item-cart-03']
const getImageUrl = (name: string) => {
    return new URL(`${assetsURL}/images/${name}.jpg`,import.meta.url).href;
};
const img1:string = getImageUrl(names[0]);
const img2:string = getImageUrl(names[1]);
const img3:string = getImageUrl(names[2]);
const CartPanel: React.FC<CartPanelProps> = ({ isCartOpen, setIsCartOpen }) => {
    return (
        <>
            <div className={`wrap-header-cart js-panel-cart ${isCartOpen ? 'show-header-cart' : ''}`}>
                <div className="s-full" onClick={() => setIsCartOpen(false)}></div>
                <div className="header-cart flex-col-l p-l-65 p-r-25">
                    <div className="header-cart-title flex-w flex-sb-m p-b-8">
                        <span className="mtext-103 cl2">Your Cart</span>
                        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04" onClick={() => setIsCartOpen(false)}>
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>
                    <div className="header-cart-content flex-w js-pscroll">
                        <ul className="header-cart-wrapitem w-full">
                            <li className="header-cart-item flex-w flex-t m-b-12">
                                <div className="header-cart-item-img">
                                    <img src={img1} alt="IMG"/>
                                </div>

                                <div className="header-cart-item-txt p-t-8">
                                    <a href="assets/#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                        White Shirt Pleat
                                    </a>

                                    <span className="header-cart-item-info">
                                        1 x $19.00
                                    </span>
                                </div>
                            </li>
                        </ul>

                        <div className="w-full">
                            <div className="header-cart-total w-full p-tb-40">
                                Total: $75.00
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPanel