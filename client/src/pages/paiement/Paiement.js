import { useContext, useState } from "react";
import Header from "../../components/header/Header";
import { PreferencesContext } from "../../context";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./paiement.css";
import { empty_cart } from "../../datas/logo";
import PaiementInfo from "../../components/paiement-info/PaiementInfo";
import { CartContext } from "../../context/cartItem";
import Recapitulatif from "../../components/recapitulatif /Recapitulatif";

function Paiement() {
    const { darkMode } = useContext(PreferencesContext);
    const { cart } = useContext(CartContext);
    const [isPaying, setIsPaying] = useState(false);

    const [shipping, setShipping] = useState({
        address: "",
        contact: "",
        paymentMethod: "card",
        discountCode: "",
    });


    const handlePaiementInfoSubmit = (info) => {
        setShipping(info);
        setIsPaying(true);
    };

    const togglePaiement = () => {
        setIsPaying(!isPaying);
    }

    return (
        <div className={`page ${darkMode ? 'dark-mode' : ''}`}>
            <div className="page-header">
                <Header />
            </div>

            <div className="page-container">
                {cart.length === 0 ? (
                    <div className="panier-vide">
                        <img src={empty_cart()} alt="Panier vide" />
                        <h1>Votre panier est vide</h1>
                        <Button
                            variant="contained"
                            style={{
                                marginLeft: '16px',
                                height: '50px',
                                width: '150px',
                            }}
                        >
                            <Link
                                to="/"
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                Retour
                            </Link>
                        </Button>
                    </div>
                ) : !isPaying ? (
                    <PaiementInfo onSubmit={handlePaiementInfoSubmit} shipping={shipping}/>
                ) : (
                    <Recapitulatif shippingInfo={shipping} togglePaiement={togglePaiement} />
                )}
            </div>
        </div>
    );
}

export default Paiement;
