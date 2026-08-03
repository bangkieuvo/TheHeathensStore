import {Link, useOutletContext} from 'react-router-dom';
import CartItemEditor from '../components/Cart/CartItemEditor.tsx';
import type {CommerceState} from '../hooks/useCommerceState.ts';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';
import '../assets/css/Cart.css';

const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(price);

const Cart = () => {
    const commerce = useOutletContext<CommerceState>();
    const items = commerce.cart?.cartItems ?? [];
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    usePageMetadata('Shopping cart', 'Review products, update quantities and continue to checkout.');

    if (commerce.authStatus === 'loading') {
        return <div className="container commerce-empty-state">Loading cart...</div>;
    }
    if (commerce.authStatus === 'unauthenticated') {
        return (
            <div className="container commerce-empty-state">
                <h3 className="p-b-20">Sign in to view your cart</h3>
                <Link to="/login" className="btn btn-dark">Login</Link>
            </div>
        );
    }

    return (
        <section className="cart-page">
            <div className="container">
                <header className="cart-page-heading">
                    <div>
                        <span className="cart-page-eyebrow">YOUR BAG</span>
                        <h1>Shopping cart</h1>
                    </div>
                    {items.length > 0 && (
                        <p>{totalQuantity} item{totalQuantity === 1 ? '' : 's'} ready for checkout</p>
                    )}
                </header>

                {items.length === 0 ? (
                    <div className="cart-empty-state">
                        <span className="cart-empty-icon"><i className="zmdi zmdi-shopping-cart" aria-hidden="true"/></span>
                        <h2>Your cart is empty</h2>
                        <p>Browse the latest kits and add your favourites to get started.</p>
                        <Link to="/shop" className="cart-primary-link">Continue shopping</Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items" aria-label="Cart items">
                            {items.map((item) => (
                                <CartItemEditor
                                    key={item.id}
                                    item={item}
                                    isPending={commerce.isCartPending(item.productInfo.uuid)}
                                    onUpdateQuantity={commerce.updateCartQuantity}
                                    onRemove={commerce.removeCartItem}
                                />
                            ))}
                        </div>

                        <aside className="cart-summary" aria-label="Order summary">
                            <div className="cart-summary-card">
                                <span className="cart-summary-eyebrow">ORDER SUMMARY</span>
                                <h2>Cart total</h2>
                                <div className="cart-summary-row">
                                    <span>Products</span>
                                    <span>{totalQuantity}</span>
                                </div>
                                <div className="cart-summary-divider"/>
                                <div className="cart-summary-total">
                                    <span>Total</span>
                                    <strong>{formatPrice(commerce.cart?.cartTotal ?? 0)}</strong>
                                </div>
                                <p><i className="zmdi zmdi-truck" aria-hidden="true"/> Standard shipping is free for orders from $100.</p>
                                <Link to="/checkout" className="cart-checkout-button">Proceed to checkout</Link>
                                <Link to="/shop" className="cart-continue-link">Continue shopping</Link>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
