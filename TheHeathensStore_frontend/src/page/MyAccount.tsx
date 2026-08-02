import {type FormEvent, useEffect, useState} from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import type {CommerceState} from '../hooks/useCommerceState.ts';
import {changePassword, createShippingAddress, deleteShippingAddress, getShippingAddresses, updateProfile} from '../service/accountService.ts';
import {cancelOrder, getOrders, reorder} from '../service/orderService.ts';
import type {ShippingAddress} from '../types/address.ts';
import type {Order} from '../types/order.ts';
import {NO_IMAGE_AVAILABLE_URL} from '../util/constants.ts';

const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
const formatDate = (date: string) => new Intl.DateTimeFormat('en-GB', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(date));

const MyAccount = () => {
    const commerce = useOutletContext<CommerceState>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [addressName, setAddressName] = useState('');
    const [addressPhone, setAddressPhone] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!commerce.user) return;
        const currentUser = commerce.user;
        Promise.resolve().then(() => {
            setFullName(currentUser.fullName || '');
            setEmail(currentUser.email || '');
            setPhone(currentUser.phone || '');
            setAddress(currentUser.address || '');
            return Promise.all([getOrders(), getShippingAddresses()]);
        })
            .then(([orderData, addressData]) => {
                setOrders(orderData);
                setAddresses(addressData);
            })
            .catch(() => setErrorMessage('Unable to load account data.'));
    }, [commerce.user]);

    if (commerce.authStatus === 'loading') return <div className="container commerce-empty-state">Loading account...</div>;
    if (!commerce.user) return <div className="container commerce-empty-state"><h3 className="p-b-20">Please sign in to manage your account.</h3><Link className="btn btn-dark" to="/login">Login</Link></div>;

    const runAction = async (action: () => Promise<void>, successMessage: string) => {
        setMessage(''); setErrorMessage('');
        try { await action(); setMessage(successMessage); }
        catch (error) { setErrorMessage(error instanceof Error ? error.message : 'The request failed.'); }
    };

    const saveProfile = (event: FormEvent) => {
        event.preventDefault();
        void runAction(async () => {
            const user = await updateProfile({fullName, email, phone, address});
            commerce.setCurrentUser(user);
        }, 'Profile updated.');
    };

    const savePassword = (event: FormEvent) => {
        event.preventDefault();
        void runAction(async () => {
            await changePassword(currentPassword, newPassword);
            setCurrentPassword(''); setNewPassword('');
        }, 'Password updated.');
    };

    const addAddress = (event: FormEvent) => {
        event.preventDefault();
        void runAction(async () => {
            const created = await createShippingAddress({recipientName: addressName, recipientPhone: addressPhone, address: addressValue, isDefault: addresses.length === 0});
            setAddresses((current) => [...current, created]);
            setAddressName(''); setAddressPhone(''); setAddressValue('');
        }, 'Shipping address added.');
    };

    return (
        <section className="bg0 p-t-75 p-b-120">
            <div className="container">
                <div className="flex-w flex-sb-m p-b-35"><div><h1 className="ltext-103 cl5">My Account</h1><p className="stext-102 cl6 p-t-5">Signed in as {commerce.user.username}</p></div><button type="button" className="btn btn-outline-dark" onClick={() => void commerce.signOut()}>Logout</button></div>
                {message && <div className="alert alert-success">{message}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <div className="row">
                    <div className="col-lg-6 p-b-30"><form className="account-card bor10 p-all-30" onSubmit={saveProfile}><h2 className="mtext-109 p-b-20">Personal information</h2><label>Full name<input className="form-control m-b-15" value={fullName} onChange={(event) => setFullName(event.target.value)} required/></label><label>Email<input className="form-control m-b-15" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/></label><label>Phone<input className="form-control m-b-15" value={phone} onChange={(event) => setPhone(event.target.value)}/></label><label>Default address<textarea className="form-control m-b-20" value={address} onChange={(event) => setAddress(event.target.value)}/></label><button className="btn btn-dark">Save profile</button></form></div>
                    <div className="col-lg-6 p-b-30"><form className="account-card bor10 p-all-30" onSubmit={savePassword}><h2 className="mtext-109 p-b-20">Change password</h2><label>Current password<input className="form-control m-b-15" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required/></label><label>New password<input className="form-control m-b-20" type="password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required/></label><button className="btn btn-dark">Update password</button></form></div>
                </div>

                <section className="account-card bor10 p-all-30 m-b-30"><h2 className="mtext-109 p-b-20">Shipping addresses</h2><div className="row">{addresses.map((item) => <div key={item.id} className="col-md-6 p-b-15"><div className="bor1 p-all-15"><strong>{item.recipientName} {item.isDefault && <span className="badge badge-dark">Default</span>}</strong><p>{item.recipientPhone}</p><p>{item.address}</p><button type="button" className="btn btn-link text-danger p-l-0" onClick={() => void runAction(async () => {await deleteShippingAddress(item.id); setAddresses(await getShippingAddresses());}, 'Address removed.')}>Remove</button></div></div>)}</div><form className="row p-t-15" onSubmit={addAddress}><div className="col-md-3"><input className="form-control" placeholder="Recipient name" value={addressName} onChange={(event) => setAddressName(event.target.value)} required/></div><div className="col-md-3"><input className="form-control" placeholder="Phone" value={addressPhone} onChange={(event) => setAddressPhone(event.target.value)} required/></div><div className="col-md-4"><input className="form-control" placeholder="Shipping address" value={addressValue} onChange={(event) => setAddressValue(event.target.value)} required/></div><div className="col-md-2"><button className="btn btn-dark w-full">Add address</button></div></form></section>

                <section className="account-card bor10 p-all-30 m-b-30"><h2 className="mtext-109 p-b-20">Order history</h2>{orders.length === 0 ? <p>No orders yet.</p> : orders.map((order) => <details key={order.uuid} className="order-history-item bor1 p-all-15 m-b-12"><summary className="flex-w flex-sb-m pointer"><span><strong>{order.uuid.slice(0, 8).toUpperCase()}</strong> · {formatDate(order.createdAt)}</span><span>{order.orderStatus} · {formatPrice(order.totalAmount)}</span></summary><div className="p-t-15">{order.items.map((item) => <div key={item.productUuid} className="flex-w flex-sb-m p-b-8"><Link to={`/product-detail/${item.productUuid}`}>{item.productName} × {item.quantity}</Link><span>{formatPrice(item.lineTotal)}</span></div>)}<p className="p-t-10">Ship to: {order.recipientName}, {order.recipientPhone}, {order.shippingAddress}</p><div className="p-t-15"><button type="button" className="btn btn-outline-dark m-r-10" onClick={() => void runAction(async () => {commerce.replaceCart(await reorder(order.uuid));}, 'Order items added to cart.')}>Buy again</button>{(order.orderStatus === 'PENDING' || order.orderStatus === 'CONFIRMED') && <button type="button" className="btn btn-outline-danger" onClick={() => void runAction(async () => {const updated = await cancelOrder(order.uuid); setOrders((current) => current.map((item) => item.uuid === updated.uuid ? updated : item));}, 'Order cancelled.')}>Cancel order</button>}</div></div></details>)}</section>

                <section className="account-card bor10 p-all-30"><h2 className="mtext-109 p-b-20">Wishlist</h2>{(commerce.favorite?.favoriteItems.length ?? 0) === 0 ? <p>Your wishlist is empty.</p> : <div className="row">{commerce.favorite?.favoriteItems.map((item) => <div key={item.id} className="col-sm-6 col-lg-3 p-b-20"><img className="account-wishlist-image" src={item.productInfo.thumbnailUrl || NO_IMAGE_AVAILABLE_URL} alt={item.productInfo.name}/><Link className="d-block p-t-10" to={`/product-detail/${item.productInfo.uuid}`}>{item.productInfo.name}</Link><p>{formatPrice(item.productInfo.price)}</p><button className="btn btn-sm btn-dark m-r-5" onClick={() => void commerce.addProductToCart(item.productInfo.uuid)}>Add to cart</button><button className="btn btn-sm btn-outline-danger" onClick={() => void commerce.toggleFavorite(item.productInfo.uuid)}>Remove</button></div>)}</div>}</section>
            </div>
        </section>
    );
};

export default MyAccount;
