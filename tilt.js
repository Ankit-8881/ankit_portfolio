// A small 3D interaction for mouse/trackpad users. The effect is deliberately
// disabled for touch screens and reduced-motion preferences.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (!reducedMotion && finePointer) {
  const tiltCards = document.querySelectorAll(".skill-card, .project-card, .foundation-card, .experience-card, .education-entry, .certification-card, .coursework-item");

  tiltCards.forEach((card) => {
    // Cards can opt into a softer effect via data-tilt-intensity (1 = default strength).
    const intensity = parseFloat(card.dataset.tiltIntensity) || 1;

    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      // Convert the pointer position to a gentle -4 to 4 degree rotation, scaled by intensity.
      const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8 * intensity;
      const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8 * intensity;
      const lift = -4 * intensity;

      card.classList.add("tilt-active");
      card.style.setProperty("--tilt", `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${lift}px)`);
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("tilt-active");
      card.style.removeProperty("--tilt");
    });
  });
}
