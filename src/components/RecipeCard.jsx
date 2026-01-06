import React from 'react';
import { useRecipes } from '../contexts/RecipeContext';

const RecipeCard = ({ recipe, onClick }) => {
  const { toggleFavorite } = useRecipes();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{recipe.category} • {recipe.area}</p>
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
  );
};

export default RecipeCard;