import React, { useRef } from "react";

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.{" "}
          </div>

          <div className="about-me-home-left-button">
            <TextButton
              text={"About me"}
              className={"right-arrow-hover-icon"}
              icon={"🡪"}
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
