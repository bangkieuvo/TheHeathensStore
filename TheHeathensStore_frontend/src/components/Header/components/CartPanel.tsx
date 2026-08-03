import {Link} from 'react-router-dom';
import type {Cart} from '../../../types/cart.ts';
import {NO_IMAGE_AVAILABLE_URL} from '../../../util/constants.ts';
import QuickPanelShell from './QuickPanelShell.tsx';

interface CartPanelProps {
    cart: Cart | null;
    isLoggedIn: boolean;
    isCartOpen: boolean;
    setIsCartOpen: (flag: boolean) => void;
    removeItem: (productUuid: string) => Promise<void>;
    isItemPending: (productUuid: string) => boolean;
}

const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(price);

const CartPanel = ({
    cart,
    isLoggedIn,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    isItemPending,
}: CartPanelProps) => {
    const cartItems = cart?.cartItems ?? [];
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const closePanel = () => setIsCartOpen(false);

    const footer = isLoggedIn && cartItems.length > 0 ? (
        <>
            <div className="header-quick-panel-total">
                <span>Total</span>
                <strong>{formatPrice(cart?.cartTotal ?? 0)}</strong>
            </div>
            <div className="header-quick-panel-actions">
                <Link to="/cart" className="header-quick-panel-primary" onClick={closePanel}>View cart</Link>
                <Link to="/checkout" className="header-quick-panel-secondary" onClick={closePanel}>Checkout</Link>
            </div>
        </>
    ) : undefined;

    return (
        <QuickPanelShell
            isOpen={isCartOpen}
            title="Cart"
            count={itemCount}
            iconClassName="zmdi zmdi-shopping-cart"
            onClose={closePanel}
            footer={footer}
        >
            {!isLoggedIn ? (
                <div className="header-quick-panel-empty">
                    <i className="zmdi zmdi-shopping-cart" aria-hidden="true"/>
                    <h3>Sign in to view your cart</h3>
                    <p>Your saved cart will appear here.</p>
                    <Link to="/login" onClick={closePanel}>Sign in</Link>
                </div>
            ) : cartItems.length > 0 ? (
                <ul className="header-quick-panel-list">
                    {cartItems.map((item) => (
                        <li key={item.id} aria-busy={isItemPending(item.productInfo.uuid)}>
                            <Link className="header-quick-panel-image" to={`/product-detail/${item.productInfo.uuid}`} onClick={closePanel}>
                                <img src={item.productInfo.thumbnailUrl || NO_IMAGE_AVAILABLE_URL} alt={item.productInfo.name}/>
                            </Link>
                            <div className="header-quick-panel-item-copy">
                                <Link to={`/product-detail/${item.productInfo.uuid}`} onClick={closePanel}>{item.productInfo.name}</Link>
                                <span>{item.productInfo.teamName} · {item.productInfo.season}</span>
                                <div>
                                    <span>{item.quantity} × {formatPrice(item.productInfo.price)}</span>
                                    <strong>{formatPrice(item.subTotal)}</strong>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="header-quick-panel-remove"
                                onClick={() => void removeItem(item.productInfo.uuid).catch(() => undefined)}
                                disabled={isItemPending(item.productInfo.uuid)}
                                aria-label={`Remove ${item.productInfo.name} from cart`}
                            >
                                {isItemPending(item.productInfo.uuid) ? (
                                    <span className="header-quick-panel-spinner" aria-hidden="true"/>
                                ) : (
                                    <i className="zmdi zmdi-delete" aria-hidden="true"/>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="header-quick-panel-empty">
                    <i className="zmdi zmdi-shopping-cart" aria-hidden="true"/>
                    <h3>Your cart is empty</h3>
                    <p>Add a jersey and it will show up here.</p>
                    <Link to="/shop" onClick={closePanel}>Browse shop</Link>
                </div>
            )}
        </QuickPanelShell>
    );
};

export default CartPanel
