/**
 * Main JavaScript Module
 * Central controller for all application modules
 * Initializes and coordinates all functionality
 */

/**
 * Initializes all modules when DOM is fully loaded
 */


document.addEventListener("DOMContentLoaded", function() {
  initializeAllModules();
});

/**
 * Initializes all application modules in proper order
 * Handles module dependencies and error management
 */
function initializeAllModules() {
  try {
    // Initialize Preloader (controls animation timing)
    if (window.PreloaderModule) {
      window.PreloaderModule.init();
    }
    
    // Initialize CV Download functionality
    if (window.CvDownloadModule) {
      window.CvDownloadModule.init();
    }
    
    // Initialize Contact Form with validation
    if (window.ContactFormModule) {
      window.ContactFormModule.init();
    }
    
    // Initialize Project Filtering system
    if (window.ProjectFilteringModule) {
      window.ProjectFilteringModule.init();
    }
    
    // Initialize Scroll to Top button
    if (window.ScrollToTopModule) {
      window.ScrollToTopModule.init();
    }
    
    // Initialize Navbar functionality
    if (window.NavbarModule) {
      window.NavbarModule.init();
    }
    
    // Initialize Animations Module (controlled by preloader)
    if (window.AnimationsModule) {
      window.AnimationsModule.init();
    }
    
  } catch (error) {
    console.error("Error initializing modules:", error);
  }
}

// Export for potential external use
window.MainModule = {
  initializeAllModules: initializeAllModules
}; 