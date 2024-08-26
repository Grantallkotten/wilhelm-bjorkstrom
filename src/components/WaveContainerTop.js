import React from "react";
import "../styles/waveContainer.css";

export function WaveContainerTop({ children }) {
  return (
    <section className="wave-container">
      <svg viewBox="0 0 500 150" preserveAspectRatio="none">
        <path
          d="M234 -129.5C-133.182 -86.3155 51.9088 92.1468 173.574 130.301C199.806 138.527 227.652 135.472 254.846 131.431L272.998 128.735C349.226 117.409 427.058 124.477 500 149.348V149.348V80.2174V66.5217V1.52588e-05L234 -129.5Z"
          className="svgStyle"
        ></path>
      </svg>

      <div className="wave-container-content-top"> {children}</div>
    </section>
  );
}

export default WaveContainerTop;
