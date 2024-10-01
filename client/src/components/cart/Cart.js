import './cart.css'
import {Button} from "@mui/material";

function Cart(props) {

    const totalPrice = props.cart.reduce((total, item) => {
        return total + (+item.card_price);
    }, 0);

    return (
        <div className="cart-container">
            <div className="cart">
                <h1>Panier</h1>
                <div className="cart-items">
                    {props.cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <Button
                                onClick={() => props.suprItemFromCart(index)}
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

                {props.cart.length > 0 ?                 
                    <Button
                        onClick={() => props.suprCart()}
                        variant="contained"
                        style={{ marginLeft: '16px' }}
                    >
                        Vider le panier
                    </Button>
                    : null
                }


            </div>

        </div>
    );
}

export default Cart;
