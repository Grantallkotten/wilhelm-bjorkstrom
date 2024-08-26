import React from "react";

import "../styles/buttons.css";

function TextButton({ text, icon, onClick, style, className }) {
  return (
    <section
      className={`text-button ${className}`}
      onClick={onClick}
      style={style}
    >
      <span>{text}</span>
      <span className={"button-icon"}> {icon}</span>
    </section>
  );
}

export default TextButton;
