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
    if (window.galleryState.items.length > 0) {
        window.galleryState.currentIndex = (window.galleryState.currentIndex - 1 + window.galleryState.items.length) % window.galleryState.items.length;
        const item = window.galleryState.items[window.galleryState.currentIndex];
        openModal(item.src, item.type);
    }
}

// Navigate to next media
function nextMedia() {
    if (window.galleryState.items.length > 0) {
        window.galleryState.currentIndex = (window.galleryState.currentIndex + 1) % window.galleryState.items.length;
        const item = window.galleryState.items[window.galleryState.currentIndex];
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
    const hasMultipleItems = window.galleryState.items.length > 1;
    prevButton.style.display = hasMultipleItems ? 'block' : 'none';
    nextButton.style.display = hasMultipleItems ? 'block' : 'none';
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', initModal);