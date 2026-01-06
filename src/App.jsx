import Header from './components/Header'
import Footer from './components/Footer'
import RecipeList from './components/RecipeList'
import { RecipeProvider } from './contexts/RecipeContext'
import './App.css'

function App() {
  return (
    <RecipeProvider>
      <div>
        <Header />
        <div className="mt-[50px]">
          <h1 className="text-center font-bold text-3xl mb-8">Recipe App</h1>
          <RecipeList />
        </div>
        <Footer />
      </div>
    </RecipeProvider>
  )
}

export default App
