import {Outlet} from "react-router-dom";
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";


const MainLayout = () => {
    return (
        <div className="animsition">
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;