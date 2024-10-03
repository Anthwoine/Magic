import './favorisItem.css';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {CartContext} from "../../context/cartItem";
import {useContext} from "react";

function FavorisItem({ carte, setFavoris }) {

    const { cart, setCart } = useContext(CartContext);

    async function addToCart(name, price) {
        setCart([...cart, {
            card_name: name,
            card_price: price
        }]);
    }

    async function toggleFav() {
        const response = await fetch(`http://localhost:8080/api/cartes/${carte.id}/toggle-favoris`, {
            method: 'PUT'
        });

        fetch(`http://localhost:8080/api/cartes/favoris`)
            .then(response => response.json())
            .then(data => setFavoris(data));
    }


    return (
        <div className={"favoris-item"}>
            <i
                className="material-icons remove-fav"
                onClick={toggleFav}
            >
                cancel
            </i>
            <Link to={`/detail/${carte.id}`}>
                <img src={carte.image_uri} alt={carte.name}/>
            </Link>

            <Button
                onClick={() => addToCart(carte.name, carte.price_eur)}
                sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'darkred'
                    }
                }}
            >
                Ajouter au panier
            </Button>
        </div>
    )

}

export default FavorisItem;