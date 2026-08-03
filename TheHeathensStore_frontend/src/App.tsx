import './App.css';
import {useLayoutEffect} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import MainLayout from "./page/layout/MainLayout.tsx";
import About from "./page/About.tsx";
import Login from "./page/Login.tsx";
import Register from "./page/Register.tsx";
import AuthLayout from "./page/layout/AuthLayout.tsx";
import Home from "./page/Home.tsx";
import ProductDetail from "./page/ProductDetail.tsx";
import Shop from "./page/Shop.tsx";
import Cart from './page/Cart.tsx';
import Admin from './page/Admin.tsx';
import Checkout from './page/Checkout.tsx';
import MyAccount from './page/MyAccount.tsx';
import Contact from './page/Contact.tsx';
import Faq from './page/Faq.tsx';
import ReturnsPolicy from './page/ReturnsPolicy.tsx';
import PrivacyPolicy from './page/PrivacyPolicy.tsx';
import TermsOfUse from './page/TermsOfUse.tsx';
import Blog from './page/Blog.tsx';
import BlogDetail from './page/BlogDetail.tsx';
import NotFound from './page/NotFound.tsx';

const ScrollToTop = () => {
    const {pathname, search} = useLocation();

    useLayoutEffect(() => {
        const scrollOptions: ScrollToOptions = {
            top: 0,
            left: 0,
            behavior: 'auto',
        };

        window.scrollTo(scrollOptions);
        document.getElementById('root')?.scrollTo(scrollOptions);
    }, [pathname, search]);

    return null;
};

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<AuthLayout/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Route>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="shop" element={<Shop/>}/>
                        <Route path="product-detail/:uuid" element={<ProductDetail/>}/>
                        <Route path="cart" element={<Cart/>}/>
                        <Route path="checkout" element={<Checkout/>}/>
                        <Route path="my-account" element={<MyAccount/>}/>
                        <Route path="admin" element={<Admin/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="faq" element={<Faq/>}/>
                        <Route path="returns" element={<ReturnsPolicy/>}/>
                        <Route path="privacy" element={<PrivacyPolicy/>}/>
                        <Route path="terms" element={<TermsOfUse/>}/>
                        <Route path="blog" element={<Blog/>}/>
                        <Route path="blog/:slug" element={<BlogDetail/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
};


export default App;
