import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../config';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Navbar from '../components/Navbar';
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  //const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');

  const toggleLike = async (bookId) => {
    try {
      const response=await axios.delete(`${baseURL}/book/removeFromFavourites/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       if (response.data.success)
              toast.success(response.data.message);

      // Remove from local state
      setFavorites(prev => prev.filter(book => book._id !== bookId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };


  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${baseURL}/book/getFavourites/fav`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("front", res)
      setFavorites(res.data);
      //setLoading(false);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      //setLoading(false);
    }
  };

  useEffect(() => {


    fetchFavorites();
  }, []);

  return (
    <div className="bg-[rgba(236,225,225,0.89)] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Your Favorite Books</h2>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {favorites.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl"
              >
                <Link to={`/book/${book._id}`}>
                  <img
                    src={`https://bookflow-backend.onrender.com/uploads/${book.coverImage}`}
                    alt={book.name}
                    className="w-full h-64 object-contain bg-gray-100"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold mb-1">{book.name}</h3>
                    <p className="text-gray-600">Author: {book.author}</p>
                  </div>
                </Link>

                <div className="text-center mb-3">
                  <button
                    onClick={() => toggleLike(book._id)}
                    className="text-red-500 text-2xl mt-2"
                  >
                    <AiFillHeart />
                  </button>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No favorite books found.</p>
        )}
      </div>
      <ToastContainer />
    </div>

  );
};

export default Favorites;
