import React from "react";

import "../../styles/icons.css";

function ExternalLink({ link = "" }) {
  const SVGIcon = () => (
    <svg
      width="50px"
      height="50px"
      viewBox="-1 -1 28 28"
      className="logo-socials"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M12 0c-6.623 0-12 5.377-12 12s5.377 12 12 12 12-5.377 12-12-5.377-12-12-12zm0 1c-6.071 0-11 4.929-11 11s4.929 11 11 11 11-4.929 11-11-4.929-11-11-11zm4.828 11.5l-4.608 3.763.679.737 6.101-5-6.112-5-.666.753 4.604 3.747h-11.826v1h11.828z" />{" "}
    </svg>
  );

  return (
    <section>
      {link !== "" ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <SVGIcon />
        </a>
      ) : (
        <SVGIcon />
      )}
    </section>
  );
}

export default ExternalLink;
