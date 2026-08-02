import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import ContentHero from '../components/content/ContentHero.tsx';
import {blogPosts} from '../data/blogPosts.ts';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

const formatDate = (date: string) => new Intl.DateTimeFormat('en-GB', {dateStyle: 'long'}).format(new Date(`${date}T00:00:00Z`));
const categories = ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))] as const;

const Blog = () => {
    usePageMetadata('Football shirt journal', 'Guides about football jerseys, shirt care, collecting and football culture from The Heathens Store.');
    const [category, setCategory] = useState<string>('All');
    const [search, setSearch] = useState('');
    const visiblePosts = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        return blogPosts.filter((post) => (category === 'All' || post.category === category)
            && (!keyword || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(keyword)));
    }, [category, search]);

    return (
        <>
            <ContentHero eyebrow="THE JOURNAL" title="Stories behind the shirts" description="Practical jersey guides, care advice and the football culture that gives every shirt meaning."/>
            <section className="container content-section">
                <div className="blog-toolbar">
                    <div>{categories.map((item) => <button key={item} type="button" className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
                    <label><span className="sr-only">Search articles</span><i className="zmdi zmdi-search"/><input type="search" placeholder="Search the journal" value={search} onChange={(event) => setSearch(event.target.value)}/></label>
                </div>
                {visiblePosts.length > 0 ? <div className="blog-grid">{visiblePosts.map((post) => <article key={post.slug} className="blog-card"><Link to={`/blog/${post.slug}`}><img src={post.image} alt={post.imageAlt}/></Link><div><span>{post.category}</span><h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><footer><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time><span>{post.readingTime} min read</span></footer></div></article>)}</div> : <div className="commerce-empty-state"><h2>No articles found</h2><p>Try another keyword or category.</p></div>}
            </section>
        </>
    );
};

export default Blog;
