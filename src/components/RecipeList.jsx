import React, { useState } from "react";
import { useRecipes } from "../contexts/RecipeContext";
import RecipeCard from "./RecipeCard";
import RecipeDialog from "./RecipeDialog";
import RecipeForm from "./RecipeForm";

const RecipeList = () => {
  const { recipes: allRecipes, searchTerm, setSearchTerm } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedRecipeForForm, setSelectedRecipeForForm] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const recipes = allRecipes.filter((recipe) =>
    showFavorites ? recipe.favorite : true
  );

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

  const handleAddRecipe = () => {
    setFormMode("add");
    setSelectedRecipeForForm(null);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setFormMode("edit");
    setSelectedRecipeForForm(recipe);
    setIsFormOpen(true);
    setIsDialogOpen(false);
  };

  const handleFormSave = () => setIsFormOpen(false);
  const handleFormCancel = () => setIsFormOpen(false);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            onClick={() => setShowFavorites(false)}
            className={`px-4 py-2 rounded-l-md ${
              !showFavorites
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All Recipes
          </button>
          <button
            onClick={() => setShowFavorites(true)}
            className={`px-4 py-2 rounded-r-md ${
              showFavorites
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      {/* Search + Add (same container as grid) */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:max-w-md"
          />

          <button
            onClick={handleAddRecipe}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-md w-full sm:w-auto transition"
          >
            Add Recipe
          </button>
        </div>
      </div>

      {/* Recipe Grid / Empty State */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {recipes.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-20">
              {showFavorites
                ? "You have no favorite recipes yet."
                : "No recipes found."}
            </p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dialogs */}
      {isDialogOpen && selectedRecipe && (
        <RecipeDialog
          recipe={selectedRecipe}
          onClose={() => setIsDialogOpen(false)}
          onEdit={() => handleEditRecipe(selectedRecipe)}
        />
      )}

      {isFormOpen && (
        <RecipeForm
          mode={formMode}
          recipe={selectedRecipeForForm}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default RecipeList;
