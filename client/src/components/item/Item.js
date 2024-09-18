import './item.css';

function Item(props) {
    return (
        <div className="item">
            <img src={props.carte.image_uris.normal} alt={props.carte.name}/>
            <h2>{props.carte.name}</h2>
        </div>
    );
}

export default Item;