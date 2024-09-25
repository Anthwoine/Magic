import './item.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


function Item(props) {
    return (
        <div className="item">
            <Link to={`/detail/${props.carte.id}`}>
                <img src={props.carte.image_uri} alt={props.carte.name}/>
            </Link>

            <h2>{props.carte.name}</h2>
            <Button
                onClick={() => props.addToCart(props.carte.name, props.carte.price_eur)}
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
    );
}

export default Item;