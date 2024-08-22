import React, { useState, useEffect, useRef } from "react";
import { fetchAllProjectData } from "../../assets/util/fetchAllProjectData.js";
import { setupSlideInAllWhenvisible } from "../../assets/util/setupSlideInAllWhenvisible.js";

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
      SelectProject from
      <div ref={slideinRef}>
        {fileData.map((file, index) => (
          <div key={index} className="slideInAllWhenvisible">
            {file.header}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SelectProject;
