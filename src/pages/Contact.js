import React, { useEffect, useRef } from "react";

import TextButton from "../components/TextButton";
import LinkedinLink from "../assets/icons/LinkedinLink";
import MailLink from "../assets/icons/MailLink";
import WaveContainerBottom from "../components/WaveContainerBottom";
import { setupTypeInAllWhenvisible } from "../assets/util/setupTypeInAllWhenvisible";

import AnimatedText from "../components/animations/AnimatedText";

import "../styles/contact.css";

function Contact() {
  const typeInRef = useRef(null);

  useEffect(() => {
    const cleanup = setupTypeInAllWhenvisible(typeInRef, {
      root: null,
      rootMargin: "0px",
      threshold: 0.05,
    });

    return cleanup;
  }, []);

  return (
    <section className="contact-wrapper">
      <section className="contact-banner" />
      <section className="contact-content-wrapper">
        <section className="contact-content">
          <div className="contact-information">
            <AnimatedText
              once
              text="📬 Contact me"
              el="h1"
              animation={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, staggerChildren: 0.05 },
                },
              }}
            />
            <p>
              Feel free to drop me a line anytime! Your messages are important,
              and I'm genuinely excited to receive them. Whether it's a
              collaboration proposal, work proposal a question, or just a
              friendly hello, your input is appreciated. Follow a link of your
              choice down below to get in touch with me.
            </p>
            <div className="button-container">
              <TextButton
                text={"Click on a link down below"}
                className={"down-arrow-infinite-icon"}
                style={{}}
                icon={"🡫"}
              />
            </div>
            <div className="contact-grid" ref={typeInRef}>
              <div className="contact-griditem-social-icon">
                <LinkedinLink />
              </div>
              <div className="contact-griditem-social-text typeInAllWhenvisible">
                <a href="https://www.linkedin.com/in/wilhelm-bjorkstrom/">
                  linkedin.com/in/wilhelm-bjorkstrom
                </a>
              </div>
              <div className="contact-griditem-social-icon">
                <MailLink />
              </div>
              <div className="contact-griditem-social-text typeInAllWhenvisible">
                <a href="mailto:wilhelm@bjorkstrom.org">
                  wilhelm@bjorkstrom.org
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
