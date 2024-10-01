import './header.css'
import {Link} from "react-router-dom";
import { logoSVG } from "../../datas/logo";
import {useEffect, useState} from "react";

function Header() {

    return (
        <div className="header">
            <Link to={"/"} className="header-logo-container">
                <img src={logoSVG()} alt={"logo"}></img>
                <div className="header-name">
                    <h1>MDS</h1>
                    <p>Magic Deck Shop</p>
                </div>
            </Link>

            <nav className={"header-navigation"}>
                <div>
                    <Link to={"/"}>
                        <span>Accueil</span>
                    </Link>

                    <Link to={"/preferences"}>
                        <span>Préférences</span>
                    </Link>
                </div>

            </nav>

        </div>
    )
}

export default Header;