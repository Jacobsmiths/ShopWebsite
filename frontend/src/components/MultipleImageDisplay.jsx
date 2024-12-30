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
        <div className="flex flex-col justify-center col-span-1 space-y-2 sm:px-0 md:px-6">
          <button
            onClick={handleUpClick}
            className="p-2 bg-gray-300 hover:bg-gray-400 rounded text-bold text-lg min-w-[30px] max-w-[30px] "
          >
            ↑
          </button>
          <button
            onClick={handleDownClick}
            className="p-2 bg-gray-300 hover:bg-gray-400 rounded text-bold text-lg min-w-[30px] max-w-[30px] "
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
