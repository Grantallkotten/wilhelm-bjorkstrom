import React, { useState, useEffect, useRef } from "react";
import { fetchAllProjectData } from "../../assets/util/fetchAllProjectData.js";
import { setupSlideInAllWhenvisible } from "../../assets/util/setupSlideInAllWhenvisible.js";
import WaveContainerTop from "../WaveContainerTop.js";

import { Link } from "react-router-dom";

function SelectProject() {
  const [fileData, setFileData] = useState([]);
  const slideinRef = useRef(null);

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

  return (
    <section className="project-wrapper">
      <section className="select-project-banner" />
      <section>
        <section className="top-wave-wrapper">
          <div className="top-wave-container">
            <div className="div-wave-padding"></div>
            <div className="div-wave-wrapper">
              <WaveContainerTop>MORE</WaveContainerTop>
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
          {fileData.map((file, index) => (
            <Link
              to={`/projects/${file.filename}`}
              key={index}
              className="select-project-card slideInAllWhenvisible"
            >
              {file.header}
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}

export default SelectProject;
