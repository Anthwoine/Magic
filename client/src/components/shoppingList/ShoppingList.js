import './shoppingList.css'

import cartes from '../../datas/cards_grn.json';
import Item from "../item/Item";

function ShoppingList() {
    return (
        <div className="shoppingList-container">
            <div className="shoppingList">
                <h1>Produits</h1>
                <div className="shoppingList-cards">
                    {cartes.map((carte, index) => {
                        return (
                            <Item carte={carte} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ShoppingList;