import { useState } from 'react';
import HomeBackToTop from '../components/Home/HomeBackToTop';
import HomeBanner from '../components/Home/HomeBanner';
import HomeProductOverview from '../components/Home/HomeProductOverview';
import HomeQuickViewModal from '../components/Home/HomeQuickViewModal';
import type { HomeProduct } from '../components/Home/HomeProductCard';

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<HomeProduct | null>(null);

  return (
    <>
      <HomeBanner />
      <HomeProductOverview onQuickView={setQuickViewProduct} />
      <HomeBackToTop />
      <HomeQuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};

export default Home;

