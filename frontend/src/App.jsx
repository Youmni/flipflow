import { useState } from "react";
import { useLocation, Routes, Route } from 'react-router-dom';
import Quiz from "./pages/quiz";
import Overview from "./pages/overview";
import Cards from "./pages/cards";
import CardSetDetails from "./pages/cardSetDetails";
import Header from "./components/header";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />

      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/overview" element={<Overview />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/cardsets/:setId" element={<CardSetDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;