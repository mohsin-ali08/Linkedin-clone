import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillBell } from 'react-icons/ai';
import { BsPeopleFill, BsBriefcaseFill } from 'react-icons/bs';
import { MdMessage, MdSearch } from 'react-icons/md';
import { FaBuilding } from 'react-icons/fa';
import { Dropdown, Menu } from 'antd';
import Logo from "../assets/logo.png";
import defaultProfileImage from '../assets/securityicon.jpg';
import { useAuth } from './AuthProvider';

const Navbar = () => {
  const { user, profileImage, logout } = useAuth(); // Get profileImage from auth context

  const menu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="1">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={logout}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="3">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-around h-16">
        
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <MdSearch className="text-gray-600 text-2xl cursor-pointer md:hidden" />
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <MdSearch className="text-gray-600 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="flex items-center">
            <NavItem icon={<AiFillHome size={24} />} text="Home" />
          </Link>
          <NavItem icon={<BsPeopleFill size={24} />} text="My Network" />
          <NavItem icon={<BsBriefcaseFill size={24} />} text="Jobs" />
          <NavItem icon={<MdMessage size={24} />} text="Messaging" />
          <NavItem icon={<AiFillBell size={24} />} text="Notifications" />
        </div>

        <div className="flex items-center space-x-4">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer">
              {user ? (
                <img 
                  src={profileImage || defaultProfileImage} // Use the user's uploaded profile image
                  alt="Profile" 
                  className="h-7 w-7 rounded-full" 
                />
              ) : (
                <div className="h-7 w-7 rounded-full bg-gray-300"></div>
              )}
              <p className='text-xs'>edit Profile!</p>
            </div>
          </Dropdown>

          <a href="#" className="hidden md:flex items-center space-x-1">
            <FaBuilding size={20} className="mr-1" />
            <span className="text-sm font-semibold">For Business</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, text }) => (
  <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer">
    {icon}
    <span className="text-xs hidden md:block">{text}</span>
  </div>
);

export default Navbar;
