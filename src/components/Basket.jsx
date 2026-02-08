import propTypes from "prop-types"
function Basket ({basket}) {
    return (
        <div className="w-full leading-10 shadow-[0_0_4px_-2px_rgba(0,0,0,0.5)] p-6 rounded-lg">
            <h1 className="mt-[30px] text-center">Basket</h1>
            {basket.map((item) => (
                <div className="flex gap-5 font-light justify-center" key={item.id}>
                    <div>
                    <p className="text-lg"><strong>Item:</strong> {item.name}</p>
                    </div>
                    <div>
                    <p className="text-lg"><strong>Price:</strong> {item.price}</p>
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