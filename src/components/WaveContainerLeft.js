import React from "react";
import "../styles/wave-container.css";

export function WaveContainerRight({ children }) {
  return (
    <section className="wave-container">
      <svg viewBox="0 0 500 150" preserveAspectRatio="none">
        <path
          d="M186.57 -23.1299C676.97 33.9501 244.13 99.9001 599.09 182.56L-0.00012207 149.6V0.000116348L186.57 -23.1299Z"
          className="svgStyle"
        ></path>
      </svg>

      <div className="wave-container-content-left"> {children}</div>
    </section>
  );
}

export default WaveContainerRight;
