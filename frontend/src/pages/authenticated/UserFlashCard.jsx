import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import AddCardForm from "../../components/cards/AddCardForm";
import CardList from "../../components/cards/CardList";
import { FiEdit } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import UpdateCardsetModal from "../../components/cards/modals/UpdateCardsetModal"; 

const UserFlashCard = () => {
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
  const location = useLocation();

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

  const handlePlayCard = () => {
    sessionStorage.setItem("previousPath", location.pathname);
    navigate("/cardsets/" + cardset.card_set_id);
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
    <>
      <Helmet>
        <title>FlipFlow - {cardset?.title || "Cardset"}</title>
      </Helmet>
      <div className="max-w-5xl mx-auto mt-10 p-8 bg-white border border-gray-300 rounded-lg shadow-md">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="flex items-center justify-between w-full">
              <button
                onClick={handlePlayCard}
                className="flex items-center gap-2 text-navy-600 hover:text-navy-800"
              >
                <FaPlay className="w-5 h-5" />
              </button>
              <p
                onClick={handleGoingBack}
                className="text-right underline hover:text-navy-500 cursor-pointer"
              >
                Back
              </p>
            </div>
            <h1 className="text-2xl font-bold text-center text-navy-700 mb-6">
              {cardset?.title || "Cardset"}
            </h1>
            <p className="text-gray-500 text-center mb-8">
              {cardset?.description || "No description available."}
            </p>
            <p
              className={`${
                cardset?.visibility === "public"
                  ? "text-green-600"
                  : "text-red-600"
              } text-center mb-8`}
            >
              {cardset?.visibility || "No description available."}
            </p>
            <div className="text-center mb-6">
              <button
                onClick={toggleModal}
                className="text-navy-600 hover:text-navy-800"
              >
                <FiEdit className="inline-block mr-2" />
                Edit Cardset
              </button>
            </div>
            {/* Gebruik de gescheiden modal */}
            {isModalOpen && (
              <UpdateCardsetModal
                cardset={cardset}
                updatedTitle={updatedTitle}
                setUpdatedTitle={setUpdatedTitle}
                updatedDescription={updatedDescription}
                setUpdatedDescription={setUpdatedDescription}
                updatedVisibility={updatedVisibility}
                setUpdatedVisibility={setUpdatedVisibility}
                cardsetErrors={cardsetErrors}
                handleUpdateCardset={handleUpdateCardset}
                handleDeleteCardset={handleDeleteCardset}
                toggleModal={toggleModal}
              />
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
              <CardList
                cardset={cardset}
                onCardUpdate={handleCardUpdate}
                onCardDelete={handleCardDelete}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserFlashCard;
