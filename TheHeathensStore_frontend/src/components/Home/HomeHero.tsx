import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import sportPattern from '../../assets/images/background-1.jpg';

const slides = [
    {eyebrow: '2025/2026 COLLECTION', title: 'Wear your club. Own the moment.', copy: 'Discover the newest home, away and third kits.', link: '/shop?seasonName=2025/2026'},
    {eyebrow: 'MATCH DAY ESSENTIALS', title: 'Built for every football fan.', copy: 'Official-inspired designs from the clubs you follow.', link: '/shop?sort=best_selling'},
    {eyebrow: 'GOALKEEPER EDIT', title: 'Stand out between the posts.', copy: 'Explore goalkeeper shirts in every match-day colour.', link: '/shop?jerseyType=home_gk'},
];

const categories = [
    {label: 'Home kits', value: 'home'},
    {label: 'Away kits', value: 'away'},
    {label: 'Third kits', value: 'third'},
    {label: 'Goalkeeper kits', value: 'home_gk'},
];

const HomeHero = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    useEffect(() => {
        const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6000);
        return () => window.clearInterval(timer);
    }, []);
    const slide = slides[activeSlide];

    return (
        <>
            <section className="store-hero" style={{backgroundImage: `linear-gradient(100deg, rgba(7, 28, 19, .96), rgba(10, 91, 51, .78)), url(${sportPattern})`}}>
                <div className="container store-hero-content">
                    <span>{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.copy}</p>
                    <Link to={slide.link} className="store-hero-action">Shop collection</Link>
                    <div className="store-hero-dots">{slides.map((item, index) => <button key={item.eyebrow} type="button" aria-label={`Show slide ${index + 1}`} className={index === activeSlide ? 'is-active' : ''} onClick={() => setActiveSlide(index)}/>)}</div>
                </div>
            </section>
            <section className="container p-tb-50">
                <div className="flex-w flex-sb-m p-b-25"><h2 className="ltext-103 cl5">Shop by kit</h2><Link to="/shop" className="stext-101 cl1">View all products</Link></div>
                <div className="store-category-grid">{categories.map((category) => <Link key={category.value} to={`/shop?jerseyType=${category.value}`}><span>{category.label}</span><small>Explore collection →</small></Link>)}</div>
                <div className="store-promotion"><strong>Standard delivery is free from $100</strong><span>The shipping discount is applied automatically at checkout.</span></div>
            </section>
        </>
    );
};

export default HomeHero;
