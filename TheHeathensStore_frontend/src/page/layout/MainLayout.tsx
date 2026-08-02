import {Outlet} from "react-router-dom";
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import BackToTopButton from "../../components/common/BackToTopButton.tsx";
import {useCommerceState} from "../../hooks/useCommerceState.ts";


const MainLayout = () => {
    const commerce = useCommerceState();

    return (
        <div className="animsition">
            <Header
                cart={commerce.cart}
                favorite={commerce.favorite}
                user={commerce.user}
                authStatus={commerce.authStatus}
            />
            {commerce.actionError && (
                <div className="container p-t-15">
                    <div className="alert alert-danger flex-w flex-sb-m" role="alert">
                        <span>{commerce.actionError}</span>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close error message"
                            onClick={commerce.clearActionError}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )}
            <main>
                <Outlet context={commerce}/>
            </main>
            <Footer/>
            <BackToTopButton/>
        </div>
    );
};

export default MainLayout;
