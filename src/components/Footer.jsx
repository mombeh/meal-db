import { Heart, Home } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-24 bg-[#f7ebe9] border-t border-[#e6cfc9]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* App name */}
        <p className="text-lg font-semibold text-gray-800">
          Nadine’s Meal DB
        </p>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-700 text-sm">
          <a
            href="#"
            className="flex items-center gap-1 hover:text-[#c06c63] transition"
          >
            <Home size={16} />
            Home
          </a>

          <a
            href="#"
            className="flex items-center gap-1 hover:text-[#c06c63] transition"
          >
            <Heart size={16} />
            Favorites
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Nadine’s Meal DB
        </p>
      </div>
    </footer>
  );
}

export default Footer;
