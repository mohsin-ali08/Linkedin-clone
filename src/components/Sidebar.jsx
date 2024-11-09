import React from 'react';
import { FaUserCircle, FaRegBookmark, FaUsers, FaRegCalendarAlt } from 'react-icons/fa'; // Importing necessary icons
import { useAuth } from '../components/AuthProvider'; // Importing useAuth
import defaultProfileImage from '../assets/default-profile.jpeg'; // Default profile image
import Banner from "../assets/Backgroundbaner.jpg";

const Sidebar = () => {
  const { user, profileImage } = useAuth(); // Accessing user data from AuthProvider

  return (
    <div className="pb-5 space-y-2">
      {/* Profile Section */}
      <div className="flex flex-col relative bg-white rounded-lg shadow-md items-center pb-3">
        {/* Background Banner */}
        <img src={Banner} alt="" className='rounded-t' />
        {/* Profile Image */}
        <img
          src={profileImage || defaultProfileImage}
          alt="Profile"
          className="rounded-full md:h-20 md:w-20 h-[100px] w-[100px]  mb-4 absolute md:top-7 top-14 md:left-10 border-2 border-gray-100"
        />
        <div className='px-5 pt-5 md:pt-0 md:text-left text-center'>
          <h3 className="text-lg font-bold mt-12">{user?.displayName || user?.email || 'User Name'}</h3>
          <p className="text-sm text-gray-600 font-semibold ">Front-End Developer Focused on Excellence in Web Development | HTML, CSS, JavaScript, React.js, Node.js</p>
          <p className="text-sm text-gray-500"> from# Karachi Division, Sindh</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow-md rounded-lg py-3 px-5 text-center lg:block hidden">
        <div className="flex justify-between hover:underline cursor-pointer text-sm font-semibold text-gray-600">
          <p>Profile viewers</p>
          <p className="text-blue-500">53</p>
        </div>
        <div className="flex justify-between hover:underline cursor-pointer  text-sm font-semibold text-gray-600">
          <p>Post impressions</p>
          <p className="text-blue-500">210</p>
        </div>
        <button className="text-blue-500 hover:underline text-sm block mt-1">Grow your network</button>
      </div>

      {/* Recent Hashtags Section */}
      <div className="bg-white shadow-md rounded-lg py-3 px-5 lg:block hidden">
        <p className="text-sm font-bold text-gray-600 mb-2 ">Recent</p>
        <button className="text-blue-500 hover:underline text-sm block">#ReactJS</button>
        <button className="text-blue-500 hover:underline text-sm block">#JavaScript</button>
        <button className="text-blue-500 hover:underline text-sm block">#WebDevelopment</button>
      </div>

      {/* Saved Items, Groups, Events Section */}
      <div className="bg-white shadow-md rounded-lg py-5 px-5 lg:block hidden">
        <p className="text-sm font-bold text-gray-600 mb-2">My Network</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <FaRegBookmark className="mr-2" />
            <span className="text-sm">Saved Items</span>
          </div>
          <div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <FaUsers className="mr-2" />
            <span className="text-sm">Groups</span>
          </div>
          <div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <FaRegCalendarAlt className="mr-2" />
            <span className="text-sm">Events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
