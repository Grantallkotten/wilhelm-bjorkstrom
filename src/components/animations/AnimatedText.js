import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "../../styles/animations.css";

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};
// Credit: This staggered text animation is inspired by the amazing guide at
// https://www.frontend.fyi/v/staggered-text-animations-with-framer-motion.
// Thanks to the author for the great explanation and animations 🔥
const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once = false,
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

  return (
    <Wrapper className={className}>
      {/* Screen reader fallback */}
      <span className="screen-reader-only">{textArray.join(" ")}</span>

      {/* Animated text */}
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
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
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`char-${charIndex}`}
                    className="inline-block"
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
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
