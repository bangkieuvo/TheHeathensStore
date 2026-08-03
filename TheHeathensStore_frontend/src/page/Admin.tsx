import {type FormEvent, useEffect, useState} from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import type {CommerceState} from '../hooks/useCommerceState.ts';
import {
    archiveAdminProduct,
    createAdminProduct,
    exportAdminProducts,
    getAdminCatalog,
    getAdminCustomers,
    getAdminDashboard,
    getAdminOrders,
    getAdminProducts,
    getAdminSettings,
    saveAdminSetting,
    deleteAdminSetting,
    getAdminRecords,
    createAdminRecord,
    updateAdminRecord,
    deleteAdminRecord,
    updateAdminCustomerStatus,
    updateAdminOrder,
    updateAdminProduct,
    updateAdminStock,
    getAdminStaff,
    addAdminStaff,
    removeAdminStaff,
    uploadAdminProductImages,
} from '../service/adminService.ts';
import type {AdminCatalog, AdminCustomer, AdminDashboard, AdminOrder, AdminProduct, AdminProductRequest, AdminRecord, AdminSetting, AdminStaffMember} from '../types/admin.ts';
import {canManageStaff, canManageStore} from '../types/user.ts';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';
import '../assets/css/Admin.css';

type AdminTab = 'overview' | 'products' | 'orders' | 'customers' | 'content' | 'settings' | 'staff';

const emptyProduct: AdminProductRequest = {
    name: '', price: 0, stock: 0, description: '', jerseyType: 'home', teamId: null, seasonId: null, active: true,
};
const orderStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
const paymentStatuses = ['UNPAID', 'PENDING', 'PAID', 'FAILED', 'REFUNDED'];
const money = (value: number) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
const date = (value: string) => new Intl.DateTimeFormat('en-GB', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(value));

const Admin = () => {
    usePageMetadata('Admin dashboard', 'Manage products, inventory, orders and customers.');
    const commerce = useOutletContext<CommerceState>();
    const hasManagementAccess = canManageStore(commerce.user);
    const hasStaffManagementAccess = canManageStaff(commerce.user);
    const [tab, setTab] = useState<AdminTab>('overview');
    const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [customers, setCustomers] = useState<AdminCustomer[]>([]);
    const [catalog, setCatalog] = useState<AdminCatalog | null>(null);
    const [settings, setSettings] = useState<AdminSetting[]>([]);
    const [settingForm, setSettingForm] = useState({key: '', value: '', description: ''});
    const [records, setRecords] = useState<AdminRecord[]>([]);
    const [staffMembers, setStaffMembers] = useState<AdminStaffMember[]>([]);
    const [staffForm, setStaffForm] = useState({userUuid: '', employeeCode: ''});
    const [recordForm, setRecordForm] = useState<Omit<AdminRecord, 'uuid' | 'updatedAt'>>({type: 'PROMOTION', key: '', title: '', content: '', value: '', active: true, startsAt: null, endsAt: null});
    const [editingRecordUuid, setEditingRecordUuid] = useState<string | null>(null);
    const [productForm, setProductForm] = useState<AdminProductRequest>(emptyProduct);
    const [editingProductUuid, setEditingProductUuid] = useState<string | null>(null);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [subImages, setSubImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingKey, setPendingKey] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const loadAdminData = async () => {
        setIsLoading(true);
        try {
            const [nextDashboard, nextProducts, nextOrders, nextCustomers, nextCatalog, nextSettings, nextRecords, nextStaff] = await Promise.all([
                getAdminDashboard(), getAdminProducts(), getAdminOrders(), getAdminCustomers(), getAdminCatalog(), getAdminSettings(), getAdminRecords(), getAdminStaff(),
            ]);
            setDashboard(nextDashboard);
            setProducts(nextProducts);
            setOrders(nextOrders);
            setCustomers(nextCustomers);
            setCatalog(nextCatalog);
            setSettings(nextSettings);
            setRecords(nextRecords);
            setStaffMembers(nextStaff);
            setError('');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unable to load admin data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (hasManagementAccess) void loadAdminData();
        else if (commerce.authStatus !== 'loading') setIsLoading(false);
    }, [hasManagementAccess, commerce.authStatus]);

    const runAction = async (key: string, action: () => Promise<void>, success: string) => {
        setPendingKey(key); setMessage(''); setError('');
        try { await action(); setMessage(success); }
        catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Admin request failed.'); }
        finally { setPendingKey(''); }
    };

    const startCreateProduct = () => {
        setEditingProductUuid(null);
        setProductForm(emptyProduct);
        setIsProductFormOpen(true);
    };

    const startEditProduct = (product: AdminProduct) => {
        setEditingProductUuid(product.uuid);
        setProductForm({
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description || '',
            jerseyType: product.jerseyType,
            teamId: product.teamId,
            seasonId: product.seasonId,
            active: product.active,
        });
        setIsProductFormOpen(true);
    };

    const saveProduct = (event: FormEvent) => {
        event.preventDefault();
        void runAction('product-form', async () => {
            if (editingProductUuid) await updateAdminProduct(editingProductUuid, productForm);
            else await createAdminProduct(productForm);
            setIsProductFormOpen(false);
            setEditingProductUuid(null);
            await loadAdminData();
        }, editingProductUuid ? 'Product updated.' : 'Product created.');
    };

    const changeStock = (product: AdminProduct, amount: number) => {
        const stock = Math.max(0, product.stock + amount);
        void runAction(`stock-${product.uuid}`, async () => {
            const updated = await updateAdminStock(product.uuid, stock);
            setProducts((current) => current.map((item) => item.uuid === updated.uuid ? updated : item));
        }, 'Stock updated.');
    };

    const saveOrder = (order: AdminOrder) => {
        void runAction(`order-${order.uuid}`, async () => {
            const updated = await updateAdminOrder(order.uuid, {
                orderStatus: order.orderStatus,
                paymentStatus: order.paymentStatus,
                internalNote: order.internalNote,
            });
            setOrders((current) => current.map((item) => item.uuid === updated.uuid ? updated : item));
        }, 'Order updated.');
    };

    const submitSetting = (event: FormEvent) => {
        event.preventDefault();
        void runAction('setting-form', async () => {
            await saveAdminSetting(settingForm);
            setSettingForm({key: '', value: '', description: ''});
            setSettings(await getAdminSettings());
        }, 'Setting saved.');
    };

    const submitRecord = (event: FormEvent) => {
        event.preventDefault();
        void runAction('record-form', async () => {
            if (editingRecordUuid) await updateAdminRecord(editingRecordUuid, recordForm);
            else await createAdminRecord(recordForm);
            setRecords(await getAdminRecords()); setEditingRecordUuid(null);
            setRecordForm({type: 'PROMOTION', key: '', title: '', content: '', value: '', active: true, startsAt: null, endsAt: null});
        }, editingRecordUuid ? 'Record updated.' : 'Record created.');
    };

    const uploadImages = () => {
        if (!editingProductUuid || !mainImage) return;
        void runAction('product-images', async () => {
            await uploadAdminProductImages(editingProductUuid, mainImage, subImages);
            setMainImage(null);
            setSubImages([]);
            await loadAdminData();
        }, 'Product images uploaded.');
    };

    const submitStaff = (event: FormEvent) => {
        event.preventDefault();
        void runAction('staff-form', async () => {
            await addAdminStaff(staffForm.userUuid.trim(), staffForm.employeeCode.trim());
            setStaffForm({userUuid: '', employeeCode: ''});
            setStaffMembers(await getAdminStaff());
        }, 'Staff member added.');
    };

    if (commerce.authStatus === 'loading' || isLoading) return <div className="container commerce-empty-state">Loading admin dashboard...</div>;
    if (!commerce.user) return <div className="container commerce-empty-state"><h2>Admin login required</h2><Link to="/login">Sign in</Link></div>;
    if (!hasManagementAccess) return <div className="container commerce-empty-state"><h2>Access denied</h2><p>This area is restricted to store management accounts.</p><Link to="/">Return home</Link></div>;

    return (
        <section className="admin-page">
            <div className="container">
                <header className="admin-heading">
                    <div><span>STORE OPERATIONS</span><h1>Management dashboard</h1><p>Manage the catalogue, orders, customers and staff from one workspace.</p></div>
                    <button type="button" className="admin-secondary-button" onClick={() => void loadAdminData()}><i className="zmdi zmdi-refresh"/> Refresh</button>
                </header>

                <nav className="admin-tabs" aria-label="Admin sections">
                    {(['overview', 'products', 'orders', 'customers', 'content', 'settings', 'staff'] as AdminTab[]).map((item) => <button key={item} type="button" className={tab === item ? 'is-active' : ''} onClick={() => setTab(item)}>{item}</button>)}
                </nav>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {tab === 'overview' && dashboard && (
                    <>
                        <div className="admin-stat-grid">
                            <article><small>Delivered revenue</small><strong>{money(dashboard.revenue)}</strong></article>
                            <article><small>Total orders</small><strong>{dashboard.orders}</strong><span>{dashboard.pendingOrders} pending</span></article>
                            <article><small>Customers</small><strong>{dashboard.customers}</strong></article>
                            <article><small>Products</small><strong>{dashboard.products}</strong><span>{dashboard.lowStockProducts} low stock</span></article>
                        </div>
                        <div className="admin-card"><h2>Best selling products</h2><div className="admin-table-wrap"><table><thead><tr><th>Product</th><th>Team</th><th>Sold</th><th>Stock</th></tr></thead><tbody>{dashboard.topProducts.map((product) => <tr key={product.uuid}><td>{product.name}</td><td>{product.teamName || '—'}</td><td>{product.salesCount}</td><td className={product.stock <= 5 ? 'admin-danger' : ''}>{product.stock}</td></tr>)}</tbody></table></div></div>
                    </>
                )}

                {tab === 'products' && (
                    <div className="admin-card">
                        <div className="admin-section-heading"><div><h2>Products & inventory</h2><p>{products.length} records, including archived products.</p></div><div><button type="button" className="admin-secondary-button" onClick={() => void exportAdminProducts()}>Export CSV</button><button type="button" className="admin-primary-button" onClick={startCreateProduct}>Add product</button></div></div>
                        {isProductFormOpen && catalog && <form className="admin-editor" onSubmit={saveProduct}><div className="admin-form-grid"><label>Product name<input value={productForm.name} onChange={(event) => setProductForm({...productForm, name: event.target.value})} required/></label><label>Price<input type="number" min="0" step="0.01" value={productForm.price} onChange={(event) => setProductForm({...productForm, price: Number(event.target.value)})} required/></label><label>Stock<input type="number" min="0" value={productForm.stock} onChange={(event) => setProductForm({...productForm, stock: Number(event.target.value)})} required/></label><label>Kit type<select value={productForm.jerseyType} onChange={(event) => setProductForm({...productForm, jerseyType: event.target.value})}>{catalog.jerseyTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label>Team<select value={productForm.teamId ?? ''} onChange={(event) => setProductForm({...productForm, teamId: event.target.value ? Number(event.target.value) : null})}><option value="">No team</option>{catalog.teams.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Season<select value={productForm.seasonId ?? ''} onChange={(event) => setProductForm({...productForm, seasonId: event.target.value ? Number(event.target.value) : null})}><option value="">No season</option>{catalog.seasons.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="admin-form-wide">Description<textarea value={productForm.description} onChange={(event) => setProductForm({...productForm, description: event.target.value})}/></label><label className="admin-checkbox"><input type="checkbox" checked={productForm.active} onChange={(event) => setProductForm({...productForm, active: event.target.checked})}/>Active in shop</label></div><div className="admin-editor-actions"><button className="admin-primary-button" disabled={pendingKey === 'product-form'}>{pendingKey === 'product-form' ? 'Saving...' : 'Save product'}</button><button type="button" className="admin-secondary-button" onClick={() => setIsProductFormOpen(false)}>Cancel</button></div></form>}
                        {editingProductUuid && <div className="admin-editor admin-image-uploader"><h3>Product images</h3><p>Choose a new main image and optional gallery images for the selected product.</p><div className="admin-form-grid"><label>Main image<input type="file" accept="image/*" onChange={(event) => setMainImage(event.target.files?.[0] ?? null)}/></label><label>Gallery images<input type="file" accept="image/*" multiple onChange={(event) => setSubImages(Array.from(event.target.files ?? []))}/></label></div><div className="admin-editor-actions"><button type="button" className="admin-primary-button" disabled={!mainImage || pendingKey === 'product-images'} onClick={uploadImages}>{pendingKey === 'product-images' ? 'Uploading...' : 'Upload images'}</button></div></div>}
                        <div className="admin-table-wrap"><table><thead><tr><th>Product</th><th>Classification</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product.uuid}><td>{product.thumbnailUrl && <img className="admin-product-thumb" src={product.thumbnailUrl} alt=""/>}<strong>{product.name}</strong><small>{product.uuid.slice(0, 8)}</small></td><td>{product.teamName || '—'}<small>{product.season || '—'} · {product.jerseyType}</small></td><td>{money(product.price)}</td><td><div className="admin-stock-control"><button type="button" onClick={() => changeStock(product, -1)} disabled={pendingKey === `stock-${product.uuid}`}>−</button><strong className={product.stock <= 5 ? 'admin-danger' : ''}>{product.stock}</strong><button type="button" onClick={() => changeStock(product, 1)} disabled={pendingKey === `stock-${product.uuid}`}>+</button></div></td><td><span className={`admin-status ${product.active ? 'is-success' : 'is-muted'}`}>{product.active ? 'Active' : 'Archived'}</span></td><td><button type="button" className="admin-link-button" onClick={() => startEditProduct(product)}>Edit</button>{product.active && <button type="button" className="admin-link-button is-danger" onClick={() => void runAction(`archive-${product.uuid}`, async () => {await archiveAdminProduct(product.uuid); await loadAdminData();}, 'Product archived.')}>Archive</button>}</td></tr>)}</tbody></table></div>
                    </div>
                )}

                {tab === 'orders' && <div className="admin-order-list">{orders.length === 0 ? <div className="admin-card">No orders found.</div> : orders.map((order) => <article className="admin-card admin-order-card" key={order.uuid}><header><div><strong>#{order.uuid.slice(0, 8).toUpperCase()}</strong><span>{date(order.createdAt)} · {order.customerUsername || order.customerEmail}</span></div><strong>{money(order.totalAmount)}</strong></header><div className="admin-order-grid"><label>Order status<select value={order.orderStatus} onChange={(event) => setOrders((current) => current.map((item) => item.uuid === order.uuid ? {...item, orderStatus: event.target.value} : item))}>{orderStatuses.map((status) => <option key={status}>{status}</option>)}</select></label><label>Payment status<select value={order.paymentStatus} onChange={(event) => setOrders((current) => current.map((item) => item.uuid === order.uuid ? {...item, paymentStatus: event.target.value} : item))}>{paymentStatuses.map((status) => <option key={status}>{status}</option>)}</select></label><label className="admin-form-wide">Internal note<textarea value={order.internalNote || ''} onChange={(event) => setOrders((current) => current.map((item) => item.uuid === order.uuid ? {...item, internalNote: event.target.value} : item))}/></label></div><details><summary>{order.items.length} line items · Ship to {order.recipientName}</summary>{order.items.map((item) => <p key={item.productUuid}>{item.productName} × {item.quantity} — {money(item.lineTotal)}</p>)}<p>{order.recipientPhone} · {order.shippingAddress}</p></details><button type="button" className="admin-primary-button" onClick={() => saveOrder(order)} disabled={pendingKey === `order-${order.uuid}`}>Save order</button></article>)}</div>}

                {tab === 'customers' && <div className="admin-card"><div className="admin-section-heading"><div><h2>Customers</h2><p>Order activity and account access.</p></div></div><div className="admin-table-wrap"><table><thead><tr><th>Customer</th><th>Contact</th><th>Orders</th><th>Total spent</th><th>Status</th><th>Action</th></tr></thead><tbody>{customers.map((customer) => <tr key={customer.uuid}><td><strong>{customer.fullName || customer.username}</strong><small>@{customer.username}</small></td><td>{customer.email}<small>{customer.phone || 'No phone'}</small></td><td>{customer.orderCount}</td><td>{money(customer.totalSpent)}</td><td><span className={`admin-status ${customer.active ? 'is-success' : 'is-danger'}`}>{customer.active ? 'Active' : 'Blocked'}</span></td><td><button type="button" className={`admin-link-button ${customer.active ? 'is-danger' : ''}`} disabled={pendingKey === `customer-${customer.uuid}`} onClick={() => void runAction(`customer-${customer.uuid}`, async () => {const updated = await updateAdminCustomerStatus(customer.uuid, !customer.active); setCustomers((current) => current.map((item) => item.uuid === updated.uuid ? updated : item));}, customer.active ? 'Customer blocked.' : 'Customer activated.')}>{customer.active ? 'Block' : 'Activate'}</button></td></tr>)}</tbody></table></div></div>}

                {tab === 'content' && <div className="admin-card"><div className="admin-section-heading"><div><h2>Promotions & content</h2><p>Manage campaign definitions, banners, blog drafts and email templates.</p></div></div><form className="admin-editor" onSubmit={submitRecord}><div className="admin-form-grid"><label>Type<select value={recordForm.type} onChange={(event) => setRecordForm({...recordForm, type: event.target.value as AdminRecord['type']})}>{['PROMOTION','BANNER','BLOG','EMAIL_TEMPLATE'].map((type) => <option key={type}>{type}</option>)}</select></label><label>Key / code<input value={recordForm.key} onChange={(event) => setRecordForm({...recordForm, key: event.target.value})} required/></label><label>Title<input value={recordForm.title} onChange={(event) => setRecordForm({...recordForm, title: event.target.value})} required/></label><label>Value / link<input value={recordForm.value} onChange={(event) => setRecordForm({...recordForm, value: event.target.value})}/></label><label>Starts at<input type="datetime-local" value={recordForm.startsAt || ''} onChange={(event) => setRecordForm({...recordForm, startsAt: event.target.value || null})}/></label><label>Ends at<input type="datetime-local" value={recordForm.endsAt || ''} onChange={(event) => setRecordForm({...recordForm, endsAt: event.target.value || null})}/></label><label className="admin-form-wide">Content<textarea value={recordForm.content} onChange={(event) => setRecordForm({...recordForm, content: event.target.value})}/></label><label className="admin-checkbox"><input type="checkbox" checked={recordForm.active} onChange={(event) => setRecordForm({...recordForm, active: event.target.checked})}/>Active</label></div><div className="admin-editor-actions"><button className="admin-primary-button">{editingRecordUuid ? 'Update record' : 'Add record'}</button></div></form><div className="admin-table-wrap"><table><thead><tr><th>Type</th><th>Key</th><th>Title</th><th>Status</th><th>Actions</th></tr></thead><tbody>{records.map((record) => <tr key={record.uuid}><td>{record.type}</td><td>{record.key}</td><td>{record.title}</td><td><span className={`admin-status ${record.active ? 'is-success' : 'is-muted'}`}>{record.active ? 'Active' : 'Inactive'}</span></td><td><button type="button" className="admin-link-button" onClick={() => {setEditingRecordUuid(record.uuid); setRecordForm({type:record.type,key:record.key,title:record.title,content:record.content,value:record.value,active:record.active,startsAt:record.startsAt,endsAt:record.endsAt});}}>Edit</button><button type="button" className="admin-link-button is-danger" onClick={() => void runAction(`record-${record.uuid}`, async () => {await deleteAdminRecord(record.uuid); setRecords(await getAdminRecords());}, 'Record deleted.')}>Delete</button></td></tr>)}</tbody></table></div></div>}

                {tab === 'settings' && <div className="admin-card"><div className="admin-section-heading"><div><h2>Store settings</h2><p>Shipping values are read by the order service immediately. Other keys can be reserved for store and email configuration.</p></div></div><form className="admin-editor" onSubmit={submitSetting}><div className="admin-form-grid"><label>Setting key<input placeholder="shipping.standard_fee" value={settingForm.key} onChange={(event) => setSettingForm({...settingForm, key: event.target.value})} required/></label><label>Value<input placeholder="5.00" value={settingForm.value} onChange={(event) => setSettingForm({...settingForm, value: event.target.value})} required/></label><label>Description<input value={settingForm.description} onChange={(event) => setSettingForm({...settingForm, description: event.target.value})}/></label></div><div className="admin-editor-actions"><button className="admin-primary-button" disabled={pendingKey === 'setting-form'}>Save setting</button></div></form><div className="admin-table-wrap"><table><thead><tr><th>Key</th><th>Value</th><th>Description</th><th>Action</th></tr></thead><tbody>{settings.map((setting) => <tr key={setting.key}><td><strong>{setting.key}</strong></td><td>{setting.value}</td><td>{setting.description || '—'}</td><td><button type="button" className="admin-link-button" onClick={() => setSettingForm({key: setting.key, value: setting.value, description: setting.description || ''})}>Edit</button><button type="button" className="admin-link-button is-danger" onClick={() => void runAction(`setting-${setting.key}`, async () => {await deleteAdminSetting(setting.key); setSettings(await getAdminSettings());}, 'Setting deleted.')}>Delete</button></td></tr>)}</tbody></table></div></div>}
                {tab === 'staff' && <div className="admin-card"><div className="admin-section-heading"><div><h2>Staff accounts</h2><p>Staff can operate products, orders, customers, content and settings. Only administrators can add or remove staff access.</p></div></div>{hasStaffManagementAccess && <form className="admin-editor" onSubmit={submitStaff}><div className="admin-form-grid"><label>User UUID<input value={staffForm.userUuid} onChange={(event) => setStaffForm({...staffForm, userUuid: event.target.value})} placeholder="Existing user UUID" required/></label><label>Employee code<input value={staffForm.employeeCode} onChange={(event) => setStaffForm({...staffForm, employeeCode: event.target.value})} placeholder="S-0003" maxLength={20} required/></label></div><div className="admin-editor-actions"><button className="admin-primary-button" disabled={pendingKey === 'staff-form'}>{pendingKey === 'staff-form' ? 'Adding...' : 'Add staff member'}</button></div></form>}<div className="admin-table-wrap"><table><thead><tr><th>Employee</th><th>Account</th><th>Contact</th><th>Status</th><th>Action</th></tr></thead><tbody>{staffMembers.map((staff) => <tr key={staff.uuid}><td><strong>{staff.employeeCode}</strong><small>{staff.fullName || 'No profile name'}</small></td><td>{staff.username}{staff.isAdmin && <small>Administrator</small>}</td><td>{staff.email}</td><td><span className={`admin-status ${staff.active ? 'is-success' : 'is-danger'}`}>{staff.active ? 'Active' : 'Inactive'}</span></td><td>{hasStaffManagementAccess && !staff.isAdmin ? <button type="button" className="admin-link-button is-danger" disabled={pendingKey === `staff-${staff.uuid}`} onClick={() => void runAction(`staff-${staff.uuid}`, async () => {await removeAdminStaff(staff.uuid); setStaffMembers(await getAdminStaff());}, 'Staff account removed.')}>Remove staff</button> : <span className="admin-muted">Protected</span>}</td></tr>)}</tbody></table></div></div>}
            </div>
        </section>
    );
};

export default Admin;
