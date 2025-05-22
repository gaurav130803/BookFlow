import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { baseURL } from '../../config';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('accessToken');

  const fetchBook = async () => {
    try {
      const res = await axios.get(`${baseURL}/book/${bookId}`);
      setBook(res.data);
    } catch (err) {
      console.error("Error fetching book:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${baseURL}/book/${bookId}/comment`,
        { message: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComment('');
      setBook((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), res.data],
      }));
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  if (!book) return <p className="text-center mt-10 text-gray-500">Loading book details...</p>;

  return (
    <div className="bg-[rgba(236,225,225,0.89)] min-h-screen py-1">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">{book.name}</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src={`http://localhost:5000/uploads/${book.coverImage}`}
            alt={book.name}
            className="w-full max-h-[500px] object-contain mx-auto mb-6 bg-gray-100 rounded"
          />
          <h2 className="text-2xl font-semibold mb-2">Author: {book.author}</h2>
          <p className="text-gray-700 leading-relaxed mt-4">{book.description}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Discussion</h3>

          {book.comments && book.comments.length > 0 ? (
            <div className="space-y-6">
              {book.comments.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                    {c.user?.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{c.user?.username || 'Anonymous'}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{c.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500 mt-6">

              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}

          {/* Add Comment Box */}
          <div className="mt-8">
            <textarea
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              disabled={submitting}
              className="mt-3 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
