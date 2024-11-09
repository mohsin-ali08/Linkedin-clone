import React from 'react';
import { FiPlus } from 'react-icons/fi';
import Followimg1 from '../assets/Muhammed Abbas.jpeg';
import Followimg2 from '../assets/Yasirraza.jpg';
import Followimg3 from '../assets/Alim bhai.jpeg';

const Widgets = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold text-lg mb-4 border-b pb-2">Add to your feed</h2>
      <ul className="space-y-4">
        <NewsItem 
          name="Muhammed Abbas"
          description="Full Stack Developer || Gen AI & API Developer || Expert in Modern Technologies || Python || HTML || CSS || Bootstrap || TypeScript || JavaScript || Node Js || React Js || Next Js || Tailwind CSS"
          followerCount="Follow"
          imageUrl={Followimg1}
          profileUrl="https://www.linkedin.com/in/mohammad-abbas-dev/" // Add profile link only here
        />
        <NewsItem 
          name="Yasir Raza"
          description="Elevate Your Web Experience: Secure, Interactive Sites with FREE Consultation | Leading Full-Stack Developer | Skilled in React and Next.js"
          followerCount="Follow"
          imageUrl={Followimg2}
        />
        <NewsItem 
          name="Muhammed Alim"
          description="Aspiring AI Enthusiast | Good practice on HTML, CSS & JAVASCRIPT | Learning Next.js & Node.js."
          followerCount="Follow"
          imageUrl={Followimg3}
        />
      </ul>
      <button className="text-blue-600 hover:underline text-sm font-semibold mt-4">
        Show more
      </button>
    </div>
  );
};

const NewsItem = ({ name, description, followerCount, imageUrl, profileUrl }) => (
  <li className="flex flex-col border p-3 rounded-lg hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center mb-2">
      {imageUrl && <img src={imageUrl} alt={name} className="h-8 w-8 rounded-full mr-2" />}
      <p className="font-semibold">{name}</p>
    </div>
    <p className="text-xs text-gray-600">{description}</p>
    <button
      className="flex items-center text-black w-24 text-sm font-semibold mt-2 border border-black rounded-full py-1 px-2 hover:border-2 hover:text-black transition-colors duration-200"
      onClick={profileUrl ? () => window.open(profileUrl, '_blank') : undefined} // Only adds click event if profileUrl exists
    >
      <FiPlus className="mr-1" />
      {followerCount}
    </button>
  </li>
);

export default Widgets;


