
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-5">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/color_logo_no_background_2.svg"
            alt="DÖRING Consulting Logo"
            className="h-[3.25rem] w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6 text-[1.05rem] font-medium text-gray-800">
          <Link to="/about">Über mich</Link>
          <Link to="/services">Leistungen</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/kontakt">Kontakt</Link>
        </nav>

        {/* Language Switch Button */}
        <div className="flex items-center justify-center">
          <div className="flex border border-[var(--gold)] rounded-full overflow-hidden">
            <button className="px-4 py-1 text-[var(--gold)] hover:bg-gray-100">DE</button>
            <div className="w-px bg-[var(--gold)]" />
            <button className="px-4 py-1 text-[var(--gold)] hover:bg-gray-100">EN</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
