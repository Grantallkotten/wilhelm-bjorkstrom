import React, { useRef } from "react";

import BigLogo from "../components/BigLogo";
import LogoName from "../components/LogoName";
import HomeSocials from "../components/HomeSocials";
import CardSlider from "../cards/CardSlider";

import TransparentButton from "../components/TransparentButton";
import BackgroundParticles from "../components/BackgroundParticles";

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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <TransparentButton
            text={"My projects"}
            onClick={scrollToRefFunction}
            style={{ position: "absolute", bottom: "4%" }}
            icon={"🡫"}
            iconClassName={"arrow-icon"}
          />
        </div>
      </section>
      <div ref={scrollToRef} style={{ height: "100vh" }}>
        <CardSlider />
      </div>
    </section>
  );
}

export default Home;
