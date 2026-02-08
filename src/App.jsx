import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import MealPlanner from "./components/MealPlanner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />

          <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                      Discover Recipes
                    </h1>

                    <RecipeList />
                  </>
                }
              />
              <Route
                path="/meal-planner"
                element={
                  <>
                    <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                      Meal Planner
                    </h1>

                    <MealPlanner />
                  </>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
