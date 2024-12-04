import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SelectProject from "../components/showcaseProjects/SelectProject";
import { fetchProjectData } from "../assets/util/fetchProjectData.js";

import DeveloperIcon from "../assets/icons/DeveloperIcon.js";
import GithubLink from "../assets/icons/GithubLink.js";
import ExternalLink from "../assets/icons/ExternalLink.js";

import WaveContainerBottom from "../components/WaveContainerBottom.js";
import BackgroundParticles from "../components/BackgroundParticles.js";

import VideoContainer from "../components/VideoCard";

import AnimatedText from "../components/animations/AnimatedText.js";

import "../styles/projects.css";

const NoData = () => {
  return (
    <section className="project-wrapper">
      <section className="no-data">
        <BackgroundParticles>
          <div className="no-data-text">
            Sorry, I have no data for this project
          </div>
        </BackgroundParticles>
        <WaveContainerBottom></WaveContainerBottom>
      </section>
    </section>
  );
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
        className="project-banner"
        style={{ backgroundImage: `url(${fileData.banner_image.link})` }}
      />
      <section className="project-content-wrapper">
        <section className="project-content">
          <div className="project-header-wrapper">
            <AnimatedText
              once
              text={fileData.header}
              el="h1"
              animation={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, staggerChildren: 0.05 },
                },
              }}
              className="project-header"
            />
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
                {fileData.links.map((linkItem, index) => (
                  <div key={index}>{ProjectLinkIcon(linkItem)}</div>
                ))}
                {fileData.links.length === 0 ? "-" : null}
              </div>
            </div>
            <div className="keywords-wrapper">
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
          <div className="project-information-content">
            <div className="row">{fileData.description}</div>
            <div className="grid-row">
              <div className="left">
                <h2>{fileData.main_image.header}</h2>
                {fileData.main_image.description}
              </div>
              <div className="right">
                <img src={fileData.main_image.link} alt="Main thing" />
                <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                  <path
                    d="M100.11,-20.17 C-69.19,34.93 78.10,102.85 -21.78,175.68 L500.00,149.60 L500.00,0.00 Z"
                    className="svgStyle"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="row">
              <div className="quote-wrapper">
                <span className="quote">{fileData.quote}</span>
              </div>
            </div>
          </div>

          <div className="image-grid-wrapper">
            <div className="image-grid-content">
              <h2>{fileData.result.header}</h2>
              {fileData.result.description}
              {fileData.video.embed_ID ? (
                <div className="video-wrapper">
                  <VideoContainer embedID={fileData.video.embed_ID} />
                </div>
              ) : null}
              <div className="image-grid">
                {fileData.images.map((image, index) => (
                  <img key={index} src={image.link} alt={image.description} />
                ))}
              </div>
            </div>
          </div>
        </section>
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
