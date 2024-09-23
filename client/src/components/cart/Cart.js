import './cart.css'

function Cart(props) {
    // Calcul du total du panier en utilisant reduce
    const totalPrice = props.cart.reduce((total, item) => {
        return total + (+item.card_price);
    }, 0); // 0 est la valeur initiale de total

    return (
        <div className="cart-container">
            <div className="cart">
                <h1>Panier</h1>
                <div className="cart-items">
                    {props.cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <button onClick={() => props.suprItemFromCart(index)}>--</button>
                            <p>{item.card_name} - {item.card_price} €</p>
                        </div>
                    ))}
                </div>
                <div className="total">
                    <h2>Total: {totalPrice.toFixed(2)} €</h2>
                </div>

                {props.cart.length > 0 ?                 
                    <button onClick={() => props.suprCart()}>
                        Vider le panier
                    </button> 
                    : null
                }


            </div>

        </div>
    );
}

export default Cart;
