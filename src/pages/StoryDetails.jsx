// pages/StoryPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const StoryPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/story/${id}`);
        if (res.data.success) {
          setStory(res.data.story);
        }
      } catch (error) {
        console.error("Failed to fetch story:", error);
      }
    };
    fetchStory();
  }, [id]);

  if (!story) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-1">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mx-6 my-10">
        <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
        <p className="text-gray-600 mb-2"><strong>Author:</strong> {story.author}</p>
        <p className="text-gray-600 mb-4"><strong>Genre:</strong> {story.genre}</p>
        <div className="text-gray-800 whitespace-pre-line">{story.content}</div>
      </div>
    </div>
  );
};

export default StoryPage;
