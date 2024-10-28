import React from "react";

/**
 * A simple alert component that renders a centered message
 * with a CSS class of "text-danger" or "text-sucess".
 *
 * @param {string} message The message to display
 * @param {boolean} isError Whether the message is an error (true) or success (false)
 * @returns {JSX.Element} A JSX <p> element with the message and CSS class
 */
function ControlsAlert({ message, isError }) {
  return (
    <p className={`text-center ${isError ? "text-danger" : "text-success"}`}>
      {message}
    </p>
  );
}

export default ControlsAlert;
