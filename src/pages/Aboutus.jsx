import React from 'react';
import about from '../images/aboutus.avif'

const Aboutus = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <section className="max-w-5xl  shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
        
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-gray-600 mb-4">
            At <span className="text-blue-500 font-semibold">BookFlow</span>, we are passionate about books and reading. 
            Our goal is to provide book lovers with a platform to discover new books, connect with other readers, 
            and explore the world of literature.
          </p>
          <p className="text-gray-600 mb-4">
            Whether you're looking for recommendations,  book reviews, or simply want to connect with 
            fellow book enthusiasts, you've come to the right place at <span className="text-blue-500 font-semibold">BookFlow</span>.
          </p>
          <p className="text-gray-600">
            Join our community today and embark on a journey through the pages of your next favorite book!
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img 
            src={about} 
            alt="About Us" 
            className="w-full max-w-sm rounded-lg shadow-md"
          />
        </div>

      </section>
    </div>
  );
};

export default Aboutus;
