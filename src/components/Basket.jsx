import propTypes from "prop-types"
function Basket ({basket}) {
    return (
        <div className="basket">
            <h1>Basket</h1>
            {basket.map((item) => (
                <div className="basket-item" key={item.id}>
                    <div>
                    <p><strong>Item:</strong> {item.name}</p>
                    </div>
                    <div>
                    <p><strong>Price:</strong> {item.price}</p>
                    </div>
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