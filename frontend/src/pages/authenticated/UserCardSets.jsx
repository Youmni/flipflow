import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";

const Cards = () => {
  const [loading, setLoading] = useState(true);
  const [cardset, setCardset] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { accessToken } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const limit = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/cardsets/${userId}`, {
          params: {
            search,
            limit,
            offset: (currentPage - 1) * limit,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTotalPages(Math.ceil(response.data.metadata.count / limit));
        setCardset(response.data.cardSets);
      } catch (error) {
        console.error("Fout bij het ophalen van de kaartsets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, currentPage, userId]);

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

  const handleAddCardClick = (id) => {
    navigate(`/cardset/${id}/add`);
  };

  const handleAddCardsetClick = (id) => {
    navigate(`/cardset/add`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col ">
        <button
          onClick={handleAddCardsetClick}
          className="text-green-600 underline hover:text-green-800 text-end mb-4"
        >
          Add cards
        </button>{" "}
        <div className="relative mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-300"
            placeholder="Search by title, description or tag..."
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
            <span className="material-icons">search</span>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardset.length > 0 ? (
            cardset.map((card) => (
              <div
                key={card.id}
                className="bg-white p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleAddCardClick(card.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3 truncate">
                  {card.title || "Card Title"}
                </h2>
                <p className="text-gray-600 mb-4 text-sm truncate">
                  {card.description || "No description available."}
                </p>
                <p className="text-gray-500 text-sm truncate">
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
      )}

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

export default Cards;
