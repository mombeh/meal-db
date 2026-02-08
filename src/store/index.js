import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import recipesReducer from './recipesSlice';
import mealPlanReducer from './mealPlanSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userRecipes'], // Only persist user recipes
};

const persistedReducer = persistReducer(persistConfig, recipesReducer);

export const store = configureStore({
  reducer: {
    recipes: persistedReducer,
    mealPlan: mealPlanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);