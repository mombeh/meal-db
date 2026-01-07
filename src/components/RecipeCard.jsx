import React from 'react';
import { useRecipes } from '../contexts/RecipeContext';

const RecipeCard = ({ recipe, onClick }) => {
  const { toggleFavorite } = useRecipes();

  return (
    <div
      onClick={() => onClick(recipe)}
      className="
        bg-white rounded-2xl shadow-sm
        overflow-hidden
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
      "
    >
      {/* Image */}
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-40 object-cover"
        />

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          className="
            absolute top-3 right-3
            bg-white/90 backdrop-blur
            rounded-full w-9 h-9
            flex items-center justify-center
            text-lg
            shadow-md
            hover:scale-110 transition
          "
        >
          <span className={recipe.favorite ? 'text-yellow-500' : 'text-gray-400'}>
            {recipe.favorite ? '★' : '☆'}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {recipe.name}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          {recipe.category} • {recipe.area}
        </p>

        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick(recipe);
          }}
          className="
            text-sm font-medium
            text-orange-600
            hover:text-orange-700
            bg-orange-50 hover:bg-orange-100
            px-2 py-1 rounded
            cursor-pointer
            inline-block
          "
        >
          View Details →
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
