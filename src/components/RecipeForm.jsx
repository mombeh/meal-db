import React, { useState, useEffect } from 'react';
import { useRecipes } from '../contexts/RecipeContext';

const RecipeForm = ({ mode, recipe, onSave, onCancel }) => {
  const { addRecipe, updateRecipe, categories, areas } = useRecipes();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: '',
    area: '',
    ingredients: '',
    instructions: ''
  });

  useEffect(() => {
    if (mode === 'edit' && recipe) {
      setFormData({
        name: recipe.name,
        image: recipe.image,
        category: recipe.category || '',
        area: recipe.area || '',
        ingredients: recipe.ingredients.join(', '),
        instructions: recipe.instructions
      });
    }
  }, [mode, recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i)
    };
    if (mode === 'add') {
      addRecipe(newRecipe);
    } else {
      updateRecipe(recipe.id, newRecipe);
    }
    onSave();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onCancel}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">{mode === 'add' ? 'Add Recipe' : 'Edit Recipe'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Recipe preview"
                  className="w-32 h-32 object-cover rounded mt-2"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Area</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Area</option>
                {areas.map(area => (
                  <option key={area.strArea} value={area.strArea}>{area.strArea}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Ingredients (comma separated)</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows="3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows="4"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Save
              </button>
              <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecipeForm;