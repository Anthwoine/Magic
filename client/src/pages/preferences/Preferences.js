import { useState, useEffect, useContext } from "react";
import {PreferencesContext} from "../../context";
import "./preferences.css";
import Header from "../../components/header/Header";

function Preferences() {
    const {darkMode, setDarkMode} = useContext(PreferencesContext);

    function checkboxChange(e) {
        setDarkMode(e.target.checked);
    }

    return (
        <div className={`page ${darkMode ? 'dark-mode' : ''}`}>
            <div className="page-header">
                <Header />
            </div>
            <h1>Préférences Utilisateur</h1>
            <label>
                <input type="checkbox" checked={darkMode}
                       onChange={checkboxChange}/>
                Mode Sombre
            </label>
        </div>
    );
}

export default Preferences;