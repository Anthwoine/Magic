import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cartItem";
import "./recapitulatif.css";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {promoCode} from "../../datas/promo";

function Recapitulatif({ shippingInfo, togglePaiement }) {
    const { cart, setCart } = useContext(CartContext);
    const [orderNumber, setOrderNumber] = useState("");
    const [total, setTotal] = useState(null)


    useEffect(() => {
        const generateOrderNumber = () => {
            const randomNumber = Math.floor(Math.random() * 1000000);
            setOrderNumber(`CMD-${randomNumber}`);
        };


        const countTotal = () => {
            setTotal(cart.reduce((acc, item) => acc + (+item.card_price), 0).toFixed(2))
        };

        const countPromo = () => {
            const promos = promoCode()
            const promo = promos.find(promo => promo.code === shippingInfo.discountCode)
            if (promo) {
                const newTotal = cart.reduce((acc, item) => acc + (+item.card_price), 0) * (1 - promo.reduction)
                setTotal(newTotal.toFixed(2))
            }
        };


        generateOrderNumber();
        countTotal();
        countPromo();
    }, []);



    function handleConfirmOrder() {
        setCart([]);
        alert("Commande confirmée");

    }


    return (
        <div className="recapitulatif-container">
            <h1>Récapitulatif de votre commande</h1>
            <h3>Numéro de commande : {orderNumber}</h3>

            <div className="order-details">
                <h2>Articles dans votre panier :</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.card_name} - {(+item.card_price)} €
                        </li>
                    ))}
                </ul>
                <h3>Total : {total} €</h3>
            </div>

            <div className="shipping-details">
                <h2>Informations de livraison :</h2>
                <p><strong>Adresse :</strong> {shippingInfo.address}</p>
                <p><strong>Contact :</strong> {shippingInfo.contact}</p>
                <p><strong>Méthode de paiement :</strong> {shippingInfo.paymentMethod === 'paypal' ? 'PayPal' : 'Carte bancaire'}</p>
                <p><strong>Code de réduction :</strong> {shippingInfo.discountCode}</p>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

            }}>
                <Link to={"/"}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "20px" }}
                        onClick={() => handleConfirmOrder()}
                    >
                        Confirmer la commande
                    </Button>
                </Link>

                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px" }}
                    onClick={() => togglePaiement(shippingInfo)}
                >
                    Retour
                </Button>
            </div>


        </div>
    );
}

export default Recapitulatif;
