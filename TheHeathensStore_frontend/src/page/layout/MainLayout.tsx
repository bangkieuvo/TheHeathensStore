import {Outlet} from "react-router-dom";
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import BackToTopButton from "../../components/common/BackToTopButton.tsx";


const MainLayout = () => {
    return (
        <div className="animsition">
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
            <BackToTopButton/>
        </div>
    );
};

export default MainLayout;
