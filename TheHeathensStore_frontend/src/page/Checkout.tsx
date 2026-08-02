import {type FormEvent, useEffect, useMemo, useState} from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import type {CommerceState} from '../hooks/useCommerceState.ts';
import {getShippingAddresses} from '../service/accountService.ts';
import {createOrder} from '../service/orderService.ts';
import {getCart} from '../service/cartService.ts';
import type {ShippingAddress} from '../types/address.ts';
import type {Order, ShippingMethod} from '../types/order.ts';

const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);

const Checkout = () => {
    const commerce = useOutletContext<CommerceState>();
    const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
    const [recipientName, setRecipientName] = useState(commerce.user?.fullName ?? '');
    const [recipientPhone, setRecipientPhone] = useState(commerce.user?.phone ?? '');
    const [shippingAddress, setShippingAddress] = useState(commerce.user?.address ?? '');
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('STANDARD');
    const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (commerce.user) {
            setRecipientName(commerce.user.fullName || '');
            setRecipientPhone(commerce.user.phone || '');
            setShippingAddress(commerce.user.address || '');
            getShippingAddresses().then((data) => {
                setAddresses(data);
                const defaultAddress = data.find((item) => item.isDefault);
                if (defaultAddress) {
                    setRecipientName(defaultAddress.recipientName);
                    setRecipientPhone(defaultAddress.recipientPhone);
                    setShippingAddress(defaultAddress.address);
                }
            }).catch(() => undefined);
        }
    }, [commerce.user]);

    const subtotal = commerce.cart?.cartTotal ?? 0;
    const shippingFee = shippingMethod === 'EXPRESS' ? 15 : subtotal >= 100 ? 0 : 5;
    const total = useMemo(() => subtotal + shippingFee, [shippingFee, subtotal]);

    if (commerce.authStatus === 'loading') return <div className="container commerce-empty-state">Loading checkout...</div>;
    if (commerce.authStatus === 'unauthenticated') return <div className="container commerce-empty-state"><h3 className="p-b-20">Sign in to continue checkout</h3><Link className="btn btn-dark" to="/login">Login</Link></div>;
    if (createdOrder) {
        return <section className="container p-t-100 p-b-120 txt-center"><i className="zmdi zmdi-check-circle checkout-success-icon"/><h1 className="p-tb-20">Order confirmed</h1><p>Order code: <strong>{createdOrder.uuid}</strong></p><p className="p-tb-15">Total: {formatPrice(createdOrder.totalAmount)} · Payment: COD</p><Link to="/my-account" className="btn btn-dark m-r-10">View orders</Link><Link to="/shop" className="btn btn-outline-dark">Continue shopping</Link></section>;
    }
    if (!commerce.cart || commerce.cart.cartItems.length === 0) {
        return <div className="container commerce-empty-state"><p className="p-b-20">Your cart is empty.</p><Link to="/shop">Return to shop</Link></div>;
    }

    const selectSavedAddress = (id: string) => {
        const selected = addresses.find((item) => item.id === Number(id));
        if (selected) {
            setRecipientName(selected.recipientName);
            setRecipientPhone(selected.recipientPhone);
            setShippingAddress(selected.address);
        }
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        try {
            const order = await createOrder({
                items: commerce.cart!.cartItems.map((item) => ({productUuid: item.productInfo.uuid, quantity: item.quantity})),
                recipientName,
                recipientPhone,
                shippingAddress,
                shippingMethod,
                paymentMethod: 'COD',
            });
            commerce.replaceCart(await getCart());
            setCreatedOrder(order);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unable to create order.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg0 p-t-75 p-b-120">
            <div className="container"><h1 className="ltext-103 cl5 p-b-40">Checkout</h1>
                <form className="row" onSubmit={submit}>
                    <div className="col-lg-7">
                        <div className="bor10 p-all-30">
                            <h2 className="mtext-109 cl2 p-b-25">Shipping details</h2>
                            {addresses.length > 0 && <div className="p-b-20"><label>Saved address</label><select className="form-control" defaultValue="" onChange={(event) => selectSavedAddress(event.target.value)}><option value="">Use profile details</option>{addresses.map((item) => <option key={item.id} value={item.id}>{item.isDefault ? 'Default · ' : ''}{item.recipientName} — {item.address}</option>)}</select></div>}
                            <div className="p-b-20"><label htmlFor="checkout-name">Recipient name</label><input id="checkout-name" className="form-control" value={recipientName} onChange={(event) => setRecipientName(event.target.value)} required maxLength={100}/></div>
                            <div className="p-b-20"><label htmlFor="checkout-phone">Phone</label><input id="checkout-phone" className="form-control" value={recipientPhone} onChange={(event) => setRecipientPhone(event.target.value)} required maxLength={20}/></div>
                            <div className="p-b-20"><label htmlFor="checkout-address">Address</label><textarea id="checkout-address" className="form-control" value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} required maxLength={500}/></div>
                            <h3 className="mtext-106 p-b-10">Shipping method</h3>
                            <label className="checkout-option"><input type="radio" name="shipping" checked={shippingMethod === 'STANDARD'} onChange={() => setShippingMethod('STANDARD')}/> Standard — {subtotal >= 100 ? 'Free' : '$5.00'}</label>
                            <label className="checkout-option"><input type="radio" name="shipping" checked={shippingMethod === 'EXPRESS'} onChange={() => setShippingMethod('EXPRESS')}/> Express — $15.00</label>
                            <h3 className="mtext-106 p-t-25 p-b-10">Payment</h3><label className="checkout-option"><input type="radio" checked readOnly/> Cash on delivery (COD)</label>
                        </div>
                    </div>
                    <aside className="col-lg-5"><div className="bor10 p-all-30"><h2 className="mtext-109 p-b-20">Your order</h2>{commerce.cart.cartItems.map((item) => <div key={item.id} className="flex-w flex-sb-m p-b-12"><span>{item.productInfo.name} × {item.quantity}</span><span>{formatPrice(item.subTotal)}</span></div>)}<hr/><div className="flex-w flex-sb-m p-b-10"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex-w flex-sb-m p-b-20"><span>Shipping</span><span>{formatPrice(shippingFee)}</span></div><div className="flex-w flex-sb-m mtext-106 p-b-25"><strong>Total</strong><strong>{formatPrice(total)}</strong></div>{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}<button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 w-full" disabled={isSubmitting}>{isSubmitting ? 'Placing order...' : 'Place order'}</button></div></aside>
                </form>
            </div>
        </section>
    );
};

export default Checkout;
