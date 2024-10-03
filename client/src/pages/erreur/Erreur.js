import {pages_404} from "../../datas/logo";
import './erreur.css'
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

function Erreur() {


    return (
        <div className={'page-erreur'}>
            <img src={pages_404()}></img>
            <p>La page que vous cherchez n'existe pas</p>

            <Button
                variant="contained"
                color="primary"
                size="large"
                style={{
                    marginTop: '20px',
                    color: 'white',
                    width: '350px',
                    height: '50px'
            }}
            >
                <Link
                    to="/"
                    style = {{
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '1.5em'
                    }}
                >
                    Retour à l'accueil
                </Link>
            </Button>
        </div>
    )
}

export default Erreur;