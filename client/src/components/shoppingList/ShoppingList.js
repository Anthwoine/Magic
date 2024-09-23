import './shoppingList.css';
import { useState, useEffect } from 'react';
import Item from "../item/Item";

// Importation des cartes à partir des fichiers JSON pour chaque extension
import grnCards from '../../datas/cards_grn.json';
import lrwCards from '../../datas/cards_lrw.json';
import warCards from '../../datas/cards_war.json';

function ShoppingList(props) {
    // Initialisation de l'état pour les cartes et l'extension sélectionnée
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedSet, setSelectedSet] = useState('grn'); // Extension par défaut : 'grn'

    // Utilisation d'effet pour charger les cartes en fonction de l'extension sélectionnée
    useEffect(() => {
        loadCards(selectedSet);
    }, [selectedSet]);

    // Fonction pour charger les cartes en fonction de l'extension
    const loadCards = (setCode) => {
        switch (setCode) {
            case 'grn':
                setCards(grnCards);
                break;
            case 'lrw':
                setCards(lrwCards);
                break;
            case 'war':
                setCards(warCards);
                break;
            default:
                setCards(grnCards); // Chargement par défaut si le set n'est pas reconnu
                break;
        }
    };

    // Gestion de la barre de recherche
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Gestion des cartes filtrées par la recherche
    const filteredCards = cards.filter((carte) =>
        carte.name.toLowerCase().includes(search.toLowerCase())
    );

    // Gestion du changement d'extension
    const handleSetChange = (setCode) => {
        setSelectedSet(setCode);
    };

    return (
        <div className="shoppingList-container">
            <div className="shoppingList">
                <h1>Produits</h1>

                <div className="shoppingList-search">
                    {/* Barre de recherche */}
                    <input 
                        type="text" 
                        placeholder="Rechercher une carte" 
                        value={search} 
                        onChange={handleSearchChange}
                        className="search-bar"
                    />

                    {/* Icônes des extensions */}
                    <div className="icons-container">
                        <img
                            src='https://svgs.scryfall.io/sets/grn.svg?1727064000'
                            alt="GRN"
                            className={`ext-icon ${selectedSet === 'grn' ? 'active' : ''}`}
                            onClick={() => handleSetChange('grn')}
                        />
                        <img
                            src='https://svgs.scryfall.io/sets/lrw.svg?1727064000'
                            alt="LRW"
                            className={`ext-icon ${selectedSet === 'lrw' ? 'active' : ''}`}
                            onClick={() => handleSetChange('lrw')}
                        />
                        <img
                            src='https://svgs.scryfall.io/sets/war.svg?1727064000'
                            alt="WAR"
                            className={`ext-icon ${selectedSet === 'war' ? 'active' : ''}`}
                            onClick={() => handleSetChange('war')}
                        />
                    </div>
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
