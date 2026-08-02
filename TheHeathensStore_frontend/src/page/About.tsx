import ContentHero from '../components/content/ContentHero.tsx';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';
import storyImage from '../assets/images/about/jersey-01.jpg';
import missionImage from '../assets/images/about/jersey-02.jpg';

const About = () => {
    usePageMetadata('About us', 'The story and values behind The Heathens Store, a football shirt store built for supporters and collectors.');
    return (
        <>
            <ContentHero eyebrow="ABOUT THE STORE" title="Football stories you can wear" description="A store shaped by Manchester football culture and built for supporters around the world."/>
            <section className="container content-section about-content">
                <div className="row align-items-center p-b-80">
                    <div className="col-md-7 col-lg-8 p-b-30"><span className="content-kicker">OUR STORY</span><h2>Born from a city that lives football</h2><p>The Heathens Store began with a simple idea: give supporters a clear, enjoyable way to discover shirts connected to the clubs, seasons and matches they remember.</p><p>Every jersey tells a story — an unforgettable goal, a historic match or the player who defined an era. We organise products around those details so fans can find the shirt that means something to them.</p></div>
                    <div className="col-11 col-md-5 col-lg-4 m-lr-auto"><div className="how-bor1"><div className="hov-img0"><img src={storyImage} alt="Football shirts displayed in The Heathens Store"/></div></div></div>
                </div>
                <div className="row align-items-center">
                    <div className="order-md-2 col-md-7 col-lg-8 p-b-30"><span className="content-kicker">OUR MISSION</span><h2>Make collecting simple and meaningful</h2><p>We focus on useful product information, dependable stock validation and a checkout flow that keeps prices and delivery costs clear.</p><ul className="about-values"><li><strong>Clarity</strong><span>Club, season, kit type, price and availability are easy to understand.</span></li><li><strong>Respect for the game</strong><span>Editorial content celebrates the history and culture behind football shirts.</span></li><li><strong>Customer control</strong><span>Accounts provide saved addresses, wishlists and a transparent order history.</span></li></ul><blockquote>“Some people think football is a matter of life and death. I assure you, it’s much more serious than that.”<cite>— Bill Shankly</cite></blockquote></div>
                    <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30"><div className="how-bor2"><div className="hov-img0"><img src={missionImage} alt="Classic football shirt collection"/></div></div></div>
                </div>
            </section>
        </>
    );
};

export default About;
