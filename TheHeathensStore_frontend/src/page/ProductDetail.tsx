import {useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import HomeProductCard from '../components/Home/HomeProductCard';
import {products} from "../components/common/_product-data.tsx";
import type {Product} from '../types/product';
import '../assets/css/ProductDetail.css';

const placeholderImage =
    'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg?w=768';

const sizes = ['S', 'M', 'L', 'XL'];
const colors = ['Red', 'Blue', 'White', 'Grey'];

const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);

const getJerseyTypeLabel = (jerseyType: string) =>
    jerseyType
        .split('_')
        .map((word) => word.toUpperCase())
        .join(' ');

const getProductImages = (product: Product) => {
    const images = [
        product.thumbnail?.url,
        ...product.images.map((image) => image.url),
    ].filter((image): image is string => Boolean(image));

    return images.length > 0 ? images : [placeholderImage];
};

const ProductDetail = () => {
    const {uuid} = useParams();
    const product = products.find((item) => item.uuid === uuid) ?? products[0];
    const images = useMemo(() => getProductImages(product), [product]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'information' | 'reviews'>('description');

    const activeImage = images[Math.min(activeImageIndex, images.length - 1)];
    const relatedProducts = products
        .filter((item) => item.uuid !== product.uuid && item.teamName === product.teamName)
        .slice(0, 4);

    const decreaseQuantity = () => setQuantity((current) => Math.max(1, current - 1));
    const increaseQuantity = () => setQuantity((current) => Math.min(product.stock, current + 1));

    return (
        <>
            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
                        Home
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </Link>

                    <span className="stext-109 cl8">
            {product.teamName}
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
          </span>

                    <span className="stext-109 cl4">{product.name}</span>
                </div>
            </div>

            <section className="sec-product-detail bg0 p-t-65 p-b-60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-7 p-b-30">
                            <div className="p-l-25 p-r-30 p-lr-0-lg">
                                <div className="product-detail-gallery">
                                    <div className="product-detail-thumbs">
                                        {images.map((image, index) => (
                                            <button
                                                key={`${image}-${index}`}
                                                type="button"
                                                className={`product-detail-thumb ${activeImageIndex === index ? 'is-active' : ''}`}
                                                onClick={() => setActiveImageIndex(index)}
                                                aria-label={`View product image ${index + 1}`}
                                            >
                                                <img src={image} alt={`${product.name} thumbnail ${index + 1}`}/>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="product-detail-image-frame">
                                        <img src={activeImage} alt={product.name}/>
                                        <a
                                            className="product-detail-expand flex-c-m size-108 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                            href={activeImage}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Open product image"
                                        >
                                            <i className="fa fa-expand"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-5 p-b-30">
                            <div className="p-r-50 p-t-5 p-lr-0-lg">
                                <h4 className="mtext-105 cl2 js-name-detail p-b-14">{product.name}</h4>

                                <span className="mtext-106 cl2">{formatPrice(product.price)}</span>

                                <p className="stext-102 cl3 p-t-23">{product.description}</p>

                                <div className="stext-102 cl6 p-t-10">
                                    {product.teamName} / {product.season} / {getJerseyTypeLabel(product.jerseyType)}
                                </div>

                                <div className="p-t-33">
                                    <div className="flex-w flex-r-m p-b-10">
                                        <div className="size-203 flex-c-m respon6">Size</div>

                                        <div className="size-204 respon6-next">
                                            <div className="rs1-select2 bor8 bg0">
                                                <select className="js-select2" name="size" defaultValue="">
                                                    <option value="">Choose an option</option>
                                                    {sizes.map((size) => (
                                                        <option key={size} value={size}>
                                                            Size {size}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="dropDownSelect2"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-w flex-r-m p-b-10">
                                        <div className="size-203 flex-c-m respon6">Color</div>

                                        <div className="size-204 respon6-next">
                                            <div className="rs1-select2 bor8 bg0">
                                                <select className="js-select2" name="color" defaultValue="">
                                                    <option value="">Choose an option</option>
                                                    {colors.map((color) => (
                                                        <option key={color} value={color.toLowerCase()}>
                                                            {color}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="dropDownSelect2"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-w flex-r-m p-b-10">
                                        <div className="size-204 flex-w flex-m respon6-next">
                                            <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                <button
                                                    className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                                    type="button"
                                                    onClick={decreaseQuantity}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <i className="fs-16 zmdi zmdi-minus"></i>
                                                </button>

                                                <input
                                                    className="mtext-104 cl3 txt-center num-product"
                                                    type="number"
                                                    name="num-product"
                                                    min={1}
                                                    max={product.stock}
                                                    value={quantity}
                                                    onChange={(event) => {
                                                        const nextQuantity = Number(event.target.value);
                                                        if (!Number.isNaN(nextQuantity)) {
                                                            setQuantity(Math.min(product.stock, Math.max(1, nextQuantity)));
                                                        }
                                                    }}
                                                />

                                                <button
                                                    className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                                    type="button"
                                                    onClick={increaseQuantity}
                                                    aria-label="Increase quantity"
                                                >
                                                    <i className="fs-16 zmdi zmdi-plus"></i>
                                                </button>
                                            </div>

                                            <button
                                                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                                                type="button"
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                                    <div className="flex-m bor9 p-r-10 m-r-11">
                                        <button
                                            type="button"
                                            className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                                            data-tooltip="Add to Wishlist"
                                        >
                                            <i className="zmdi zmdi-favorite"></i>
                                        </button>
                                    </div>

                                    <a href="https://www.facebook.com"
                                       className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                       data-tooltip="Facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a>

                                    <a href="https://twitter.com"
                                       className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                       data-tooltip="Twitter">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bor10 m-t-50 p-t-43 p-b-40">
                        <div className="tab01">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item p-b-10">
                                    <button
                                        className={`nav-link product-detail-tab-button ${activeTab === 'description' ? 'active' : ''}`}
                                        type="button"
                                        onClick={() => setActiveTab('description')}
                                    >
                                        Description
                                    </button>
                                </li>

                                <li className="nav-item p-b-10">
                                    <button
                                        className={`nav-link product-detail-tab-button ${activeTab === 'information' ? 'active' : ''}`}
                                        type="button"
                                        onClick={() => setActiveTab('information')}
                                    >
                                        Additional information
                                    </button>
                                </li>

                                <li className="nav-item p-b-10">
                                    <button
                                        className={`nav-link product-detail-tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                                        type="button"
                                        onClick={() => setActiveTab('reviews')}
                                    >
                                        Reviews (1)
                                    </button>
                                </li>
                            </ul>

                            <div className="tab-content p-t-43">
                                {activeTab === 'description' && (
                                    <div className="tab-pane fade show active" role="tabpanel">
                                        <div className="how-pos2 p-lr-15-md">
                                            <p className="stext-102 cl6">{product.description}</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'information' && (
                                    <div className="tab-pane fade show active" role="tabpanel">
                                        <div className="row">
                                            <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                                <ul className="p-lr-28 p-lr-15-sm">
                                                    <li className="flex-w flex-t p-b-7">
                                                        <span className="stext-102 cl3 size-205">Club</span>
                                                        <span
                                                            className="stext-102 cl6 size-206">{product.teamName}</span>
                                                    </li>
                                                    <li className="flex-w flex-t p-b-7">
                                                        <span className="stext-102 cl3 size-205">Season</span>
                                                        <span className="stext-102 cl6 size-206">{product.season}</span>
                                                    </li>
                                                    <li className="flex-w flex-t p-b-7">
                                                        <span className="stext-102 cl3 size-205">Kit type</span>
                                                        <span
                                                            className="stext-102 cl6 size-206">{getJerseyTypeLabel(product.jerseyType)}</span>
                                                    </li>
                                                    <li className="flex-w flex-t p-b-7">
                                                        <span className="stext-102 cl3 size-205">Stock</span>
                                                        <span className="stext-102 cl6 size-206">{product.stock}</span>
                                                    </li>
                                                    <li className="flex-w flex-t p-b-7">
                                                        <span className="stext-102 cl3 size-205">Size</span>
                                                        <span
                                                            className="stext-102 cl6 size-206">{sizes.join(', ')}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="tab-pane fade show active" role="tabpanel">
                                        <div className="row">
                                            <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                                <div className="p-b-30 m-lr-15-sm">
                                                    <div className="flex-w flex-t p-b-68">
                                                        <div
                                                            className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                                                            <img src="/assets/images/avatar-01.jpg" alt="AVATAR"/>
                                                        </div>

                                                        <div className="size-207">
                                                            <div className="flex-w flex-sb-m p-b-17">
                                                                <span className="mtext-107 cl2 p-r-20">The Heathens Store</span>

                                                                <span className="fs-18 cl11">
                                  <i className="zmdi zmdi-star"></i>
                                  <i className="zmdi zmdi-star"></i>
                                  <i className="zmdi zmdi-star"></i>
                                  <i className="zmdi zmdi-star"></i>
                                  <i className="zmdi zmdi-star-half"></i>
                                </span>
                                                            </div>

                                                            <p className="stext-102 cl6">
                                                                Jersey form looks sharp, fabric feels light, and the
                                                                details are ready for match day.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <form className="w-full">
                                                        <h5 className="mtext-108 cl2 p-b-7">Add a review</h5>

                                                        <p className="stext-102 cl6">Your email address will not be
                                                            published.</p>

                                                        <div className="row p-b-25 p-t-20">
                                                            <div className="col-12 p-b-5">
                                                                <label className="stext-102 cl3" htmlFor="review">
                                                                    Your review
                                                                </label>
                                                                <textarea
                                                                    className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                                                    id="review" name="review"></textarea>
                                                            </div>

                                                            <div className="col-sm-6 p-b-5">
                                                                <label className="stext-102 cl3" htmlFor="name">
                                                                    Name
                                                                </label>
                                                                <input className="size-111 bor8 stext-102 cl2 p-lr-20"
                                                                       id="name" type="text" name="name"/>
                                                            </div>

                                                            <div className="col-sm-6 p-b-5">
                                                                <label className="stext-102 cl3" htmlFor="email">
                                                                    Email
                                                                </label>
                                                                <input className="size-111 bor8 stext-102 cl2 p-lr-20"
                                                                       id="email" type="email" name="email"/>
                                                            </div>
                                                        </div>

                                                        <button
                                                            className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10"
                                                            type="button">
                                                            Submit
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
                    <span className="stext-107 cl6 p-lr-25">SKU: {product.uuid.slice(0, 8).toUpperCase()}</span>

                    <span className="stext-107 cl6 p-lr-25">
            Categories: {product.teamName}, {getJerseyTypeLabel(product.jerseyType)}
          </span>
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="product-detail-related sec-relate-product bg0 p-t-45 p-b-105">
                    <div className="container">
                        <div className="p-b-45">
                            <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
                        </div>

                        <div className="row isotope-grid">
                            {relatedProducts.map((relatedProduct) => (
                                <HomeProductCard key={relatedProduct.uuid} product={relatedProduct}
                                                 onQuickView={() => undefined}/>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ProductDetail;
