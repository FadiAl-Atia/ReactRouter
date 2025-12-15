import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./pages/books";
import Navbars from "./components/navbar";
import BookDetail from "./pages/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbars></Navbars>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
