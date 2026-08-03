import {Link} from 'react-router-dom';
import type {Favorite} from '../../../types/favorite.ts';
import {NO_IMAGE_AVAILABLE_URL} from '../../../util/constants.ts';
import QuickPanelShell from './QuickPanelShell.tsx';

interface FavoritePanelProps {
    favorite: Favorite | null;
    isLoggedIn: boolean;
    isFavoriteOpen: boolean;
    setIsFavoriteOpen: (flag: boolean) => void;
    removeItem: (productUuid: string) => Promise<void>;
    isItemPending: (productUuid: string) => boolean;
}

const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(price);

const FavoritePanel = ({
    favorite,
    isLoggedIn,
    isFavoriteOpen,
    setIsFavoriteOpen,
    removeItem,
    isItemPending,
}: FavoritePanelProps) => {
    const favoriteItems = favorite?.favoriteItems ?? [];
    const closePanel = () => setIsFavoriteOpen(false);
    const footer = isLoggedIn && favoriteItems.length > 0 ? (
        <Link to="/my-account" className="header-quick-panel-primary" onClick={closePanel}>View saved items</Link>
    ) : undefined;

    return (
        <QuickPanelShell
            isOpen={isFavoriteOpen}
            title="Favorites"
            count={favoriteItems.length}
            iconClassName="zmdi zmdi-favorite-outline"
            onClose={closePanel}
            footer={footer}
        >
            {!isLoggedIn ? (
                <div className="header-quick-panel-empty">
                    <i className="zmdi zmdi-favorite-outline" aria-hidden="true"/>
                    <h3>Sign in to view favorites</h3>
                    <p>Keep the jerseys you love in one place.</p>
                    <Link to="/login" onClick={closePanel}>Sign in</Link>
                </div>
            ) : favoriteItems.length > 0 ? (
                <ul className="header-quick-panel-list">
                    {favoriteItems.map((item) => (
                        <li key={item.id} aria-busy={isItemPending(item.productInfo.uuid)}>
                            <Link className="header-quick-panel-image" to={`/product-detail/${item.productInfo.uuid}`} onClick={closePanel}>
                                <img src={item.productInfo.thumbnailUrl || NO_IMAGE_AVAILABLE_URL} alt={item.productInfo.name}/>
                            </Link>
                            <div className="header-quick-panel-item-copy">
                                <Link to={`/product-detail/${item.productInfo.uuid}`} onClick={closePanel}>{item.productInfo.name}</Link>
                                <span>{item.productInfo.teamName} · {item.productInfo.season}</span>
                                <strong className="header-quick-panel-price">{formatPrice(item.productInfo.price)}</strong>
                            </div>
                            <button
                                type="button"
                                className="header-quick-panel-remove"
                                onClick={() => void removeItem(item.productInfo.uuid).catch(() => undefined)}
                                disabled={isItemPending(item.productInfo.uuid)}
                                aria-label={`Remove ${item.productInfo.name} from favorites`}
                            >
                                {isItemPending(item.productInfo.uuid) ? (
                                    <span className="header-quick-panel-spinner" aria-hidden="true"/>
                                ) : (
                                    <i className="zmdi zmdi-delete" aria-hidden="true"/>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="header-quick-panel-empty">
                    <i className="zmdi zmdi-favorite-outline" aria-hidden="true"/>
                    <h3>No favorites yet</h3>
                    <p>Tap the heart on a product to save it.</p>
                    <Link to="/shop" onClick={closePanel}>Browse shop</Link>
                </div>
            )}
        </QuickPanelShell>
    );
};

export default FavoritePanel;
