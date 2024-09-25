import './itemDetails.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchManaSymbols from "../../datas/symbol";

function ItemDetails() {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [formattedManaCost, setFormattedManaCost] = useState([]);
    const [formattedOracleText, setFormattedOracleText] = useState([]);


    async function formatTextWithSymbols(text) {
        const manaSymbols = await fetchManaSymbols();
        return text.split(/(\{[A-Z0-9]+\})/g).map((part, index) => {
            if (manaSymbols[part]) {
                return <img key={index} src={manaSymbols[part]} alt={part} className="mana-icon" />;
            }
            return part;
        });
    }

    useEffect(() => {
        async function fetchCard() {
            const response = await fetch(`http://localhost:8080/api/cartes/${cardId}`);
            if (response.status === 200) {
                return await response.json();

            }
        }
        fetchCard().then((data) => setCard(data));
    }, [cardId]);

    useEffect(() => {
        // Formate le coût en mana de la carte
        async function formatManaCost() {
            if (card && card.mana_cost) {
                const formattedCost = await formatTextWithSymbols(card.mana_cost);
                setFormattedManaCost(formattedCost);
            }
        }

        // Formate l'oracle text de la carte
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

    if (!card) {
        return <p>Carte non trouvée</p>;
    }

    return (
        <div className="card-detail-container">
            <div className="details">
                <div className="card-detail-image">
                    <img src={card.image_uri} alt={card.name} />
                </div>

                <div className="card-details">
                    <p>
                        {card.name} {formattedManaCost}
                    </p>
                    <p>{card.type}</p>

                    {card.oracle_text != null ? <p>{formattedOracleText}</p> : null}
                    {card.toughness != null && card.power != null ? (
                        <p>{`${card.toughness} / ${card.power}`}</p>
                    ) : null}
                    <p>{card.price_eur} €</p>
                    <p>{`${card.set_name}  -  ${card.rarity}`}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;
