export function setupDrawAllWhenvisible(ref, options = {}) {
  if (!ref.current) return;

  const handleIntersectionAndDraw = (entries, observer) => {
    let isVisible = false;

    for (const entry of entries) {
      if (entry.isIntersecting) {
        isVisible = true;
        break;
      }
    }

    if (!isVisible) return;

    const targetElementsDraw = document.querySelectorAll(".drawAllWhenvisible");

    let time = 0;
    targetElementsDraw.forEach((element) => {
      setTimeout(() => {
        element.classList.add("draw");
        element.style.opacity = "1";
      }, time);
      observer.unobserve(element);
      time += 60;
    });
  };

  const observerDraw = new IntersectionObserver(handleIntersectionAndDraw, {
    root: options.root || null,
    rootMargin: options.rootMargin || "0px",
    threshold: options.threshold || 0.05,
  });

  const targetElementsDraw = ref.current.querySelectorAll(
    ".drawAllWhenvisible"
  );

  targetElementsDraw.forEach((element) => {
    observerDraw.observe(element);
  });

  return () => {
    targetElementsDraw.forEach((element) => {
      observerDraw.unobserve(element);
    });
  };
}
