import React from "react";

import GithubLink from "../components/icons/GithubLink";
import LinkedinLink from "../components/icons/LinkedinLink";
import InstagramLinlk from "../components/icons/InstagramLinlk";
import MailLink from "../components/icons/MailLink";

import "../styles/footer.css";

function Footer() {
  return (
    <section className="footer-wrapper">
      <div className="footer-socials-wrapper">
        <GithubLink />
        <LinkedinLink />
        <InstagramLinlk />
        <MailLink />
      </div>
      <hr />
      <p>&copy; 2024 Wilhelm Björkström</p>
    </section>
  );
}

export default Footer;
