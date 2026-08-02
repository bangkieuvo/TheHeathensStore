import {Link, useParams} from 'react-router-dom';
import {blogPosts, findBlogPost} from '../data/blogPosts.ts';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

const formatDate = (date: string) => new Intl.DateTimeFormat('en-GB', {dateStyle: 'long'}).format(new Date(`${date}T00:00:00Z`));

const BlogDetail = () => {
    const {slug} = useParams();
    const post = findBlogPost(slug);
    usePageMetadata(post?.title ?? 'Article not found', post?.excerpt ?? 'The requested journal article could not be found.', `/blog/${slug ?? ''}`);

    if (!post) return <div className="container commerce-empty-state"><h1>Article not found</h1><p className="p-tb-20">The article may have moved or the address is incorrect.</p><Link className="btn btn-dark" to="/blog">Back to the journal</Link></div>;
    const related = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 2);

    return (
        <article className="blog-article">
            <header className="container blog-article-header"><Link to="/blog">← Journal</Link><span>{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p><div><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time><span>{post.author}</span><span>{post.readingTime} min read</span></div></header>
            <div className="blog-article-image"><img src={post.image} alt={post.imageAlt}/></div>
            <div className="container blog-article-body">{post.content.map((section, index) => <section key={`${section.heading ?? 'intro'}-${index}`}>{section.heading && <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>
            {related.length > 0 && <aside className="container blog-related"><h2>More from the journal</h2><div>{related.map((item) => <Link key={item.slug} to={`/blog/${item.slug}`}><img src={item.image} alt=""/><span>{item.title}</span></Link>)}</div></aside>}
        </article>
    );
};

export default BlogDetail;
