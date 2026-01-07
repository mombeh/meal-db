import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateMealPlan } from '../api/mealApi';

// Async thunk for generating meal plan
export const generateMealPlanAsync = createAsyncThunk(
  'mealPlan/generateMealPlan',
  async (params, { rejectWithValue }) => {
    try {
      const mealPlan = await generateMealPlan(params);
      return mealPlan;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState: {
    currentPlan: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMealPlan: (state) => {
      state.currentPlan = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateMealPlanAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateMealPlanAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload;
      })
      .addCase(generateMealPlanAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMealPlan } = mealPlanSlice.actions;
export default mealPlanSlice.reducer;