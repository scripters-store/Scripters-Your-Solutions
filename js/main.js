document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.createElement('div');
  mobileMenu.classList.add('md:hidden', 'bg-gray-800', 'fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'transform', 'transition-transform', 'duration-300', 'ease-in-out', 'translate-x-full');
  mobileMenu.innerHTML = `
      <nav class="text-center">
          <a href="#home" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Home</a>
          <a href="#products" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Products</a>
          <a href="#features" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Features</a>
          <a href="#testimonials" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Testimonials</a>
          <a href="#contact" class="block py-4 text-xl hover:text-blue-400 transition-colors duration-300">Contact</a>
      </nav>
  `;
  document.body.appendChild(mobileMenu);

  menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('translate-x-full');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
          mobileMenu.classList.add('translate-x-full');
      }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          mobileMenu.classList.add('translate-x-full');
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Intersection Observer for fade-in animations
  const fadeElems = document.querySelectorAll('.fade-in-section');
  const appearOptions = {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          appearOnScroll.unobserve(entry.target);
      });
  }, appearOptions);

  fadeElems.forEach(elem => {
      appearOnScroll.observe(elem);
  });

  // Form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here you would typically send the form data to a server
      console.log('Form submitted');
      contactForm.reset();
      alert('Thank you for your message. We will get back to you soon!');
  });

  // ATLOS Payment Integration
  window.atlos = {
      Pay: function(options) {
          console.log('ATLOS Payment initiated with options:', options);
          // Here you would typically integrate with the real ATLOS payment gateway
          // For this example, we'll use a simulated payment process
          setTimeout(() => {
              alert(`Payment of $${options.orderAmount} processed successfully with ATLOS. Order ID: ${options.orderId}`);
          }, 2000);
      }
  };

  // Generate a unique order ID
  window.generateOrderId = function() {
      return 'ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  // Animated counter for product statistics
  function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = Math.floor(progress * (end - start) + start);
          if (progress < 1) {
              window.requestAnimationFrame(step);
          }
      };
      window.requestAnimationFrame(step);
  }

  // Animate statistics on scroll
  const stats = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = entry.target;
              const end = parseInt(target.getAttribute('data-target'));
              animateValue(target, 0, end, 2000);
              statsObserver.unobserve(target);
          }
      });
  }, { threshold: 0.7 });

  stats.forEach(stat => {
      statsObserver.observe(stat);
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero');
      const coords = (scrolled * 0.4) + 'px';
      parallax.style.backgroundPositionY = coords;
  });

  // Lazy loading images
  const images = document.querySelectorAll('img[data-src]');
  const imgOptions = {
      threshold: 0,
      rootMargin: "0px 0px 300px 0px"
  };

  const imgObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.onload = () => {
              img.removeAttribute('data-src');
          };
          imgObserver.unobserve(img);
      });
  }, imgOptions);

  images.forEach(img => imgObserver.observe(img));

  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      localStorage.setItem('darkMode', body.classList.contains('dark'));
  });

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
      body.classList.add('dark');
  }
});

