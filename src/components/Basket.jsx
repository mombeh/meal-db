import propTypes from "prop-types"
function Basket ({basket}) {
    return (
        <div className="basket">
            {basket.map((item) => (
                <div className="basket-item" key={item.id}>
                    <h5>{item.name}</h5>
                    <p>x{item.quantity}</p>
                </div>
            ))}
        </div>
    )
}

export default Basket

Basket.propTypes= {
    basket: propTypes.object.isRequired,
    onAddproduct: propTypes.func.isRequired
}