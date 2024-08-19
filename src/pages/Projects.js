import React from "react";
import { useParams } from "react-router-dom";

import SelectProject from "../components/showcaseProjects/SelectProject";

import "../styles/projects.css";

const ShowProject = ({ project }) => {
  return <section className="project-wrapper"> {project} </section>;
};

function Projects() {
  const { project } = useParams();

  return (
    <section>
      {project ? <ShowProject project={project} /> : <SelectProject />}
    </section>
  );
}

export default Projects;
