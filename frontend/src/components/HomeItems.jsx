import React from "react";
import ItemCard from "./ItemCard";

// ok this pulls from the database and creates the frontend
const HomeItems = () => {
  const [products, setData] = useState([]); // this defines data list to store the queried information

  // Fetch data when the component is mounted (react terms) basically runs when loaded
  useEffect(() => {
    fetch("http://localhost:5000/api/items") // Make an API call
      .then((response) => response.json()) // Parse the JSON response
      .then((fetchedData) => setData(fetchedData)) // Update state with data
      .catch((error) => console.error("Error:", error)); // Handle errors
  }, []); // Empty array ensures this runs once after mount

  return (
    <div className="py-4 bg-gray-100">
      <div className="container-xl lg:container m-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <h1 className=" py-6">Top Picks</h1>
          {products.map((item) => (
            <ItemCard size="bg"> 
            <h1>
              
            </h1>
            </ ItemCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeItems;
