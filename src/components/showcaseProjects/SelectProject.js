import React, { useState, useEffect, useRef } from "react";
import { fetchAllProjectData } from "../../assets/util/fetchAllProjectData.js";
import { setupSlideInAllWhenvisible } from "../../assets/util/setupSlideInAllWhenvisible.js";
import WaveContainerTop from "../WaveContainerTop.js";

import { Link } from "react-router-dom";

function SelectProject() {
  const [fileData, setFileData] = useState([]);
  const slideinRef = useRef(null);

  const topSVGPaths = [
    "M130.02,167.80 C237.81,54.62 317.94,-33.95 500.00,49.85 L500.00,149.60 L200.56,172.73 Z",
    "M-16.13,18.20 C150.00,149.60 349.20,-49.85 510.38,28.04 L500.00,149.60 L-0.00,149.60 Z",
    "M-5.41,195.37 C150.00,149.60 353.50,-48.71 500.00,49.85 L500.00,149.60 L0.23,218.98 Z ",
  ];

  useEffect(() => {
    fetchAllProjectData(setFileData);
  }, []);

  useEffect(() => {
    const cleanup = setupSlideInAllWhenvisible(slideinRef, {
      root: null,
      rootMargin: "0px",
      threshold: 0.05,
    });

    return cleanup;
  }, [fileData]);

  const ProjectCard = ({ projectData, index }) => {
    const randomPath =
      topSVGPaths[Math.floor(Math.random() * topSVGPaths.length)];

    return (
      <Link
        to={`/projects/${projectData.filename}`}
        key={index}
        className="select-project-card slideInAllWhenvisible"
      >
        <img src={projectData.main_image.link} alt="Project" />
        <div className="select-project-card-content">
          <h2>{projectData.header}</h2>
          <p>{projectData.description}</p>
        </div>
        <div className="select-project-card-svg">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d={randomPath} />
          </svg>
          <div className="text">
            <span>Check it out</span>
            <span className="arrow">🡪</span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="project-wrapper">
      <section className="select-project-banner" />
      <section>
        <section className="top-wave-wrapper">
          <div className="top-wave-container">
            <div className="div-wave-padding"></div>
            <div className="div-wave-wrapper">
              <WaveContainerTop></WaveContainerTop>
            </div>
          </div>
        </section>
        <div className="my-projects-wrapper">
          <h1>My Projects</h1>
          Welcome to my digital portfolio, where innovation meets lines of code!
          Explore a collection of my diverse coding projects that reflect my
          passion for problem-solving and creativity. Whether you're interested
          in web development or intrigued by the intricacies of machine
          learning, you'll encounter a multitude of projects, each offering
          unique insights and solutions.
        </div>
      </section>
      <section ref={slideinRef} className="select-project-container">
        <div className="select-project-container-row">
          {fileData.map((projectData, index) => (
            <ProjectCard projectData={projectData} index={index} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default SelectProject;
