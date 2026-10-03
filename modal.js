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

// Media items grouped per project (populated by main.js from the gallery markup);
// prev/next cycle inside the group of the opened item, never into another project
let mediaGroups = [];
let allMediaItems = [];

// Current media index
let currentMediaIndex = 0;

// Initialize modal
function initModal() {
    prevButton.addEventListener('click', prevMedia);
    nextButton.addEventListener('click', nextMedia);
    document.addEventListener('keydown', handleKeyPress);
}

// Open modal with media
function openModal(src, type) {
    // Update current media
    currentMedia = { src, type };

    // Find the project group and index of this item
    const isCurrent = item => item.src === src && item.type === type;
    const group = mediaGroups.find(items => items.some(isCurrent));
    if (group) allMediaItems = group;
    currentMediaIndex = allMediaItems.findIndex(isCurrent);

    // Show modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);

    // Load media
    if (type === 'image') {
        modalVideo.pause();
        modalImage.src = src;
        modalImage.classList.remove('hidden');
        modalVideo.classList.add('hidden');
    } else if (type === 'video') {
        modalVideo.pause(); // pause just in case
        modalVideoSource.src = src;
        modalVideo.load(); // load new source
        modalVideo.classList.remove('hidden');
        modalImage.classList.add('hidden');

        // Ensure it plays after source is loaded
        modalVideo.oncanplay = () => {
            const playing = modalVideo.play();
            if (playing) playing.catch(() => {});
        };
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

// Populate per-project media groups
function setMediaGroups(groups) {
    mediaGroups = groups || [];
    allMediaItems = [];
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initModal();

    // Export the media groups setter to window for main.js
    window.setMediaGroups = setMediaGroups;
});
