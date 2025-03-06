import { useState } from "react";
import { useLocation, Routes, Route } from 'react-router-dom';
import CardSetOverview from "./pages/public/CardSetOverview";
import CardSetDetails from "./pages/public/CardSetDetails"
import Cards from "./pages/authenticated/UserCardSets";
import Login from "./pages/public/Login"; 
import Register from "./pages/public/Register";
import Header from "./components/layout/Header";
import AddCardset from "./components/cards/AddCardset";
import AddCards from "./components/cards/AddCard";
import Documentation from "./pages/public/Documentation";

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
            <Routes>
              <Route path="/" element={<Documentation />} />
              <Route path="/overview" element={<CardSetOverview />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/cardsets/:setId" element={<CardSetDetails />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/cardset/add" element={<AddCardset />} /> 
              <Route path="/cardset/:id/add" element={<AddCards />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;