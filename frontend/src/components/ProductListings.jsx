import React from "react";
import { useState, useEffect } from "react";
import HomeLisiting from "./HomeListing";
import Spinner from "./Spinner";
import Masonry from "react-masonry-css";

const ProductListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = "/api/products";
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="gallery"
            columnClassName="gallery-column"
          >
            {products.map((product) => (
              <div className="p-4">
                <HomeLisiting product={product} key={product.id} />
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </section>
  );
};

export default ProductListings;
