/**
 * modal.js - Modal functionality for the portfolio website
 */

// Get modal elements
const modal = document.getElementById('mediaModal');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const modalVideoSource = document.getElementById('modalVideoSource');
const prevButton = document.getElementById('prevMedia');
const nextButton = document.getElementById('nextMedia');

// Current media state
let currentMedia = {
    src: '',
    type: ''
};

// All media items from all projects
let allMediaItems = [];

// Current media index
let currentMediaIndex = 0;

// Initialize modal
function initModal() {
    // Add event listeners
    prevButton.addEventListener('click', prevMedia);
    nextButton.addEventListener('click', nextMedia);
    document.addEventListener('keydown', handleKeyPress);
}

// Open modal with media
function openModal(src, type) {
    // Update current media
    currentMedia = { src, type };
    
    // Find the current media index
    currentMediaIndex = allMediaItems.findIndex(item => 
        item.src === src && item.type === type
    );
    
    // Show modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
    
    // Load media
    if (type === 'image') {
        modalImage.src = src;
        modalImage.classList.remove('hidden');
        modalVideo.classList.add('hidden');
    } else if (type === 'video') {
        modalVideoSource.src = src;
        modalVideo.load();
        modalVideo.classList.remove('hidden');
        modalImage.classList.add('hidden');
    }
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Close modal
function closeModal() {
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.style.display = 'none';
        // Pause video if playing
        if (modalVideo) {
            modalVideo.pause();
        }
    }, 300);
}

// Navigate to previous media
function prevMedia() {
    if (allMediaItems.length > 0) {
        currentMediaIndex = (currentMediaIndex - 1 + allMediaItems.length) % allMediaItems.length;
        const item = allMediaItems[currentMediaIndex];
        openModal(item.src, item.type);
    }
}

// Navigate to next media
function nextMedia() {
    if (allMediaItems.length > 0) {
        currentMediaIndex = (currentMediaIndex + 1) % allMediaItems.length;
        const item = allMediaItems[currentMediaIndex];
        openModal(item.src, item.type);
    }
}

// Handle keyboard navigation
function handleKeyPress(event) {
    if (modal.classList.contains('visible')) {
        switch (event.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                prevMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
        }
    }
}

// Update navigation buttons visibility
function updateNavigationButtons() {
    const hasMultipleItems = allMediaItems.length > 1;
    prevButton.style.display = hasMultipleItems ? 'block' : 'none';
    nextButton.style.display = hasMultipleItems ? 'block' : 'none';
}

// Add a function to populate all media items
function setAllMediaItems(items) {
    allMediaItems = items || [];
    console.log('Media items set:', allMediaItems);
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initModal();
    
    // Example: Initialize with empty items
    setAllMediaItems([]);
    
    // Export the media items setter to window for external use
    window.setAllMediaItems = setAllMediaItems;
});