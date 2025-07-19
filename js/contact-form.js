/**
 * Contact Form Module
 * Handles form validation, error display, and success messages
 * Provides client-side validation with user feedback
 */

/**
 * Initializes contact form functionality
 * Sets up validation, error handling, and form submission
 */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    
    /**
     * Displays error message for form field
     * @param {HTMLInputElement} input - Form input element
     * @param {string} message - Error message to display
     */
    function setError(input, message) {
      let error = input.parentElement.querySelector(".form-error");
      if (!error) {
        error = document.createElement("div");
        error.className = "form-error text-danger mt-1";
        error.setAttribute("role", "alert");
        error.setAttribute("aria-live", "polite");
        input.parentElement.appendChild(error);
      }
      error.textContent = message;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", error.id || (error.id = input.name + "-error"));
    }
    
    /**
     * Clears error message for form field
     * @param {HTMLInputElement} input - Form input element
     */
    function clearError(input) {
      let error = input.parentElement.querySelector(".form-error");
      if (error) error.textContent = "";
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
    
    /**
     * Displays success message
     * @param {string} message - Success message to display
     */
    function showSuccess(message) {
      let success = document.getElementById("form-success");
      if (!success) {
        success = document.createElement("div");
        success.id = "form-success";
        success.className = "alert alert-success mt-3";
        contactForm.parentElement.insertBefore(success, contactForm);
      }
      success.textContent = message;
    }
    
    /**
     * Clears success message
     */
    function clearSuccess() {
      let success = document.getElementById("form-success");
      if (success) success.remove();
    }
    
    /**
     * Saves form data to local storage as an array
     * @param {Object} formData - Form data to save
     */
    function saveFormData(formData) {
      try {
        // Get existing data from localStorage
        const existingData = localStorage.getItem('contactFormData');
        let contactDataArray = [];
        
        // Parse existing data if it exists
        if (existingData) {
          try {
            const parsedData = JSON.parse(existingData);
            // Check if it's already an array or convert single object to array
            contactDataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
          } catch (error) {
            // If parsing fails, start with empty array
            contactDataArray = [];
          }
        }
        
        // Add new form data to array
        contactDataArray.push(formData);
        
        // Save updated array back to localStorage
        localStorage.setItem('contactFormData', JSON.stringify(contactDataArray));
        
        return true;
      } catch (error) {
        console.error('Error saving form data:', error);
        return false;
      }
    }
    
    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s'-]+$/;
    const phoneRegex = /^[+]?\d{7,15}$/;
    
    /**
     * Validates email format
     * @param {string} email - Email to validate
     * @returns {boolean} - Validation result
     */
    function validateEmail(email) {
      return emailRegex.test(email);
    }
    
    /**
     * Validates name format (letters, spaces, hyphens, apostrophes)
     * @param {string} name - Name to validate
     * @returns {boolean} - Validation result
     */
    function validateName(name) {
      return nameRegex.test(name.trim());
    }
    
    /**
     * Validates phone number format
     * @param {string} phone - Phone number to validate
     * @returns {boolean} - Validation result
     */
    function validatePhone(phone) {
      return phoneRegex.test(phone.trim());
    }
    
    /**
     * Handles form submission with validation
     */
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearSuccess();
      let valid = true;
      
      // Get form elements
      const name = contactForm.elements["name"];
      const secondName = contactForm.elements["secondName"];
      const email = contactForm.elements["email"];
      const number = contactForm.elements["number"];
      const service = contactForm.elements["service"];
      const message = contactForm.elements["message"];
      
      // Validate First Name
      if (!name.value.trim()) {
        setError(name, "First name is required.");
        valid = false;
      } else if (!validateName(name.value)) {
        setError(name, "First name should only contain letters.");
        valid = false;
      } else {
        clearError(name);
      }
      
      // Validate Last Name
      if (!secondName.value.trim()) {
        setError(secondName, "Last name is required.");
        valid = false;
      } else if (!validateName(secondName.value)) {
        setError(secondName, "Last name should only contain letters.");
        valid = false;
      } else {
        clearError(secondName);
      }
      
      // Validate Email
      if (!email.value.trim()) {
        setError(email, "Email is required.");
        valid = false;
      } else if (!validateEmail(email.value)) {
        setError(email, "Please enter a valid email address.");
        valid = false;
      } else {
        clearError(email);
      }
      
      // Validate Phone Number
      if (!number.value.trim()) {
        setError(number, "Phone number is required.");
        valid = false;
      } else if (!validatePhone(number.value)) {
        setError(number, "Please enter a valid phone number.");
        valid = false;
      } else {
        clearError(number);
      }
      
      // Validate Service Selection
      if (!service.value) {
        setError(service, "Please select a service.");
        valid = false;
      } else {
        clearError(service);
      }
      
      // Validate Message
      if (!message.value.trim()) {
        setError(message, "Message is required.");
        valid = false;
      } else if (message.value.trim().length < 4) {
        setError(message, "Message should be at least 4 characters.");
        valid = false;
      } else {
        clearError(message);
      }
      
      // If validation fails, stop submission
      if (!valid) return;

      // Prepare form data
      const formData = {
        id: Date.now(), // Unique identifier for each submission
        name: name.value.trim(),
        secondName: secondName.value.trim(),
        email: email.value.trim(),
        number: number.value.trim(),
        service: service.value,
        message: message.value.trim(),
        timestamp: new Date().toISOString()
      };

      // Save form data to array in localStorage
      const saveSuccess = saveFormData(formData);
      
      if (saveSuccess) {
        showSuccess("Your message has been saved successfully!");
      } else {
        showSuccess("Message saved but there was an issue with storage.");
      }
      
      setTimeout(clearSuccess, 3000);
      contactForm.reset();
      [name, secondName, email, number, service, message].forEach(clearError);
    });
    
    /**
     * Sets up real-time error clearing on input
     */
    ["name", "secondName", "email", "number", "service", "message"].forEach(field => {
      const el = contactForm.elements[field];
      if (el) {
        el.addEventListener("input", () => clearError(el));
        if (el.tagName === "SELECT" || el.tagName === "TEXTAREA") {
          el.addEventListener("change", () => clearError(el));
        }
      }
    });
  }
}

// Export module for main.js
window.ContactFormModule = {
  init: initContactForm
}; 