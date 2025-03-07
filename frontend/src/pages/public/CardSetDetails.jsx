import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaVolumeUp } from "react-icons/fa";
import "../../css/cardsetDetails.css";
import { useSnackbar } from "notistack";
import { Helmet } from "react-helmet-async";

const CardSetDetails = () => {
  const { setId } = useParams();
  const [loading, setLoading] = useState(true);
  const [cardset, setCardset] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
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

  useEffect(() => {
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      let availableVoices = synth.getVoices();
      let uniqueLanguages = [...new Set(availableVoices.map((v) => v.lang))];
      setVoices(uniqueLanguages);
      if (uniqueLanguages.length > 0) {
        setSelectedVoice(uniqueLanguages[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    if (!text || !isSpeechEnabled) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedVoice;
    synth.speak(utterance);
  };

  const handlePrevCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, cardset.cards.length - 1)
    );
  };

  const handleGoingBack = () => {
    const previousPath = localStorage.getItem("previousPath") || "/";
    localStorage.removeItem("previousPath");
    navigate(previousPath);
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  const currentCard = cardset.cards[currentCardIndex];

  return (
    <>
      <Helmet>
        <title>FlipFlow - {cardset.title}</title>
      </Helmet>
      <div className="p-6 max-w-screen-md mx-auto bg-white rounded-lg shadow-md border border-gray-200 relative">
        <div className="flex items-center justify-between gap-4">
          <p
            onClick={handleGoingBack}
            className="underline text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            Back
          </p>
          <button
            onClick={() =>
              speak(showAnswer ? currentCard.answer : currentCard.question)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-500"
          >
            <FaVolumeUp />
          </button>
        </div>

        <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
          {cardset.title}
        </h1>
        <p className="text-gray-600 text-center mb-6">{cardset.description}</p>

        <div className="flex flex-col items-start mb-4">
          <select
            className="border p-2 rounded-lg mb-2"
            value={selectedVoice || ""}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

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
            <FaArrowLeft /> Previous
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
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default CardSetDetails;
