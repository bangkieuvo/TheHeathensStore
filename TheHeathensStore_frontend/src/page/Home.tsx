import { useState } from 'react';
import HomeProductOverview from '../components/Home/HomeProductOverview';
import ModalQuickView from '../components/common/ModalQuickView';
import type { Product } from '../types/product';
import {useOutletContext} from 'react-router-dom';
import type {CommerceState} from '../hooks/useCommerceState.ts';
import HomeHero from '../components/Home/HomeHero.tsx';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

const Home = () => {
  usePageMetadata('Football jerseys and club shirts', 'Shop football jerseys by club, season and kit type at The Heathens Store.');
  const commerce = useOutletContext<CommerceState>();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <HomeHero/>
      <HomeProductOverview onQuickView={setQuickViewProduct} commerce={commerce} />
      <ModalQuickView
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};

export default Home;

