import React, { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // Load recipes from localStorage on mount and fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, areaRes, ingRes] = await Promise.all([
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        ]);
        const catData = await catRes.json();
        const areaData = await areaRes.json();
        const ingData = await ingRes.json();
        setCategories(catData.meals || []);
        setAreas(areaData.meals || []);
        setIngredients(ingData.meals || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const loadRecipes = async () => {
      const storedRecipes = localStorage.getItem('recipes');
      let recipes = [];
      if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
        setRecipes(recipes);
      }

      // Always fetch some random meals as sample recipes if not already present
      try {
        const randomMeals = [];
        for (let i = 0; i < 20; i++) {
          const mealRes = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
          const mealData = await mealRes.json();
          if (mealData.meals && mealData.meals[0]) {
            const meal = mealData.meals[0];
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
            // Add if not already in recipes
            if (!recipes.find(r => r.id === apiRecipe.id)) {
              randomMeals.push(apiRecipe);
            }
          }
        }
        if (randomMeals.length > 0) {
          const updatedRecipes = [...recipes, ...randomMeals];
          setRecipes(updatedRecipes);
          localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchData();
    loadRecipes();
  }, []);

  // Save recipes to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now().toString(), favorite: false };
    setRecipes([...recipes, newRecipe]);
  };

  const updateRecipe = (id, updatedRecipe) => {
    setRecipes(recipes.map(recipe => recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe));
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  const toggleFavorite = (id) => {
    setRecipes(recipes.map(recipe => recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RecipeContext.Provider value={{
      recipes: filteredRecipes,
      searchTerm,
      setSearchTerm,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      toggleFavorite,
      categories,
      areas,
      ingredients
    }}>
      {children}
    </RecipeContext.Provider>
  );
};