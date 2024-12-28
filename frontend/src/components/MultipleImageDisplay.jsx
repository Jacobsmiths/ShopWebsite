import React, { useState } from "react";

const ImageSelector = ({ imageString }) => {
  const images = imageString.split(",");

  const [selectedIndex, setSelectedIndex] = useState(0); // Track the currently selected image index

  // Handle Up button click
  const handleUpClick = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    ); // Wrap around to last image
  };

  // Handle Down button click
  const handleDownClick = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length); // Wrap around to first image
  };

  return (
    <>
      <div className="grid grid-cols-8 items-center">
        {/* Arrows */}
        <div className="flex flex-col justify-center col-span-1 space-y-2 ml-2 md:ml-8 mr-2 md:mr-8 h-[500px]">
          <button
            onClick={handleUpClick}
            className="p-3 md:p-2 bg-gray-300 hover:bg-gray-400 rounded text-bold text-lg min-w-[30px] min-h-[30px] flex items-center justify-center"
          >
            ↑
          </button>
          <button
            onClick={handleDownClick}
            className="p-3 md:p-2 bg-gray-300 hover:bg-gray-400 rounded text-bold text-lg min-w-[30px] min-h-[30px] flex items-center justify-center"
          >
            ↓
          </button>
        </div>

        {/* Image Display */}
        <div className="col-span-7 flex justify-center">
          <img
            src={images[selectedIndex]}
            alt={`Selected Image ${selectedIndex + 1}`}
            className="w-auto max-h-[500px] object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default ImageSelector;
