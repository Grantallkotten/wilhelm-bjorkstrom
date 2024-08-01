import React from "react";

import "../styles/buttons.css";

function TransparentButton({
  text,
  icon,
  onClick,
  style,
  className,
  iconClassName,
}) {
  return (
    <section
      className={`transparent-button ${className}`}
      onClick={onClick}
      style={style}
    >
      <span>{text}</span>
      <span className={`button-icon ${iconClassName}`}> {icon}</span>
    </section>
  );
}

export default TransparentButton;
