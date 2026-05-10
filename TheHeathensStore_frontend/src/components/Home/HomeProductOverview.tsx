import HomeProductCard, { type HomeProduct } from './HomeProductCard';

const products: HomeProduct[] = [
  {
    id: 'product-01',
    categoryClass: 'women',
    image: '/assets/images/product-01.jpg',
    name: 'Esprit Ruffle Shirt',
    price: '$16.64',
    href: 'product-detail',
  },
  {
    id: 'product-02',
    categoryClass: 'women',
    image: '/assets/images/product-02.jpg',
    name: 'Herschel supply',
    price: '$35.31',
    href: 'product-detail',
  },
  {
    id: 'product-03',
    categoryClass: 'men',
    image: '/assets/images/product-03.jpg',
    name: 'Only Check Trouser',
    price: '$25.50',
    href: 'product-detail',
  },
  {
    id: 'product-04',
    categoryClass: 'women',
    image: '/assets/images/product-04.jpg',
    name: 'Classic Trench Coat',
    price: '$75.00',
    href: 'product-detail',
  },
  {
    id: 'product-05',
    categoryClass: 'women',
    image: '/assets/images/product-05.jpg',
    name: 'Front Pocket Jumper',
    price: '$34.75',
    href: 'product-detail',
  },
  {
    id: 'product-06',
    categoryClass: 'watches',
    image: '/assets/images/product-06.jpg',
    name: 'Vintage Inspired Classic',
    price: '$93.20',
    href: 'product-detail',
  },
  {
    id: 'product-07',
    categoryClass: 'women',
    image: '/assets/images/product-07.jpg',
    name: 'Shirt in Stretch Cotton',
    price: '$52.66',
    href: 'product-detail',
  },
  {
    id: 'product-08',
    categoryClass: 'women',
    image: '/assets/images/product-08.jpg',
    name: 'Pieces Metallic Printed',
    price: '$18.96',
    href: 'product-detail',
  },
  {
    id: 'product-09',
    categoryClass: 'shoes',
    image: '/assets/images/product-09.jpg',
    name: 'Converse All Star Hi Plimsolls',
    price: '$75.00',
    href: 'product-detail',
  },
  {
    id: 'product-10',
    categoryClass: 'women',
    image: '/assets/images/product-10.jpg',
    name: 'Femme T-Shirt In Stripe',
    price: '$25.85',
    href: 'product-detail',
  },
  {
    id: 'product-11',
    categoryClass: 'men',
    image: '/assets/images/product-11.jpg',
    name: 'Herschel supply',
    price: '$63.16',
    href: 'product-detail',
  },
  {
    id: 'product-12',
    categoryClass: 'men',
    image: '/assets/images/product-12.jpg',
    name: 'Herschel supply',
    price: '$63.15',
    href: 'product-detail',
  },
  {
    id: 'product-13',
    categoryClass: 'women',
    image: '/assets/images/product-13.jpg',
    name: 'T-Shirt with Sleeve',
    price: '$18.49',
    href: 'product-detail',
  },
  {
    id: 'product-14',
    categoryClass: 'women',
    image: '/assets/images/product-14.jpg',
    name: 'Pretty Little Thing',
    price: '$54.79',
    href: 'product-detail',
  },
  {
    id: 'product-15',
    categoryClass: 'watches',
    image: '/assets/images/product-15.jpg',
    name: 'Mini Silver Mesh Watch',
    price: '$86.85',
    href: 'product-detail',
  },
  {
    id: 'product-16',
    categoryClass: 'women',
    image: '/assets/images/product-16.jpg',
    name: 'Square Neck Back',
    price: '$29.64',
    href: 'product-detail',
  },
];

type HomeProductOverviewProps = {
  onQuickView: (product: HomeProduct) => void;
};

const HomeProductOverview = ({ onQuickView }: HomeProductOverviewProps) => {
  return (
    <section className="bg0 p-t-23 p-b-140">
      <div className="container">
        <div className="p-b-10">
          <h3 className="ltext-103 cl5">Product Overview</h3>
        </div>

        <div className="flex-w flex-sb-m p-b-52">
          <div className="flex-w flex-l-m filter-tope-group m-tb-10">
            <button
              className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
              data-filter="*"
              type="button"
            >
              All Products
            </button>

            <button
              className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
              data-filter=".women"
              type="button"
            >
              Women
            </button>

            <button
              className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
              data-filter=".men"
              type="button"
            >
              Men
            </button>

            <button
              className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
              data-filter=".bag"
              type="button"
            >
              Bag
            </button>

            <button
              className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
              data-filter=".shoes"
              type="button"
            >
              Shoes
            </button>

            <button
              className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
              data-filter=".watches"
              type="button"
            >
              Watches
            </button>
          </div>

          <div className="flex-w flex-c-m m-tb-10">
            <div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
              <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
              <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
              Filter
            </div>

            <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
              <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
              <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
              Search
            </div>
          </div>

          <div className="dis-none panel-search w-full p-t-10 p-b-15">
            <div className="bor8 dis-flex p-l-15">
              <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04" type="button">
                <i className="zmdi zmdi-search"></i>
              </button>

              <input
                className="mtext-107 cl2 size-114 plh2 p-r-15"
                type="text"
                name="search-product"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="dis-none panel-filter w-full p-t-10">
            <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
              <div className="filter-col1 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Sort By</div>

                <ul>
                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Default
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Popularity
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Average rating
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04 filter-link-active">
                      Newness
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Price: Low to High
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Price: High to Low
                    </a>
                  </li>
                </ul>
              </div>

              <div className="filter-col2 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Price</div>

                <ul>
                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04 filter-link-active">
                      All
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      $0.00 - $50.00
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      $50.00 - $100.00
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      $100.00 - $150.00
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      $150.00 - $200.00
                    </a>
                  </li>

                  <li className="p-b-6">
                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      $200.00+
                    </a>
                  </li>
                </ul>
              </div>

              <div className="filter-col3 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Color</div>

                <ul>
                  <li className="p-b-6">
                    <span className="fs-15 lh-12 m-r-6" style={{ color: '#222' }}>
                      <i className="zmdi zmdi-circle"></i>
                    </span>

                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Black
                    </a>
                  </li>

                  <li className="p-b-6">
                    <span className="fs-15 lh-12 m-r-6" style={{ color: '#4272d7' }}>
                      <i className="zmdi zmdi-circle"></i>
                    </span>

                    <a href="assets/#" className="filter-link stext-106 trans-04 filter-link-active">
                      Blue
                    </a>
                  </li>

                  <li className="p-b-6">
                    <span className="fs-15 lh-12 m-r-6" style={{ color: '#b3b3b3' }}>
                      <i className="zmdi zmdi-circle"></i>
                    </span>

                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Grey
                    </a>
                  </li>

                  <li className="p-b-6">
                    <span className="fs-15 lh-12 m-r-6" style={{ color: '#00ad5f' }}>
                      <i className="zmdi zmdi-circle"></i>
                    </span>

                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Green
                    </a>
                  </li>

                  <li className="p-b-6">
                    <span className="fs-15 lh-12 m-r-6" style={{ color: '#fa4251' }}>
                      <i className="zmdi zmdi-circle"></i>
                    </span>

                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      Red
                    </a>
                  </li>

                  <li className="p-b-6">
                    <span className="fs-15 lh-12 m-r-6" style={{ color: '#aaa' }}>
                      <i className="zmdi zmdi-circle-o"></i>
                    </span>

                    <a href="assets/#" className="filter-link stext-106 trans-04">
                      White
                    </a>
                  </li>
                </ul>
              </div>

              <div className="filter-col4 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Tags</div>

                <div className="flex-w p-t-4 m-r--5">
                  <a
                    href="assets/#"
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                  >
                    Fashion
                  </a>

                  <a
                    href="assets/#"
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                  >
                    Lifestyle
                  </a>

                  <a
                    href="assets/#"
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                  >
                    Denim
                  </a>

                  <a
                    href="assets/#"
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                  >
                    Streetstyle
                  </a>

                  <a
                    href="assets/#"
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                  >
                    Crafts
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row isotope-grid">
          {products.map((p) => (
            <HomeProductCard key={p.id} product={p} onQuickView={onQuickView} />
          ))}
        </div>

        <div className="flex-c-m flex-w w-full p-t-45">
          <a href="assets/#" className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
            Load More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeProductOverview;

