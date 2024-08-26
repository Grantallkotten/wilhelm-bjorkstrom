import React from "react";
import "../styles/wave-container.css";

export function WaveContainerTop({ children }) {
  return (
    <section className="wave-container">
      <svg viewBox="0 0 500 150" preserveAspectRatio="none">
        <path
          d="M-4.28,-12.29 C220.88,318.39 271.37,-49.85 525.62,166.82 L500.00,0.00 L87.69,-28.05 Z"
          className="svgStyle"
        />
      </svg>

      <div className="wave-container-content-top"> {children}</div>
    </section>
  );
}

export default WaveContainerTop;
