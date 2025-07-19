/**
 * CV Download Module
 * Handles CV download functionality without page reload
 * Provides fallback options for different browser behaviors
 */

/**
 * Initializes CV download functionality
 * Sets up click handler with download and fallback methods
 */
function initCvDownload() {
  const cvDownloadBtn = document.querySelector(".dCV");
  
  if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Get the download URL from the href attribute
      const downloadUrl = this.getAttribute("href");
      
      // Method 1: Try direct download
      try {
        // Create a temporary link element for download
        const tempLink = document.createElement("a");
        tempLink.href = downloadUrl;
        tempLink.download = "Gerold_CV.pdf";
        tempLink.target = "_blank"; // Open in new tab if download fails
        tempLink.style.display = "none";
        
        // Add to DOM, click, and remove
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        
      } catch (error) {
        // Method 2: Fallback - open in new tab
        window.open(downloadUrl, '_blank');
      }
    });
  }
}

// Export module for main.js
window.CvDownloadModule = {
  init: initCvDownload
}; 