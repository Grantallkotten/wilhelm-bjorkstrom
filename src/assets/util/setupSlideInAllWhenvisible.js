export function setupSlideInAllWhenvisible(ref, options = {}) {
  if (!ref.current) return;

  const handleIntersectionAndSlideIn = (entries, observer) => {
    let isVisible = false;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        isVisible = true;
        break;
      }
    }

    if (!isVisible) return;

    const targetElementsSlideIn = document.querySelectorAll(
      ".slideInAllWhenvisible"
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
  };

  const observerSlideIn = new IntersectionObserver(
    handleIntersectionAndSlideIn,
    {
      root: options.root || null,
      rootMargin: options.rootMargin || "0px",
      threshold: options.threshold || 0.05,
    }
  );

  const targetElementsSlideIn = ref.current.querySelectorAll(
    ".slideInAllWhenvisible"
  );

  targetElementsSlideIn.forEach((element) => {
    observerSlideIn.observe(element);
  });

  return () => {
    targetElementsSlideIn.forEach((element) => {
      observerSlideIn.unobserve(element);
    });
  };
}
