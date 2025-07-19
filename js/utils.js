/**
 * Utility Functions Module
 * Common helper functions and error handling utilities
 * Provides safe DOM manipulation and performance optimization
 */

/**
 * Checks if an element exists in the DOM
 * @param {string} selector - CSS selector
 * @returns {boolean} - True if element exists
 */
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

/**
 * Safely selects a single element with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null} - Selected element or null
 */
function safeQuerySelector(selector, context = document) {
  try {
    const element = context.querySelector(selector);
    if (!element) {
      return null;
    }
    return element;
  } catch (error) {
    return null;
  }
}

/**
 * Safely selects multiple elements with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Array} - Array of selected elements
 */
function safeQuerySelectorAll(selector, context = document) {
  try {
    const elements = context.querySelectorAll(selector);
    return Array.from(elements);
  } catch (error) {
    return [];
  }
}

/**
 * Safely adds event listener with error handling
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 * @param {Object} options - Event listener options
 * @returns {boolean} - Success status
 */
function safeAddEventListener(element, event, handler, options = {}) {
  try {
    if (element && typeof element.addEventListener === 'function') {
      element.addEventListener(event, handler, options);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * Debounce function for performance optimization
 * Delays function execution until after specified wait time
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * Limits function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export utilities for other modules
window.Utils = {
  elementExists,
  safeQuerySelector,
  safeQuerySelectorAll,
  safeAddEventListener,
  debounce,
  throttle
}; 