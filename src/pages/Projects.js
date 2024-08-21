import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SelectProject from "../components/showcaseProjects/SelectProject";
import { fetchProjectData } from "../assets/util/fetchProjectData.js";

import "../styles/projects.css";

const NoData = () => {
  return <section className="project-wrapper">No data</section>;
};

const ShowProject = ({ filename }) => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    fetchProjectData(filename, setFileData);
  }, [filename]);

  return (
    <section className="project-wrapper">
      {fileData ? <div>Showing data for {fileData.filename}</div> : <NoData />}
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
