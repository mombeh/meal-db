import React from "react";
import { useRecipes } from "../contexts/RecipeContext";

const RecipeDialog = ({ recipe, onClose, onEdit }) => {
  const { deleteRecipe, toggleFavorite } = useRecipes();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipe.id);
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div
        className="
    fixed z-50 top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    bg-white rounded-2xl shadow-2xl
    w-[95%] max-w-4xl
    max-h-[90vh]
    flex flex-col
  "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
      absolute top-4 right-4 z-10
      w-9 h-9 rounded-full
      bg-white/90 hover:bg-gray-200
      flex items-center justify-center
      text-xl text-gray-600
    "
        >
          ×
        </button>

        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-72 object-cover rounded-t-2xl"
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8 pb-36">
          {/* Title + Favorite */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {recipe.name}
              </h2>
              <p className="text-sm text-gray-500">
                {recipe.category} • {recipe.area}
              </p>
            </div>

            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="text-3xl"
            >
              <span
                className={
                  recipe.favorite ? "text-yellow-500" : "text-gray-400"
                }
              >
                {recipe.favorite ? "★" : "☆"}
              </span>
            </button>
          </div>

          {/* Ingredients */}
          <section className="mb-15">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Ingredients
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8 text-sm text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h3>

            <ol className="space-y-2 text-sm text-gray-700 leading-relaxed">
              {recipe.instructions
                .split("\r\n")
                .filter((step) => step.trim())
                .map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="font-semibold text-orange-500 min-w-[24px]">
                      {index + 1}.
                    </span>
                    <span>{step.trim()}</span>
                  </li>
                ))}
            </ol>
          </section>
        </div>

        {/* Sticky footer */}
        <div className="justify-center bg-white">
          <button
            onClick={onEdit}
            className="w-full py-3 rounded-md bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold shadow hover:scale-[1.02] transition"
          >
            Edit Recipe
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeDialog;
