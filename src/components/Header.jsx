function Header() {
  return (
    <header
      className="relative w-full h-[480px] bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.85)
          ),
          url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')
        `,
      }}
    >
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-10 py-6">
        {/* Brand */}
        <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow-md">
          Nadine’s Kitchen
        </h1>

        {/* Home link */}
        <a
          href="#"
          className="
            text-white text-sm font-semibold
            px-5 py-2 rounded-full
            bg-white/20
            backdrop-blur-md
            border border-white/30
            hover:bg-white/30
            hover:scale-105
            transition-all duration-300
          "
        >
          Home
        </a>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className=" rounded-2xl px-10 py-8 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
            Discover Delicious Recipes
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow">
            Simple, tasty meals made easy — explore recipes from around the
            world.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
