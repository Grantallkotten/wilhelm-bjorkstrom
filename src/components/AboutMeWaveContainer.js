import React, { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import "../styles/wave-container.css";

export function AboutMeWaveContainer({ children }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initializeParticles = async () => {
      try {
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        setInit(true);
      } catch (error) {
        console.error("Failed to initialize particles engine:", error);
      }
    };

    initializeParticles();
  }, []);

  const wavePath =
    "M313.43,-23.13 C-176.97,33.95 255.87,99.90 -99.09,182.56 L500.00,149.60 L500.00,0.00 Z";

  return (
    <section className="wave-container">
      <svg viewBox="0 0 500 150" preserveAspectRatio="none">
        <path d={wavePath} className="svgStyle"></path>
      </svg>
      {init ? (
        <div>
          <Particles options={particleData()} className="particle-svg" />
        </div>
      ) : null}{" "}
      <div className="wave-container-content-left">{children}</div>
    </section>
  );
}

const particleData = () => {
  return {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
    },
    fullScreen: {
      enable: false,
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.4,
        },
        animation: {
          enable: true,
          speed: 0.6,
          sync: false,
        },
      },
      size: {
        value: {
          min: 1,
          max: 6,
        },
      },
      move: {
        enable: true,
        speed: {
          min: 0.1,
          max: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
        onClick: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        bubble: {
          distance: 250,
          size: 0,
          duration: 2,
          opacity: 0,
        },
        repulse: {
          distance: 400,
          duration: 1,
        },
      },
    },
  };
};

export default AboutMeWaveContainer;
