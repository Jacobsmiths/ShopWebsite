import React from "react";
import MultipleImageDisplay from "./MultipleImageDisplay";

const SoldOutView = ({ product }) => {
  const { id, description, name, imageString, price, dimension } = product;
  const images = imageString.split(",");

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="text-xl font-bold">{name}</div>
      {images.length === 1 ? (
        <img src={images[0]} className="w-auto max-h-[500px] " />
      ) : (
        <MultipleImageDisplay imageString={imageString} />
      )}
      <div className="text-gray-800 mt-4">{description}</div>
    </div>
  );
};

export default SoldOutView;
