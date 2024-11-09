import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 border-gray-200 w-16 h-16"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
