import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../components/authProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const limit = 10;

  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search) {
        try {
          const response = await axios.get("/api/cardsets/", {
            params: { search, limit },
          });
          setSuggestions(response.data.cardSets);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [search]);

  return (
    <div className="bg-gray-800 text-white p-4">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">FlipFlow</h1>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link
              to="/overview"
              className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors"
            >
              Overview
            </Link>

            {accessToken ? (
              <Link
                to="/cards"
                className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors"
              >
                MyCards
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors"
              >
                Inloggen
              </Link>
            )}
          </div>

          <div className="relative">
            <input
              type="search"
              className="bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-gray-700 text-white mt-1 rounded-lg shadow-lg w-full z-10">
                {suggestions.map((suggestion) => (
                  <li
                    onClick={() => navigate(`/cardsets/${suggestion.id}`)}
                    key={suggestion.id}
                    className="p-2 hover:bg-gray-600 cursor-pointer"
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="text-white" size={24} />
            ) : (
              <FiMenu className="text-white" size={24} />
            )}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white flex flex-col items-center space-y-4 mt-4">
          <Link
            to="/overview"
            className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors"
          >
            Overview
          </Link>
          <Link
            to="/quiz"
            className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors"
          >
            Play
          </Link>

          {accessToken ? (
            <Link
              to="/cards"
              className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors"
            >
              MyCards
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-200 hover:text-blue-500 py-2 px-4 rounded-lg transition-colors"
            >
              Inloggen
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
