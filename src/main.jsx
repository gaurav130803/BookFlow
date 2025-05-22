import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Genre from "./components/Catogory.jsx"
import Contact from "./pages/Contact.jsx";
import BooksByGenre from "./pages/BookByGenre.jsx";
import BookDetails from './pages/BookDetails.jsx'
import Favorites from "./pages/Favorites.jsx";
import AllStories from "./pages/AllStories.jsx"
import StoryDetails from "./pages/StoryDetails.jsx"
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
<GoogleOAuthProvider clientId="1063053081677-uil428ri257mfluvsg81jg198kqr2qqc.apps.googleusercontent.com">
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/genre" element={<Genre />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/genre/:genreName" element={<BooksByGenre />} />
      <Route path="/favourites" element={<Favorites/>}/>
      <Route path="/book/:bookId" element={<BookDetails />} />
      <Route path="/allstories" element={<AllStories />} />
      <Route path="/story/:id" element={<StoryDetails />} />

    </Routes>
  </BrowserRouter>
  </GoogleOAuthProvider>
);
