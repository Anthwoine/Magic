import './cart.css'
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {CartContext} from "../../context/cartItem";

function Cart() {

    const {cart, setCart } = useContext(CartContext);

    function suprCart() {
        setCart([]);
    }

    function suprItemFromCart(index) {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    }

    const totalPrice = cart.reduce((total, item) => {
        return total + (+item.card_price);
    }, 0);

    return (
        <div className="cart-container">
            <div className="cart">
                <h1>Panier</h1>
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <Button
                                onClick={() => suprItemFromCart(index)}
                                variant="contained"
                                size="small"
                                style={{ marginRight: '16px', marginLeft: '16px', height: '30px', width: '30px' }}
                            >
                                X
                            </Button>
                            <p>{item.card_name} - {item.card_price} €</p>
                        </div>
                    ))}
                </div>
                <div className="total">
                    <h2>Total: {totalPrice.toFixed(2)} €</h2>
                </div>

                {cart.length > 0 ?
                    <div>
                        <Button
                            onClick={() => suprCart()}
                            variant="contained"
                            style={{
                                marginLeft: '16px',
                                height: '50px',
                            }}
                        >
                            Vider le panier
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                marginLeft: '16px' ,
                                backgroundColor: 'green',
                                height: '50px',
                        }}
                        >
                            <Link to="/paiement"
                            style={{ textDecoration: 'none', color: 'white', }}>
                            <p
                            style={{
                                textDecoration: 'none',
                                color: 'white',

                            }}>Paiement</p></Link>
                        </Button>
                    </div>
                    : null
                }


            </div>

        </div>
    );
}

export default Cart;
