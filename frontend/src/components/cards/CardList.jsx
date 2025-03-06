import React, { useState, useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const CardList = ({ cardset, onCardUpdate, onCardDelete }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [updatedCard, setUpdatedCard] = useState({ question: "", answer: "" });
  const [errors, setErrors] = useState([]);
  const { accessToken } = useContext(AuthContext);

  const handleEditClick = (card) => {
    setIsEditing(card.card_id);
    setUpdatedCard({ question: card.question, answer: card.answer });
    setErrors([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const validateCard = () => {
    const newErrors = [];
    if (updatedCard.question.length < 4) {
      newErrors.push("Question must be at least 4 characters long.");
    }
    if (updatedCard.question.length > 255) {
      newErrors.push("Question cannot be longer than 255 characters.");
    }
    if (updatedCard.answer.length < 2) {
      newErrors.push("Answer must be at least 2 characters long.");
    }
    if (updatedCard.answer.length > 255) {
      newErrors.push("Answer cannot be longer than 255 characters.");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleDeleteCard = async (setId, cardId) => {
    try {
      await axios.delete(`/api/cards/delete/${setId}/${cardId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onCardDelete(cardId);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error deleting the card:", error);
      }
    }
  };

  const handleUpdateCard = async (cardId) => {
    if (!validateCard()) {
      return;
    }

    try {
      await axios.put(
        `/api/cards/update/${cardset.card_set_id}/${cardId}`,
        updatedCard,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setIsEditing(null);
      setUpdatedCard({ question: "", answer: "" });
      onCardUpdate({ ...updatedCard, card_id: cardId });
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error updating the card:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-navy-700 mb-4">Added Cards</h3>
      {cardset.cards.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {cardset.cards.map((card) => (
            <li
              key={card.card_id}
              className="py-4 px-4 mb-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
            >
              {isEditing === card.card_id ? (
                <div>
                  <div>
                    <label
                      htmlFor={`question-${card.card_id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Question
                    </label>
                    <input
                      type="text"
                      id={`question-${card.card_id}`}
                      name="question"
                      value={updatedCard.question}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`answer-${card.card_id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Answer
                    </label>
                    <textarea
                      id={`answer-${card.card_id}`}
                      name="answer"
                      value={updatedCard.answer}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none"
                    />
                  </div>
                  {errors.length > 0 && (
                    <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded-md">
                      <ul className="text-red-700">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => setIsEditing(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <div className="flex flex-row space-x-2">
                      <button
                        onClick={() => handleUpdateCard(card.card_id)}
                        className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 focus:ring-2 focus:ring-navy-500"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => handleDeleteCard(cardset.card_set_id, card.card_id)}
                        className="text-red-500 hover:text-red-700 flex items-center space-x-2"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">Question:</span> {card.question}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-bold">Answer:</span> {card.answer}
                  </p>
                  <button
                    onClick={() => handleEditClick(card)}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No cards added yet.</p>
      )}
    </div>
  );
};

export default CardList;