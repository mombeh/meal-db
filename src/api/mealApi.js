const API_BASE = "https://www.themealdb.com/api/json/v1/1";

// Edamam API credentials
const MEAL_PLANNER_APP_ID = import.meta.env.VITE_APP_ID_MEAL_PLANNER;
const MEAL_PLANNER_APP_KEY = import.meta.env.VITE_APP_KEY_MEAL_PLANNER;
const NUTRITION_APP_ID = import.meta.env.VITE_APP_ID_NUTRITION;
const NUTRITION_APP_KEY = import.meta.env.VITE_APP_KEY_NUTRITION;

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/list.php?c=list`);
  const data = await res.json();
  return data.meals || [];
};

export const fetchAreas = async () => {
  const res = await fetch(`${API_BASE}/list.php?a=list`);
  const data = await res.json();
  return data.meals || [];
};

export const fetchIngredients = async () => {
  const res = await fetch(`${API_BASE}/list.php?i=list`);
  const data = await res.json();
  return data.meals || [];
};

export const fetchRandomMeal = async () => {
  const res = await fetch(`${API_BASE}/random.php`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
};

export const fetchRandomMeals = async (count = 20) => {
  const meals = [];
  for (let i = 0; i < count; i++) {
    const meal = await fetchRandomMeal();
    if (meal) {
      const ingredients = [];
      for (let j = 1; j <= 20; j++) {
        const ing = meal[`strIngredient${j}`];
        const measure = meal[`strMeasure${j}`];
        if (ing && ing.trim()) {
          ingredients.push(`${measure} ${ing}`.trim());
        }
      }
      const apiRecipe = {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        area: meal.strArea,
        ingredients: ingredients.filter((i) => i),
        instructions: meal.strInstructions,
        favorite: false,
      };
      meals.push(apiRecipe);
    }
  }
  return meals;
};

export const generateMealPlan = async (params = {}) => {
  const url =
    `https://api.edamam.com/api/meal-planner/v1/${MEAL_PLANNER_APP_ID}/select` +
    `?app_id=${MEAL_PLANNER_APP_ID}&app_key=${MEAL_PLANNER_APP_KEY}`;

  const body = {
    size: params.size || 7,
    plan: {
      accept: {
        all: [
          ...(params.health?.length ? [{ health: params.health }] : []),
          ...(params.diet ? [{ diet: [params.diet] }] : []),
        ],
      },
      fit: {
        ENERC_KCAL: {
          min: params.minCalories ?? 0,
          max: params.maxCalories ?? 3000,
        },
      },
      sections: {
        Breakfast: {},
        Lunch: {},
        Dinner: {},
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Edamam-Account-User": "frontend_user_001",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Meal Planner Error:", text);
    throw new Error(`Meal Planner API error: ${response.status}`);
  }

  return response.json();
};

export const analyzeNutrition = async (ingredients) => {
  const url = `https://api.edamam.com/api/nutrition-details?app_id=${NUTRITION_APP_ID}&app_key=${NUTRITION_APP_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Custom Recipe",
      ingr: ingredients,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Nutrition API error: ${response.status}`);
  }

  const data = await response.json();

  // Check if the API returned an error message
  if (data.message) {
    throw new Error(`Error analyzing nutrition: ${data.message}`);
  }

  // Ensure we have the expected structure even if API doesn't provide complete data
  if (!data.calories) {
    data.calories = 0; // Default to 0 if not provided
  }
  if (!data.totalNutrients) {
    data.totalNutrients = {}; // Empty object if not provided
  }

  // If we have cautions, log them but don't fail
  if (data.cautions && data.cautions.length > 0) {
    console.warn("API returned cautions:", data.cautions);
  }

  // If we have data but also cautions, log them for debugging
  if (data.cautions && data.cautions.length > 0) {
    console.warn("API returned cautions:", data.cautions);
  }

  return data;
};
