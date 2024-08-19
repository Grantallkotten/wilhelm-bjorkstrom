import React from "react";

import "../../styles/icons.css";

function MailLink() {
  return (
    <section>
      <a
        href="mailto:wilhelm@bjorkstrom.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="logo-socials"
          width="6vw"
          height="6vw"
          viewBox="-8 -8 40 40"
        >
          <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
        </svg>
      </a>
    </section>
  );
}

export default MailLink;