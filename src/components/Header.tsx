
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-5">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src="/images/color_logo_no_background_2.svg"
            alt="DÖRING Consulting Logo"
            className="h-14 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6 text-base font-medium text-gray-800">
          <Link to="/about" className="hover:text-gold transition">Über mich</Link>
          <Link to="/services" className="hover:text-gold transition">Leistungen</Link>
          <Link to="/downloads" className="hover:text-gold transition">Downloads</Link>
          <Link to="/kontakt" className="hover:text-gold transition">Kontakt</Link>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center justify-center">
          <div className="flex border border-[#C5A46D] rounded-full overflow-hidden">
            <button className="px-4 py-1 text-[#C5A46D] hover:bg-gray-100">DE</button>
            <div className="w-px bg-[#C5A46D]" />
            <button className="px-4 py-1 text-[#C5A46D] hover:bg-gray-100">EN</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
