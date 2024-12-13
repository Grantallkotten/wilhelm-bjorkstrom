import React, { useState, useEffect, useCallback } from "react";
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
import AnimatedComponent from "../components/animations/AnimatedComponent.js";

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
        <WaveContainerBottom />
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

  const quoteAnimation = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, staggerChildren: 0.05 },
    },
  };

  const delayIndexAnimation = useCallback(
    (index = 0) => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.5,
          staggerChildren: 0.5,
          ease: "easeInOut",
          delay: index * 0.4,
        },
      },
    }),
    []
  );

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
              className="project-header"
            />
          </div>
          <div className="info-grid">
            <div>
              <h3 className="header">Date</h3>
              <div className="date">
                <AnimatedComponent animation={delayIndexAnimation()}>
                  {fileData.date}
                </AnimatedComponent>
              </div>
            </div>
            <div>
              <h3 className="header">Number of developers</h3>
              <div className="developers">
                {Array.from({ length: numberOfDevelopers }, (_, index) => (
                  <AnimatedComponent
                    key={"developers-" + index}
                    animation={delayIndexAnimation(index)}
                  >
                    <DeveloperIcon key={index} />
                  </AnimatedComponent>
                ))}
              </div>
            </div>
            <div>
              <h3 className="header">Project links</h3>
              <div className="links">
                {fileData.links.map((linkItem, index) => (
                  <AnimatedComponent
                    key={"links-" + index}
                    animation={delayIndexAnimation(index)}
                  >
                    <div>{ProjectLinkIcon(linkItem)}</div>
                  </AnimatedComponent>
                ))}
                {fileData.links.length === 0 ? "-" : null}
              </div>
            </div>
            <div className="keywords-wrapper">
              <h3 className="header">Keywords</h3>
              <div className="keywords">
                {fileData.keywords.map((keyword, index) => (
                  <AnimatedComponent
                    isVisibleOnEnter={false}
                    key={"keyword-" + index}
                    animation={delayIndexAnimation(index)}
                  >
                    <div className="keyword-item">{keyword}</div>
                  </AnimatedComponent>
                ))}
              </div>
            </div>
          </div>
          <div className="project-information-content">
            <div className="row">
              <AnimatedComponent>
                <p>{fileData.description}</p>
              </AnimatedComponent>
            </div>
            <div className="grid-row">
              <div className="left">
                <AnimatedComponent>
                  <h2>{fileData.main_image.header}</h2>
                </AnimatedComponent>
                <AnimatedComponent>
                  <p>{fileData.main_image.description}</p>
                </AnimatedComponent>
              </div>
              <div className="right">
                <img src={fileData.main_image.link} alt="Main thing" />
                <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                  <path
                    d="M100.11,-20.17 C-69.19,34.93 78.10,102.85 -21.78,175.68 L500.00,149.60 L500.00,0.00 Z"
                    className="svgStyle"
                  />
                </svg>
              </div>
            </div>
            <div className="row">
              <div className="quote-wrapper">
                <AnimatedText
                  once
                  text={fileData.quote}
                  el="span"
                  animation={quoteAnimation}
                  className={"quote"}
                />
              </div>
            </div>
          </div>

          <div className="image-grid-wrapper">
            <div className="image-grid-content">
              <AnimatedComponent>
                <h2>{fileData.result.header}</h2>
              </AnimatedComponent>
              <AnimatedComponent>
                <p>{fileData.result.description}</p>
              </AnimatedComponent>

              {fileData.video.embed_ID && (
                <div className="video-wrapper">
                  <VideoContainer embedID={fileData.video.embed_ID} />
                </div>
              )}
              <div className="image-grid">
                {fileData.images.map((image, index) => (
                  <img
                    src={image.link}
                    alt={image.description}
                    key={"image-grid-item-" + index}
                  />
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
