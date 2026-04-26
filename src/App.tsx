// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleIndex1Page from "./pages/home/SingleIndex1Page";
import ContactPage from "./pages/contact/ContactPage";
import BusinessPage from "./pages/business/BusinessPage";
import AdminPage from "./pages/admin/AdminPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SingleIndex1Page />} />
      <Route path="/contato" element={<ContactPage />} />
      <Route path="/business" element={<BusinessPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
