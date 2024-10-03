import Header from "../../components/header/Header";
import {PreferencesContext} from "../../context";
import {useContext} from "react";
import FavorisList from "../../components/favorisList/FavorisList";

function Favoris() {
    const { darkMode } = useContext(PreferencesContext);

    return (
        <div className={`page ${darkMode ? 'dark-mode' : ''}`}>
            <div className="page-header">
                <Header/>
            </div>
            <div className={"page-container"}>
                <FavorisList/>
            </div>
        </div>
    );
}

export default Favoris;