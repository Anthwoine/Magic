import Header from '../../components/header/Header'
import ItemDetails from '../../components/itemdetail/ItemDetails'
import {PreferencesContext} from "../../context";
import {useContext} from "react";

function Detail() {
    const {darkMode, setDarkMode} = useContext(PreferencesContext);


    return (

        <div className={`page detail ${darkMode ? 'dark-mode' : ''}`}>
            <div className="page-header">
                <Header />
            </div>
            <div className="page-container detail-container">
                <ItemDetails/>
            </div>

        </div>
    )
}

export default Detail;