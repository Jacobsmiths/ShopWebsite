import React from "react";
import CompleteForm from "../components/CompleteForm";

const CompletePage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");

  return (
    <div>
      fart
      <CompleteForm sessionId={sessionId}/>
    </div>
  );
};

export default CompletePage;
