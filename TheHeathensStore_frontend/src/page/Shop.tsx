import {useEffect, useMemo, useState} from 'react';
import HomeProductCard from '../components/Home/HomeProductCard';
import ModalQuickView from '../components/common/ModalQuickView';
import {getShopProducts} from '../service/shopService';
import type {Product} from '../types/product';

type SortOption = 'default' | 'newest' | 'price-asc' | 'price-desc';

const getJerseyTypeLabel = (jerseyType: string) =>
    jerseyType
        .split('_')
        .map((word) => word.toUpperCase())
        .join(' ');

const sortOptions: { value: SortOption; label: string }[] = [
    {value: 'default', label: 'Default'},
    {value: 'newest', label: 'Newest season'},
    {value: 'price-asc', label: 'Price: Low to High'},
    {value: 'price-desc', label: 'Price: High to Low'},
];

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageInput, setPageInput] = useState('1');
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [activeTeam, setActiveTeam] = useState('All');
    const [activeSeason, setActiveSeason] = useState('All');
    const [activeJerseyType, setActiveJerseyType] = useState('All');
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            setIsLoading(true);

            try {
                const productPage = await getShopProducts(pageNumber);

                if (isMounted) {
                    setProducts(productPage.content);
                    setTotalPages(productPage.page.totalPages);
                    setTotalElements(productPage.page.totalElements);
                    setErrorMessage('');
                }
            } catch (error) {
                console.error('Failed to fetch shop products:', error);

                if (isMounted) {
                    setProducts([]);
                    setTotalPages(1);
                    setTotalElements(0);
                    setErrorMessage('Unable to load shop products.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, [pageNumber]);

    const teams = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.teamName)))], [products]);
    const seasons = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.season))).sort().reverse()], [products]);
    const jerseyTypes = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.jerseyType)))], [products]);

    const filteredProducts = useMemo(() => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        return products
            .filter((product) => activeTeam === 'All' || product.teamName === activeTeam)
            .filter((product) => activeSeason === 'All' || product.season === activeSeason)
            .filter((product) => activeJerseyType === 'All' || product.jerseyType === activeJerseyType)
            .filter((product) => {
                if (!normalizedSearchTerm) {
                    return true;
                }

                return [product.name, product.teamName, product.season, product.jerseyType, product.description]
                    .join(' ')
                    .toLowerCase()
                    .includes(normalizedSearchTerm);
            })
            .sort((firstProduct, secondProduct) => {
                if (sortBy === 'newest') {
                    return secondProduct.season.localeCompare(firstProduct.season);
                }

                if (sortBy === 'price-asc') {
                    return firstProduct.price - secondProduct.price;
                }

                if (sortBy === 'price-desc') {
                    return secondProduct.price - firstProduct.price;
                }

                return 0;
            });
    }, [activeJerseyType, activeSeason, activeTeam, products, searchTerm, sortBy]);

    const pageCount = Math.max(1, totalPages);
    const isPreviousDisabled = pageNumber <= 1;
    const isNextDisabled = pageNumber >= pageCount;

    useEffect(() => {
        setPageInput(String(pageNumber));
    }, [pageNumber]);

    const resetFilters = () => {
        setActiveTeam('All');
        setActiveSeason('All');
        setActiveJerseyType('All');
        setSortBy('default');
        setSearchTerm('');
    };

    const commitPageInput = () => {
        const requestedPage = Number(pageInput);

        if (!Number.isInteger(requestedPage)) {
            setPageInput(String(pageNumber));
            return;
        }

        const nextPage = Math.min(Math.max(requestedPage, 1), pageCount);
        setPageNumber(nextPage);
        setPageInput(String(nextPage));
    };

    return (
        <>
            <section className="bg0 p-t-75 p-b-140">
                <div className="container">
                    <div className="p-b-10">
                        <h3 className="ltext-103 cl5">Shop</h3>
                    </div>

                    <div className="flex-w flex-sb-m p-b-52">
                        <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                            {teams.map((team) => (
                                <button
                                    key={team}
                                    className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${activeTeam === team ? 'how-active1' : ''}`}
                                    type="button"
                                    onClick={() => setActiveTeam(team)}
                                >
                                    {team === 'All' ? 'All Products' : team}
                                </button>
                            ))}
                        </div>

                        <div className="flex-w flex-c-m m-tb-10">
                            <button
                                className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter"
                                type="button"
                                onClick={() => setIsFilterOpen((current) => !current)}
                            >
                                <i className={`icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list ${isFilterOpen ? 'dis-none' : ''}`}></i>
                                <i className={`icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close ${isFilterOpen ? '' : 'dis-none'}`}></i>
                                Filter
                            </button>

                            <button
                                className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search"
                                type="button"
                                onClick={() => setIsSearchOpen((current) => !current)}
                            >
                                <i className={`icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search ${isSearchOpen ? 'dis-none' : ''}`}></i>
                                <i className={`icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close ${isSearchOpen ? '' : 'dis-none'}`}></i>
                                Search
                            </button>
                        </div>

                        <div className={`${isSearchOpen ? '' : 'dis-none'} panel-search w-full p-t-10 p-b-15`}>
                            <div className="bor8 dis-flex p-l-15">
                                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04" type="button">
                                    <i className="zmdi zmdi-search"></i>
                                </button>

                                <input
                                    className="mtext-107 cl2 size-114 plh2 p-r-15"
                                    type="text"
                                    name="search-product"
                                    placeholder="Search by club, season, kit type"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className={`${isFilterOpen ? '' : 'dis-none'} panel-filter w-full p-t-10`}>
                            <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                                <div className="filter-col1 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Sort By</div>

                                    <ul>
                                        {sortOptions.map((option) => (
                                            <li key={option.value} className="p-b-6">
                                                <button
                                                    type="button"
                                                    className={`filter-link stext-106 trans-04 ${sortBy === option.value ? 'filter-link-active' : ''}`}
                                                    onClick={() => setSortBy(option.value)}
                                                >
                                                    {option.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Season</div>

                                    <ul>
                                        {seasons.map((season) => (
                                            <li key={season} className="p-b-6">
                                                <button
                                                    type="button"
                                                    className={`filter-link stext-106 trans-04 ${activeSeason === season ? 'filter-link-active' : ''}`}
                                                    onClick={() => setActiveSeason(season)}
                                                >
                                                    {season}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="filter-col3 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Kit Type</div>

                                    <ul>
                                        {jerseyTypes.map((jerseyType) => (
                                            <li key={jerseyType} className="p-b-6">
                                                <button
                                                    type="button"
                                                    className={`filter-link stext-106 trans-04 ${activeJerseyType === jerseyType ? 'filter-link-active' : ''}`}
                                                    onClick={() => setActiveJerseyType(jerseyType)}
                                                >
                                                    {jerseyType === 'All' ? 'All' : getJerseyTypeLabel(jerseyType)}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="filter-col4 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Summary</div>

                                    <div className="flex-w p-t-4 m-r--5">
                                        <span className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 m-r-5 m-b-5">
                                            {filteredProducts.length} items
                                        </span>
                                        <span className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 m-r-5 m-b-5">
                                            {teams.length - 1} clubs
                                        </span>
                                        <button
                                            type="button"
                                            className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                                            onClick={resetFilters}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row isotope-grid">
                        {filteredProducts.map((product) => (
                            <HomeProductCard key={product.uuid} product={product} onQuickView={setQuickViewProduct}/>
                        ))}
                    </div>

                    {isLoading && (
                        <div className="txt-center stext-102 cl6 p-t-20">
                            Loading products...
                        </div>
                    )}

                    {!isLoading && errorMessage && (
                        <div className="txt-center stext-102 cl6 p-t-20">
                            {errorMessage}
                        </div>
                    )}

                    {!isLoading && !errorMessage && filteredProducts.length === 0 && (
                        <div className="txt-center stext-102 cl6 p-t-20">
                            No products match your filters.
                        </div>
                    )}

                    {!isLoading && !errorMessage && totalElements > 0 && (
                        <div className="flex-c-m p-t-40">
                            <button
                                type="button"
                                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn2 p-lr-15 trans-04 m-r-8"
                                disabled={isPreviousDisabled}
                                style={{
                                    opacity: isPreviousDisabled ? 0.45 : 1,
                                    cursor: isPreviousDisabled ? 'not-allowed' : 'pointer',
                                }}
                                onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
                            >
                                Previous
                            </button>
                            <span className="stext-102 cl6 p-lr-15 flex-c-m">
                                <input
                                    className="stext-102 cl6 txt-center bor8"
                                    type="number"
                                    min={1}
                                    max={pageCount}
                                    value={pageInput}
                                    aria-label="Current page"
                                    style={{width: '54px', height: '36px'}}
                                    onChange={(event) => setPageInput(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            commitPageInput();
                                        }
                                    }}
                                />
                                <span className="p-lr-8">/</span>
                                <span>{pageCount}</span>
                            </span>
                            <button
                                type="button"
                                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn2 p-lr-15 trans-04 m-l-8"
                                onClick={commitPageInput}
                            >
                                Go
                            </button>
                            <button
                                type="button"
                                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn2 p-lr-15 trans-04 m-l-8"
                                disabled={isNextDisabled}
                                style={{
                                    opacity: isNextDisabled ? 0.45 : 1,
                                    cursor: isNextDisabled ? 'not-allowed' : 'pointer',
                                }}
                                onClick={() => setPageNumber((current) => Math.min(pageCount, current + 1))}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <ModalQuickView
                product={quickViewProduct}
                isOpen={quickViewProduct !== null}
                onClose={() => setQuickViewProduct(null)}
            />
        </>
    );
};

export default Shop;
