import React from "react";
import "../styles/wave-container.css";

export function WaveContainerBottom({ children }) {
  return (
    <section className="wave-container">
      <svg viewBox="0 0 500 150" preserveAspectRatio="none">
        <path
          d="M-42.66,-31.98 C150.00,149.60 343.90,-93.99 500.00,49.85 L500.00,149.60 L-0.00,149.60 Z"
          className="svgStyle"
        />
      </svg>

      <div className="wave-container-content-bottom"> {children}</div>
    </section>
  );
}

export default WaveContainerBottom;
