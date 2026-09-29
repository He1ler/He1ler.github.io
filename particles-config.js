/**
 * particles-config.js - Configuration for particles.js effect
 */

// Initialize particles with optimized settings
document.addEventListener('DOMContentLoaded', function() {
    // Skip the effect entirely for users who asked for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Fewer particles and no retina scaling on phones
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    // --------------------------------------------
    // PARTICLES.JS INITIALIZATION
    // --------------------------------------------
    particlesJS('particles-js', {
        particles: {
            number: {
                value: isMobile ? 35 : 100,
                density: { 
                    enable: true, 
                    value_area: 800 
                } 
            },
            color: { 
                value: '#ff0000' 
            },
            shape: { 
                type: 'circle' 
            },
            opacity: { 
                value: 0.5, 
                random: true,
                anim: { 
                    enable: true, 
                    speed: 1, 
                    opacity_min: 0.1, 
                    sync: false 
                }
            },
            size: { 
                value: 5,
                random: true,
                anim: { 
                    enable: true, 
                    speed: 3, 
                    size_min: 0.1, 
                    sync: false 
                }
            },
            move: { 
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { 
                    enable: true, 
                    mode: "repulse" 
                },
                onclick: { 
                    enable: true, 
                    mode: "push" 
                },
                resize: true
            },
            modes: {
                repulse: { 
                    distance: 100, 
                    duration: 0.4 
                },
                push: { 
                    particles_nb: 4 
                }
            }
        },
        retina_detect: !isMobile
    });
});