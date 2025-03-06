import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken') || null);
  const navigate = useNavigate();

  // Als er geen accessToken en refreshToken beschikbaar zijn, stuur de gebruiker naar login
  useEffect(() => {
    if (!accessToken && !refreshToken) {
      console.log('No access token or refresh token found');
      navigate('/login');
    }
  }, [accessToken, refreshToken, navigate]);

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 403 && refreshToken && !userId) {
          try {
            console.log('Access token expired, refreshing token...');
            const newTokens = await refreshAccessToken();
            setAccessToken(newTokens.accessToken);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            setAccessToken(null);
            setRefreshToken(null);
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            console.log('refreshError', refreshError);
            navigate('/login');
          }
        }
      }
    );
  }, [accessToken, refreshToken]);

  // Functie om het access token te verversen
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/api/authenticate/refresh-token', { refreshToken });
      console.log('Access token refreshed:', response.data);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      // Stel de cookies in met de gewenste vervaldata
      Cookies.set('accessToken', newAccessToken, { expires: 1 / 24 }); // 1 uur geldig
      Cookies.set('refreshToken', newRefreshToken, { expires: 7 }); // 7 dagen geldig

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('Error refreshing access token:', error);
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      navigate('/login');
      throw error;
    }
  };

  // Functie om de userId uit de access token te halen
  const getUserIdFromToken = (token) => {
    try {
      console.log(token);
      const decoded = jwtDecode(token);
      console.log(decoded.userId);
      return decoded.userId;
    } catch (error) {
      console.error("Fout bij het decoderen van het token:", error);
      return null;
    }
  };

  const userId = accessToken ? getUserIdFromToken(accessToken) : null;

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
