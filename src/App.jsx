import { useEffect, useState } from 'react'
import ListItem from './components/ListItem'
import Basket from './components/Basket'
import Header from './components/Header'
import './App.css'
import Footer from './components/Footer'

function App() {
  const groceries = [
    {
      id: 1,
      name: 'Gari and Eru',
      description: 'It is so delicious come and have a taste of it',
      price: 2.50,
      image: 'https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/userfiles/57401/Eru.png',
    },
    {
      id: 2,
      name: 'Bananas',
      description: 'Soft, sweet and reconfortable',
      price: 1.20,
      image: 'https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6IjQwMDBkOWQxODAzNTQzOWIzNTRkMTM0Yzg0NzZhNjFiIiwic3RvcmFnZSI6InB1YmxpY19zdG9yZSJ9?signature=1f9ff610dcf16db66520535b5486ac743ef10be7766d32b1f02c8cd959b31703',
    },
    {
      id: 3,
      name: 'Eggs',
      description: 'Healthy, Powerful and Important in our system',
      price: 3.99,
      image: 'https://png.pngtree.com/png-vector/20240907/ourmid/pngtree-basket-of-eggs-in-high-resolution-3d-render-png-image_13783450.png',
    },
    {
      id: 4,
      name: 'carrot',
      description: 'Sweet and Healthy, and Fresh',
      price: 4.50,
      image: 'https://5.imimg.com/data5/UQ/UI/RY/SELLER-21442513/carrot-500x500.png',
    },
    {
      id: 5,
      name: 'Appel',
      description: 'Very sweet and healthy',
      price: 5.99,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/023/290/773/small_2x/fresh-red-apple-isolated-on-transparent-background-generative-ai-png.png',
    },
    {
      id: 6,
      name: 'Heels',
      description: 'Make your legs confortable',
      price: 7.50,
      image: 'https://images.ctfassets.net/hhv516v5f7sj/4LsZ21x73pMLFGQaxC0EOm/44e25e476c96b886ff5690d5528fe3c3/Product_Carousel-ITALIAN_SAUSAGE-Rev2_2x.webp?w=3840&q=75&fm=webp',
    },
    {
      id: 7,
      name: 'Chicken',
      description: 'Healthy chicken, cheep price',
      price: 4.29,
      image: 'https://www.king-david-afroshop.de/wp-content/uploads/2018/04/smoked-turkey-wigs.png',
    },
    {
      id: 8,
      name: 'Eru source',
      description: 'Delicious meal recipe cheep price',
      price: 1.89,
      image: 'https://letawuik.insight.cg/web/image/product.template/136/image_1024?unique=a4d66a1',
    },
    {
      id: 9,
      name: 'vegetable Salad',
      description: 'Very good for our system  have a taste',
      price: 4.99,
      image: 'https://www.chipotle.com/content/dam/chipotle/menu/meal-types/salad/web-mobile/order.png',
    },
  ]

  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      console.log("Executing with time render: ", new Date)
      setCount((count) => count + 1)
    }
      , 1000)
  }, [count])

  useEffect(() => {

    console.warn("Executing without rerender : ", new Date())
  }, [])


  useEffect(() => {

    console.warn("Executing with rerender: ", new Date())
  }, [])







  const [basket, setBasket] = useState([])
  const addProduct = (id, quantity) => {
    const product = groceries.find((product) => product.id === id);

    const newBasket = [...basket];

    const index = newBasket.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      newBasket[index].quantity += quantity;

      if (newBasket[index].quantity <= 0) {
        newBasket.splice(index, 1);
      }

    } else if (quantity > 0) {
      newBasket.push({
        ...product,
        quantity: quantity,
      });
    }

    setBasket(newBasket);
  }
  return (
    <div >
      <Header />
      <div className="root-container">
        <h1> Quality Food Recipe</h1>
        <div className="all">
          <div className="objects">
            {groceries.map((product) => (
              <ListItem
                key={product.id}
                product={product}
                onAddProduct={addProduct}
              />
            ))}
          </div>
          <Basket basket={basket} />

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
