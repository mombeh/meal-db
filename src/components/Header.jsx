import { NavLink } from "react-router-dom";

function Header() {
  const linkStyle = ({ isActive }) =>
    `text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300
     ${isActive ? "bg-white/30" : "hover:bg-white/20 hover:scale-105"}`;

  return (
    <header
      className="relative w-full h-[480px] bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)),
          url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')
        `,
      }}
    >
      <div className="relative z-10 flex items-center justify-between px-10 py-6">
        <h1 className="text-white text-2xl font-bold">
          Nadine’s Kitchen
        </h1>

        <nav className="flex gap-2">
          <NavLink to="/" className={linkStyle}>Home</NavLink>
          <NavLink to="/nutrition" className={linkStyle}>Nutrition Analysis</NavLink>
          <NavLink to="/meal-planner" className={linkStyle}>Meal Planner</NavLink>
        </nav>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-white">
            Discover Delicious Recipes
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Simple, tasty meals made easy.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
