import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const limit = 10;

  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.title);
    setSuggestions([]);
    navigate(`/cardsets/${suggestion.id}`);
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">FlipFlow</h1>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="px-5 py-2 hover:font-semibold rounded hover:bg-white hover:text-black transition duration-300">Home</Link>
          <Link to={accessToken!==null ? "/cards" : "/login"} className="px-5 py-2 hover:font-semibold rounded hover:bg-white hover:text-black transition duration-300">Create</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-md text-black"
              placeholder="Search..."
            />
            {suggestions.length > 0 && (
              <ul ref={suggestionsRef} className="absolute bg-white text-black w-full mt-2 rounded-md shadow-lg z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl md:hidden">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="mt-4 md:hidden flex flex-col space-y-2">
          <Link to="/" className="py-2 hover:font-semibold hover:bg-white hover:text-black transition duration-300">Home</Link>
          <Link to={accessToken!==null ? "/cards" : "/login"} className="py-2 hover:font-semibold hover:bg-white hover:text-black transition duration-300">Create</Link>
        </div>
      )}
    </div>
  );
};

export default Header;