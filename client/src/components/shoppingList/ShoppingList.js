import './shoppingList.css';
import { useState, useEffect } from 'react';
import Item from "../item/Item";


import grnCards from '../../datas/cards_grn.json';
import lrwCards from '../../datas/cards_lrw.json';
import warCards from '../../datas/cards_war.json';

function ShoppingList(props) {
    // Initialisation de l'état pour les cartes et l'extension sélectionnée
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setCards(props.cards);
    }, [props.cards]);

    // Gestion de la barre de recherche
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Gestion des cartes filtrées par la recherche
    const filteredCards = cards.filter((carte) =>
        carte.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="shoppingList-container">
            <div className="shoppingList">
                <div className="shoppingList-search">
                
                    <input 
                        type="text" 
                        placeholder="Rechercher une carte" 
                        value={search} 
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                </div>

                <div className="shoppingList-cards">
                    {filteredCards.length > 0 ? (
                        filteredCards.map((carte, index) => (
                            <Item
                                key={index}
                                carte={carte}
                                addToCart={props.addToCart}
                            />
                        ))
                    ) : (
                        <p>Aucune carte trouvée</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShoppingList;
