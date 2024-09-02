import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SelectProject from "../components/showcaseProjects/SelectProject";
import { fetchProjectData } from "../assets/util/fetchProjectData.js";

import DeveloperIcon from "../assets/icons/DeveloperIcon.js";
import GithubLink from "../assets/icons/GithubLink.js";
import ExternalLink from "../assets/icons/ExternalLink.js";

import "../styles/projects.css";

const NoData = () => {
  return <section className="project-wrapper">No data</section>;
};

const ProjectLinkIcon = (linkItem) => {
  const linkConponents = {
    GitHub: <GithubLink link={linkItem.link} />,
    ExternalLink: <ExternalLink link={linkItem.link} />,
  };
  return linkItem.link
    ? linkConponents[linkItem.type] || <ExternalLink />
    : null;
};

const Project = ({ fileData }) => {
  const numberOfDevelopers = Number.isInteger(fileData.developers)
    ? fileData.developers
    : 1;

  return (
    <section className="project-wrapper">
      <section
        className="select-project-banner"
        style={{ backgroundImage: `url(${fileData.banner_image.link})` }}
      />
      <section className="project-content-wrapper">
        <div className="project-content">
          <div className="project-header-wrapper">
            <h1 className="project-header">{fileData.header}</h1>
          </div>
          <div className="info-grid">
            <div>
              <h3 className="header">Date</h3>
              <div className="date"> {fileData.date}</div>
            </div>
            <div>
              <h3 className="header">Number of developers</h3>
              <div className="developers">
                {Array.from({ length: numberOfDevelopers }, (_, index) => (
                  <DeveloperIcon key={index} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="header">Project links</h3>
              <div className="links">
                {fileData.links.map((linkItem) => ProjectLinkIcon(linkItem))}
              </div>
            </div>
            <div>
              <h3 className="header">Keywords</h3>
              <div className="keywords">
                {fileData.keywords.map((keyword, index) => (
                  <div key={index} className="keyword-item">
                    {keyword}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

const ShowProject = ({ filename }) => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    fetchProjectData(filename, setFileData);
  }, [filename]);

  return (
    <section>{fileData ? <Project fileData={fileData} /> : <NoData />}</section>
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
