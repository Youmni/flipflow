import React from "react";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [cardset, setCardset] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const limit = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/cardsets/", {
          params: { search, limit, offset: (currentPage - 1) * limit },
        });
        console.log(response.data.cardSets);
        setTotalPages(Math.ceil(response.data.metadata.count / limit));
        setCardset(response.data.cardSets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, currentPage]);

  const formatDate = (date) => {
    return moment(date).format("DD MMMM YYYY");
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/cardsets/${id}`);
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-300"
          placeholder="Search by title or description"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
          <span className="material-icons">search</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardset.length > 0 ? (
          cardset.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCardClick(card.id)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3 truncate">
                {card.title || "Card Title"}
              </h2>
              <p className="text-gray-600 mb-4 truncate">
                {card.description || "No description available."}
              </p>
              <p className="text-gray-500 text-sm">
                {card.created_at
                  ? formatDate(card.created_at)
                  : "No date available."}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-700 text-lg">
            No cards available.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => changePage(currentPage - 1)}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
        </button>
        <span className="text-gray-800">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Overview;
