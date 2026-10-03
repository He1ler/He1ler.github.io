/**
 * swiper-config.js - Swiper configuration for the portfolio website
 */

// Shared gallery state
window.galleryState = {
    items: [],
    currentIndex: 0
};

window.GALLERY_GAP = 32;

/**
 * Galleries whose media does not fill the row are scaled up (--gallery-scale, read by .gallery-tile)
 * so short galleries do not look smaller than long ones. Portrait tiles stop at 1.24x (620 px tall),
 * landscape-only galleries at 1.4x. Re-measured on resize.
 */
window.initGalleryFit = function() {
    const galleries = Array.from(document.querySelectorAll('.mySwiper'));

    const measure = () => {
        galleries.forEach(gallery => {
            const slides = gallery.querySelectorAll('.swiper-slide');
            if (slides.length === 0) return;

            gallery.style.setProperty('--gallery-scale', '1');
            const gaps = (slides.length - 1) * window.GALLERY_GAP;
            let tiles = 0;
            slides.forEach(slide => { tiles += slide.offsetWidth; });

            const hasPortrait = gallery.querySelector('.gallery-tile:not(.is-landscape)') !== null;
            const maxScale = hasPortrait ? 1.24 : 1.4;
            const scale = Math.min(maxScale, Math.max(1, (gallery.clientWidth - gaps) / tiles));

            gallery.style.setProperty('--gallery-scale', scale.toFixed(3));
            if (gallery.swiper) gallery.swiper.update();
        });
    };

    let timer = null;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(measure, 150);
    });
    measure();
};

/**
 * Initialize Swiper for project galleries
 */
window.initializeSwiper = function() {
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper is not loaded');
        return;
    }

    // Initialize all swiper instances
    const swiperElements = document.querySelectorAll('.swiper');
    
    swiperElements.forEach(element => {
        new Swiper(element, {
            slidesPerView: 'auto',
            spaceBetween: window.GALLERY_GAP,
            centerInsufficientSlides: true,
            rewind: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            keyboard: {
                enabled: true
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide'
            }
        });
    });
};

/**
 * Build a gallery collection from a container's items
 * @param {HTMLElement} container - The gallery container
 * @returns {Array} Array of gallery items with src and type
 */
window.buildGalleryCollection = function(container) {
    const items = [];
    
    // Find all gallery items (elements with onclick that calls openModal)
    const galleryNodes = container.querySelectorAll('[onclick*="openModal"]');
    
    galleryNodes.forEach(node => {
        // Extract source and type from the onclick attribute
        const onclickAttr = node.getAttribute('onclick');
        const match = onclickAttr.match(/openModal\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);
        
        if (match && match.length === 3) {
            items.push({
                src: match[1],
                type: match[2]
            });
        }
    });
    
    return items;
};