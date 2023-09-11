import { MatchPopupProps } from '@/typings';
import React from 'react';

const MatchPopup: React.FC<MatchPopupProps> = ({ matchedDog, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md w-11/12 h-70vh max-w-xl">
            <button
                className="top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={onClose}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            {/*if matchedDog has values then show the div, else show the p tag
             */}

            {matchedDog?.age ? (
                <div className='bg-transparent p-4 rounded-lg shadow-md max-w-md mx-auto'>
                    <div className="animate-flowers text-black mb-4 text-2xl">🌼🌸🌺 Hurray! You got a match! 🌺🌸🌼</div>
                    <img
                        src={matchedDog.img} 
                        alt={matchedDog.name}
                        className="rounded-lg max-h-60 w-auto mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-semibold mb-2">{matchedDog.name}</h2>
                    <p className="text-gray-700">{matchedDog.breed}</p>
                </div>
            ) : (
            <p className="text-gray-700 text-center">No matched dogs found.</p>
            )}
        </div>
    </div>

  );
};

export default MatchPopup;
