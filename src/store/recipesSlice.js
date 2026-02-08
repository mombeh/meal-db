import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories, fetchAreas, fetchIngredients, fetchRandomMeals } from '../api/mealApi';

// Async thunks
export const loadInitialData = createAsyncThunk(
  'recipes/loadInitialData',
  async (_, { getState }) => {
    const [categories, areas, ingredients] = await Promise.all([
      fetchCategories(),
      fetchAreas(),
      fetchIngredients()
    ]);
    return { categories, areas, ingredients };
  }
);

export const loadRecipes = createAsyncThunk(
  'recipes/loadRecipes',
  async (_, { getState }) => {
    const recipes = await fetchRandomMeals(20); // Reduce to 10 for speed
    return recipes;
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    apiRecipes: [],
    userRecipes: [],
    searchTerm: '',
    categories: [],
    areas: [],
    ingredients: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addRecipe: (state, action) => {
      const newRecipe = { ...action.payload, id: Date.now().toString(), favorite: false };
      state.userRecipes.push(newRecipe);
    },
    updateRecipe: (state, action) => {
      const { id, updatedRecipe } = action.payload;
      const index = state.userRecipes.findIndex(recipe => recipe.id === id);
      if (index !== -1) {
        state.userRecipes[index] = { ...state.userRecipes[index], ...updatedRecipe };
      }
    },
    deleteRecipe: (state, action) => {
      state.userRecipes = state.userRecipes.filter(recipe => recipe.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const recipe = [...state.apiRecipes, ...state.userRecipes].find(recipe => recipe.id === action.payload);
      if (recipe) {
        recipe.favorite = !recipe.favorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInitialData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadInitialData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.areas = action.payload.areas;
        state.ingredients = action.payload.ingredients;
      })
      .addCase(loadInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.apiRecipes = action.payload;
      })
      .addCase(loadRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, addRecipe, updateRecipe, deleteRecipe, toggleFavorite } = recipesSlice.actions;

export const selectFilteredRecipes = (state) =>
  [...state.recipes.apiRecipes, ...state.recipes.userRecipes].filter(recipe =>
    recipe.name.toLowerCase().includes(state.recipes.searchTerm.toLowerCase())
  );

export default recipesSlice.reducer;