/**
 * main.js - General JavaScript functionality for the portfolio website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    if (typeof window.initializeSwiper === 'function') {
        window.initializeSwiper();
    } else {
        console.error('Swiper initialization function not found');
    }

    // Initialize mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize all components
    initMobileMenu();
    setupIntersectionObserver();
    initializeMediaCollections();
});

/**
 * Initialize media collections from project galleries
 */
function initializeMediaCollections() {
    // Get all project sections
    const projectSections = document.querySelectorAll('section.fade-in');
    
    // Create collections for each project
    projectSections.forEach((section, index) => {
        const collection = [];
        
        // Find all media items in the swiper
        const swiperSlides = section.querySelectorAll('.swiper-slide');
        
        swiperSlides.forEach(slide => {
            // Find the media element (video or image)
            const mediaElement = slide.querySelector('video, img');
            if (mediaElement) {
                // Get the onclick attribute to extract src and type
                const onclickAttr = slide.getAttribute('onclick');
                if (onclickAttr) {
                    const match = onclickAttr.match(/openModal\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);
                    if (match && match.length === 3) {
                        collection.push({
                            src: match[1],
                            type: match[2]
                        });
                    }
                }
            }
        });
        
        // Add the collection to the appropriate collection array
        if (index % 2 === 0) {
            // Even index projects go to collection1
            if (!window.mediaCollections) window.mediaCollections = { collection1: [], collection2: [] };
            window.mediaCollections.collection1 = [...window.mediaCollections.collection1, ...collection];
        } else {
            // Odd index projects go to collection2
            if (!window.mediaCollections) window.mediaCollections = { collection1: [], collection2: [] };
            window.mediaCollections.collection2 = [...window.mediaCollections.collection2, ...collection];
        }
    });
    
    // Initialize the collections in the modal
    if (window.setMediaCollections && window.mediaCollections) {
        window.setMediaCollections(
            window.mediaCollections.collection1,
            window.mediaCollections.collection2
        );
    }
}

/**
 * Mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking menu items
        const menuItems = mobileMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/**
 * Intersection Observer for animations
 */
function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Back to top functionality
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add event listeners to all back-to-top buttons
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButtons = document.querySelectorAll('.back-to-top');
    backToTopButtons.forEach(button => {
        button.addEventListener('click', scrollToTop);
    });
});