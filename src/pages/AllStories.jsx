import React, { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllStories = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get("https://bookflow-backend.onrender.com/api/story/getstories");
      if (res.data.success) {
        setStories(res.data.stories);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    }
  };

  const handleLike = async (id) => {
    try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.put(`https://bookflow-backend.onrender.com/api/story/like/${id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
            toast.success("You liked the story");
          message.success("You liked the story!");
          fetchStories();
        }
      } catch (err) {
        toast.error("You have already liked this story ");
        const msg = err.response?.data?.message || "Failed to like story.";
        message.error(msg);
      }
      
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-1">
      <Navbar />
      <div className="px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">All User Stories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card
              key={story._id}
              title={story.title}
              bordered={false}
              className="shadow-md cursor-pointer"
              onClick={() => navigate(`/story/${story._id}`)}
              extra={<Button onClick={(e) => { e.stopPropagation(); handleLike(story._id); }}>❤️ {story.likes}</Button>}
            >
              <p><strong>Author:</strong> {story.author}</p>
              <p><strong>Genre:</strong> {story.genre}</p>
              <p className="text-gray-700 mt-2">
                {story.content.length > 100 ? story.content.slice(0, 100) + "..." : story.content}
              </p>
            </Card>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AllStories;
