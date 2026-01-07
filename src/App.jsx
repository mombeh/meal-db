import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import MealPlanner from "./components/MealPlanner";
import NutritionDisplay from "./components/NutritionDisplay";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />

          <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">
              Discover Recipes
            </h1>

            <RecipeList />

            <div className="mt-16">
              <MealPlanner />
            </div>

            <div className="mt-16">
              <NutritionDisplay />
            </div>
          </main>

          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
