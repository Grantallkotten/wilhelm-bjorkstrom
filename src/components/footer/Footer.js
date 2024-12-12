import React from "react";

import GithubLink from "../../assets/icons/GithubLink";
import LinkedinLink from "../../assets/icons/LinkedinLink";
import MailLink from "../../assets/icons/MailLink";

import "../../styles/footer.css";

function Footer() {
  return (
    <section className="footer-wrapper">
      <div className="footer-socials-wrapper">
        <GithubLink />
        <LinkedinLink />
        <MailLink />
      </div>
      <hr />
      <div className="footer-text">
        <p>
          Designed and created by me. Find the source code on my{" "}
          <a
            href="https://github.com/Grantallkotten/hemsida-v2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <p>&copy; 2024 Wilhelm Björksrtöm.</p>
    </section>
  );
}

export default Footer;
