import { Fragment } from "react"
import propTypes from "prop-types"


function Listitem({ product, onAddProduct }) {

    return (
        <Fragment>
            <div className="articles">
                <div className="article1">
                    <img src={product.image} alt={product.name} />
                    <div className="message">
                        <h4 className="names">{product.name}</h4>
                        <p className="decription">{product.description}</p>
                        <div className="btn">
                            <div>
                                <button className="plus" onClick={() => onAddProduct(product.id, 1)}>&#43;</button>
                            </div>
                            <div>
                                <button className="minus" onClick={() => onAddProduct(product.id, -1)}>&minus;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Listitem


Listitem.propTypes = {
    product: propTypes.object.isRequired,
    onAddProduct: propTypes.func.isRequired
}