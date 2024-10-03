import { useContext, useState } from "react";
import { CartContext } from "../../context/cartItem";
import "./paiementInfo.css";
import {Button} from "@mui/material";

function PaiementInfo({ onSubmit, shipping}) {
    const { cart } = useContext(CartContext);

    const [error, setError] = useState("");
    const [total, setTotal] = useState(
        cart.reduce((acc, item) => acc + (+item.card_price), 0)
    );

    const [shippingInfo, setShippingInfo] = useState({
        address: shipping.address,
        contact: shipping.contact,
        paymentMethod: shipping.paymentMethod,
        discountCode: shipping.discountCode,
    });

    console.log("cart: ", cart);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!shippingInfo.address || !shippingInfo.contact) {
            setError("Veuillez remplir tous les champs de livraison.");
            return;
        }

        if (shippingInfo.discountCode === "CODE20") {
            setTotal((prevTotal) => prevTotal * 0.8);
        } else if (shippingInfo.discountCode === "CODE50") {
            setTotal((prevTotal) => prevTotal * 0.5);
        } else if (shippingInfo.discountCode && !["CODE20", "CODE50"].includes(shippingInfo.discountCode)) {
            setError("Le code de réduction n'est pas valide.");
            return;
        }

        setError("");
        console.log("Informations soumises :", shippingInfo);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    return (
        <div className="paiement-info-container">
            <div className="cart-section">
                <h1>Votre panier :</h1>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.card_name} : {item.card_price} €
                        </li>
                    ))}
                </ul>
                <h3>Total : {total.toFixed(2)} €</h3>
            </div>

            <div className="payment-section">
                <h1>Informations de paiement :</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Adresse de livraison :</label>
                        <input
                            type="text"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleChange}
                            placeholder="Entrez votre adresse de livraison"
                        />
                    </div>

                    <div className="form-group">
                        <label>Coordonnées de contact :</label>
                        <input
                            type="text"
                            name="contact"
                            value={shippingInfo.contact}
                            onChange={handleChange}
                            placeholder="Entrez vos coordonnées"
                        />
                    </div>

                    <div className="form-group">
                        <label>Méthode de paiement :</label>
                        <select
                            name="paymentMethod"
                            value={shippingInfo.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="card">Carte bancaire</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Code de réduction :</label>
                        <input
                            type="text"
                            name="discountCode"
                            value={shippingInfo.discountCode}
                            onChange={handleChange}
                            placeholder="Entrez votre code de réduction"
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => {
                            if(!shippingInfo.address || !shippingInfo.contact) {
                                setError("Veuillez remplir tous les champs de livraison.");
                                return;
                            }
                            onSubmit(shippingInfo);
                        }}
                    >
                        Valider le paiement
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default PaiementInfo;
