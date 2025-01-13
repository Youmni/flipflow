import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../components/authProvider";
import AddCardForm from "./addCardForm";
import CardList from "./cardList";

const AddCards = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const [cardset, setCardset] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });

  const fetchCardset = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cardsets/cards/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      setCardset(data);
      setCards(data.cards || []);
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
