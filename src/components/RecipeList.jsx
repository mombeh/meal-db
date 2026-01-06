import React, { useState } from 'react';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from './RecipeCard';
import RecipeDialog from './RecipeDialog';
import RecipeForm from './RecipeForm';

const RecipeList = () => {
  const { recipes, searchTerm, setSearchTerm } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [selectedRecipeForForm, setSelectedRecipeForForm] = useState(null);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

  const handleAddRecipe = () => {
    setFormMode('add');
    setSelectedRecipeForForm(null);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setFormMode('edit');
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
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:max-w-md"
        />
        <button
          onClick={handleAddRecipe}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Add Recipe
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={handleCardClick} />
        ))}
      </div>
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