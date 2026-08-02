import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import HomeProductCard from './HomeProductCard';
import type {Product} from "../../types/product.ts";
import {getShopProducts} from '../../service/shopService.ts';
import type {CommerceState} from '../../hooks/useCommerceState.ts';

type HomeProductOverviewProps = {
    onQuickView: (product: Product) => void;
    commerce: CommerceState;
};

const HomeProductOverview = ({onQuickView, commerce}: HomeProductOverviewProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [featuredSort, setFeaturedSort] = useState<'newest' | 'best_selling'>('newest');

    useEffect(() => {
        let isMounted = true;

        const fetchFeatureProducts = async () => {
            try {
                const featureProducts = (await getShopProducts({page: 1, size: 8, sort: featuredSort})).content;

                if (isMounted) {
                    setProducts(featureProducts);
                    setErrorMessage('');
                }
            } catch (error) {
                console.error('Failed to fetch feature products:', error);

                if (isMounted) {
                    setProducts([]);
                    setErrorMessage('Unable to load featured products.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchFeatureProducts();

        return () => {
            isMounted = false;
        };
    }, [featuredSort]);

    const featuredProducts = products.slice(0, 8);

    return (
        <section className="bg0 p-t-23 p-b-140">
            <div className="container">
                <div className="p-b-10">
                    <h3 className="ltext-103 cl5">Featured Products</h3>
                </div>

                <div className="flex-w p-b-30">
                    <button type="button" className={`stext-106 cl6 bor3 trans-04 m-r-32 ${featuredSort === 'newest' ? 'how-active1' : ''}`} onClick={() => setFeaturedSort('newest')}>Newest</button>
                    <button type="button" className={`stext-106 cl6 bor3 trans-04 ${featuredSort === 'best_selling' ? 'how-active1' : ''}`} onClick={() => setFeaturedSort('best_selling')}>Best selling</button>
                </div>

                <div className="row isotope-grid">
                    {featuredProducts.map((p) => (
                        <HomeProductCard key={p.uuid} product={p} commerce={commerce} onQuickView={onQuickView}/>
                    ))}
                </div>

                {isLoading && (
                    <div className="txt-center stext-102 cl6 p-t-20">
                        Loading products...
                    </div>
                )}

                {!isLoading && errorMessage && (
                    <div className="txt-center stext-102 cl6 p-t-20">
                        {errorMessage}
                    </div>
                )}

                {!isLoading && !errorMessage && featuredProducts.length === 0 && (
                    <div className="txt-center stext-102 cl6 p-t-20">
                        No featured products available.
                    </div>
                )}

                <div className="flex-c-m p-t-40">
                    <Link
                        to="/shop"
                        className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                        View Full Shop
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeProductOverview;

