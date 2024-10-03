import './header.css'
import {Link} from "react-router-dom";
import { logoSVG } from "../../datas/logo";

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
                <div className="header-nav-link-container">

                    <Link to={"/"} style={{ textDecoration: 'none' }}>
                        <p className="header-link">Accueil</p>
                    </Link>

                    <Link to={"/favoris"} style={{ textDecoration: 'none' }}>
                        <p className="header-link">Favoris</p>
                    </Link>

                    <Link to={"/preferences"} style={{ textDecoration: 'none' }}>
                        <p className="header-link">Préférences</p>
                    </Link>

                </div>

            </nav>

        </div>
    )
}

export default Header;