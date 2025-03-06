import React, { useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCardset = () => {
  const [cardset, setCardset] = useState({
    title: "",
    description: "",
    visibility: "private",
  });
  const { accessToken } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
        alert("Invalid access token. Please log in again.");
      }
    }
  }, [accessToken]);

  const handleCardsetChange = (e) => {
    const { name, value } = e.target;
    setCardset({ ...cardset, [name]: value });
  };

  const handleGoingBack = () => {
    navigate("/cards");
  };

  const validateForm = () => {
    const newErrors = [];

    if (cardset.title.length < 4) {
      newErrors.push("Title must be at least 4 characters long.");
    }
    if (cardset.title.length > 255) {
      newErrors.push("Title must be less than 255 characters long.");
    }

    if (cardset.description.length < 15) {
      newErrors.push("Description must be at least 15 characters long.");
    }
    if (cardset.description.length > 255) {
      newErrors.push("Description must be less than 255 characters long.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleCreateCardset = async () => {
    console.log("Creating cardset:", cardset);
    console.log("User ID:", userId);
    console.log("Access token:", accessToken);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`/api/cardsets/create/${userId}`, cardset, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setErrors([]);
      console.log("Response data:", response.data);
      navigate("/cards");
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message || ["An error occurred"]);
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error creating cardset:", error.message);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-lg shadow-md">
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
          <ul className="text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <p onClick={handleGoingBack} className="text-right underline hover:text-navy-500 cursor-pointer">Back</p>
      <h1 className="text-3xl font-bold text-center text-navy-700 mb-6">
        Create a Cardset
      </h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={cardset.title}
            onChange={handleCardsetChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none"
            placeholder="Enter the title of your cardset"
            minLength={4}
            maxLength={255}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={cardset.description}
            onChange={handleCardsetChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none"
            placeholder="Describe your cardset"
            minLength={15}
            maxLength={255}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
            Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            value={cardset.visibility}
            onChange={handleCardsetChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-navy-500 focus:outline-none"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
        <button
          type="button"
          className="w-full px-4 py-2 text-white bg-navy-600 rounded-md shadow-sm hover:bg-navy-700 focus:ring-2 focus:ring-navy-500 focus:outline-none"
          onClick={handleCreateCardset}
        >
          Create Cardset
        </button>
      </form>
    </div>
  );
};

export default AddCardset;
