document.addEventListener('DOMContentLoaded', function() {
    // Fetch the projects JSON file
    fetch('projects.json')
      .then(response => response.json())
      .then(data => {
        // Get the container where projects will be inserted
        const projectsContainer = document.querySelector('main');
        
        // Clear any existing content (optional)
        // projectsContainer.innerHTML = '';
        
        // Process each project in the JSON
        data.projects.forEach(project => {
          // Create project section
          const projectSection = createProjectSection(project);
          
          // Append to the container
          projectsContainer.appendChild(projectSection);
          
          // Initialize Swiper for this project if it has media
          if (project.media && project.media.length > 0) {
            initSwiper(project.id);
          }
        });
        
        // Add fade-in animation to all sections
        addFadeInAnimation();
      })
      .catch(error => console.error('Error loading projects:', error));
  });
  
  // Create a project section element from project data
  function createProjectSection(project) {
    const section = document.createElement('section');
    section.className = 'fade-in mb-16 border-glow rounded-lg p-6 bg-black';
    section.id = project.id;
    
    // Create header
    const header = document.createElement('h2');
    header.className = 'text-3xl font-bold neon-red mb-4';
    header.textContent = project.title;
    section.appendChild(header);
    
    // Create description
    const description = document.createElement('p');
    description.className = 'text-gray-300 mb-6 max-w-4xl';
    description.textContent = project.description;
    section.appendChild(description);
    
    // Create media gallery if available
    if (project.media && project.media.length > 0) {
      const galleryContainer = createMediaGallery(project);
      section.appendChild(galleryContainer);
    } else {
      // Create placeholder if no media
      const placeholder = document.createElement('div');
      placeholder.className = 'rounded-lg w-full h-64 md:h-80 border border-red-600 shadow-lg flex items-center justify-center bg-gradient-to-r from-red-900/20 to-black';
      
      const placeholderText = document.createElement('p');
      placeholderText.className = 'text-red-400 text-lg';
      placeholderText.textContent = 'Media coming soon';
      
      placeholder.appendChild(placeholderText);
      section.appendChild(placeholder);
    }
    
    // Add technologies
    section.appendChild(createTechnologiesList(project.technologies));
    
    return section;
  }
  
  // Create a media gallery for a project
  function createMediaGallery(project) {
    const swiperContainer = document.createElement('div');
    swiperContainer.className = 'swiper mySwiper';
    swiperContainer.id = `swiper-${project.id}`;
    
    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';
    
    // Add each media item as a slide
    project.media.forEach(media => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      
      const mediaElement = createMediaElement(media);
      slide.appendChild(mediaElement);
      
      swiperWrapper.appendChild(slide);
    });
    
    swiperContainer.appendChild(swiperWrapper);
    
    // Add navigation buttons
    const nextButton = document.createElement('div');
    nextButton.className = 'swiper-button-next text-red-500';
    
    const prevButton = document.createElement('div');
    prevButton.className = 'swiper-button-prev text-red-500';
    
    swiperContainer.appendChild(nextButton);
    swiperContainer.appendChild(prevButton);
    
    return swiperContainer;
  }
  
  // Create media element (video or image)
  function createMediaElement(media) {
    const container = document.createElement('div');
    
    if (media.type === 'video') {
      container.className = 'relative cursor-pointer';
      container.setAttribute('onclick', `openModal('${media.src}', 'video')`);
      
      const innerContainer = document.createElement('div');
      innerContainer.className = 'rounded-lg w-full h-48 md:h-64 lg:h-72 border border-red-600 shadow-lg opacity-60 bg-gray-900 flex items-center justify-center overflow-hidden';
      
      const gradient = document.createElement('div');
      gradient.className = 'absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60';
      
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'absolute inset-0 flex items-center justify-center';
      
      const playButton = document.createElement('div');
      playButton.className = 'bg-red-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition';
      playButton.textContent = '▶ Play Video';
      
      buttonContainer.appendChild(playButton);
      innerContainer.appendChild(gradient);
      innerContainer.appendChild(buttonContainer);
      container.appendChild(innerContainer);
    } else {
      // Image
      container.className = 'rounded-lg w-full h-48 md:h-64 lg:h-72 border border-red-600 shadow-lg bg-cover bg-center cursor-pointer';
      container.style.backgroundImage = `url('${media.src}')`;
      container.setAttribute('onclick', `openModal('${media.src}', 'image')`);
    }
    
    return container;
  }
  
  // Create technologies list
  function createTechnologiesList(technologies) {
    const techContainer = document.createElement('div');
    techContainer.className = 'mt-6 flex flex-wrap gap-2';
    
    technologies.forEach(tech => {
      const techSpan = document.createElement('span');
      techSpan.className = 'px-3 py-1 bg-red-900/30 border border-red-500/40 rounded-full text-sm text-red-300';
      techSpan.textContent = tech;
      techContainer.appendChild(techSpan);
    });
    
    return techContainer;
  }
  
  // Initialize Swiper for a project
  function initSwiper(projectId) {
    new Swiper(`#swiper-${projectId}`, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
  
  // Add fade-in animation to all sections
  function addFadeInAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Modal function for viewing media (must be defined globally)
  window.openModal = function(src, type) {
    // Implement your modal functionality here
    // This depends on your existing modal implementation
    console.log(`Opening ${type} in modal: ${src}`);
    
    // Example implementation (you may need to adapt this to your existing modal)
    const modal = document.getElementById('mediaModal') || createModal();
    const modalContent = modal.querySelector('.modal-content');
    
    // Clear previous content
    modalContent.innerHTML = '';
    
    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.className = 'max-w-full max-h-[80vh]';
      modalContent.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'max-w-full max-h-[80vh]';
      modalContent.appendChild(img);
    }
    
    // Show modal
    modal.classList.remove('hidden');
  }
  
  // Create modal if it doesn't exist
  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'mediaModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 hidden';
    
    const modalContainer = document.createElement('div');
    modalContainer.className = 'bg-gray-900 rounded-lg p-4 max-w-4xl mx-auto relative';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-2 right-2 text-white text-2xl hover:text-red-500';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
      modal.classList.add('hidden');
    };
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(modalContent);
    modal.appendChild(modalContainer);
    
    // Close on click outside
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
    
    document.body.appendChild(modal);
    return modal;
  }