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
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
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
    setIsDialogOpen(false); // Close dialog if editing from dialog
  };

  const handleFormSave = () => {
    setIsFormOpen(false);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex justify-center mb-6">
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

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:max-w-md"
        />

        <button
          onClick={handleAddRecipe}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Recipe
        </button>
      </div>

      <div className="grid justify-center">
        <div
          className="
      grid gap-6 mx-auto
      [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]
      max-w-7xl"
        >
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={handleCardClick}
            />
          ))}
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
