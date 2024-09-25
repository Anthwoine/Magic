import Header from "../../components/header/Header";
import ShoppingList from "../../components/shoppingList/ShoppingList";
import Cart from "../../components/cart/Cart";
import {useEffect, useState} from 'react';
import "./home.css";

function Home() {

    const [cart, setCart] = useState([])
    const [cards, setCards] = useState([]);

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


    useEffect( () => {
        async function fetchDate() {
            const response = await fetch('http://localhost:8080/api/cartes/all')
            return await response.json();
        }

        fetchDate().then(data => setCards(data))
    }, [])




    return (
        <div className="page">
            <div className="page-header">
                <Header />
            </div>

            <div className="page-container">
                <div className="home-container-cart">
                    <Cart 
                        cart={cart} 
                        suprCart={suprCart}
                        suprItemFromCart={suprItemFromCart}
                    />
                </div>

                <div className="home-container-shoppingList">
                    <ShoppingList addToCart={addToCart} cards={cards}/>
                </div>
            </div>
        </div>
    );
}



export default Home;

