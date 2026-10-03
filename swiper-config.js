/**
 * swiper-config.js - Swiper configuration for the portfolio website
 */

// Shared gallery state
window.galleryState = {
    items: [],
    currentIndex: 0
};

window.GALLERY_GAP = 20;

/**
 * Sections whose media all fits on one row shrink to hug it (class .gallery-fits, sized from
 * --gallery-w); longer galleries keep the full width and scroll. Re-checked on resize.
 */
window.initGalleryFit = function() {
    const galleries = Array.from(document.querySelectorAll('.mySwiper'));

    const measure = () => {
        galleries.forEach(gallery => {
            const section = gallery.closest('section');
            const slides = gallery.querySelectorAll('.swiper-slide');
            if (!section || slides.length === 0) return;

            section.classList.remove('gallery-fits');
            let total = (slides.length - 1) * window.GALLERY_GAP;
            slides.forEach(slide => { total += slide.offsetWidth; });

            if (total <= gallery.clientWidth) {
                section.style.setProperty('--gallery-w', total + 'px');
                section.classList.add('gallery-fits');
            } else {
                section.style.removeProperty('--gallery-w');
            }
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