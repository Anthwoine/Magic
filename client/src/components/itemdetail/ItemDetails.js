import './itemDetails.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchManaSymbols from "../../datas/symbol";
import { Button, Popover, TextField, Typography } from "@mui/material";

function ItemDetails() {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [formattedManaCost, setFormattedManaCost] = useState([]);
    const [formattedOracleText, setFormattedOracleText] = useState([]);
    const [newPrice, setNewPrice] = useState(card ? card.price_eur : '');
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState(''); // État pour gérer les erreurs

    async function formatTextWithSymbols(text) {
        const manaSymbols = await fetchManaSymbols();
        return text.split(/(\{[A-Z0-9]+\})/g).map((part, index) => {
            if (manaSymbols[part]) {
                return <img key={index} src={manaSymbols[part]} alt={part} className="mana-icon"/>;
            }
            return part;
        });
    }

    useEffect(() => {
        async function fetchCard() {
            const response = await fetch(`http://localhost:8080/api/cartes/${cardId}`);
            if (response.status === 200) {
                const data = await response.json();
                setCard(data);
                setNewPrice(data.price_eur); // Met à jour le prix lors de la récupération des données
            }
        }

        fetchCard();
    }, [cardId]);

    useEffect(() => {
        async function formatManaCost() {
            if (card && card.mana_cost) {
                const formattedCost = await formatTextWithSymbols(card.mana_cost);
                setFormattedManaCost(formattedCost);
            }
        }

        async function formatOracleText() {
            if (card && card.oracle_text) {
                const formattedText = await formatTextWithSymbols(card.oracle_text);
                setFormattedOracleText(formattedText);
            }
        }

        if (card) {
            formatManaCost();
            formatOracleText();
        }
    }, [card]);

    const handlePriceChange = async () => {
        // Vérification si le prix est inférieur à 0
        if (newPrice < 0) {
            setError('Le prix ne peut pas être inférieur à 0.');
            return; // Quitte la fonction si la condition est remplie
        } else {
            setError(''); // Réinitialise l'erreur si le prix est valide
        }

        const response = await fetch(`http://localhost:8080/api/cartes/${cardId}/change-price`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price: `${newPrice}` }),
        });

        if (response.status === 200) {
            const updatedCard = await response.json();
            setCard(updatedCard);
            setNewPrice(updatedCard.price_eur); // Met à jour le prix localement après le changement
        } else {
            console.error('Erreur lors de la mise à jour du prix');
        }
        handleClose(); // Fermer le popover après la soumission
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setError(''); // Réinitialise l'erreur lors de la fermeture du popover
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        !card ? <p>Carte non trouvée</p> :
            <div className="card-detail-container">

                <div className="change-button-container">
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        className="change-card-button"
                        onClick={handleClick}
                    >
                        Change
                    </Button>
                </div>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <div style={{ padding: '16px' }}>
                        <Typography variant="h6">Change Price</Typography>
                        <TextField
                            label="New Price"
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            fullWidth
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePriceChange}
                            style={{ marginTop: '16px' }}
                        >
                            Submit
                        </Button>
                    </div>
                </Popover>

                <div className="details">
                    <div className="card-detail-image">
                        <img src={card.image_uri} alt={card.name} />
                    </div>
                    <div className="card-details">
                        <p>{card.name} {formattedManaCost}</p>
                        <p>{card.type}</p>
                        {card.oracle_text != null && <p>{formattedOracleText}</p>}
                        {card.toughness != null && card.power != null && (
                            <p>{`${card.toughness} / ${card.power}`}</p>
                        )}
                        <p>{`${card.price_eur} €`}</p>
                        <p>{`${card.set_name}  -  ${card.rarity}`}</p>
                    </div>
                </div>

            </div>
    );
}

export default ItemDetails;
