import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import BigLogo from "../components/BigLogo";
import LogoName from "../components/LogoName";
import HomeSocials from "../components/HomeSocials";
import CardSlider from "../components/showcaseProjects/CardSlider";

import TransparentButton from "../components/TransparentButton";
import BackgroundParticles from "../components/BackgroundParticles";
import WaveContainerRight from "../components/WaveContainerRight";
import TextButton from "../components/TextButton";

import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  const scrollToRef = useRef(null);

  const scrollToRefFunction = () => {
    if (scrollToRef.current) {
      window.scrollTo({
        top: scrollToRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section>
      <section className="home-startpage" style={{ position: "relative" }}>
        <BackgroundParticles>
          <BigLogo />
          <LogoName />
          <HomeSocials />
        </BackgroundParticles>
        <div className="home-scroll-button-wrapper">
          <TransparentButton
            text={"My projects"}
            className={"down-arrow-infinite-icon"}
            onClick={scrollToRefFunction}
            style={{ position: "absolute", bottom: "4%" }}
            icon={"🡫"}
          />
        </div>
      </section>
      <div className="about-me-home-wrapper">
        <div className="about-me-home-left">
          <h1>Who am I?</h1>
          <div className="about-me-home-left-text">
            I am a dedicated software developer with a passion for solving
            complex problems through code. Proficient in languages like C++,
            JavaScript, Python and much more. I enjoy crafting efficient
            solutions and building elegant architectures. Currently pursuing a
            Master's in Media Technology at Linköping University, my studies
            have deepened my skills in programming, computer graphics, and web
            development. I have a particular interest in both frontend and
            backend work, with a focus on creating seamless user experiences.
            With a strong foundation and a year left in my studies, I am excited
            to contribute to impactful projects in the future.
          </div>

          <div className="about-me-home-left-button">
            <TextButton
              text={"More about me"}
              className={"right-arrow-hover-icon"}
              icon={"🡪"}
              onClick={() => {
                navigate("/about");
              }}
            />
          </div>
        </div>
        <div className="about-me-home-right">
          <WaveContainerRight>
            <div className="about-me-img"></div>
          </WaveContainerRight>
        </div>
      </div>
      <div ref={scrollToRef} style={{ height: "fit-content" }}>
        <CardSlider />
      </div>
    </section>
  );
}

export default Home;
