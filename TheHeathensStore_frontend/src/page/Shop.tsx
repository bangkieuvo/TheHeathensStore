import {useEffect, useMemo, useState} from 'react';
import {useOutletContext, useSearchParams} from 'react-router-dom';
import HomeProductCard from '../components/Home/HomeProductCard';
import ModalQuickView from '../components/common/ModalQuickView';
import {getShopProducts} from '../service/shopService';
import type {Product} from '../types/product';
import type {CommerceState} from '../hooks/useCommerceState.ts';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

type SortOption = 'newest' | 'best_selling' | 'price_asc' | 'price_desc' | 'name_asc';
type PaginationItem = number | 'ellipsis-left' | 'ellipsis-right';

const createPageRange = (start: number, end: number) =>
    Array.from({length: end - start + 1}, (_, index) => start + index);

const getPaginationItems = (currentPage: number, pageCount: number): PaginationItem[] => {
    if (pageCount <= 7) {
        return createPageRange(1, pageCount);
    }

    if (currentPage <= 3) {
        return [
            ...createPageRange(1, currentPage + 2),
            'ellipsis-right',
            pageCount,
        ];
    }

    if (currentPage >= pageCount - 2) {
        return [
            1,
            'ellipsis-left',
            ...createPageRange(currentPage - 2, pageCount),
        ];
    }

    return [
        1,
        'ellipsis-left',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        'ellipsis-right',
        pageCount,
    ];
};

const getJerseyTypeLabel = (jerseyType: string) =>
    jerseyType
        .split('_')
        .map((word) => word.toUpperCase())
        .join(' ');

const sortOptions: { value: SortOption; label: string }[] = [
    {value: 'newest', label: 'Newest'},
    {value: 'best_selling', label: 'Best selling'},
    {value: 'price_asc', label: 'Price: Low to High'},
    {value: 'price_desc', label: 'Price: High to Low'},
    {value: 'name_asc', label: 'Name: A-Z'},
];

const Shop = () => {
    usePageMetadata('Shop football jerseys', 'Search and filter football jerseys by club, league, season, shirt type and price.');
    const commerce = useOutletContext<CommerceState>();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const parsedPage = Number(pageParam);
    const pageNumber = pageParam !== null && Number.isInteger(parsedPage) && parsedPage >= 1
        ? parsedPage
        : 1;
    const [products, setProducts] = useState<Product[]>([]);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [pageInput, setPageInput] = useState('1');
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [activeTeam, setActiveTeam] = useState(searchParams.get('teamName') || 'All');
    const [activeLeague, setActiveLeague] = useState(searchParams.get('leagueName') || 'All');
    const [activeSeason, setActiveSeason] = useState(searchParams.get('seasonName') || 'All');
    const [activeJerseyType, setActiveJerseyType] = useState(searchParams.get('jerseyType') || 'All');
    const [sortBy, setSortBy] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'newest');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('keyword') || '');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isPageJumpOpen, setIsPageJumpOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            setIsLoading(true);

            try {
                const productPage = await getShopProducts({
                    page: pageNumber,
                    keyword: searchTerm.trim() || undefined,
                    teamName: activeTeam === 'All' ? undefined : activeTeam,
                    leagueName: activeLeague === 'All' ? undefined : activeLeague,
                    seasonName: activeSeason === 'All' ? undefined : activeSeason,
                    jerseyType: activeJerseyType === 'All' ? undefined : activeJerseyType,
                    minPrice: minPrice === '' ? undefined : Number(minPrice),
                    maxPrice: maxPrice === '' ? undefined : Number(maxPrice),
                    sort: sortBy,
                });

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
    }, [activeJerseyType, activeLeague, activeSeason, activeTeam, maxPrice, minPrice, pageNumber, searchTerm, sortBy]);

    useEffect(() => {
        const incomingKeyword = searchParams.get('keyword') || '';
        if (incomingKeyword !== searchTerm) setSearchTerm(incomingKeyword);
    }, [searchParams, searchTerm]);

    const teams = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.teamName)))], [products]);
    const leagues = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.leagueName).filter((league): league is string => Boolean(league))))], [products]);
    const seasons = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.season))).sort().reverse()], [products]);
    const jerseyTypes = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.jerseyType)))], [products]);

    const filteredProducts = products;

    const pageCount = Math.max(1, totalPages);
    const isPreviousDisabled = pageNumber <= 1;
    const isNextDisabled = pageNumber >= pageCount;
    const paginationItems = useMemo(
        () => getPaginationItems(pageNumber, pageCount),
        [pageCount, pageNumber],
    );

    useEffect(() => {
        setPageInput(String(pageNumber));
        setIsPageJumpOpen(false);
    }, [pageNumber]);

    useEffect(() => {
        if (pageParam === null || pageParam === String(pageNumber)) {
            return;
        }

        const nextSearchParams = new URLSearchParams(searchParams);
        if (pageNumber === 1) {
            nextSearchParams.delete('page');
        } else {
            nextSearchParams.set('page', String(pageNumber));
        }
        setSearchParams(nextSearchParams, {replace: true});
    }, [pageNumber, pageParam, searchParams, setSearchParams]);

    const navigateToPage = (nextPage: number) => {
        const normalizedPage = Math.min(Math.max(nextPage, 1), pageCount);
        const nextSearchParams = new URLSearchParams(searchParams);

        if (normalizedPage === 1) {
            nextSearchParams.delete('page');
        } else {
            nextSearchParams.set('page', String(normalizedPage));
        }

        setSearchParams(nextSearchParams);
    };

    const resetFilters = () => {
        setActiveTeam('All');
        setActiveLeague('All');
        setActiveSeason('All');
        setActiveJerseyType('All');
        setSortBy('newest');
        setSearchTerm('');
        setMinPrice('');
        setMaxPrice('');
        setSearchParams({});
    };

    const updateFilterParam = (param: string, value: string) => {
        const nextSearchParams = new URLSearchParams(searchParams);
        if (!value || value === 'All' || (param === 'sort' && value === 'newest')) {
            nextSearchParams.delete(param);
        } else {
            nextSearchParams.set(param, value);
        }
        nextSearchParams.delete('page');
        setSearchParams(nextSearchParams);
    };

    const selectFilter = (setter: (value: string) => void, value: string, param: string) => {
        setter(value);
        updateFilterParam(param, value);
    };

    const commitPageInput = () => {
        const requestedPage = Number(pageInput);

        if (!Number.isInteger(requestedPage)) {
            setPageInput(String(pageNumber));
            return;
        }

        const nextPage = Math.min(Math.max(requestedPage, 1), pageCount);
        navigateToPage(nextPage);
        setPageInput(String(nextPage));
        setIsPageJumpOpen(false);
    };

    const adjustPageInput = (amount: number) => {
        const requestedPage = Number(pageInput);
        const currentInput = Number.isInteger(requestedPage) ? requestedPage : pageNumber;
        const nextInput = Math.min(Math.max(currentInput + amount, 1), pageCount);
        setPageInput(String(nextInput));
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
                                    onClick={() => selectFilter(setActiveTeam, team, 'teamName')}
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
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        const nextSearchParams = new URLSearchParams(searchParams);
                                        if (value.trim()) {
                                            nextSearchParams.set('keyword', value);
                                        } else {
                                            nextSearchParams.delete('keyword');
                                        }
                                        nextSearchParams.delete('page');
                                        setSearchTerm(value);
                                        setSearchParams(nextSearchParams);
                                    }}
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
                                                    onClick={() => {
                                                        setSortBy(option.value);
                                                        updateFilterParam('sort', option.value);
                                                    }}
                                                >
                                                    {option.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">League</div>

                                    <ul className="p-b-20">
                                        {leagues.map((league) => (
                                            <li key={league} className="p-b-6">
                                                <button
                                                    type="button"
                                                    className={`filter-link stext-106 trans-04 ${activeLeague === league ? 'filter-link-active' : ''}`}
                                                    onClick={() => selectFilter(setActiveLeague, league, 'leagueName')}
                                                >
                                                    {league}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mtext-102 cl2 p-b-15">Season</div>

                                    <ul>
                                        {seasons.map((season) => (
                                            <li key={season} className="p-b-6">
                                                <button
                                                    type="button"
                                                    className={`filter-link stext-106 trans-04 ${activeSeason === season ? 'filter-link-active' : ''}`}
                                                    onClick={() => selectFilter(setActiveSeason, season, 'seasonName')}
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
                                                    onClick={() => selectFilter(setActiveJerseyType, jerseyType, 'jerseyType')}
                                                >
                                                    {jerseyType === 'All' ? 'All' : getJerseyTypeLabel(jerseyType)}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="filter-col4 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">Price range</div>

                                    <div className="p-b-10">
                                        <input className="bor8 stext-106 cl2 p-lr-10" type="number" min="0"
                                               placeholder="Minimum" value={minPrice}
                                               onChange={(event) => {
                                                   setMinPrice(event.target.value);
                                                   updateFilterParam('minPrice', event.target.value);
                                               }}/>
                                    </div>
                                    <div className="p-b-15">
                                        <input className="bor8 stext-106 cl2 p-lr-10" type="number" min="0"
                                               placeholder="Maximum" value={maxPrice}
                                               onChange={(event) => {
                                                   setMaxPrice(event.target.value);
                                                   updateFilterParam('maxPrice', event.target.value);
                                               }}/>
                                    </div>

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
                            <HomeProductCard
                                key={product.uuid}
                                product={product}
                                commerce={commerce}
                                onQuickView={setQuickViewProduct}
                            />
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
                        <div className="shop-pagination-section p-t-40">
                            <div className="shop-pagination-container">
                                <nav className="shop-pagination" aria-label="Phân trang sản phẩm">
                                    <button
                                        type="button"
                                        className="shop-pagination-button shop-pagination-direction"
                                        disabled={isPreviousDisabled}
                                        onClick={() => navigateToPage(pageNumber - 1)}
                                    >
                                        <span aria-hidden="true">‹</span> Trước
                                    </button>

                                    {paginationItems.map((item) => {
                                        if (typeof item === 'number') {
                                            const isCurrentPage = item === pageNumber;
                                            return (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    className={`shop-pagination-button shop-pagination-page ${isCurrentPage ? 'is-active' : ''}`}
                                                    aria-label={`Trang ${item}`}
                                                    aria-current={isCurrentPage ? 'page' : undefined}
                                                    onClick={() => navigateToPage(item)}
                                                >
                                                    {item}
                                                </button>
                                            );
                                        }

                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                className="shop-pagination-button shop-pagination-ellipsis"
                                                aria-label="Đi đến trang"
                                                aria-expanded={isPageJumpOpen}
                                                onClick={() => setIsPageJumpOpen((current) => !current)}
                                            >
                                                …
                                            </button>
                                        );
                                    })}

                                    <button
                                        type="button"
                                        className="shop-pagination-button shop-pagination-direction"
                                        disabled={isNextDisabled}
                                        onClick={() => navigateToPage(pageNumber + 1)}
                                    >
                                        Tiếp <span aria-hidden="true">›</span>
                                    </button>
                                </nav>

                                {isPageJumpOpen && (
                                    <div className="shop-pagination-jump" role="dialog" aria-label="Đi đến trang">
                                        <div className="shop-pagination-jump-header">
                                            <span>Đi đến trang...</span>
                                            <button
                                                type="button"
                                                aria-label="Đóng"
                                                onClick={() => setIsPageJumpOpen(false)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className="shop-pagination-jump-body">
                                            <button
                                                type="button"
                                                aria-label="Giảm số trang"
                                                onClick={() => adjustPageInput(-1)}
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                min={1}
                                                max={pageCount}
                                                value={pageInput}
                                                aria-label="Trang muốn đến"
                                                onChange={(event) => setPageInput(event.target.value)}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter') {
                                                        commitPageInput();
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                aria-label="Tăng số trang"
                                                onClick={() => adjustPageInput(1)}
                                            >
                                                +
                                            </button>
                                            <button
                                                type="button"
                                                className="shop-pagination-jump-submit"
                                                onClick={commitPageInput}
                                            >
                                                Tới
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
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
