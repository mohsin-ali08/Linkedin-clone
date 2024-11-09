import React from 'react';
import Feed from '../components/Feed';      
import Widgets from '../components/Widgets';
import Sidebar from '../components/Sidebar'; 

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 pt-20 pb-5 px-4 bg-gray-100">
      {/* Sidebar */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <Sidebar /> 
      </div>
      
      {/* Feed */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6">
        <Feed />
      </div>
      
      {/* Widgets */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <Widgets />
      </div>
    </div>
  );
};

export default Home;
