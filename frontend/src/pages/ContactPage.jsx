import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";

const ContactPage = () => {
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

  return (
    <div className="mt-8 relative">
      <h2 className="justify-center flex">Contact Us:</h2>
      <p className="p-8  items-center flex-nowrap gap-2 overflow-hidden">
        Hello! If you have any questions about specifics or artwork inquiries,
        please feel free to contact us at:{" "}
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
    </div>
  );
};

export default ContactPage;
