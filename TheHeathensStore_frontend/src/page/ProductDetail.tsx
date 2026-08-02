import {useEffect, useMemo, useState} from 'react';
import {Link, useNavigate, useOutletContext, useParams} from 'react-router-dom';
import HomeProductCard from '../components/Home/HomeProductCard';
import {getProduct, getRelatedProducts} from '../service/shopService.ts';
import type {Product} from '../types/product';
import '../assets/css/ProductDetail.css';
import {NO_IMAGE_AVAILABLE_URL} from '../util/constants.ts';
import type {CommerceState} from '../hooks/useCommerceState.ts';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(price);

const getJerseyTypeLabel = (jerseyType: string) => jerseyType
    .split('_')
    .map((word) => word.toUpperCase())
    .join(' ');

const getProductImages = (product: Product) => {
    const images = [product.thumbnail?.url, ...product.images.map((image) => image.url)]
        .filter((image): image is string => Boolean(image?.trim()));
    return images.length > 0 ? images : [NO_IMAGE_AVAILABLE_URL];
};

const ProductDetail = () => {
    const commerce = useOutletContext<CommerceState>();
    const navigate = useNavigate();
    const {uuid} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    usePageMetadata(product?.name ?? 'Product details', product?.description || 'Football jersey product details, availability and related products.', uuid ? `/product-detail/${uuid}` : undefined);

    useEffect(() => {
        if (!uuid) return;
        let isMounted = true;
        setIsLoading(true);
        setActiveImageIndex(0);
        setQuantity(1);
        Promise.all([getProduct(uuid), getRelatedProducts(uuid)])
            .then(([productData, relatedData]) => {
                if (isMounted) {
                    setProduct(productData);
                    setRelatedProducts(relatedData);
                    setErrorMessage('');
                }
            })
            .catch(() => {
                if (isMounted) {
                    setProduct(null);
                    setRelatedProducts([]);
                    setErrorMessage('This product is unavailable or could not be loaded.');
                }
            })
            .finally(() => isMounted && setIsLoading(false));
        return () => { isMounted = false; };
    }, [uuid]);

    const images = useMemo(() => product ? getProductImages(product) : [], [product]);

    if (isLoading) {
        return <div className="container p-t-100 p-b-100 txt-center">Loading product...</div>;
    }
    if (!product) {
        return <div className="container p-t-100 p-b-100 txt-center"><p>{errorMessage}</p><Link to="/shop">Back to shop</Link></div>;
    }

    const activeImage = images[Math.min(activeImageIndex, images.length - 1)];
    const isOutOfStock = product.stock <= 0;
    const isCartPending = commerce.isCartPending(product.uuid);
    const isInCart = commerce.isInCart(product.uuid);
    const isFavorite = commerce.isFavorite(product.uuid);

    const addToCart = async () => {
        setIsSubmitting(true);
        try {
            await commerce.addProductToCart(product.uuid, quantity);
        } finally {
            setIsSubmitting(false);
        }
    };

    const buyNow = async () => {
        if (commerce.authStatus !== 'authenticated') {
            navigate('/login');
            return;
        }
        setIsSubmitting(true);
        try {
            await commerce.addProductToCart(product.uuid, quantity);
            navigate('/checkout');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">Home <i className="fa fa-angle-right m-l-9 m-r-10"/></Link>
                    <Link to={`/shop?teamName=${encodeURIComponent(product.teamName)}`} className="stext-109 cl8 hov-cl1 trans-04">
                        {product.teamName} <i className="fa fa-angle-right m-l-9 m-r-10"/>
                    </Link>
                    <span className="stext-109 cl4">{product.name}</span>
                </div>
            </div>

            <section className="sec-product-detail bg0 p-t-65 p-b-60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-7 p-b-30">
                            <div className="product-detail-gallery">
                                <div className="product-detail-thumbs">
                                    {images.map((image, index) => (
                                        <button key={`${image}-${index}`} type="button"
                                                className={`product-detail-thumb ${activeImageIndex === index ? 'is-active' : ''}`}
                                                onClick={() => setActiveImageIndex(index)}>
                                            <img src={image} alt={`${product.name} ${index + 1}`}/>
                                        </button>
                                    ))}
                                </div>
                                <div className="product-detail-image-frame">
                                    <img src={activeImage} alt={product.name}/>
                                    <a className="product-detail-expand flex-c-m size-108 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                       href={activeImage} target="_blank" rel="noreferrer" aria-label="Open full-size product image">
                                        <i className="fa fa-expand"/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-5 p-b-30">
                            <div className="p-r-50 p-t-5 p-lr-0-lg">
                                <h1 className="mtext-105 cl2 p-b-14">{product.name}</h1>
                                <span className="mtext-106 cl2">{formatPrice(product.price)}</span>
                                <p className="stext-102 cl3 p-t-23">{product.description || 'No description available.'}</p>
                                <ul className="stext-102 cl6 p-t-20">
                                    <li className="p-b-7"><strong>Club:</strong> {product.teamName}</li>
                                    {product.leagueName && <li className="p-b-7"><strong>League:</strong> {product.leagueName}</li>}
                                    <li className="p-b-7"><strong>Season:</strong> {product.season}</li>
                                    <li className="p-b-7"><strong>Kit type:</strong> {getJerseyTypeLabel(product.jerseyType)}</li>
                                    <li className="p-b-7"><strong>Stock:</strong> {isOutOfStock ? 'Out of stock' : `${product.stock} available`}</li>
                                </ul>

                                <div className="flex-w flex-m p-t-30">
                                    <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                        <button className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" type="button"
                                                onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
                                            <i className="fs-16 zmdi zmdi-minus"/>
                                        </button>
                                        <input className="mtext-104 cl3 txt-center num-product" type="number" min={1}
                                               max={product.stock} value={quantity}
                                               onChange={(event) => setQuantity(Math.min(product.stock, Math.max(1, Number(event.target.value) || 1)))}/>
                                        <button className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" type="button"
                                                onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}>
                                            <i className="fs-16 zmdi zmdi-plus"/>
                                        </button>
                                    </div>
                                    <button className={`product-detail-add-cart flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 m-r-8${isInCart ? ' is-in-cart' : ''}`}
                                            type="button" disabled={isOutOfStock || isSubmitting || isCartPending} onClick={addToCart}>
                                        {isCartPending ? 'Adding...' : 'Add to cart'}
                                    </button>
                                    <button className="flex-c-m stext-101 cl0 size-101 bg3 bor1 hov-btn3 p-lr-15 trans-04 m-tb-10"
                                            type="button" disabled={isOutOfStock || isSubmitting || isCartPending} onClick={buyNow}>
                                        Buy now
                                    </button>
                                </div>

                                <button type="button" className={`product-detail-wishlist trans-04 ${isFavorite ? 'is-active' : ''}`}
                                        disabled={commerce.isFavoritePending(product.uuid)}
                                        onClick={() => commerce.toggleFavorite(product.uuid)}>
                                    <i className={`zmdi ${isFavorite ? 'zmdi-favorite' : 'zmdi-favorite-outline'}`}/> {isFavorite ? 'Saved to wishlist' : 'Add to wishlist'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bor10 m-t-50 p-t-43 p-b-40">
                        <div className="how-pos2 p-lr-15-md">
                            <h3 className="mtext-106 cl2 p-b-20">Product description</h3>
                            <p className="stext-102 cl6">{product.description || 'No description available.'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="product-detail-related sec-relate-product bg0 p-t-45 p-b-105">
                    <div className="container">
                        <h3 className="ltext-106 cl5 txt-center p-b-45">Related Products</h3>
                        <div className="row isotope-grid">
                            {relatedProducts.map((item) => <HomeProductCard key={item.uuid} product={item} commerce={commerce} onQuickView={() => undefined}/>)}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ProductDetail;
