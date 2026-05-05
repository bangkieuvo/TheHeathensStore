
import closeIcon from "../../../assets/images/icons/icon-close2.png";
interface ModalSearchProps{
    isSearchOpen: boolean;
    setIsSearchOpen: (flag: boolean) => void;
};
const ModalSearch:React.FC<ModalSearchProps> = ({isSearchOpen,setIsSearchOpen}) => {
    return (
        <>
            <div className={`modal-search-header flex-c-m trans-04 ${isSearchOpen ? 'show-modal-search' : ''}`}>
                <div className="container-search-header">
                    <button className="flex-c-m btn-hide-modal-search trans-04" onClick={() => setIsSearchOpen(false)}>
                        <img src={closeIcon} alt="CLOSE"/>
                    </button>
                    <form className="wrap-search-header flex-w p-l-15">
                        <button className="flex-c-m trans-04"><i className="zmdi zmdi-search"></i></button>
                        <input className="plh3" type="text" name="search" placeholder="Search..."/>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ModalSearch;