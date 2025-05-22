import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { baseURL } from '../../config';
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BooksByGenre = () => {
  const { genreName } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseURL}/book/genre/${genreName}`);
        const updatedBooks = response.data.map(book => ({ ...book, isLiked: false }));
        setBooks(updatedBooks);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, [genreName]);

  const toggleLike = async (bookId) => {

    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Please log in to like books.");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/book/${bookId}/favourites`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success)
        toast.success(response.data.message);


    } catch (error) {
      console.log(error);
      
    }
    setBooks(prev =>
      prev.map(book =>
        book._id === bookId ? { ...book, isLiked: !book.isLiked } : book
      )
    );
  };

  return (
    <div className="bg-[rgba(236,225,225,0.89)] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Books in <span className="capitalize">{genreName}</span>
        </h2>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {books.map(book => (
              <div
                key={book._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl"
              >
                {/* Wrap the clickable part inside Link */}
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

                {/* Like button stays outside the Link */}
                <div className="text-center mb-3">
                  <button
                    onClick={() => toggleLike(book._id)}
                    className="text-red-500 text-2xl mt-2"
                  >
                    {book.isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                  </button>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <p className="text-center text-gray-500">No books found for this genre.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BooksByGenre;
