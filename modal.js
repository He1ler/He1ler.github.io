/**
 * modal.js - Modal functionality for the portfolio website
 */

// Keep track of gallery items and current index
let currentMediaSrc = '';
let currentMediaType = '';
let galleryItems = [];
let currentGalleryIndex = 0;

/**
 * Open the media modal
 * @param {string} src - Source URL for the media
 * @param {string} type - Type of media ('image' or 'video')
 */
function openModal(src, type) {
  const modal = document.getElementById('mediaModal');
  const modalImage = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  const videoSource = document.getElementById('modalVideoSource');
  
  // Save current media info
  currentMediaSrc = src;
  currentMediaType = type;
  
  // Show modal
  modal.classList.add('visible');
  
  // Set focus trap
  modal.setAttribute('tabindex', '-1');
  modal.focus();

  // Update the prev/next buttons' visibility
  updateNavigationButtons();

  // Handle media type
  if (type === 'video' || src.endsWith('.mp4')) {
    modalImage.classList.add('hidden');
    modalVideo.classList.remove('hidden');
    videoSource.src = src;
    modalVideo.load();
    modalVideo.play();
  } else {
    modalVideo.classList.add('hidden');
    modalImage.classList.remove('hidden');
    modalImage.src = src;
  }

  // Add event listener for ESC key
  document.addEventListener('keydown', handleEscKey);
  
  // Find the gallery container and build the gallery collection
  const galleryContainer = findGalleryContainer(src);
  if (galleryContainer) {
    galleryItems = buildGalleryCollection(galleryContainer);
    currentGalleryIndex = galleryItems.findIndex(item => item.src === src);
  }
}

/**
 * Close the media modal
 */
function closeModal() {
  const modal = document.getElementById('mediaModal');
  const modalVideo = document.getElementById('modalVideo');

  // Hide modal
  modal.classList.remove('visible');
  
  // Pause video if playing
  modalVideo.pause();
  
  // Remove ESC key event listener
  document.removeEventListener('keydown', handleEscKey);
}

/**
 * Handle ESC key press to close modal
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleEscKey(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

/**
 * Find the gallery container that contains the media source
 * @param {string} src - Media source URL
 * @returns {HTMLElement|null} The gallery container or null
 */
function findGalleryContainer(src) {
  // Find all elements with onclick attribute containing the src
  const elements = document.querySelectorAll(`[onclick*="${src}"]`);
  
  if (elements.length === 0) {
    return null;
  }
  
  // Find the swiper container that is an ancestor of this element
  let element = elements[0];
  while (element && !element.classList.contains('swiper')) {
    element = element.parentElement;
  }
  
  return element;
}

/**
 * Navigate to the previous media in the gallery
 */
function previousMedia() {
  if (galleryItems.length <= 1) return;
  
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentGalleryIndex];
  
  openModal(item.src, item.type);
}

/**
 * Navigate to the next media in the gallery
 */
function nextMedia() {
  if (galleryItems.length <= 1) return;
  
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
  const item = galleryItems[currentGalleryIndex];
  
  openModal(item.src, item.type);
}

/**
 * Update the visibility of navigation buttons
 */
function updateNavigationButtons() {
  const prevButton = document.getElementById('prevMedia');
  const nextButton = document.getElementById('nextMedia');
  
  if (!prevButton || !nextButton) return;
  
  // Only show navigation buttons if there's more than one item
  const shouldShowNavigation = galleryItems.length > 1;
  prevButton.style.display = shouldShowNavigation ? 'block' : 'none';
  nextButton.style.display = shouldShowNavigation ? 'block' : 'none';
}

// Set up event listeners for modal navigation
document.addEventListener('DOMContentLoaded', function() {
  const prevButton = document.getElementById('prevMedia');
  const nextButton = document.getElementById('nextMedia');
  
  if (prevButton) {
    prevButton.addEventListener('click', previousMedia);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextMedia);
  }
  
  // Add keyboard navigation for arrow keys
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('mediaModal').classList.contains('visible')) {
      return;
    }
    
    if (e.key === 'ArrowLeft') {
      previousMedia();
    } else if (e.key === 'ArrowRight') {
      nextMedia();
    }
  });
});