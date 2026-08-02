import type {Product} from "../../types/product.ts";
import type {MouseEvent} from 'react';
import { Link } from 'react-router-dom';
import './HomeProductCard.css';
import {NO_IMAGE_AVAILABLE_URL} from "../../util/constants.ts";
import type {CommerceState} from '../../hooks/useCommerceState.ts';

type Props = {
  product: Product;
  commerce: CommerceState;
  onQuickView?: (product: Product) => void;
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

const HomeProductCard = ({product, commerce, onQuickView}: Props) => {
  const productThumbnailUrl = product.thumbnail?.url.trim();
  const hasThumbnail = Boolean(productThumbnailUrl);
  const thumbnailUrl = productThumbnailUrl || NO_IMAGE_AVAILABLE_URL;
  const isFavorite = commerce.isFavorite(product.uuid);
  const isInCart = commerce.isInCart(product.uuid);
  const isFavoriteLoading = commerce.isFavoritePending(product.uuid);
  const isCartLoading = commerce.isCartPending(product.uuid);
  const isAuthenticationLoading = commerce.authStatus === 'loading';
  const isOutOfStock = product.stock <= 0;

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isAuthenticationLoading || isFavoriteLoading) {
      return;
    }

    void commerce.toggleFavorite(product.uuid);
  };

  const handleAddToCartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isAuthenticationLoading || isCartLoading || isOutOfStock) {
      return;
    }

    void commerce.addProductToCart(product.uuid);
  };

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

          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
            >
              Quick View
            </button>
          )}
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

          <div className="block2-txt-child2 product-card-actions flex-r p-t-3">
            <button
              type="button"
              className={`product-card-action${isFavorite ? ' is-active' : ''}${isFavoriteLoading ? ' is-pending' : ''}`}
              onClick={handleFavoriteClick}
              disabled={isAuthenticationLoading}
              aria-disabled={isAuthenticationLoading || isFavoriteLoading}
              aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
              aria-pressed={isFavorite}
              aria-busy={isFavoriteLoading}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <i
                className={`zmdi ${isFavorite ? 'zmdi-favorite' : 'zmdi-favorite-outline'}`}
                aria-hidden="true"
              ></i>
            </button>
            <button
              type="button"
              className={`product-card-action${isInCart ? ' is-in-cart' : ''}${isCartLoading ? ' is-pending' : ''}`}
              onClick={handleAddToCartClick}
              disabled={isAuthenticationLoading || isOutOfStock}
              aria-disabled={isAuthenticationLoading || isCartLoading || isOutOfStock}
              aria-label={isInCart ? `Add another ${product.name} to cart` : `Add ${product.name} to cart`}
              aria-busy={isCartLoading}
              title={isOutOfStock ? 'Out of stock' : isInCart ? 'In cart — add another' : 'Add to cart'}
            >
              <i
                className="zmdi zmdi-shopping-cart-plus"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
