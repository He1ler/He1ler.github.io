/**
 * swiper-config.js - Swiper configuration for the portfolio website
 */

/**
 * Initialize Swiper for project galleries
 */
function initializeSwiper() {
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper is not loaded');
      return;
    }
  
    // Initialize all swiper instances
    const swiperElements = document.querySelectorAll('.swiper');
    
    swiperElements.forEach(element => {
      new Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
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
  }
  
  /**
   * When navigating the swiper gallery, we need to keep track of media sources for the modal
   */
  let galleryItems = [];
  let currentGalleryIndex = 0;
  
  /**
   * Build a gallery collection from a container's items
   * @param {HTMLElement} container - The gallery container
   * @returns {Array} Array of gallery items with src and type
   */
  function buildGalleryCollection(container) {
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
  }