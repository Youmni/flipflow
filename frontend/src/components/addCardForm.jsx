import React from "react";

const AddCardForm = ({ onAddCard, newCard, setNewCard, errors }) => {
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleSubmit = () => {
    if (!newCard.question || !newCard.answer) {
      alert("Please fill out both fields.");
      return;
    }
    onAddCard(newCard);
  };

  return (
    <div className="p-6 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold text-navy-700 mb-4">Add a New Card</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Question
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={newCard.question}
            onChange={handleCardChange}
            className={`w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none ${errors.some(error => error.includes("Question")) ? 'border-red-500' : ''}`}
            placeholder="Enter your question"
          />
          {errors.some(error => error.includes("Question")) && (
            <div className="text-red-500 text-sm mt-1">{errors.find(error => error.includes("Question"))}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="answer"
            className="block text-sm font-medium text-gray-700"
          >
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            value={newCard.answer}
            onChange={handleCardChange}
            className={`w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none ${errors.some(error => error.includes("Answer")) ? 'border-red-500' : ''}`}
            placeholder="Enter the answer"
          ></textarea>
          {errors.some(error => error.includes("Answer")) && (
            <div className="text-red-500 text-sm mt-1">{errors.find(error => error.includes("Answer"))}</div>
          )}
        </div>
        <button
          type="button"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-navy-600 rounded-md shadow-sm hover:bg-navy-700 focus:ring-2 focus:ring-navy-500 focus:outline-none"
          onClick={handleSubmit}
        >
          Add Card
        </button>
      </div>
    </div>
  );
};

export default AddCardForm;
