import Header from './components/Header';
import Footer from './components/Footer';
import RecipeList from './components/RecipeList';
import { RecipeProvider } from './contexts/RecipeContext';

function App() {
  return (
    <RecipeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

       <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
  <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">
    Discover Recipes
  </h1>

  <RecipeList />
</main>


        <Footer />
      </div>
    </RecipeProvider>
  );
}

export default App;
