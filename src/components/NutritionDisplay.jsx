import React, { useState } from 'react';
import { analyzeNutrition } from '../api/mealApi';

const NutritionDisplay = () => {
  const [ingredients, setIngredients] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const ingrArray = ingredients.split('\n').filter((ing) => ing.trim());
      const data = await analyzeNutrition(ingrArray);
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border p-4 rounded">
              <h4 className="font-semibold">Calories</h4>
              <p>{nutritionData.calories?.toFixed(0) || 'N/A'} kcal</p>
            </div>
            <div className="border p-4 rounded">
              <h4 className="font-semibold">Protein</h4>
              <p>{nutritionData.totalNutrients?.PROCNT?.quantity?.toFixed(1) || 'N/A'} g</p>
            </div>
            <div className="border p-4 rounded">
              <h4 className="font-semibold">Carbs</h4>
              <p>{nutritionData.totalNutrients?.CHOCDF?.quantity?.toFixed(1) || 'N/A'} g</p>
            </div>
            <div className="border p-4 rounded">
              <h4 className="font-semibold">Fat</h4>
              <p>{nutritionData.totalNutrients?.FAT?.quantity?.toFixed(1) || 'N/A'} g</p>
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