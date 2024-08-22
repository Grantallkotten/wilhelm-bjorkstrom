import React, { useState, useEffect, useRef } from "react";
import { fetchAllProjectData } from "../../assets/util/fetchAllProjectData.js";
import { setupSlideInAllWhenvisible } from "../../assets/util/setupSlideInAllWhenvisible.js";
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
      SelectProject from
      <div ref={slideinRef} className="select-project-container">
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
      </div>
    </section>
  );
}

export default SelectProject;
