import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRecipe, updateRecipe } from "../store/recipesSlice";

const RecipeForm = ({ mode, recipe, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.recipes.categories);
  const areas = useSelector(state => state.recipes.areas);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    area: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    if (mode === "edit" && recipe) {
      setFormData({
        name: recipe.name,
        image: recipe.image,
        category: recipe.category || "",
        area: recipe.area || "",
        ingredients: recipe.ingredients.join(", "),
        instructions: recipe.instructions,
      });
    }
  }, [mode, recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      ...formData,
      ingredients: formData.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    if (mode === "add") {
      dispatch(addRecipe(newRecipe));
    } else {
      dispatch(updateRecipe({ id: recipe.id, updatedRecipe: newRecipe }));
    }

    onSave();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onCancel}
      />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="px-12 py-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">
              {mode === "add" ? "Add Recipe" : "Edit Recipe"}
            </h2>
            <button
              onClick={onCancel}
              className="text-3xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto no-scrollbar px-12 pb-10 space-y-14"
          >
            {/* SECTION: Basic Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipe Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter recipe name"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-72 object-cover rounded-xl mt-6"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </div>
            </div>

            {/* SECTION: Classification */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.strCategory} value={cat.strCategory}>
                        {cat.strCategory}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Area
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  >
                    <option value="">Select Area</option>
                    {areas.map((area) => (
                      <option key={area.strArea} value={area.strArea}>
                        {area.strArea}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION: Content */}
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ingredients
                </label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  rows="4"
                  placeholder="1 cup sugar, 2 eggs, 1 tsp vanilla"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Step 1: ..."
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Footer */}
            <div className="justify-center bg-white">
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold shadow hover:scale-[1.02] transition"
              >
                {mode === "add" ? "Add Recipe" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecipeForm;
