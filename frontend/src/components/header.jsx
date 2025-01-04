import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white p-4">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">FlipFlow</h1>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link to="/overview" className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors">
              Overview
            </Link>
            <Link to="/quiz" className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors">
              Play
            </Link>
            <Link to="/cards" className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors">
              MyCards
            </Link>
          </div>
          <input type="search" className="bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring focus:ring-blue-500" placeholder="Search..." />
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX className="text-white" size={24} /> : <FiMenu className="text-white" size={24} />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white flex flex-col items-center space-y-4 mt-4">
          <Link to="/overview" className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors">
            Overview
          </Link>
          <Link to="/quiz" className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors">
            Play
          </Link>
          <Link to="/cards" className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors">
            MyCards
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
