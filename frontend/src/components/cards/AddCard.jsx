import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import AddCardForm from "../cards/AddCardForm";
import CardList from "./CardList";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCards = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const [cardset, setCardset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [cardsetErrors, setCardsetErrors] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedVisibility, setUpdatedVisibility] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCardset = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/cardsets/cards/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(data);
      setCardset(data);
      setUpdatedTitle(data.title);
      setUpdatedDescription(data.description);
      setUpdatedVisibility(data.visibility);
    } catch (error) {
      console.error("Error fetching the cardset:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardset();
  }, [id, accessToken, isModalOpen]);

  const validateCard = (card) => {
    const newErrors = [];
    if (card.question.length < 4) {
      newErrors.push("Question must be at least 4 characters long.");
    }
    if (card.question.length > 255) {
      newErrors.push("Question cannot be longer than 255 characters.");
    }
    if (card.answer.length < 2) {
      newErrors.push("Answer must be at least 2 characters long.");
    }
    if (card.answer.length > 255) {
      newErrors.push("Answer cannot be longer than 255 characters.");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateCardset = () => {
    const newErrors = [];
    if (updatedTitle.length < 4) {
      newErrors.push("Title must be at least 4 characters long.");
    }
    if (updatedTitle.length > 255) {
      newErrors.push("Title cannot be longer than 255 characters.");
    }
    if (updatedDescription.length < 15) {
      newErrors.push("Description must be at least 15 characters long.");
    }
    if (updatedDescription.length > 255) {
      newErrors.push("Description cannot be longer than 255 characters.");
    }
    setCardsetErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleAddCard = async (newCard) => {
    if (!validateCard(newCard)) {
      return;
    }
    try {
      await axios.post(
        `/api/cards/create/${id}`,
        {
          question: newCard.question,
          answer: newCard.answer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await fetchCardset();
      setNewCard({ question: "", answer: "" });
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error adding the card:", error);
      }
    }
  };

  const handleDeleteCardset = async (set_id) => {
    try {
      await axios.delete(`/api/cardsets/delete/${set_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate("/cards");
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error deleting the set:", error);
      }
    }
  };

  const handleUpdateCardset = async () => {
    if (!validateCardset()) {
      return;
    }
    const updatedData = {
      title: updatedTitle,
      description: updatedDescription,
      visibility: updatedVisibility,
    };
    try {
      await axios.put(`/api/cardsets/update/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchCardset();
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error updating the cardset:", error);
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleGoingBack = () => {
    navigate("/cards");
  };

  const handleCardUpdate = (updatedCard) => {
    setCardset((prevCardset) => {
      const updatedCards = prevCardset.cards.map((card) =>
        card.card_id === updatedCard.card_id ? updatedCard : card
      );
      return { ...prevCardset, cards: updatedCards };
    });
  };

  const handleCardDelete = (deletedCardId) => {
    setCardset((prevCardset) => {
      const updatedCards = prevCardset.cards.filter(
        (card) => card.card_id !== deletedCardId
      );
      return { ...prevCardset, cards: updatedCards };
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white border border-gray-300 rounded-lg shadow-md">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <p onClick={handleGoingBack} className="text-right underline hover:text-navy-500 cursor-pointer">
            Back
          </p>
          <h1 className="text-2xl font-bold text-center text-navy-700 mb-6">
            {cardset?.title || "Cardset"}
          </h1>
          <p className="text-gray-500 text-center mb-8">
            {cardset?.description || "No description available."}
          </p>
          <p className={`${cardset?.visibility === "public" ? "text-green-600" : "text-red-600"} text-center mb-8`}>
            {cardset?.visibility || "No description available."}
          </p>
          <div className="text-center mb-6">
            <button onClick={toggleModal} className="text-navy-600 hover:text-navy-800">
              <FiEdit className="inline-block mr-2" />
              Edit Cardset
            </button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Update Cardset</h2>
                  <button onClick={() => handleDeleteCardset(cardset?.card_set_id)} className="text-red-500 hover:text-red-700 flex items-center space-x-2">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                {cardsetErrors.length > 0 && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
                    <ul className="text-red-700">
                      {cardsetErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                      Visibility
                    </label>
                    <select
                      id="visibility"
                      value={updatedVisibility}
                      onChange={(e) => setUpdatedVisibility(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button onClick={toggleModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                      Cancel
                    </button>
                    <button onClick={handleUpdateCardset} className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 focus:ring-2 focus:ring-navy-500">
                      Update Cardset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {errors.length > 0 && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
              <ul className="text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AddCardForm onAddCard={handleAddCard} newCard={newCard} setNewCard={setNewCard} errors={errors} />
            <CardList cardset={cardset} onCardUpdate={handleCardUpdate} onCardDelete={handleCardDelete} />
          </div>
        </>
      )}
    </div>
  );
};

export default AddCards;
