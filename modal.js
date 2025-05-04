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

// New buttons for swapping media
const mediaSwapButton1 = document.getElementById('swapMedia1');
const mediaSwapButton2 = document.getElementById('swapMedia2');

// Current media state
let currentMedia = {
    src: '',
    type: ''
};

// Media collections for swapping
const mediaCollections = {
    collection1: [],
    collection2: []
};

// Initialize modal
function initModal() {
    // Add event listeners
    prevButton.addEventListener('click', prevMedia);
    nextButton.addEventListener('click', nextMedia);
    document.addEventListener('keydown', handleKeyPress);
    
    // Add event listeners for new swap buttons
    mediaSwapButton1.addEventListener('click', () => swapMediaCollection('collection1'));
    mediaSwapButton2.addEventListener('click', () => swapMediaCollection('collection2'));
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
            case '1':
                swapMediaCollection('collection1');
                break;
            case '2':
                swapMediaCollection('collection2');
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

// Initialize media collections
function initMediaCollections(collection1Items, collection2Items) {
    mediaCollections.collection1 = collection1Items || [];
    mediaCollections.collection2 = collection2Items || [];
}

// Swap media collection
function swapMediaCollection(collectionName) {
    if (mediaCollections[collectionName] && mediaCollections[collectionName].length > 0) {
        // Save current index before swapping
        const currentIndex = window.galleryState.currentIndex;
        
        // Swap the items in the gallery state
        window.galleryState.items = [...mediaCollections[collectionName]];
        
        // Reset index or try to match it
        window.galleryState.currentIndex = Math.min(currentIndex, window.galleryState.items.length - 1);
        
        // Load the current item from the new collection
        const item = window.galleryState.items[window.galleryState.currentIndex];
        openModal(item.src, item.type);
        
        // Update active button states
        updateSwapButtonStates(collectionName);
    }
}

// Update the active states of swap buttons
function updateSwapButtonStates(activeCollection) {
    mediaSwapButton1.classList.toggle('active', activeCollection === 'collection1');
    mediaSwapButton2.classList.toggle('active', activeCollection === 'collection2');
}

// Add a function to populate the media collections
function setMediaCollections(collection1Items, collection2Items) {
    initMediaCollections(collection1Items, collection2Items);
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initModal();
    
    // Example: Initialize with empty collections
    initMediaCollections([], []);
    
    // Export the collections setter to window for external use
    window.setMediaCollections = setMediaCollections;
});