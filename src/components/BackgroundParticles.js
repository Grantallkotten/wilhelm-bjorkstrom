import React, { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function BackgroundParticles({ children }) {
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

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "fit-content",
      }}
    >
      {init ? <Particles options={particleData()} /> : null}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          minHeight: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
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

export default BackgroundParticles;
