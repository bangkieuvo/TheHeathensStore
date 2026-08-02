import {Link, useOutletContext} from 'react-router-dom';
import type {CommerceState} from '../hooks/useCommerceState.ts';
import {NO_IMAGE_AVAILABLE_URL} from '../util/constants.ts';

const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);

const Cart = () => {
    const commerce = useOutletContext<CommerceState>();
    const items = commerce.cart?.cartItems ?? [];

    if (commerce.authStatus === 'loading') {
        return <div className="container commerce-empty-state">Loading cart...</div>;
    }
    if (commerce.authStatus === 'unauthenticated') {
        return <div className="container commerce-empty-state"><h3 className="p-b-20">Sign in to view your cart</h3><Link to="/login" className="btn btn-dark">Login</Link></div>;
    }

    return (
        <section className="bg0 p-t-75 p-b-120">
            <div className="container">
                <h1 className="ltext-103 cl5 p-b-40">Shopping Cart</h1>
                {items.length === 0 ? (
                    <div className="txt-center p-tb-60"><p className="p-b-20">Your cart is empty.</p><Link to="/shop" className="btn btn-dark">Continue shopping</Link></div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            {items.map((item) => {
                                const pending = commerce.isCartPending(item.productInfo.uuid);
                                return (
                                    <article key={item.id} className="commerce-item bor10 p-all-20 m-b-15">
                                        <Link to={`/product-detail/${item.productInfo.uuid}`}>
                                            <img src={item.productInfo.thumbnailUrl || NO_IMAGE_AVAILABLE_URL} alt={item.productInfo.name}/>
                                        </Link>
                                        <div className="commerce-item-content">
                                            <Link to={`/product-detail/${item.productInfo.uuid}`} className="mtext-102 cl2 hov-cl1">{item.productInfo.name}</Link>
                                            <p className="stext-102 cl6 p-t-5">{item.productInfo.teamName} · {item.productInfo.season}</p>
                                            <p className="stext-102 cl3 p-t-8">{formatPrice(item.productInfo.price)}</p>
                                            <div className="flex-w flex-m p-t-12">
                                                <label className="m-r-10" htmlFor={`quantity-${item.id}`}>Quantity</label>
                                                <input id={`quantity-${item.id}`} className="commerce-quantity bor8 txt-center" type="number"
                                                       min={1} max={item.productInfo.stock} value={item.quantity} disabled={pending}
                                                       onChange={(event) => {
                                                           const quantity = Number(event.target.value);
                                                           if (Number.isInteger(quantity) && quantity > 0) void commerce.updateCartQuantity(item.productInfo.uuid, quantity).catch(() => undefined);
                                                       }}/>
                                                <button type="button" className="btn btn-link text-danger m-l-15" disabled={pending}
                                                        onClick={() => void commerce.removeCartItem(item.productInfo.uuid).catch(() => undefined)}>Remove</button>
                                            </div>
                                        </div>
                                        <strong>{formatPrice(item.subTotal)}</strong>
                                    </article>
                                );
                            })}
                        </div>
                        <aside className="col-lg-4">
                            <div className="bor10 p-all-30">
                                <h2 className="mtext-109 cl2 p-b-20">Cart totals</h2>
                                <div className="flex-w flex-sb-m p-b-20"><span>Subtotal</span><strong>{formatPrice(commerce.cart?.cartTotal ?? 0)}</strong></div>
                                <p className="stext-102 cl6 p-b-20">Standard shipping is free for orders from $100.</p>
                                <Link to="/checkout" className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04">Proceed to checkout</Link>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
