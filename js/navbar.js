/**
 * Navbar Module
 * Handles navbar scroll behavior, mobile collapse, and active link highlighting
 * Provides smooth navigation experience with visual feedback
 */

// Navbar elements
const navbar = document.querySelector(".navbar");
const collapse = document.getElementById("navbarSupportedContent");
let lastScrollTop = 0;

/**
 * Handles navbar scroll behavior and visual states
 * Changes navbar appearance based on scroll position
 */
function initNavbarScroll() {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // At top of page - show default navbar
    if (currentScroll === 0) {
      navbar.classList.remove("scroll-nav", "nav-hidden");
      navbar.classList.add("animate-navbar");
    } 
    // Scrolled slightly - show scrolled navbar
    else if (currentScroll > 0 && currentScroll <= 100) {
      navbar.classList.remove("nav-hidden");
      navbar.classList.add("scroll-nav");
    } 
    // Scrolled significantly - hide/show on scroll direction
    else if (currentScroll > 800) {
      if (currentScroll > lastScrollTop) {
        navbar.classList.add("nav-hidden");
        navbar.classList.remove("scroll-nav");
      } else {
        navbar.classList.remove("nav-hidden");
        navbar.classList.add("scroll-nav");
      }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
}

/**
 * Handles mobile navbar collapse behavior
 * Adds visual states for mobile menu open/close
 */
function initNavbarCollapse() {
  collapse.addEventListener("show.bs.collapse", () => {
    navbar.classList.add("nav-open");
  });
  collapse.addEventListener("hide.bs.collapse", () => {
    navbar.classList.remove("nav-open");
  });
}

/**
 * Implements ScrollSpy functionality
 * Highlights active navigation links based on current section
 */
function initScrollSpy() {
  const sectionEls = document.querySelectorAll("main, section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  
  window.addEventListener("scroll", () => {
    let current = "";
    
    // Find current section in viewport
    sectionEls.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
    
    // Update active navigation link
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * Initializes navbar entrance animation
 * Delayed animation for smooth page load experience
 */
function initNavbarAnimations() {
  setTimeout(() => {
    navbar.classList.add("animate-navbar");
  }, 1000);
}

/**
 * Initializes all navbar functionality
 * Sets up scroll behavior, collapse, and ScrollSpy
 */
function initNavbar() {
  initNavbarScroll();
  initNavbarCollapse();
  initScrollSpy();
  initNavbarAnimations();
}

// Export module for main.js
window.NavbarModule = {
  init: initNavbar,
  navbar: navbar,
  collapse: collapse
}; 