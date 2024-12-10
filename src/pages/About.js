import React from "react";

import AboutMeWaveContainer from "../components/AboutMeWaveContainer";
import WaveContainerTop from "../components/WaveContainerTop";

import AnimatedText from "../components/animations/AnimatedText";

import AnimatedComponent from "../components/animations/AnimatedComponent";

import "../styles/about.css";

function About() {
  return (
    <section className="about-wrapper">
      <section className="about-banner" />
      <section className="about-content-wrapper">
        <section className="about-content">
          <div className="div-wave-wrapper">
            <WaveContainerTop />
          </div>
          <div className="about-main-content-wrapper">
            <div className="about-main-content">
              <AnimatedText once text="✨ Who am I?" el="h1" />
              <div className="about-main-content-text">
                <AnimatedComponent
                  animation={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1.0,
                        staggerChildren: 0.5,
                        ease: "easeInOut",
                        delay: "0.2",
                      },
                    },
                  }}
                >
                  <p>
                    Working with and developing code has always been a subject
                    that captivates me deeply. The ability to craft intricate
                    architectures and algorithms through lines of code on a
                    screen to achieve a goal is an incredible power to master.
                    Beyond shaping ideas into practical reality, problem-solving
                    is also an aspect I have naturally developed a fondness for.
                    To put it more precisely, it's the process of meticulously
                    identifying a problem and systematically devising a plan for
                    the most effective approach to tackle it. The unparalleled
                    satisfaction when all the puzzle pieces fall into place,
                    allowing one to lean back and contemplate the complete
                    implementation, is unbeatable and serves as a profoundly
                    motivating force in my work.
                  </p>
                </AnimatedComponent>
                <AnimatedComponent
                  animation={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1.0,
                        staggerChildren: 0.5,
                        ease: "easeInOut",
                        delay: "0.3",
                      },
                    },
                  }}
                >
                  <p>
                    My will to move from problem to solution has guided me
                    through diverse projects where programming and architecture
                    have always taken center stage. Consequently, I possess
                    extensive experience with various programming languages,
                    including C++, Java, JavaScript, CSS, HTML, MATLAB, and
                    Python, which only constitute a small fraction of my
                    professional portfolio. However, the primary language I've
                    predominantly handled is C++, which I consider particularly
                    advantageous to master for a profound understanding of
                    programming. This ideology has, in turn, made me highly
                    proficient in C++, turning a challenge involving the
                    language into something exciting to tackle.
                  </p>
                </AnimatedComponent>
                <AnimatedComponent
                  animation={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1.0,
                        staggerChildren: 0.5,
                        ease: "easeInOut",
                        delay: "0.4",
                      },
                    },
                  }}
                >
                  <p>
                    I've always possessed a desire to solve problems through
                    programming, even if I didn't always know the right
                    approach. It wasn't until I embarked on my studies as a
                    Master's student as a civil engineer in Media Technology at
                    Linköping University in 2020 that I truly began to excel in
                    my ability to handle and solve complex problems through
                    programming and usage of git. Now, with only one year left
                    until my master's degree, my expertise in the field is
                    broader than ever, and I look forward to applying it as
                    well.
                  </p>
                </AnimatedComponent>
              </div>
            </div>
          </div>

          <div className="wave-container-wrapper">
            <div className="left">
              <AnimatedText once text="🙌 To put it simply" el="h1" />
              <div className="about-me-home-left-text">
                <AnimatedComponent>
                  <p>
                    Over the years, I've grown to love working with interfaces,
                    where code becomes something beautiful and accessible. Web
                    development, particularly with JavaScript, has captured my
                    heart. I enjoy crafting elegant designs and architectures,
                    and I'm equally comfortable diving into backend work for
                    more complex challenges. Looking ahead, I see myself
                    tackling diverse problems across both frontend and backend,
                    always aiming to create seamless user experiences. The
                    future is full of exciting possibilities, and perhaps our
                    paths will cross soon!
                  </p>
                </AnimatedComponent>
              </div>
              <div className="quote-wrapper">
                <div className="quote">
                  <AnimatedText
                    once
                    text="Thanks for getting to know me!"
                    el="h1"
                    animation={{
                      hidden: { opacity: 0, y: 0 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.1, staggerChildren: 0.05 },
                      },
                    }}
                  />
                  <span style={{ opacity: "0" }}>.</span>
                </div>
              </div>
            </div>
            <div className="right">
              <AboutMeWaveContainer>
                <div className="about-me-img"></div>
              </AboutMeWaveContainer>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default About;
