import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteRecipe, toggleFavorite } from "../store/recipesSlice";
import { analyzeNutrition } from "../api/mealApi";

const RecipeDialog = ({ recipe, onClose, onEdit }) => {
  const dispatch = useDispatch();
  const [nutritionData, setNutritionData] = useState(null);
  const [analyzingNutrition, setAnalyzingNutrition] = useState(false);
  const [nutritionError, setNutritionError] = useState(null);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(recipe.id));
      onClose();
    }
  };
const normalizeIngredients = (ingredients) => {
  return ingredients
    .filter((ing) => !/to serve|optional|garnish/i.test(ing))
    .map((ing) =>
      ing
        .toLowerCase()
        .replace(/finely chopped|chopped|fresh|ground/gi, "")
        .replace(/packet|bunch/gi, "100 g")
        .replace(/part|inch/gi, "5 g")
        .replace(/tsp/gi, " teaspoon ")
        .replace(/tbsp/gi, " tablespoon ")
        .replace(/p(\d+)/gi, "$1") // Remove 'p' prefix from numbers
        // Convert unrealistic large quantities to reasonable amounts
        .replace(/(\d+(?:\.\d+)?)\s*kg/gi, (match, num) => {
          const kg = parseFloat(num);
          return kg > 1 ? `${Math.min(kg * 100, 500)} g` : `${kg * 1000} g`;
        })
        .replace(/(\d+(?:\.\d+)?)\s*qt/gi, (match, num) => {
          const qt = parseFloat(num);
          return qt > 1 ? `${Math.min(qt * 500, 1000)} ml` : `${qt * 946} ml`;
        })
        .replace(/\s+/g, " ")
        .trim()
    )
    .map((ing) => (/\d/.test(ing) ? ing : `100 g ${ing}`));
};


  const handleAnalyzeNutrition = async () => {
    const cleanIngredients = normalizeIngredients(recipe.ingredients);
    const cacheKey = `nutrition_${recipe.id}_${cleanIngredients.join("|")}`;

    console.log("CLEAN INGREDIENTS:", cleanIngredients);

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setNutritionData(JSON.parse(cached));
      return;
    }

    setAnalyzingNutrition(true);
    setNutritionError(null);

    try {
      const data = await analyzeNutrition(cleanIngredients);

      // Allow partial data - API might return calories but no nutrients, or vice versa
      if (!data.calories && Object.keys(data.totalNutrients || {}).length === 0) {
        console.warn("Incomplete nutrition data returned from API");
      }

      setNutritionData(data);
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (err) {
      setNutritionError(err.message);
    } finally {
      setAnalyzingNutrition(false);
    }
  };

  useEffect(() => {
    setNutritionData(null);
    setNutritionError(null);
  }, [recipe.id]);

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
              onClick={() => dispatch(toggleFavorite(recipe.id))}
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

          {/* Nutrition Analysis */}
          {nutritionData && (
            <section className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Nutrition Facts
              </h3>
              {(nutritionData.calories === 0 || Object.keys(nutritionData.totalNutrients || {}).length === 0) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                  <p className="text-yellow-700 text-sm">
                    ⚠️ Some nutrition data may be incomplete or unavailable for these ingredients.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="border p-4 rounded bg-green-50">
                  <h4 className="font-semibold text-green-800">Calories</h4>
                  <p className="text-lg">
                    {nutritionData.calories?.toFixed(0) || "N/A"} kcal
                  </p>
                </div>
                <div className="border p-4 rounded bg-blue-50">
                  <h4 className="font-semibold text-blue-800">Protein</h4>
                  <p className="text-lg">
                    {nutritionData.totalNutrients?.PROCNT?.quantity?.toFixed(
                      1
                    ) || "N/A"}{" "}
                    g
                  </p>
                </div>
                <div className="border p-4 rounded bg-yellow-50">
                  <h4 className="font-semibold text-yellow-800">Carbs</h4>
                  <p className="text-lg">
                    {nutritionData.totalNutrients?.CHOCDF?.quantity?.toFixed(
                      1
                    ) || "N/A"}{" "}
                    g
                  </p>
                </div>
                <div className="border p-4 rounded bg-red-50">
                  <h4 className="font-semibold text-red-800">Fat</h4>
                  <p className="text-lg">
                    {nutritionData.totalNutrients?.FAT?.quantity?.toFixed(1) ||
                      "N/A"}{" "}
                    g
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Detailed Nutrients</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {nutritionData.totalNutrients &&
                    Object.entries(nutritionData.totalNutrients).map(
                      ([key, nutrient]) => (
                        <div key={key} className="text-sm border-b pb-1">
                          {nutrient.label}: {nutrient.quantity.toFixed(1)}{" "}
                          {nutrient.unit}
                        </div>
                      )
                    )}
                </div>
              </div>
            </section>
          )}

          {nutritionError && (
            <section className="mb-10">
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-600">
                  Error analyzing nutrition: {nutritionError}
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Sticky footer */}
        <div className="flex gap-4 bg-white p-4">
          <button
            onClick={handleAnalyzeNutrition}
            disabled={analyzingNutrition}
            className="flex-1 py-3 rounded-md bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow transition disabled:opacity-50"
          >
            {analyzingNutrition ? "Analyzing..." : "Analyze Nutrition"}
          </button>
          <button
            onClick={onEdit}
            className="flex-1 py-3 rounded-md bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold shadow transition"
          >
            Edit Recipe
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeDialog;
