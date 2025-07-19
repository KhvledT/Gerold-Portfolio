/**
 * Preloader Module
 * Controls preloader visibility and animation timing
 * Ensures smooth transition from preloader to main content
 */

// Preloader state management
let preloaderLoaded = false;
let preloaderMinTime = false;

/**
 * Hides preloader when both conditions are met:
 * 1. Page is fully loaded
 * 2. Minimum display time (3 seconds) has passed
 */
function hidePreloaderIfReady() {
  if (preloaderLoaded && preloaderMinTime) {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      // Start animations immediately when preloader starts fading
      startAnimations();
      
      // Start preloader fade out transition
      preloader.classList.add("fade-out");
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = "none";
      }, { once: true });
    }
  }
}

/**
 * Marks preloader as loaded when window finishes loading
 */
function markPreloaderLoaded() {
  preloaderLoaded = true;
  hidePreloaderIfReady();
}

/**
 * Marks minimum display time as passed (3 seconds)
 */
function markPreloaderMinTime() {
  preloaderMinTime = true;
  hidePreloaderIfReady();
}

/**
 * Initializes preloader functionality
 * Sets up event listeners and timing
 */
function initPreloader() {
  // Check if page is already loaded
  if (document.readyState === "complete") {
    markPreloaderLoaded();
  } else {
    window.addEventListener("load", markPreloaderLoaded);
  }
  
  // Set minimum display time to 3 seconds
  setTimeout(markPreloaderMinTime, 3000);
}

/**
 * Starts all page animations after preloader
 * Includes navbar, image, info, sections, and counters
 */
function startAnimations() {
  const navbar = document.querySelector(".navbar");
  
  // Reset scroll position and disable scroll restoration
  window.scrollTo(0, 0);
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  // Animate navbar entrance
  if (navbar) navbar.classList.add("animate-navbar");
  
  // Animate hero section elements
  const imgInner = document.querySelector(".img-inner");
  const info = document.querySelector(".info");
  
  if (imgInner) imgInner.classList.add("animate-img");
  if (info) info.classList.add("animate-info");

  // Setup section reveal animations with Intersection Observer
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

  // Animate counter numbers
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

// Export module for main.js
window.PreloaderModule = {
  init: initPreloader,
  startAnimations: startAnimations
}; 