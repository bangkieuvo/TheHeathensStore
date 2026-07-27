import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import HomeProductCard from './HomeProductCard';
import type {Product} from "../../types/product.ts";
import {getFeatureProduct} from "../../service/homeService.ts";

type HomeProductOverviewProps = {
    onQuickView: (product: Product) => void;
};

const HomeProductOverview = ({onQuickView}: HomeProductOverviewProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchFeatureProducts = async () => {
            try {
                const featureProducts = await getFeatureProduct();

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
    }, []);

    const featuredProducts = products.slice(0, 8);

    return (
        <section className="bg0 p-t-23 p-b-140">
            <div className="container">
                <div className="p-b-10">
                    <h3 className="ltext-103 cl5">Product Overview</h3>
                </div>

                <div className="row isotope-grid">
                    {featuredProducts.map((p) => (
                        <HomeProductCard key={p.uuid} product={p} onQuickView={onQuickView}/>
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

