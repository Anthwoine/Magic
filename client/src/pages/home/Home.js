import Header from "../../components/header/Header";
import ShoppingList from "../../components/shoppingList/ShoppingList";
import Cart from "../../components/cart/Cart";

import "./home.css"

function Home() {
    return (
        <div className="home">
            <Header />
            <div className="home-container">
                <div className="home-container-cart">
                    <Cart />
                </div>

                <div className="home-container-shoppingList">
                    <ShoppingList />
                </div>
            </div>
        </div>
    );
}
export default Home;

