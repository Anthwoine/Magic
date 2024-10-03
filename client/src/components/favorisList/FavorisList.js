import { useEffect, useState } from "react";
import { fav } from "../../datas/logo";
import "./favorisList.css";
import FavorisItem from "../favorisItem/FavorisItem";
import Cart from "../cart/Cart";

function FavorisList() {
    const [favoris, setFavoris] = useState([]);

    useEffect(() => {
        async function fetchFavoris() {
            const response = await fetch("http://localhost:8080/api/cartes/favoris");
            if (response.status === 200) {
                const data = await response.json();
                setFavoris(data);
            }
        }

        fetchFavoris();
        console.log(favoris);
    }, []);

    return (
        <div className={"favorisList-container"}>
            {
                favoris.length === 0 ? (
                    <div className={"empty-favoris-list"}>
                        <img src={fav()} alt="Favoris vides"/>
                        <h1>Votre liste de favoris est vide</h1>
                    </div>
                ) : (
                    <div className={"favoris-list-container"}>
                        <div className={"favoris-cart-container"}>
                            <Cart/>
                        </div>

                        <div className={"favoris-list"}>
                            {
                                favoris.map((favori) => (
                                    <div className={"favoris"} key={favori.id}>
                                        <FavorisItem carte={favori} setFavoris={setFavoris}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default FavorisList;