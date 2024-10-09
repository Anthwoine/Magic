import './shoppingList.css';
import { useState, useEffect } from 'react';
import Item from "../item/Item";
import { Button, Popover, TextField } from "@mui/material";
import {cards_404, red, blue, black, green, white, reset_settings} from "../../datas/logo";

function ShoppingList(props) {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const [isSortedByPrice, setIsSortedByPrice] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);  // État pour gérer les couleurs sélectionnées
    const [anchorEl, setAnchorEl] = useState(null);
    const [newCardExt, setNewCardExt] = useState('');
    const [newCardName, setNewCardName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setCards(props.cards);
    }, [props.cards]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const sortCards = () => {
        if (isSortedByPrice) {
            setIsSortedByPrice(false);
            setCards(props.cards);
        } else {
            const sortedCards = [...cards].sort((a, b) => (+a.price_eur) - (+b.price_eur));
            setIsSortedByPrice(true);
            setCards(sortedCards);
        }
    };


    const toggleColor = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(c => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const resetColors = () => {
        setSelectedColors([]); // Réinitialise les couleurs sélectionnées
    };


    const filteredCards = cards.filter((carte) => {
        const matchesSearch = carte.name.toLowerCase().includes(search.toLowerCase());


        if (selectedColors.length === 0) {
            return matchesSearch;
        }


        const cardColors = carte.colors ? carte.colors.split(',').filter(Boolean) : [];


        const matchesColor = selectedColors.some(color => cardColors.includes(color));

        return matchesSearch && matchesColor;
    });


    const handleOpenPopover = (event) => {
        setAnchorEl(document.body);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleAddCard = async () => {
        const data = {
            ext: newCardExt,
            name: newCardName.replace(/\s+/g, '_')
        };

        try {
            const response = await fetch('http://localhost:8080/api/cartes/ajoute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Gérer la réponse si la carte a été ajoutée avec succès
                const newCard = await response.json();
                setCards([...cards, newCard]);
                handleClosePopover();
            } else {
                setError('Erreur lors de l’ajout de la carte');
            }
        } catch (error) {
            console.error('Erreur lors de l’envoi de la requête', error);
            setError('Erreur lors de l’ajout de la carte');
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'add-card-popover' : undefined;

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
                    <Button
                        variant="contained"
                        style={{
                            marginLeft: "10px",
                            backgroundColor: isSortedByPrice ? "darkgreen" : "green",
                            color: "white",
                            height: "40px"
                        }}
                        onClick={sortCards}
                    >
                        Price
                    </Button>


                        <Button
                        variant="contained"
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "blue",
                            color: "white",
                            height: "40px",
                            width: "300px",
                            fontSize: "13px"
                        }}
                        onClick={handleOpenPopover}
                    >
                        Ajouter une carte
                    </Button>


                    <div className="sort-container">
                        <img
                            src={red()}
                            className={`logo-sort ${selectedColors.includes('R') ? 'selected' : 'deselected'}`}
                            onClick={() => toggleColor('R')}
                        />
                        <img
                            src={blue()}
                            className={`logo-sort ${selectedColors.includes('U') ? 'selected' : 'deselected'}`}
                            onClick={() => toggleColor('U')}
                        />
                        <img
                            src={black()}
                            className={`logo-sort ${selectedColors.includes('B') ? 'selected' : 'deselected'}`}
                            onClick={() => toggleColor('B')}
                        />
                        <img
                            src={green()}
                            className={`logo-sort ${selectedColors.includes('G') ? 'selected' : 'deselected'}`}
                            onClick={() => toggleColor('G')}
                        />
                        <img
                            src={white()}
                            className={`logo-sort ${selectedColors.includes('W') ? 'selected' : 'deselected'}`}
                            onClick={() => toggleColor('W')}
                        />

                        <img
                            className={`logo-sort ${selectedColors.length === 0 ? 'selected' : 'deselected'}`}
                            src={reset_settings()}
                            style={{width: "50px", height: "50px", cursor: "pointer"}}
                            onClick={() => resetColors()}

                        />
                    </div>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        PaperProps={{
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '20px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '300px',
                            }
                        }}
                    >
                        <div
                            className="add-card-popover-content"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "20px",
                                gap: "10px",
                                width: "400px",
                                height: "300px"
                            }}
                        >
                            <TextField
                                label="Extension"
                                value={newCardExt}
                                onChange={(e) => setNewCardExt(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Nom de la carte"
                                value={newCardName}
                                onChange={(e) => setNewCardName(e.target.value)}
                                margin="normal"
                            />

                            <Button
                                variant="contained"
                                style={{marginTop: "10px", backgroundColor: "green", color: "white"}}
                                onClick={handleAddCard}
                            >
                                Ajouter
                            </Button>

                            {error && <p style={{color: 'red'}}>{error}</p>}
                        </div>
                    </Popover>
                </div>

                <div className="shoppingList-cards-container">
                    <div className="shoppingList-cards">
                        {filteredCards.length > 0 ? (
                            filteredCards.map((carte, index) => (
                                <Item
                                    key={index}
                                    carte={carte}
                                    addToCart={props.addToCart}
                                    isSortedByPrice = {isSortedByPrice}
                                />
                            ))
                        ) : (
                            <div className="card-notfound">
                                <img src={cards_404()} alt={"cartes"}/>
                                <p>Aucune carte trouvée</p>
                            </div>
                        )}
                    </div>
                </div>



            </div>
        </div>
    );
}

export default ShoppingList;
