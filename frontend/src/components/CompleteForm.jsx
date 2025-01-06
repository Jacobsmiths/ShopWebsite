import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CompletePage({ sessionId }) {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleCopy = (event) => {
    event.preventDefault();
    // Get click position
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });

    // Copy to clipboard
    navigator.clipboard.writeText("emersonsartgallery@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide tooltip after 2 seconds
    });
  };

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
        <>
          <p className="p-8  items-center flex-nowrap gap-2 overflow-hidden">
            We appreciate your business! A confirmation email will be sent to{" "}
            <span className="font-bold underline">{customerEmail}</span>. please
            feel free to contact us at:{" "}
            <a
              href="mailto:emersonsartgallery@gmail.com"
              className="inline transition-colors duration-300 hover:text-hotPink"
              onClick={handleCopy}
            >
              emersonsartgallery@gmail.com
              <button
                className=" ml-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-transform duration-300"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={copied ? faCheck : faClipboard}
                  className="text-gray-600"
                />
              </button>
            </a>
          </p>
          {copied && (
            <div
              className="text-green-500 text-sm"
              style={{
                position: "absolute",
                top: `${tooltipPosition.y - 150}px`,
                left: `${tooltipPosition.x}px`,
                pointerEvents: "none",
                transform: "translateX(-50%)",
                backgroundColor: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0)",
              }}
            >
              Copied to clipboard!
            </div>
          )}
        </>
      )}
    </section>
  );
}
