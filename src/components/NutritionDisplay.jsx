import React, { useState } from 'react';
import { analyzeNutrition } from '../api/mealApi';

const NutritionDisplay = () => {
  const [ingredients, setIngredients] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleAnalyze = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const ingrArray = ingredients.split('\n').filter((ing) => ing.trim());
      const normalizedIngr = normalizeIngredients(ingrArray);
      const data = await analyzeNutrition(normalizedIngr);
      setNutritionData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setNutritionData(null);
    setIngredients('');
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Nutrition Analysis</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Enter ingredients (one per line)
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g.&#10;1 cup rice&#10;2 eggs&#10;100g chicken breast"
          className="w-full p-2 border rounded h-32"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={handleAnalyze}
          disabled={loading || !ingredients.trim()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Nutrition'}
        </button>
        {nutritionData && (
          <button
            onClick={clearData}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {nutritionData && (
        <div>
          <h3 className="text-xl font-bold mb-2">Nutrition Facts</h3>
          {(nutritionData.calories === 0 || Object.keys(nutritionData.totalNutrients || {}).length === 0) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
              <p className="text-yellow-700 text-sm">
                ⚠️ Some nutrition data may be incomplete or unavailable for these ingredients.
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border p-4 rounded">
            <h4 className="font-semibold">Calories</h4>
            <p>{nutritionData.calories ? nutritionData.calories.toFixed(0) : 'N/A'} kcal</p>
          </div>
          <div className="border p-4 rounded">
            <h4 className="font-semibold">Protein</h4>
            <p>{nutritionData.totalNutrients?.PROCNT?.quantity ? nutritionData.totalNutrients.PROCNT.quantity.toFixed(1) : 'N/A'} g</p>
          </div>
          <div className="border p-4 rounded">
            <h4 className="font-semibold">Carbs</h4>
            <p>{nutritionData.totalNutrients?.CHOCDF?.quantity ? nutritionData.totalNutrients.CHOCDF.quantity.toFixed(1) : 'N/A'} g</p>
          </div>
          <div className="border p-4 rounded">
            <h4 className="font-semibold">Fat</h4>
            <p>{nutritionData.totalNutrients?.FAT?.quantity ? nutritionData.totalNutrients.FAT.quantity.toFixed(1) : 'N/A'} g</p>
          </div>
        </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Detailed Nutrients</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {nutritionData.totalNutrients &&
                Object.entries(nutritionData.totalNutrients).map(([key, nutrient]) => (
                  <div key={key} className="text-sm">
                    {nutrient.label}: {nutrient.quantity.toFixed(1)} {nutrient.unit}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionDisplay;