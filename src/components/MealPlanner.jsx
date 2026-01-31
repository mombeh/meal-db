import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateMealPlanAsync, clearMealPlan } from "../store/mealPlanSlice";

const MealPlanner = () => {
  const dispatch = useDispatch();
  const { currentPlan, loading, error } = useSelector(
    (state) => state.mealPlan
  );

  const [params, setParams] = useState({
    diet: "",
    health: [],
    minCalories: 0,
    maxCalories: 3000,
    size: 7,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleHealthChange = (e) => {
    const { value, checked } = e.target;
    setParams((prev) => ({
      ...prev,
      health: checked
        ? [...prev.health, value]
        : prev.health.filter((h) => h !== value),
    }));
  };

  const handleGenerate = () => {
    dispatch(generateMealPlanAsync(params));
  };

  const handleClear = () => {
    dispatch(clearMealPlan());
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Meal Planner</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Diet</label>
        <select
          name="diet"
          value={params.diet}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Any</option>
          <option value="balanced">Balanced</option>
          <option value="high-protein">High Protein</option>
          <option value="low-carb">Low Carb</option>
          <option value="low-fat">Low Fat</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Health Restrictions
        </label>
        <div className="flex flex-wrap gap-2">
          {["vegan", "vegetarian", "gluten-free", "dairy-free"].map(
            (health) => (
              <label key={health} className="flex items-center">
                <input
                  type="checkbox"
                  value={health}
                  checked={params.health.includes(health)}
                  onChange={handleHealthChange}
                  className="mr-2"
                />
                {health}
              </label>
            )
          )}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Min Calories</label>
          <input
            type="number"
            name="minCalories"
            value={params.minCalories}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Max Calories</label>
          <input
            type="number"
            name="maxCalories"
            value={params.maxCalories}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Number of Meals
          </label>
          <input
            type="number"
            name="size"
            value={params.size}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
        {currentPlan && (
          <button
            onClick={handleClear}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Plan
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {currentPlan && (
        <div>
          <h3 className="text-xl font-bold mb-2">Your Meal Plan</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPlan.selection.map((day, dayIndex) => (
              <div key={dayIndex} className="border p-4 rounded">
                <h4 className="font-bold mb-3">Day {dayIndex + 1}</h4>

                {Object.entries(day.sections).map(([mealType, mealData]) => (
                  <div key={mealType} className="mb-4">
                    <h5 className="font-semibold text-blue-600">{mealType}</h5>

                    {Array.isArray(mealData.assigned) && mealData.assigned.length > 0 ?(
                      mealData.assigned.map((item, i) => (
                        <div key={i} className="ml-2 text-sm">
                          <p className="font-medium">{item.recipe.label}</p>
                          <p>Calories: {item.recipe.calories?.toFixed(0)}</p>
                          <a
                            href={item.recipe.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View Recipe
                          </a>
                        </div>
                      ))
                    ) : (
                      <p className="ml-2 text-sm text-gray-500">No meal assigned.</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
