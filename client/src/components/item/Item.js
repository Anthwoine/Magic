import './item.css';

function Item(props) {
    return (
        <div className="item" onClick={() => props.addToCart(props.carte.name, props.carte.price_eur)}>
            <img src={props.carte.image_uris.normal} alt={props.carte.name}/>
            <h2>{props.carte.name}</h2>
        </div>
    );
}

export default Item;