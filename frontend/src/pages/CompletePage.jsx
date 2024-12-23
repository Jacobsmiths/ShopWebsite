import React from "react";
import { Link } from "react-router-dom";
import CompleteForm from "../components/CompleteForm";

const CompletePage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");

  return (
    <div className="p-4">
      <Link to="/" className="ms-10 hover:underline hover:text-slate-700">
        Go Back
      </Link>
      <CompleteForm sessionId={sessionId} />
    </div>
  );
};

export default CompletePage;
