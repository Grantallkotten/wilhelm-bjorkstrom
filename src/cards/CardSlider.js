import React, { useEffect } from "react";

import "../styles/card-slider.css";

function CardSlider() {
  useEffect(() => {
    // Function to be called when the target element is intersecting
    function handleIntersectionAndSlideIn(entries, observer) {
      let isVisible = false;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isVisible = true;
          break;
        }
      }

      if (!isVisible) return;

      const targetElementsSlideIn = document.querySelectorAll(
        ".slider .slideInAllWhenvisible"
      );

      let time = 0;
      targetElementsSlideIn.forEach((element) => {
        setTimeout(() => {
          element.classList.add("slideIn");
          element.style.opacity = "1";
        }, time);
        observer.unobserve(element); // Unobserve each element once it's set to slide in
        time += 60;
      });
    }

    // Set up the Intersection Observer
    const intersectionOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.05,
    };

    const observerSlideIn = new IntersectionObserver(
      handleIntersectionAndSlideIn,
      intersectionOptions
    );

    const sliderSection = document.querySelector(".slider");
    if (!sliderSection) {
      console.error("Slider section not found");
      return;
    }

    // Fetch JSON data from the public directory
    fetch("/sliderProjects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((project) => {
          const projectLink = document.createElement("a");
          projectLink.setAttribute("href", project.path);
          projectLink.classList.add("card", "slideInAllWhenvisible");

          const headerSection = document.createElement("header");
          headerSection.classList.add("card-header");
          headerSection.innerHTML = `<p>${project.date}</p><h2>${project.header}</h2><p>${project.text}</p>`;

          const contentSection = document.createElement("section");
          contentSection.classList.add("card-content");
          contentSection.innerHTML = `<img src="${project.imgHref}" alt="" />`;

          projectLink.appendChild(headerSection);
          projectLink.appendChild(contentSection);

          sliderSection.appendChild(projectLink);
        });

        // Target all elements with the class "slideInAllWhenvisible"
        const targetElementsSlideIn = document.querySelectorAll(
          ".slider .slideInAllWhenvisible"
        );

        targetElementsSlideIn.forEach((element) => {
          observerSlideIn.observe(element);
        });
      })
      .catch((error) =>
        console.error("Error fetching or parsing JSON:", error)
      );
  }, []);

  return (
    <section className="slider-wrapper">
      <div className="slider"></div>
    </section>
  );
}

export default CardSlider;
