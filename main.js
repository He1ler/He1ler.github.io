/**
 * main.js - General JavaScript functionality for the portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.initializeSwiper === 'function') {
        window.initializeSwiper();
    } else {
        console.error('Swiper initialization function not found');
    }
    if (typeof window.initGalleryFit === 'function') {
        window.initGalleryFit();
    }

    initMobileMenu();
    setupIntersectionObserver();
    initGalleryVideos();
    initializeMediaCollections();
    initGalleryKeyboardAccess();
    initBackToTop();
    initMediaSkeletons();
    initCategoryNav();

    const year = document.getElementById('current-year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }
});

/**
 * Initialize media items from project galleries
 */
function initializeMediaCollections() {
    const allMediaItems = [];

    document.querySelectorAll('section.fade-in .swiper-wrapper').forEach(swiperWrapper => {
        swiperWrapper.querySelectorAll('.swiper-slide').forEach(slide => {
            const mediaContainer = slide.querySelector('div[onclick*="openModal"]');
            if (!mediaContainer) return;

            // Extract src and type from the onclick attribute
            const match = (mediaContainer.getAttribute('onclick') || '')
                .match(/openModal\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);
            if (match && match.length === 3) {
                allMediaItems.push({ src: match[1], type: match[2] });
            }
        });
    });

    if (window.setAllMediaItems) {
        window.setAllMediaItems(allMediaItems);
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
    if (!mobileMenuButton || !mobileMenu) return;

    const setOpen = (open) => {
        mobileMenu.classList.toggle('hidden', !open);
        mobileMenuButton.setAttribute('aria-expanded', String(open));
    };

    mobileMenuButton.addEventListener('click', function() {
        setOpen(mobileMenu.classList.contains('hidden'));
    });

    // Close menu when clicking menu items
    mobileMenu.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', () => setOpen(false));
    });
}

/**
 * Gallery videos ship with preload="none" and a poster. They only start
 * downloading and playing once they scroll into view, and pause when they leave.
 * With reduced motion or Save-Data the poster stays; a click opens the full clip.
 */
function initGalleryVideos() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (reduceMotion || saveData) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                const playing = video.play();
                if (playing) playing.catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.swiper video, .featured video').forEach(video => observer.observe(video));
}

/**
 * Gallery tiles are clickable divs; let keyboard users open them too
 */
function initGalleryKeyboardAccess() {
    document.querySelectorAll('div[onclick*="openModal"]').forEach(tile => {
        tile.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                tile.click();
            }
        });
    });
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

function initBackToTop() {
    document.querySelectorAll('.back-to-top').forEach(button => {
        button.addEventListener('click', scrollToTop);
    });
}

/**
 * Lazy gallery images start with no size; show a shimmering box until they load so the
 * layout does not leave a blank gap. Runs after Swiper has cloned its loop slides.
 */
function initMediaSkeletons() {
    document.querySelectorAll('.swiper-slide img').forEach(img => {
        if (img.complete && img.naturalWidth) return;

        const tile = img.parentElement;
        const done = () => tile.classList.remove('media-loading');
        tile.classList.add('media-loading');
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
    });
}

/**
 * Sticky category bar: built from the [data-category] separators, appears once the project
 * list starts and highlights the category currently on screen.
 */
function initCategoryNav() {
    const projects = document.getElementById('projects');
    const featured = document.getElementById('featured');
    const categories = Array.from(document.querySelectorAll('[data-category]'));
    if (!projects || categories.length === 0) return;

    const targets = featured ? [{ id: 'featured', label: 'Featured', el: featured }] : [];
    categories.forEach(el => targets.push({ id: el.id, label: el.dataset.category, el }));

    const bar = document.createElement('div');
    bar.className = 'category-nav';
    bar.setAttribute('role', 'navigation');
    bar.setAttribute('aria-label', 'Project categories');

    const links = targets.map(target => {
        const link = document.createElement('a');
        link.href = '#' + target.id;
        link.textContent = target.label;
        bar.appendChild(link);
        return link;
    });
    document.body.appendChild(bar);

    const spyOffset = 140;
    let activeIndex = -1;
    let ticking = false;

    const update = () => {
        ticking = false;
        bar.classList.toggle('is-visible', projects.getBoundingClientRect().top < spyOffset);

        let index = -1;
        targets.forEach((target, i) => {
            if (target.el.getBoundingClientRect().top <= spyOffset) index = i;
        });
        if (index === activeIndex) return;

        activeIndex = index;
        links.forEach((link, i) => {
            link.classList.toggle('is-active', i === index);
            if (i === index) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
        if (index >= 0) {
            const link = links[index];
            bar.scrollTo({ left: link.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
        }
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
}
