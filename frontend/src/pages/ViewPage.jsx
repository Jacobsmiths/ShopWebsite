import React from "react";
import { useLoaderData } from "react-router-dom";
import ViewListing from "../components/ViewListing";
import { Link } from "react-router-dom";

const ViewPage = () => {
  const product = useLoaderData();

  return (
    <div className="mt-4 overflow-x-hidden">
      <Link to="/" className="ms-10 hover:underline hover:text-slate-700 inline">
        Go Back
      </Link>
      <ViewListing product={product} key={product.id} />
    </div>
  );
};

export default ViewPage;
