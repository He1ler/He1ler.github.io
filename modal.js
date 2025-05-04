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
let mediaCollections = {
    collection1: [],
    collection2: []
};

// Current collection index
let currentCollection = 'collection1';

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
    if (mediaCollections[currentCollection].length > 0) {
        const currentIndex = mediaCollections[currentCollection].findIndex(item => 
            item.src === currentMedia.src && item.type === currentMedia.type
        );
        
        if (currentIndex !== -1) {
            const newIndex = (currentIndex - 1 + mediaCollections[currentCollection].length) % mediaCollections[currentCollection].length;
            const item = mediaCollections[currentCollection][newIndex];
            openModal(item.src, item.type);
        }
    }
}

// Navigate to next media
function nextMedia() {
    if (mediaCollections[currentCollection].length > 0) {
        const currentIndex = mediaCollections[currentCollection].findIndex(item => 
            item.src === currentMedia.src && item.type === currentMedia.type
        );
        
        if (currentIndex !== -1) {
            const newIndex = (currentIndex + 1) % mediaCollections[currentCollection].length;
            const item = mediaCollections[currentCollection][newIndex];
            openModal(item.src, item.type);
        }
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
    const hasMultipleItems = mediaCollections[currentCollection].length > 1;
    prevButton.style.display = hasMultipleItems ? 'block' : 'none';
    nextButton.style.display = hasMultipleItems ? 'block' : 'none';
}

// Swap media collection
function swapMediaCollection(collectionName) {
    if (mediaCollections[collectionName] && mediaCollections[collectionName].length > 0) {
        currentCollection = collectionName;
        
        // Find the current media in the new collection
        const currentIndex = mediaCollections[collectionName].findIndex(item => 
            item.src === currentMedia.src && item.type === currentMedia.type
        );
        
        // If current media not found in new collection, start from first item
        const newIndex = currentIndex !== -1 ? currentIndex : 0;
        const item = mediaCollections[collectionName][newIndex];
        
        // Load the item
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
    mediaCollections.collection1 = collection1Items || [];
    mediaCollections.collection2 = collection2Items || [];
    
    // Initialize the first collection if it has items
    if (mediaCollections.collection1.length > 0) {
        currentCollection = 'collection1';
        updateSwapButtonStates('collection1');
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initModal();
    
    // Example: Initialize with empty collections
    setMediaCollections([], []);
    
    // Export the collections setter to window for external use
    window.setMediaCollections = setMediaCollections;
});