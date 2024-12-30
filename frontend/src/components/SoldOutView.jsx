import React from "react";
import MultipleImageDisplay from "./MultipleImageDisplay";

const SoldOutView = ({ product }) => {
  const { id, description, name, imageString, price, dimension } = product;
  const images = imageString.split(",");

  return (
    <div className=" flex items-center justify-center">
      {images.length === 1 ? (
        <img src={images[0]} className="w-auto max-h-[500px] " />
      ) : (
        <MultipleImageDisplay imageString={imageString} />
      )}
    </div>
  );
};

export default SoldOutView;