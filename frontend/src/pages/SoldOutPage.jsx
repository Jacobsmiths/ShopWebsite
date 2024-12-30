import React from "react";
import { useLoaderData } from "react-router-dom";
import SoldOutView from "../components/SoldOutView";
import { Link } from "react-router-dom";

const SoldOutPage = () => {
  const product = useLoaderData();

  return (
    <div className="mt-4 mb-12">
      <div className="inline-block p-4 ">
        <Link to={"/"} className="ms-10 hover:underline hover:text-slate-700">
          Go Back
        </Link>
      </div>
      <SoldOutView product={product} />
    </div>
  );
};

export default SoldOutPage;
