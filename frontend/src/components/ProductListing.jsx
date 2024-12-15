import React from "react";
import { useState, useEffect } from "react";

const ProductListing = ({ product, isProductPage = false }) => {
  const id = product.id;
  let description = product.description;
  const name = product.name;
  const image_url = product.image_url;
  const price = product.price;
  //   const [image, setImage] = useState(null);

  //   useEffect(() => {
  //     apiCall = `api/gallery/${id}`;
  //     const fetchImage = async () => {
  //       try {
  //         const image = await fetch(apiCall);
  //         setImage(image);
  //       } catch (err) {
  //         console.log("Error fetching data", error);
  //       }
  //     };
  //   });

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <img src={image_url} alt={image_url}></img>
        {/* {() => {
          const img = document.createElement("img");
          img.src = image_url; // Use the relative path to your image file
          img.alt = "A description of the image";
          img.style.maxWidth = "500px"; 
          imageContainer.appendChild(img);
        }} */}
        <div className="mb-5">{price}</div>

        <h3 className="text-indigo-500 mb-2">{description}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          {/* <Link
            to={`/${id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Look Closer
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
