import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import ViewListing from "../components/ViewListing";
import { Link } from "react-router-dom";

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
    <div className="mt-4">
      <Link to="/" className="ms-10 hover:underline hover:text-slate-700">
        Go Back
      </Link>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ViewListing product={entry} key={id} />
      )}
    </div>
  );
};

export default ViewPage;
