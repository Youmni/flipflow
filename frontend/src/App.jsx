import { useState } from "react";
import { useLocation, Routes, Route } from 'react-router-dom';
import CardSetOverview from "./pages/public/CardSetOverview";
import CardSetDetails from "./pages/public/CardSetDetails"
import UserCardSets from "./pages/authenticated/UserCardSets";
import Login from "./pages/public/Login"; 
import Register from "./pages/public/Register";
import Header from "./components/layout/Header";
import UserFlashCard from "./pages/authenticated/UserFlashCard";
import Documentation from "./pages/public/Documentation";
import { HelmetProvider } from 'react-helmet-async';

import "./App.css";

function App() {

  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <HelmetProvider>
            <Routes>
              <Route path="/" element={<CardSetOverview />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/cards" element={<UserCardSets />} />
              <Route path="/cardsets/:setId" element={<CardSetDetails />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/cardset/:id/edit" element={<UserFlashCard />} />
            </Routes>
          </HelmetProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;