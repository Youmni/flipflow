import {useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../components/AuthProvider";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useSnackbar } from "notistack";
import { FiLoader } from "react-icons/fi";

const Login = () => {
  const { setAccessToken } = useContext(AuthContext);
  const { setRefreshToken } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const checkRefreshToken = async () => {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          setLoading(true);
          const response = await axios.post("/api/authenticate/refresh-token", { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          Cookies.set("accessToken", accessToken, { expires: 1 / 24 / 4});
          setAccessToken(accessToken);
          Cookies.set("refreshToken", refreshToken, { expires: 7 });
          setRefreshToken(refreshToken);

          enqueueSnackbar("Automatically logged in", { variant: "success" });
          navigate("/overview");
        } catch (error) {
          console.error("Error refreshing token:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkRefreshToken();
  }, [setAccessToken, navigate, enqueueSnackbar]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegistration = async () => {
    navigate("/register");
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/authenticate", {
        email: loginForm.email,
        password: loginForm.password,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        const tokenExpiryTime = 1 / 24;
        Cookies.set("accessToken", accessToken, {
          secure: false,
          sameSite: "Strict",
          expires: tokenExpiryTime,
        });

        Cookies.set("refreshToken", refreshToken, {
          secure: false,
          sameSite: "Strict",
          expires: 7,
        });
        setAccessToken(accessToken);
        enqueueSnackbar("Succesfull login", { variant: "success" });
        navigate("/overview");
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        enqueueSnackbar("Wrong credentials", { variant: "error" });
      } else {
        enqueueSnackbar("Error login", { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-50 justify-center items-center">
      <form
        action=""
        className="flex flex-col md:flex-row w-full h-full md:w-3/5 md:h-3/4 shadow-lg rounded-md"
      >
        <div className="md:flex-1 bg-gradient-to-br from-navy-500 to-navy-800">
          <header className="flex flex-col justify-center h-full p-10 text-center md:text-left">
            <h1 className="text-4xl text-white font-extralight">Welcome,</h1>
            <h2 className="text-3xl text-white font-bold">FlipFlow user</h2>
          </header>
        </div>
        <div className="md:flex-1 bg-white p-10 flex flex-col justify-center">
          <header className="mb-10">
            <h1 className="text-3xl font-semibold text-navy-800 tracking-tight">
              Log in
            </h1>
          </header>
          <div className="flex flex-col gap-5">
            <label htmlFor="email" className="text-navy-600 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              required
              className="h-12 pl-4 rounded-2xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <label htmlFor="wachtwoord" className=" text-navy-600 font-medium">
              Wachtwoord
            </label>
            <div className="relative rounded-2xl bg-gray-100 h-12">
              <input
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                value={loginForm.password}
                placeholder="Password"
                id="password"
                name="password"
                required
                className="h-full w-full pl-5 bg-inherit rounded-2xl"
              />
              <div
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-10 md:mt-20 gap-5">
            <button
              onClick={handleClick}
              disabled={loading}
              className="h-12 bg-navy-600 rounded-3xl text-white  flex items-center justify-center hover:bg-blue-600 transition"
            >
              {loading ? (
                <FiLoader className="animate-spin text-xl" />
              ) : (
                "Login"
              )}
            </button>
            <p className="text-right">No account yet? <span onClick={handleRegistration} className="underline font-semibold text-green-600 cursor-pointer">Registration</span></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
