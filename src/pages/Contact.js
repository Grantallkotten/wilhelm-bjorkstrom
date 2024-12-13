import React from "react";

import TextButton from "../components/TextButton";
import LinkedinLink from "../assets/icons/LinkedinLink";
import MailLink from "../assets/icons/MailLink";
import WaveContainerBottom from "../components/WaveContainerBottom";

import AnimatedText from "../components/animations/AnimatedText";
import AnimatedComponent from "../components/animations/AnimatedComponent";

import "../styles/contact.css";

function Contact() {
  const typeInAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
        staggerChildren: 0.5,
        ease: "easeInOut",
        delay: "0.3",
      },
    },
  };

  return (
    <section className="contact-wrapper">
      <section className="contact-banner" />
      <section className="contact-content-wrapper">
        <section className="contact-content">
          <div className="contact-information">
            <AnimatedText once text="📬 Contact me" el="h1" />
            <AnimatedComponent>
              <p>
                Feel free to drop me a line anytime! Your messages are
                important, and I'm genuinely excited to receive them. Whether
                it's a collaboration proposal, work proposal a question, or just
                a friendly hello, your input is appreciated. Follow a link of
                your choice down below to get in touch with me.
              </p>
            </AnimatedComponent>
            <div className="button-container">
              <TextButton
                text={"Click on a link down below"}
                className={"down-arrow-infinite-icon"}
                style={{}}
                icon={"🡫"}
              />
            </div>
            <div className="contact-grid">
              <div className="contact-griditem-social-icon">
                <LinkedinLink />
              </div>
              <div className="contact-griditem-social-text">
                <a href="https://www.linkedin.com/in/wilhelm-bjorkstrom/">
                  <AnimatedText
                    text="linkedin.com/in/wilhelm-bjorkstrom"
                    animation={typeInAnimation}
                  />
                </a>
              </div>
              <div className="contact-griditem-social-icon">
                <MailLink />
              </div>
              <div className="contact-griditem-social-text">
                <a href="mailto:wilhelm@bjorkstrom.org">
                  <AnimatedText
                    text="wilhelm@bjorkstrom.org"
                    animation={typeInAnimation}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="contact-img-container">
            <div className="contact-img" />
          </div>
        </section>
        <div className="bottom-wave-wrapper">
          <WaveContainerBottom>
            <span className="wave-text">Looking forward hering from you!</span>
          </WaveContainerBottom>
        </div>
      </section>
    </section>
  );
}

export default Contact;
