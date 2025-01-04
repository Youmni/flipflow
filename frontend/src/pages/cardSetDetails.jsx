import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../css/cardsetDetails.css";
import { useSnackbar } from "notistack";

const CardSetDetails = () => {
  const { setId } = useParams();
  const [loading, setLoading] = useState(true);
  const [cardset, setCardset] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/cardsets/cards/${setId}`);
        setCardset(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setId]);

  const handlePrevCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) =>
      prevIndex < cardset.cards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (!cardset.cards || cardset.cards.length === 0) {
    enqueueSnackbar("No cards available in this set.", { variant: "warning" });
    navigate("/overview");
  }

  const currentCard = cardset.cards[currentCardIndex];

  return (
    <div className="p-6 max-w-screen-md mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
        {cardset.title}
      </h1>
      <p className="text-gray-600 text-center mb-6">{cardset.description}</p>

      <div
        className="flip-card cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <div className={`flip-card-inner ${showAnswer ? "flipped" : ""}`}>
          <div className="flip-card-front">
            <p className="text-lg text-gray-800 font-medium">
              {currentCard.question}
            </p>
          </div>
          <div className="flip-card-back">
            <p className="text-lg text-gray-800 font-medium">
              {currentCard.answer}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentCardIndex === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-600 text-white hover:bg-teal-500"
          }`}
        >
          <FaArrowLeft />
          Previous
        </button>
        <div className="text-gray-600">
          Card{" "}
          <span className="font-semibold text-gray-800">
            {currentCardIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-800">
            {cardset.cards.length}
          </span>
        </div>
        <button
          onClick={handleNextCard}
          disabled={currentCardIndex === cardset.cards.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentCardIndex === cardset.cards.length - 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-600 text-white hover:bg-teal-500"
          }`}
        >
          Next
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CardSetDetails;
