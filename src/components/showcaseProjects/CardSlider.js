import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { setupSlideInAllWhenvisible } from "../../assets/util/setupSlideInAllWhenvisible";

import "../../styles/card-slider.css";

// Component to represent each card
const Card = ({ project }) => {
  return (
    <Link
      to={`/projects/${project.filename}`}
      className="card slideInAllWhenvisible"
    >
      <header className="card-header">
        <p>{project.date}</p>
        <h2>{project.header}</h2>
        <p>{project.description_short}</p>
      </header>
      <section className="card-content">
        <img src={project.imgHref} alt="" />
      </section>
    </Link>
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
    const cleanup = setupSlideInAllWhenvisible(sliderRef, {
      root: null,
      rootMargin: "0px",
      threshold: 0.05,
    });

    return cleanup;
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
