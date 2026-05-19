import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./page/layout/MainLayout.tsx";
import About from "./page/About.tsx";
import Login from "./page/Login.tsx";
import Register from "./page/Register.tsx";
import AuthLayout from "./page/layout/AuthLayout.tsx";
import Home from "./page/Home.tsx";
import ProductDetail from "./page/ProductDetail.tsx";


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthLayout/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Route>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="product-detail/:uuid" element={<ProductDetail/>}/>
                        <Route path="about" element={<About/>}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
};


export default App;
