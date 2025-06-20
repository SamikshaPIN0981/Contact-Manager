

import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";

export default function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/" element={<ContactsPage />} />
    
      </Routes>
    </BrowserRouter>
    
  );
}
