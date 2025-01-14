import React from "react";
import "../styles/wave-container.css";

export function WaveContainerRight({ children }) {
  return (
    <section className="wave-container">
      <svg viewBox="0 0 500 150" preserveAspectRatio="none">
        <path
          d="M313.43,-23.13 C-176.97,33.95 255.87,99.90 -99.09,182.56 L500.00,149.60 L500.00,0.00 Z"
          className="svgStyle"
        ></path>
      </svg>

      <div className="wave-container-content-right"> {children}</div>
    </section>
  );
}

export default WaveContainerRight;
