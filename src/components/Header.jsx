function Header() {
  return (
    <header className="relative w-full h-[550px] bg-cover bg-center">
      
      {/* Navigation */}
      <div className="flex justify-center items-center p-6 bg-[#b26363] bg-opacity-80">
        {/* <img src="https://images.squarespace-cdn.com/content/v1/6792991879aa0a268e72bfbc/49c8b43b-5000-49a0-9c31-c7684ad3f7e4/Nadine%27s+Main+web+logo.png" alt="Logo" className="h-16 w-16"/> */}
        <nav className="flex gap-8 text-white font-semibold text-lg">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </div>

      {/* Hero content */}
      {/* <div className="flex flex-col md:flex-row items-center justify-between px-8 mt-20 md:mt-32 gap-10">
        <div className="text-white max-w-md text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Taste the best that surprises you</h1>
          <p className="text-lg md:text-xl text-gray-100">An effective advertising slogan that gives an accurate picture of what your food is all about.</p>
        </div>
        <img src="https://diahcuisineonline.co.uk/wp-content/uploads/2021/02/Okro-soup.png" alt="Meal" className="w-[350px] md:w-[400px] rounded-lg shadow-lg"/>
      </div> */}
    </header>
  )
}


export default Header