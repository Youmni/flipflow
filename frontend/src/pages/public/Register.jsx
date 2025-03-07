import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useSnackbar } from "notistack";
import { FiLoader } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleClickLogin = async () => {
    navigate("/login");
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/users/register", registerForm);

      if (response.status === 201) {
        enqueueSnackbar("Registration successful", { variant: "success" });
        navigate("/login");
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>FlipFlow - Registration</title>
    </Helmet>
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <form
        onSubmit={handleClick}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-navy-500">Register</h1>
          <p className="text-navy-500">Create your FlipFlow account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={registerForm.first_name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg bg-navy-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={registerForm.last_name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg bg-navy-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerForm.username}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg bg-navy-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerForm.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg bg-navy-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={registerForm.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-navy-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <FiLoader className="animate-spin text-xl" /> : "Register"}
        </button>
        <p className="text-right">Already registrated? <span onClick={handleClickLogin} className="text-green-600 underline cursor-pointer hover:text-green-400">login</span></p>
      </form>
    </div>
    </>
  );
};

export default Register;
