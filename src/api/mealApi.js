const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

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
        ingredients: ingredients.filter(i => i),
        instructions: meal.strInstructions,
        favorite: false
      };
      meals.push(apiRecipe);
    }
  }
  return meals;
};