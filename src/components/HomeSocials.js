import React from "react";

import GithubLink from "./icons/GithubLink";
import LinkedinLink from "./icons/LinkedinLink";
import InstagramLinlk from "./icons/InstagramLinlk";
import MailLink from "./icons/MailLink";

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
