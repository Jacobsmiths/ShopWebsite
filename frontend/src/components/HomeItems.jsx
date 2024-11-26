import React from "react";
import ItemCard from "./ItemCard";

// temporary json storage of "items" until I get backend working


// this is going to pull from the sql database and then list them with the itemCard
const HomeItems = () => {
  return (
    <div className="py-4 bg-gray-100">
      <div className="container-xl lg:container m-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <h1 className=" py-6">Top Picks</h1>
        </div>
      </div>
    </div>
  );
};

export default HomeItems;
