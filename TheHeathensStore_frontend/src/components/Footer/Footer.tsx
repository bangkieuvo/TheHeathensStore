import {Link} from 'react-router-dom';

const Footer = () => (
    <footer className="bg3 p-t-75 p-b-32">
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-lg-3 p-b-50"><h4 className="stext-301 cl0 p-b-30">Shop</h4><ul><li className="p-b-10"><Link to="/shop?jerseyType=home" className="stext-107 cl7 hov-cl1 trans-04">Home kits</Link></li><li className="p-b-10"><Link to="/shop?jerseyType=away" className="stext-107 cl7 hov-cl1 trans-04">Away kits</Link></li><li className="p-b-10"><Link to="/shop?jerseyType=third" className="stext-107 cl7 hov-cl1 trans-04">Third kits</Link></li><li className="p-b-10"><Link to="/shop?sort=newest" className="stext-107 cl7 hov-cl1 trans-04">Latest arrivals</Link></li></ul></div>
                <div className="col-sm-6 col-lg-3 p-b-50"><h4 className="stext-301 cl0 p-b-30">Help</h4><ul><li className="p-b-10"><Link to="/my-account" className="stext-107 cl7 hov-cl1 trans-04">Track orders</Link></li><li className="p-b-10"><Link to="/returns" className="stext-107 cl7 hov-cl1 trans-04">Returns</Link></li><li className="p-b-10"><Link to="/faq" className="stext-107 cl7 hov-cl1 trans-04">FAQs</Link></li><li className="p-b-10"><Link to="/contact" className="stext-107 cl7 hov-cl1 trans-04">Contact support</Link></li></ul></div>
                <div className="col-sm-6 col-lg-3 p-b-50"><h4 className="stext-301 cl0 p-b-30">The store</h4><ul><li className="p-b-10"><Link to="/about" className="stext-107 cl7 hov-cl1 trans-04">About us</Link></li><li className="p-b-10"><Link to="/blog" className="stext-107 cl7 hov-cl1 trans-04">Journal</Link></li><li className="p-b-10"><Link to="/privacy" className="stext-107 cl7 hov-cl1 trans-04">Privacy policy</Link></li><li className="p-b-10"><Link to="/terms" className="stext-107 cl7 hov-cl1 trans-04">Terms of use</Link></li></ul></div>
                <div className="col-sm-6 col-lg-3 p-b-50"><h4 className="stext-301 cl0 p-b-30">Get in touch</h4><p className="stext-107 cl7 p-b-12">Questions about a shirt or an order?</p><a href="mailto:support@theheathensstore.com" className="stext-107 cl7 hov-cl1 trans-04">support@theheathensstore.com</a><p className="stext-107 cl7 p-t-12">Monday–Friday<br/>09:00–17:00</p></div>
            </div>
            <div className="footer-bottom"><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/returns">Returns</Link></div><p>© {new Date().getFullYear()} The Heathens Store. All rights reserved.</p></div>
        </div>
    </footer>
);

export default Footer;
