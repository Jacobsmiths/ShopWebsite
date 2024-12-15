import React from "react";
import { useState, useEffect } from 'react';
import ProductListing from './ProductListing';
import Spinner from './Spinner';

const ProductListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductListing product={product} key={product.id}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListings;
