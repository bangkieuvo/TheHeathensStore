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

const ScrollToTop = () => {
    const {pathname} = useLocation();

    useLayoutEffect(() => {
        const scrollOptions: ScrollToOptions = {
            top: 0,
            left: 0,
            behavior: 'auto',
        };

        window.scrollTo(scrollOptions);
        document.getElementById('root')?.scrollTo(scrollOptions);
    }, [pathname]);

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
                        <Route path="about" element={<About/>}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
};


export default App;
