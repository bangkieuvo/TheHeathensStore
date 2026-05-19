import { useState } from 'react';
import HomeBanner from '../components/Home/HomeBanner';
import HomeProductOverview from '../components/Home/HomeProductOverview';
import ModalQuickView from '../components/common/ModalQuickView';
import type { Product } from '../types/product';

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <HomeBanner />
      <HomeProductOverview onQuickView={setQuickViewProduct} />
      <ModalQuickView
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};

export default Home;

