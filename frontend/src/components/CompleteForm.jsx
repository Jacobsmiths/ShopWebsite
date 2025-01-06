import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function CompletePage({ sessionId }) {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    fetch(`/api/products/session-status?session_id=${sessionId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, [sessionId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return (
          <div className="flex items-center justify-center text-green-500 bg-green-100 p-3 rounded-md text-sm mb-4">
            <span role="img" aria-label="check" className="mr-2">
              ✅
            </span>
            Payment Successful
          </div>
        );
      case "expired":
        return (
          <div className="flex items-center justify-center text-red-500 bg-red-100 p-3 rounded-md text-sm mb-4">
            <span role="img" aria-label="x" className="mr-2">
              ❌
            </span>
            Checkout Session Expired, Please Retry
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center text-yellow-500 bg-yellow-100 p-3 rounded-md text-sm mb-4">
            <span role="img" aria-label="warning" className="mr-2">
              ⚠️
            </span>
            Payment Pending
          </div>
        );
    }
  };

  if (status === "open") {
    return <Navigate to="/" />;
  }

  return (
    <section id="status-container" className="pt-6 pr-8 pl-8">
      {status && getStatusIcon(status)}
      {status === "complete" && (
        <p className="text-sm">
          We appreciate your business! A confirmation email will be sent to{" "}
          <span className="font-bold underline">{customerEmail}</span>. If you
          have any questions, please email{" "}
          <a
            href="mailto:emersonsartgallery@gmail.com"
            className="text-blue-500 inline"
          >
            emersonsartgallery@gmail.com
          </a>
        </p>
      )}
    </section>
  );
}
