import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import ProductListing from "../components/ProductListing";

const ViewPage = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState({
    id: 0,
    description: "blank",
    price: 0,
    image_url: "Na",
  }); // TODO make a generic item for this when items aren't able to get fetched
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async (id) => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json(); // Convert response to JSON
        setEntry(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntry(id);
  }, [id]);

  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ProductListing product={entry} isProductPage={true} />
      )}
    </div>
  );
};

export default ViewPage;
