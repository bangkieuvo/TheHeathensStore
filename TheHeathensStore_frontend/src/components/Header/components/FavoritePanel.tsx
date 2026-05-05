import type {Favorite} from "../../../types/favorite.ts";
import {useEffect, useState} from "react";
import {getFavoriteByUserUuid} from "../../../service/favoriteService.ts";

interface FavoritePanelProps {
    isFavoriteOpen: boolean;
    setIsFavoriteOpen: (flag: boolean) => void;
}

const FavoritePanel: React.FC<FavoritePanelProps> = ({isFavoriteOpen, setIsFavoriteOpen}) => {
    const [favorite, setFavorite] = useState<Favorite | null>(null);
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const userUuid = "019da99e-dd5e-7ba2-9b93-2534968811dc";
                const response = await getFavoriteByUserUuid(userUuid);
                setFavorite(response);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu giỏ hàng:", error);
            }
        };
        fetchCartData();
    }, [])
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
                    {/* ... List Items ... */}
                    <div className="header-favorite-content flex-w js-pscroll">
                        {favorite && (<ul className="header-favorite-wrapitem w-full">
                            {favorite.favoriteItems.map(item => (
                                <li key={item.id} className="header-favorite-item flex-w flex-t m-b-12">
                                    <div className="header-favorite-item-img">
                                        <img src={item.productInfo.thumbnailUrl} alt="IMG"/>
                                    </div>

                                    <div className="header-favorite-item-txt p-t-8">
                                        <a href="assets/#"
                                           className="header-favorite-item-name m-b-18 hov-cl1 trans-04">
                                            {item.productInfo.name}
                                        </a>
                                        <span
                                            className="header-favorite-item-info">price: {item.productInfo.price}$ </span>
                                    </div>
                                </li>))}

                        </ul>)}

                        {/*<div className="w-full">*/}
                        {/*    <div className="header-favorite-buttons flex-w w-full">*/}
                        {/*        <a href="assets/shoping-cart.html"*/}
                        {/*           className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">*/}
                        {/*            View Cart*/}
                        {/*        </a>*/}

                        {/*        <a href="assets/shoping-cart.html"*/}
                        {/*           className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">*/}
                        {/*            Check Out*/}
                        {/*        </a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritePanel;