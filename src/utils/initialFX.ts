import gsap from "gsap";

/**
 * Handles the entrance animations for the main site after loading is complete.
 * Uses standard GSAP animations to avoid premium dependencies while maintaining high fidelity.
 */
export function initialFX() {
  document.body.style.overflowY = "auto";
  
  // Transition background and reveal main content
  gsap.to("body", {
    backgroundColor: "#0a0a0c",
    duration: 0.8,
    ease: "power2.inOut",
  });

  const main = document.querySelector("main");
  if (main) {
    main.style.opacity = "1";
    main.style.visibility = "visible";
  }

  // Entrance animations for Hero text and Navbar
  gsap.fromTo(
    ".loader-title, nav div, nav a",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5,
    }
  );

  // Stagger entrance for Bento Cards if they exist
  gsap.fromTo(
    ".bento-card",
    { opacity: 0, scale: 0.9, y: 30 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.8,
    }
  );
}
