import Header from "../../components/header/Header";
import ShoppingList from "../../components/shoppingList/ShoppingList";
import Cart from "../../components/cart/Cart";
import { useContext, useEffect, useState } from 'react';
import "./home.css";
import { PreferencesContext } from "../../context";
import { CartContext } from "../../context/cartItem";

function Home() {
    const { darkMode } = useContext(PreferencesContext);
    const { cart, setCart } = useContext(CartContext); // Utilisation du context directement
    const [cards, setCards] = useState([]);

    function addToCart(name, price) {
        setCart((prevCart) => [...prevCart, {
            card_name: name,
            card_price: price
        }]);
    }




    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8080/api/cartes/all');
            const data = await response.json();
            setCards(data);
        }

        fetchData();
    }, []);

    return (
        <div className={`page ${darkMode ? 'dark-mode' : ''}`}>
            <div className="page-header">
                <Header />
            </div>

            <div className="page-container">
                <div className="home-container-cart">
                    <Cart/>
                </div>

                <div className="home-container-shoppingList">
                    <ShoppingList addToCart={addToCart} cards={cards}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
