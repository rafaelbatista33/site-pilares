// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleIndex1Page from "./pages/home/SingleIndex1Page";
import ContactPage from "./pages/contact/ContactPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SingleIndex1Page />} />
        <Route path="/contato" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
