/**
 * Scroll to Top Module
 * Handles scroll to top button visibility and functionality
 * Provides smooth scrolling back to page top
 */

/**
 * Initializes scroll to top functionality
 * Sets up scroll detection and click handler
 */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  
  if (scrollTopBtn) {
    /**
     * Shows/hides button based on scroll position
     */
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });
    
    /**
     * Scrolls to top with smooth animation
     */
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

// Export module for main.js
window.ScrollToTopModule = {
  init: initScrollToTop
}; 