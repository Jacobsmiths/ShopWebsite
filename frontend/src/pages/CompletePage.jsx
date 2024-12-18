import React from "react";
import CompleteForm from "../components/CompleteForm";

const CompletePage = () => {
    const searchParams = new URLSearchParams(location.search);
  const paymentIntent = searchParams.get("payment_intent");
  const clientSecretQuery = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");


  return <div>fart
    <CompleteForm payment_intent={paymentIntent}/>
  </div>;
};

export default CompletePage;
