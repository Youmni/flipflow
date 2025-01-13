import { useState } from "react";
import { useLocation, Routes, Route } from 'react-router-dom';
import Quiz from "./pages/quiz";
import Overview from "./pages/overview";
import Cards from "./pages/cards";
import CardSetDetails from "./pages/cardSetDetails"
import Login from "./pages/login"; 
import Register from "./pages/register";
import Header from "./components/header";
import AddCardset from "./components/addCardset";
import AddCards from "./components/addCards";

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
              <Route path="/overview" element={<Overview />} />
              <Route path="/quiz" element={<Quiz />} />
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