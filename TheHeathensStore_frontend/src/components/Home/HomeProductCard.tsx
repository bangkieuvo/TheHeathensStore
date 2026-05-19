import type {Product} from "../../types/product.ts";
import { Link } from 'react-router-dom';
import './HomeProductCard.css';

type Props = {
  product: Product;
  onQuickView: (product: Product) => void;
};

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

const HomeProductCard = ({ product, onQuickView }: Props) => {
  const thumbnail = product.thumbnail;
  const hasThumbnail = thumbnail !== null;
  const thumbnailUrl = hasThumbnail
    ? thumbnail.url
    : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg?w=768';

  return (
    <div
      className={`home-product-card col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.jerseyType} ${product.teamName.replace(/\s+/g, '-').toLowerCase()} ${product.season.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="block2">
        <div className="block2-pic hov-img0">
          <img
            className={hasThumbnail ? 'home-product-image home-product-image--actual' : 'home-product-image home-product-image--placeholder'}
            src={thumbnailUrl}
            alt={product.name}
          />

          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
          >
            Quick View
          </button>
        </div>

        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l ">
            <Link
              to={`/product-detail/${product.uuid}`}
              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
            >
              {product.name}
            </Link>

            <span className="stext-105 cl3">{formatPrice(product.price)}</span>
            <span className="stext-111 cl6 p-t-4">
              {product.teamName} / {product.season} / {getJerseyTypeLabel(product.jerseyType)}
            </span>
          </div>

          <div className="block2-txt-child2 flex-r p-t-3">
            <a
              href="assets/#"
              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
            >
              <img
                className="icon-heart1 dis-block trans-04"
                src="/assets/images/icons/icon-heart-01.png"
                alt="ICON"
              />
              <img
                className="icon-heart2 dis-block trans-04 ab-t-l"
                src="/assets/images/icons/icon-heart-02.png"
                alt="ICON"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
