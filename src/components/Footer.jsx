import { Heart, Home } from "lucide-react";

function Footer() {
  const HomeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3l9 8h-3v10H6V11H3z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-6.7-4.35-9.33-7.5C.6 10.9 2.3 6.5 6.5 6.5c2 0 3.5 1.2 4.5 2.5 1-1.3 2.5-2.5 4.5-2.5 4.2 0 5.9 4.4 3.83 7-2.63 3.15-9.33 7.5-9.33 7.5z" />
    </svg>
  );

  return (
    <footer className="mt-24 bg-[#f7ebe9] border-t border-[#e6cfc9]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* App name */}
        <p className="text-lg font-semibold text-gray-800">Nadine’s Meal DB</p>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-700 text-sm">
          <a
            href="#"
            className="flex items-center gap-1 hover:text-[#c06c63] transition"
          >
            <HomeIcon size={16} />
            Home
          </a>

          <a
            href="#"
            className="flex items-center gap-1 hover:text-[#c06c63] transition"
          >
            <HeartIcon size={16} />
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
