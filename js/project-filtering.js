/**
 * Project Filtering Module
 * Handles project tab switching and staggered animations
 * Provides smooth transitions between project categories
 */

/**
 * Initializes project filtering functionality
 * Sets up tab switching with animation effects
 */
function initProjectFiltering() {
  const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
  const projectItems = document.querySelectorAll('.project-item');
  const firstTab = document.querySelector('#pills-all');
  
  // Animate first tab if it's active
  if (firstTab && firstTab.classList.contains('show')) {
    animateProjectItems(firstTab);
  }
  
  /**
   * Sets up click handlers for tab buttons
   */
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-bs-target');
      const targetTab = document.querySelector(targetId);
      
      if (targetTab) {
        // Hide all project items
        projectItems.forEach(item => {
          item.classList.remove('show');
        });
        
        // Animate new tab items after transition
        setTimeout(() => {
          animateProjectItems(targetTab);
        }, 400);
      }
    });
  });
  
  /**
   * Animates project items with staggered timing
   * @param {Element} tabPane - Tab pane containing project items
   */
  function animateProjectItems(tabPane) {
    const items = tabPane.querySelectorAll('.project-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, index * 100);
    });
  }
}

// Export module for main.js
window.ProjectFilteringModule = {
  init: initProjectFiltering
}; 