import Header from '../../components/header/Header'
import ItemDetails from '../../components/itemdetail/ItemDetails'


function Detail() {
return (
    <div className="page detail">
        <div className="page-header">
            <Header />
        </div>
        <div className="page-container detail-container">
            <ItemDetails/>
        </div>

    </div>
)
}

export default Detail;