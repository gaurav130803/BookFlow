import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom'; // ✅ import Link

const { Meta } = Card;

import Adventure from '../images/adventure.png';
import Romance from '../images/romance.avif';
import Selfhelp from '../images/selfhelp.webp';
import Horror from '../images/horror.webp';
import History from '../images/history.jpeg';
import Nonfiction from '../images/Non-Fiction.jpg';
import Scifi from '../images/Sci-Fi.png';
import Thriller from '../images/Thrillers.jpg';

const Genre = () => {
  const genres = [
    { title: "Adventure", image: Adventure },
    { title: "Romance", image: Romance },
    { title: "Self-Help", image: Selfhelp },
    { title: "Horror", image: Horror },
    { title: "Thriller", image: Thriller },
    { title: "Non-Fiction", image: Nonfiction },
    { title: "Sci-Fi", image: Scifi },
  ];

  return (
    <div className="bg-[rgba(236,225,225,0.89)] min-h-screen py-10 mt-10">
      <h2 className="text-5xl font-semibold text-center mb-10">Genres</h2>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {genres.map((genre, index) => (
          <Link key={index} to={`/genre/${genre.title}`}>
            <Card
              hoverable
              className="w-60 shadow-md rounded-lg overflow-hidden"
              cover={
                <div className="h-50 w-full">
                  <img 
                    src={genre.image} 
                    alt={genre.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
              }
            >
              <Meta title={genre.title} className="text-center font-semibold" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genre;
