
import {type FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import closeIcon from "../../../assets/images/icons/icon-close2.png";
import {getProductSuggestions} from '../../../service/shopService.ts';
import type {Product} from '../../../types/product.ts';
interface ModalSearchProps{
    isSearchOpen: boolean;
    setIsSearchOpen: (flag: boolean) => void;
};
const ModalSearch:React.FC<ModalSearchProps> = ({isSearchOpen,setIsSearchOpen}) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);

    useEffect(() => {
        if (!isSearchOpen || !keyword.trim()) {
            return;
        }
        const timeoutId = window.setTimeout(async () => {
            try {
                setSuggestions(await getProductSuggestions(keyword));
            } catch {
                setSuggestions([]);
            }
        }, 250);
        return () => window.clearTimeout(timeoutId);
    }, [isSearchOpen, keyword]);

    const submitSearch = (event: FormEvent) => {
        event.preventDefault();
        const normalizedKeyword = keyword.trim();
        if (!normalizedKeyword) return;
        navigate(`/shop?keyword=${encodeURIComponent(normalizedKeyword)}`);
        setIsSearchOpen(false);
    };

    return (
        <>
            <div className={`modal-search-header flex-c-m trans-04 ${isSearchOpen ? 'show-modal-search' : ''}`}>
                <div className="container-search-header">
                    <button className="flex-c-m btn-hide-modal-search trans-04" onClick={() => setIsSearchOpen(false)}>
                        <img src={closeIcon} alt="CLOSE"/>
                    </button>
                    <form className="wrap-search-header flex-w p-l-15" onSubmit={submitSearch}>
                        <button className="flex-c-m trans-04"><i className="zmdi zmdi-search"></i></button>
                        <input className="plh3" type="search" name="search" placeholder="Search products..."
                               autoComplete="off" value={keyword}
                               onChange={(event) => setKeyword(event.target.value)}/>
                    </form>
                    {keyword.trim() && suggestions.length > 0 && (
                        <div className="search-suggestions">
                            {suggestions.map((product) => (
                                <Link key={product.uuid} to={`/product-detail/${product.uuid}`}
                                      className="search-suggestion-item"
                                      onClick={() => setIsSearchOpen(false)}>
                                    <img src={product.thumbnail?.url} alt=""/>
                                    <span><strong>{product.name}</strong><small>{product.teamName} · ${product.price}</small></span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ModalSearch;
