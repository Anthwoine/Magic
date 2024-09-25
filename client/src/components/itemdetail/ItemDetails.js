import './itemDetails.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './itemDetails.css';


function ItemDetails() {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);

    useEffect(() => {
        async function fetchCard() {
            return await fetch(`http://localhost:8080/api/cartes/${cardId}`)
        }
        fetchCard().then((data) => {
            if(data.status !== 200) {
                return;
            }
            data.json().then(card => setCard(card));
            console.log(card)
        });
    }, []);


    if (!card) {
        return <p>Carte non trouvée</p>;
    }

    return (
        <div className="card-detail-container">

            <div className="details">
                <div className="card-detail-image">
                    <img src={card.image_uri} alt={card.name}/>
                </div>


                <div className="card-details">
                    <p>
                        {card.name} {card.mana_cost}
                    </p>
                    <p>
                        {card.type}
                    </p>
                    <p>{card.oracle_text}</p>
                    {card.toughness != null && card.power != null ? (
                        <p>{`${card.toughness} / ${card.power}`}</p>
                    ) : null}
                    <p>
                        {card.price_eur} €
                    </p>
                    <p>
                        {`${card.set_name}  -  ${card.rarity} `}
                    </p>

                </div>
            </div>


        </div>
    );
}

export default ItemDetails


/*
*
*             <div className={"card-detail-image"}>
                <img src={card.image_uri} alt={card.name}/>
            </div>


            <div className="card-details">
                <p><strong>ID:</strong> {card.id}</p>
                <p><strong>Rareté:</strong> {card.rarity}</p>
                <p><strong>Set:</strong> {card.set_name}</p>
                <p><strong>Coût de mana:</strong> {card.mana_cost}</p>
                <p><strong>Puissance:</strong> {card.power}</p>
                <p><strong>Toughness:</strong> {card.toughness}</p>
                <p><strong>Type:</strong> {card.type}</p>
                <p><strong>Texte Oracle:</strong> {card.oracle_text}</p>
                <p><strong>Prix en EUR:</strong> {card.price_eur}</p>
                <p><strong>Couleurs:</strong> {card.colors}</p>
            </div>
*
*
*
* */