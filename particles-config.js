/**
 * particles-config.js - Particles.js configuration for the portfolio website
 */

/**
 * Initialize particles.js on the header
 */
function initializeParticles() {
    const particlesElement = document.getElementById('particles-js');
    
    if (particlesElement && window.particlesJS) {
      particlesJS('particles-js', {
        particles: {
          number: { 
            value: 100, 
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
        retina_detect: true
      });
    } else {
      console.warn('Particles.js not loaded or element not found');
    }
  }