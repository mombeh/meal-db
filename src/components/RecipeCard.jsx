import React from 'react';
import { useRecipes } from '../contexts/RecipeContext';

const RecipeCard = ({ recipe, onClick }) => {
  const { toggleFavorite } = useRecipes();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{recipe.category} • {recipe.area}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => onClick(recipe)}
          className="text-blue-500 hover:text-blue-600 underline"
        >
          View Details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          className="text-yellow-500 hover:text-yellow-600"
        >
          {recipe.favorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;