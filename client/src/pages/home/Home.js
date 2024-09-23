import Header from "../../components/header/Header";
import ShoppingList from "../../components/shoppingList/ShoppingList";
import Cart from "../../components/cart/Cart";
import { useState }  from 'react';
import "./home.css";

function Home() {

    const [cart, setCart] = useState([])

    function addToCart(name, price) {
        setCart((prevCart) => [...prevCart, {
            card_name: name,
            card_price: price
        }])
        console.log("Item added:", { name, price });
        console.log("Updated cart:", cart); 
    }

    function suprCart() {
        setCart([])
    }

    function suprItemFromCart(index) {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    }




    return (
        <div className="home">
            <div className="home-header">
                <Header />
            </div>
            <div className="home-container">
                <div className="home-container-cart">
                    <Cart 
                        cart={cart} 
                        suprCart={suprCart}
                        suprItemFromCart={suprItemFromCart}
                    />
                </div>

                <div className="home-container-shoppingList">
                    <ShoppingList addToCart={addToCart}/>
                </div>
            </div>
        </div>
    );
}



export default Home;

