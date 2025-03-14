import { Fragment } from "react"
import propTypes from "prop-types"


function Listitem ({product, onAddProduct}) {

    return (
        <Fragment>
        
        <div className="items">
        <div className="articles">
            <div className="article1">
                <img src={product.image} alt={product.name} />
                <div className="message">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <button className="btn" onClick={() => onAddProduct(product.id, 1)}>&#43;</button>
                <button className="btn" onClick={() => onAddProduct(product.id, -1)}>&minus;</button>
            </div>
            </div>
            
        </div>
        </div>
        </Fragment>
    )
}

export default Listitem


Listitem.propTypes= {
    product: propTypes.object.isRequired,
    onAddProduct: propTypes.func.isRequired
}