import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "../../styles/animations.css";

const defaultAnimations = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.05 },
  },
};

// Credit: This staggered text animation is inspired by the amazing guide at
// https://www.frontend.fyi/v/staggered-text-animations-with-framer-motion.
// Thanks to the author for the great explanation and animations 🔥
const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  innerClassName,
  once = true,
  repeatDelay,
  animation = defaultAnimations,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });
  const textArray = Array.isArray(text) ? text : [text];

  useEffect(() => {
    let timeout;
    const show = () => {
      controls.start("visible");
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView, controls, repeatDelay]);

  const isEmoji = (char) => {
    const isNormalChar = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+$/u.test(char);
    return !isNormalChar;
  };

  return (
    <Wrapper className={className}>
      {/* Screen reader fallback */}
      <span className="screen-reader-only">{textArray.join(" ")}</span>

      {/* Animated text */}
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        style={{ display: "inline-block" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
        aria-hidden="true"
      >
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`line-${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`word-${wordIndex}`}>
                {word.split("").map((char, charIndex) => {
                  const isEmojiChar = isEmoji(char);

                  return (
                    <motion.span
                      key={`char-${charIndex}`}
                      variants={animation}
                      style={{
                        display: isEmojiChar ? "" : "inline-block",
                        overflowWrap: "break-word",
                      }}
                      className={innerClassName}
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {/* Add a space between words */}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;
