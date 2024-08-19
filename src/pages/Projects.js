import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SelectProject from "../components/showcaseProjects/SelectProject";
import "../styles/projects.css";

const NoData = () => {
  return <section>:(</section>;
};

const ShowProject = ({ filename }) => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const module = await import(
          `../assets/data/projectData/${filename}.json`
        );
        const newFileData = module.default;
        setFileData(newFileData);
      } catch (error) {
        console.error("Error importing file:", error);
      }
    };

    fetchProjectData();
  }, [filename]);

  return (
    <section className="project-wrapper">
      {fileData ? <div>{fileData.filename}</div> : <NoData />}
    </section>
  );
};

function Projects() {
  const { project } = useParams();

  return (
    <section>
      {project ? <ShowProject filename={project} /> : <SelectProject />}
    </section>
  );
}

export default Projects;
