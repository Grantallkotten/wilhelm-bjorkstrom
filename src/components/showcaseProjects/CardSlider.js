import React, { useState, useEffect, useRef } from "react";

import "../../styles/card-slider.css";

// Component to represent each card
const Card = ({ project }) => {
  return (
    <a
      href={`projects/${project.filename}`}
      className="card slideInAllWhenvisible"
    >
      <header className="card-header">
        <p>{project.date}</p>
        <h2>{project.header}</h2>
        <p>{project.description}</p>
      </header>
      <section className="card-content">
        <img src={project.imgHref} alt="" />
      </section>
    </a>
  );
};

function CardSlider() {
  const [projects, setProjects] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Retrive JSON data from the public directory
    const fetchProjects = async () => {
      try {
        // Import the manifest file to get the list of JSON filenames
        const manifestModule = await import("../../assets/data/manifest.json");
        const manifest = manifestModule.default;

        // Create an array of promises to dynamically import each JSON file
        const importPromises = manifest.map(async (filename) => {
          const module = await import(
            `../../assets/data/projectData/${filename}`
          );
          return module.default;
        });

        const allProjects = await Promise.all(importPromises);
        const projectData = allProjects.flat();

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching or parsing JSON:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;

    const handleIntersectionAndSlideIn = (entries, observer) => {
      let isVisible = false;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isVisible = true;
          break;
        }
      }

      if (!isVisible) return;

      const targetElementsSlideIn = document.querySelectorAll(
        ".slider .slideInAllWhenvisible"
      );

      let time = 0;
      targetElementsSlideIn.forEach((element) => {
        setTimeout(() => {
          element.classList.add("slideIn");
          element.style.opacity = "1";
        }, time);
        observer.unobserve(element); // Unobserve each element once it's set to slide in
        time += 60;
      });
    };

    const intersectionOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.05,
    };

    const observerSlideIn = new IntersectionObserver(
      handleIntersectionAndSlideIn,
      intersectionOptions
    );

    const targetElementsSlideIn = sliderRef.current.querySelectorAll(
      ".slideInAllWhenvisible"
    );

    targetElementsSlideIn.forEach((element) => {
      observerSlideIn.observe(element);
    });

    return () => {
      targetElementsSlideIn.forEach((element) => {
        observerSlideIn.unobserve(element);
      });
    };
  }, [projects]);

  return (
    <section className="slider-wrapper">
      <div className="slider" ref={sliderRef}>
        {projects.map((project, index) => (
          <Card key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

export default CardSlider;
