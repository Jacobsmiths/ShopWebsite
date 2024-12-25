import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import ViewListing from "../components/ViewListing";
import { Link } from "react-router-dom";

const ViewPage = () => {
  const product = useLoaderData();

  return (
    <div className="mt-4">
      <Link to="/" className="ms-10 hover:underline hover:text-slate-700 inline">
        Go Back
      </Link>
      <ViewListing product={product} key={product.id} />
    </div>
  );
};

export default ViewPage;
