import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "../../styles/animations.css";

const defaultAnimations = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      staggerChildren: 0.5,
      ease: "easeInOut",
    },
  },
};

const AnimatedComponent = ({
  children,
  className,
  once = true,
  animation = defaultAnimations,
  repeatDelay,
  isVisibleOnEnter = true,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout;

    const show = () => {
      // Trigger animation immediately if isVisibleOnEnter is false
      if (!isVisibleOnEnter) {
        controls.start("visible");
      }

      // If it's in view and isVisibleOnEnter is true, start the animation
      if (isInView && isVisibleOnEnter) {
        controls.start("visible");
      } else if (!isInView && isVisibleOnEnter) {
        controls.start("hidden");
      }

      // Handle repeatDelay if provided
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    // Always call the show function
    show();

    // Cleanup timeout when effect is cleaned up
    return () => clearTimeout(timeout);
  }, [isInView, controls, repeatDelay, isVisibleOnEnter]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className={className}
      variants={animation}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
