import type {Favorite} from "../../../types/favorite.ts";
import {Link} from 'react-router-dom';

interface FavoritePanelProps {
    favorite: Favorite | null;
    isLoggedIn: boolean;
    isFavoriteOpen: boolean;
    setIsFavoriteOpen: (flag: boolean) => void;
}

const FavoritePanel: React.FC<FavoritePanelProps> = ({favorite, isLoggedIn, isFavoriteOpen, setIsFavoriteOpen}) => {
    const favoriteItems = favorite?.favoriteItems ?? [];
    const hasFavoriteItems = favoriteItems.length > 0;

    return (
        <div>
            <div className={`wrap-header-favorite js-panel-favorite ${isFavoriteOpen ? 'show-header-favorite' : ''}`}>
                <div className="s-full" onClick={() => setIsFavoriteOpen(false)}></div>
                <div className="header-favorite flex-col-l p-l-65 p-r-25">
                    <div className="header-favorite-title flex-w flex-sb-m p-b-8">
                        <span className="mtext-103 cl2">Your Favorite</span>
                        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04"
                             onClick={() => setIsFavoriteOpen(false)}>
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>

                    <div className="header-favorite-content flex-w js-pscroll">
                        {!isLoggedIn ? (
                            <div className="header-panel-empty w-full txt-center">
                                <i className="zmdi zmdi-favorite-outline"></i>
                                <p className="stext-102 cl6 p-t-15">Please log in to view your favorite items</p>
                            </div>
                        ) : hasFavoriteItems ? (
                            <ul className="header-favorite-wrapitem w-full">
                                {favoriteItems.map(item => (
                                    <li key={item.id} className="header-favorite-item flex-w flex-t m-b-12">
                                        <div className="header-favorite-item-img">
                                            <img src={item.productInfo.thumbnailUrl} alt="IMG"/>
                                        </div>

                                        <div className="header-favorite-item-txt p-t-8">
                                            <Link to={`/product-detail/${item.productInfo.uuid}`}
                                               onClick={() => setIsFavoriteOpen(false)}
                                               className="header-favorite-item-name m-b-18 hov-cl1 trans-04">
                                                {item.productInfo.name}
                                            </Link>
                                            <span className="header-favorite-item-info">
                                                price: {item.productInfo.price}$
                                            </span>
                                        </div>
                                    </li>))}
                            </ul>
                        ) : (
                            <div className="header-panel-empty w-full txt-center">
                                <i className="zmdi zmdi-favorite-outline"></i>
                                <p className="stext-102 cl6 p-t-15">Your favorite list is empty.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritePanel;
