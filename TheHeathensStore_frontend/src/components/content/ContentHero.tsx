interface ContentHeroProps {
    eyebrow?: string;
    title: string;
    description: string;
}

const ContentHero = ({eyebrow, title, description}: ContentHeroProps) => (
    <section className="content-hero">
        <div className="container">
            {eyebrow && <span>{eyebrow}</span>}
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </section>
);

export default ContentHero;
