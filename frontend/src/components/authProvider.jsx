import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken') || null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResponse = async (response, originalRequest) => {
      if (response.status === 403 || response.status === 401) {
        if (refreshToken) {
          try {
            const newTokens = await refreshAccessToken();
            setAccessToken(newTokens.accessToken);
            const retryResponse = await fetch(originalRequest.url, {
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                'Authorization': `Bearer ${newTokens.accessToken}`,
              },
            });
            return retryResponse;
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
      return response;
    };

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const originalRequest = args[1] || {};
      const response = await originalFetch(...args);
      return handleResponse(response, { ...originalRequest, url: args[0] });
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [refreshToken, navigate]);

  const refreshAccessToken = async () => {
    try {
      const response = await fetch('/api/authenticate/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await response.json();
      console.log('Access token refreshed:', data);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
      console.log('New access token:', newAccessToken);
      console.log('New refresh token:', newRefreshToken);

      Cookies.set('accessToken', newAccessToken);
      Cookies.set('refreshToken', newRefreshToken);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};