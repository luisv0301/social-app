import { useEffect } from "react";
import reactDom from "react-dom";

import "./inlineMessage.scss";

export default function InlineMessage({
  message = "Your post have been uploaded",
  dismissInlineMessage,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      dismissInlineMessage();
    }, 2600);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return reactDom.createPortal(
    <div className="inline-message">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p>{message}</p>
    </div>,
    document.getElementById("inlineMessage")
  );
}
