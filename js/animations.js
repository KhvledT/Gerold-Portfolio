/**
 * Animations Module
 * Provides animation functions for various page elements
 * Controlled by preloader module for timing
 */

/**
 * Initializes section reveal animations using Intersection Observer
 * Animates sections when they come into view
 */
function initSectionReveal() {
  const sections = document.querySelectorAll("section, main");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-section");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach((section) => {
    section.classList.add("hidden-section");
    observer.observe(section);
  });
}

/**
 * Animates counter numbers from 0 to target value
 * Uses requestAnimationFrame for smooth animation
 */
function initCounterAnimation() {
  const duration = 1500;
  const counters = document.querySelectorAll(".counter");
  
  counters.forEach((counter) => {
    let target = +counter.getAttribute("data-target");
    let startTime = null;
    counter.classList.add("start");
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const value = Math.min(Math.floor((progress / duration) * target), target);
      counter.textContent = value.toLocaleString();
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    requestAnimationFrame(animate);
  });
}

/**
 * Animates hero section image and info elements
 * Applies slide animations from left and right
 */
function initImageAnimations() {
  const imgInner = document.querySelector(".img-inner");
  const info = document.querySelector(".info");
  
  if (imgInner) imgInner.classList.add("animate-img");
  if (info) info.classList.add("animate-info");
}

/**
 * Initializes scroll restoration settings
 * Prevents browser from restoring scroll position
 */
function initScrollRestoration() {
  window.scrollTo(0, 0);
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
}

/**
 * Module initialization function
 * Called by preloader module, no automatic initialization
 */
function initAnimations() {
  // This function is called by the preloader module
  // No automatic initialization needed
}

// Export module functions
window.AnimationsModule = {
  init: initAnimations,
  initSectionReveal,
  initCounterAnimation,
  initImageAnimations,
  initScrollRestoration
}; 