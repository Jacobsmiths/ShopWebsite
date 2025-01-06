import React, { useState } from "react";

const ImageSelector = ({ imageString, size }) => {
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

  const mulitpleImageDisplay = (s) => {
    if (s === "small") {
      return (
        <div className="grid grid-cols-5 items-center">
          {/* Left Arrow */}
          <div className="col-span-1 flex justify-center">
            <button
              onClick={handleDownClick}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded font-bold text-lg min-w-[30px] max-w-[30px]"
            >
              ←
            </button>
          </div>
          {/* Image Display */}
          <div className="col-span-3 flex justify-center">
            <img
              src={images[selectedIndex]}
              alt={`${images[selectedIndex]}`}
              className="w-auto max-h-[500px] object-contain p-1"
            />
          </div>
          {/* Right Arrow */}
          <div className="col-span-1 flex justify-center">
            <button
              onClick={handleUpClick}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded font-bold text-lg min-w-[30px] max-w-[30px]"
            >
              →
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-8 items-center">
          {/* Image Carousel */}
          <div className="flex items-center flex-col justify-center px-2 py-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-full h-full border-[2px] transition-opacity duration-300 my-3 ${
                  selectedIndex === index ? "border-hotPink" : "border-0"
                }`}
              >
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={image}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </button>
            ))}
          </div>
          {/* Image Display */}
          <div className="col-span-6 flex justify-center">
            <img
              src={images[selectedIndex]}
              alt={`Selected Image ${selectedIndex + 1}`}
              className="w-auto max-h-[500px] object-contain p-1"
            />
          </div>
          {/* Arrows */}
          <div className="flex flex-col justify-center col-span-1 space-y-2 items-center">
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
        </div>
      );
    }
  };

  return mulitpleImageDisplay(size);
};

export default ImageSelector;
