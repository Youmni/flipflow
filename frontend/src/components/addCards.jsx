import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/authProvider";
import AddCardForm from "./addCardForm";
import CardList from "./cardList";
import { FiEdit } from "react-icons/fi";

const AddCards = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const [cardset, setCardset] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [cardsetErrors, setCardsetErrors] = useState([]); 
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCardset = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cardsets/cards/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      setCardset(data);
      setCards(data.cards || []);
      setUpdatedTitle(data.title);
      setUpdatedDescription(data.description);
    } catch (error) {
      console.error("Error fetching the cardset:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardset();
  }, [id, accessToken]);

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
      const response = await fetch(`/api/cards/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          question: newCard.question,
          answer: newCard.answer,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error(`Failed to add card: ${response.statusText}`);
      }
      await fetchCardset();
      setNewCard({ question: "", answer: "" });
    } catch (error) {
      console.error("Error adding the card:", error);
    }
  };

  const handleUpdateCardset = async () => {
    if (!validateCardset()) {
      return;
    }

    const updatedData = {
      title: updatedTitle,
      description: updatedDescription,
    };

    try {
      const response = await fetch(`/api/cardsets/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error(`Failed to update cardset: ${response.statusText}`);
      }

      await fetchCardset();
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error updating the cardset:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white border border-gray-300 rounded-lg shadow-md">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center text-navy-700 mb-6">
            {cardset?.title || "Cardset"}
          </h1>
          <p className="text-gray-500 text-center mb-8">
            {cardset?.description || "No description available."}
          </p>

          <div className="text-center mb-6">
            <button
              onClick={toggleModal}
              className="text-navy-600 hover:text-navy-800">
              <FiEdit className="inline-block mr-2" />
              Edit Cardset
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold">Update Cardset</h2>

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
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={toggleModal}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateCardset}
                      className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 focus:ring-2 focus:ring-navy-500">
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
            <AddCardForm
              onAddCard={handleAddCard}
              newCard={newCard}
              setNewCard={setNewCard}
              errors={errors}
            />
            <CardList cards={cards} />
          </div>
        </>
      )}
    </div>
  );
};

export default AddCards;
