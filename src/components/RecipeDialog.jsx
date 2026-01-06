import React from 'react';
import { useRecipes } from '../contexts/RecipeContext';

const RecipeDialog = ({ recipe, onClose, onEdit }) => {
  const { deleteRecipe, toggleFavorite } = useRecipes();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipe.id);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-6 overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">×</button>
        <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{recipe.category} • {recipe.area}</p>
        <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
        <div className="flex items-center mb-4">
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="text-yellow-500 hover:text-yellow-600 mr-2"
          >
            {recipe.favorite ? '★' : '☆'}
          </button>
          <span>Favorite</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeDialog;