import React from "react";
import { FiTrash2 } from "react-icons/fi";

const UpdateCardsetModal = ({
  cardset,
  updatedTitle,
  setUpdatedTitle,
  updatedDescription,
  setUpdatedDescription,
  updatedVisibility,
  setUpdatedVisibility,
  cardsetErrors,
  handleUpdateCardset,
  handleDeleteCardset,
  toggleModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Update Cardset</h2>
          <button
            onClick={() => handleDeleteCardset(cardset?.card_set_id)}
            className="text-red-500 hover:text-red-700 flex items-center space-x-2"
          >
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
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="visibility"
              className="block text-sm font-medium text-gray-700"
            >
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
            <button
              onClick={toggleModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateCardset}
              className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 focus:ring-2 focus:ring-navy-500"
            >
              Update Cardset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCardsetModal;
