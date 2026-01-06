import { Fragment } from "react"
import propTypes from "prop-types"


function ListItem({ product, onAddProduct }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition-transform duration-300">
      <img src={product.image} alt={product.name} className="h-40 w-full object-contain mb-4"/>
      <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-center gap-4">
        <button className="px-4 py-2 bg-[#e96a6a] text-white rounded hover:bg-[#dc6767]" onClick={() => onAddProduct(product.id, 1)}>+</button>
        <button className="px-4 py-2 bg-[#dc6767] text-white rounded hover:bg-[#e96a6a]" onClick={() => onAddProduct(product.id, -1)}>-</button>
      </div>
    </div>
  )
}


export default Listitem


Listitem.propTypes = {
    product: propTypes.object.isRequired,
    onAddProduct: propTypes.func.isRequired
}