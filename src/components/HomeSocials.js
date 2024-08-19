import React from "react";

import GithubLink from "../assets/icons/GithubLink";
import LinkedinLink from "../assets/icons/LinkedinLink";
import InstagramLinlk from "../assets/icons/InstagramLinlk";
import MailLink from "../assets/icons/MailLink";

import "../styles/socials.css";

function HomeSocials() {
  return (
    <section>
      <div className="logo-socials-wapper">
        <GithubLink />
        <LinkedinLink />
        <InstagramLinlk />
        <MailLink />
      </div>
    </section>
  );
}

export default HomeSocials;
