type BannerItem = {
  image: string;
  name: string;
  info: string;
  href: string;
};

const items: BannerItem[] = [
  { image: '/assets/images/banner-01.jpg', name: 'Women', info: 'Spring 2018', href: 'product' },
  { image: '/assets/images/banner-02.jpg', name: 'Men', info: 'Spring 2018', href: 'product' },
  { image: '/assets/images/banner-03.jpg', name: 'Accessories', info: 'New Trend', href: 'product' },
];

const HomeBanner = () => {
  return (
    <div className="sec-banner bg0 p-t-80 p-b-50">
      <div className="container">
        <div className="row">
          {items.map((item) => (
            <div key={item.name} className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src={item.image} alt="IMG-BANNER" />

                <a
                  href={item.href}
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      {item.name}
                    </span>

                    <span className="block1-info stext-102 trans-04">{item.info}</span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">Shop Now</div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

