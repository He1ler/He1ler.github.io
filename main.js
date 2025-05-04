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
 * Initialize media items from project galleries
 */
function initializeMediaCollections() {
    console.log('Starting media collection initialization...');
    
    // Get all project sections
    const projectSections = document.querySelectorAll('section.fade-in');
    console.log('Found project sections:', projectSections.length);
    
    // Create array for all media items
    const allMediaItems = [];
    
    projectSections.forEach((section, sectionIndex) => {
        console.log(`Processing section ${sectionIndex + 1}`);
        
        // Find the swiper wrapper
        const swiperWrapper = section.querySelector('.swiper-wrapper');
        if (!swiperWrapper) {
            console.log('No swiper wrapper found in section', sectionIndex + 1);
            return;
        }
        
        // Find all swiper slides
        const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide');
        console.log(`Found ${swiperSlides.length} slides in section ${sectionIndex + 1}`);
        
        swiperSlides.forEach((slide, slideIndex) => {
            // Find the media container div with onclick attribute
            const mediaContainer = slide.querySelector('div[onclick*="openModal"]');
            if (mediaContainer) {
                // Get the onclick attribute
                const onclickAttr = mediaContainer.getAttribute('onclick');
                if (onclickAttr) {
                    // Extract src and type from the onclick attribute
                    const match = onclickAttr.match(/openModal\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);
                    if (match && match.length === 3) {
                        const src = match[1];
                        const type = match[2];
                        
                        // Add to the collection
                        allMediaItems.push({
                            src: src,
                            type: type
                        });
                        
                        console.log(`Added media item from section ${sectionIndex + 1}, slide ${slideIndex + 1}:`, { src, type });
                    }
                }
            }
        });
    });
    
    console.log('Total media items collected:', allMediaItems.length);
    
    // Initialize the media items in the modal
    if (window.setAllMediaItems) {
        window.setAllMediaItems(allMediaItems);
        console.log('Media items initialized:', allMediaItems);
    } else {
        console.error('setAllMediaItems function not found on window');
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