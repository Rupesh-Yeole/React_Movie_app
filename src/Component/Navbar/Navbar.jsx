import { Link } from "react-router-dom";
import Logo from "../../assets/MovieLogo.png";
import { ThemeContext } from "../../App";
import { useContext, useState } from "react";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const backGroundColorClass = theme === "☀︎" ? "bg-white" : "bg-black";
  const boxBackgroundColorClass = theme === "☀︎" ? "bg-black" : "bg-gray-200";
  const boxTextColor = theme === "☀︎" ? "text-white" : "text-black";
  const HamburgerColor = theme === "☀︎" ? "text-black" : "text-white"
  const HamburgerBackgroundClass =theme === "☀︎" ? "bg-gray-100" : "bg-gray-950";

  return (
    <div
      className={`flex justify-between items-center px-6 py-4 ${backGroundColorClass}`}
    >
      {/* Logo */}
      <Link to="/">
        <img className="w-[43px] rounded-3xl" src={Logo} alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link
          className={`text-lg font-bold ${boxBackgroundColorClass} px-3 py-1 rounded-lg ${boxTextColor}`}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`text-lg font-bold ${boxBackgroundColorClass} px-3 py-1 rounded-lg ${boxTextColor}`}
          to="/watchList"
        >
          WatchList
        </Link>
        <button
          onClick={toggleTheme}
          className={`w-[40px] text-xl ${boxTextColor} flex justify-center items-center p-1.5 gap-5 ${boxBackgroundColorClass} rounded-3xl hover:scale-110 transition`}
        >
          {theme === "☀︎" ? "☀︎" : "⏾"}
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`${HamburgerColor} text-2xl`}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-[70px] left-0 w-full flex flex-col items-center space-y-4 
                    ${HamburgerBackgroundClass} shadow-lg md:hidden overflow-hidden
                    transition-all duration-500 ease-in-out
                    ${menuOpen ? "max-h-60 opacity-100 py-6" : "max-h-0 opacity-0 py-0"}`}
        >
        <Link
            className={`text-lg font-bold ${boxBackgroundColorClass} px-3 py-1 rounded-lg ${boxTextColor}`}
            to="/"
            onClick={() => setMenuOpen(false)}
        >
            Home
        </Link>
        <Link
            className={`text-lg font-bold ${boxBackgroundColorClass} px-3 py-1 rounded-lg ${boxTextColor}`}
            to="/watchList"
            onClick={() => setMenuOpen(false)}
        >
            WatchList
        </Link>
        <button
            onClick={() => {
            toggleTheme();
            setMenuOpen(false);
            }}
            className={`w-[40px] text-xl ${boxTextColor} flex justify-center items-center p-1.5 gap-5 
                        ${boxBackgroundColorClass} rounded-3xl hover:scale-110 transition`}
        >
            {theme === "☀︎" ? "☀︎" : "⏾"}
        </button>
        </div>

      
    </div>
  );
}

export default Navbar;
