import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedText from "../components/animations/AnimatedText";
import AnimatedComponent from "../components/animations/AnimatedComponent";
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
          <div className="home-scroll-button-wrapper">
            <TransparentButton
              text={"My projects"}
              className={"down-arrow-infinite-icon"}
              onClick={scrollToRefFunction}
              style={{ position: "absolute", bottom: "4%" }}
              icon={"🡫"}
            />
          </div>
        </BackgroundParticles>
      </section>
      <div className="about-me-home-wrapper">
        <div className="about-me-home-left">
          <AnimatedText
            once
            text="✨ Who am I?"
            el="h1"
            animation={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, staggerChildren: 0.05 },
              },
            }}
          />
          <div className="about-me-home-left-text">
            <AnimatedComponent>
              <p>
                I am a dedicated software developer with a passion for solving
                complex problems through code. Proficient in languages like C++,
                JavaScript, Python and much more. I enjoy crafting efficient
                solutions and building elegant architectures. Currently pursuing
                a Master's in Media Technology at Linköping University, my
                studies have deepened my skills in programming, computer
                graphics, and web development. I have a particular interest in
                both frontend and backend work, with a focus on creating
                seamless user experiences. With a strong foundation and a year
                left in my studies, I am excited to contribute to impactful
                projects in the future.
              </p>
            </AnimatedComponent>
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
