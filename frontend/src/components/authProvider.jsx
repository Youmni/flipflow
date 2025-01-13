import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken') || null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401 && refreshToken) {
          try {
            const newTokens = await refreshAccessToken();
            setAccessToken(newTokens.accessToken);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            setAccessToken(null);
            setRefreshToken(null);
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            navigate('/login');
          }
        }
      }
    );
  }, [accessToken, refreshToken]);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/api/user/refresh-token', {
        refreshToken,
      });
      console.log('Access token refreshed:', response.data);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      Cookies.set('accessToken', newAccessToken, { expires: 1 / 24 / 4 }); 
      Cookies.set('refreshToken', newRefreshToken, { expires: 7 }); 

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

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
