export function setupTypeInAllWhenvisible(ref, options = {}) {
  if (!ref.current) return;

  const handleIntersectionAndTypeIn = (entries, observer) => {
    let isVisible = false;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        isVisible = true;
        break;
      }
    }

    if (!isVisible) return;

    const targetElementsTypeIn = document.querySelectorAll(
      ".typeInAllWhenvisible"
    );

    let time = 0;
    targetElementsTypeIn.forEach((element) => {
      setTimeout(() => {
        element.classList.add("typeIn");
        element.style.opacity = "1";
      }, time);
      observer.unobserve(element); // Unobserve each element once it's set to type in
      time += 60;
    });
  };

  const observerTypeIn = new IntersectionObserver(handleIntersectionAndTypeIn, {
    root: options.root || null,
    rootMargin: options.rootMargin || "0px",
    threshold: options.threshold || 0.05,
  });

  const targetElementsTypeIn = ref.current.querySelectorAll(
    ".typeInAllWhenvisible"
  );

  targetElementsTypeIn.forEach((element) => {
    observerTypeIn.observe(element);
  });

  return () => {
    targetElementsTypeIn.forEach((element) => {
      observerTypeIn.unobserve(element);
    });
  };
}
