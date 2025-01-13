import React from "react";

const CardList = ({ cards }) => {
  return (
    <div className="p-6 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-navy-700 mb-4">Added Cards</h3>
      {cards.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {cards.map((card, index) => (
            <li
              key={index}
              className="py-4 px-4 mb-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-gray-700">
                <span className="font-bold">Question:</span> {card.question}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-bold">Answer:</span> {card.answer}
              </p>
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
