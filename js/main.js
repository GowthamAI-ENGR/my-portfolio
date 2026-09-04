/* ========================================
   GOWTHAM RAVI - AI/ML PORTFOLIO
   Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // NEURAL NETWORK CANVAS (Hero Background)
  // ========================================

  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let connections = [];
  let animFrame;
  let mouse = { x: null, y: null };
  let canvasVisible = true;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Pause animation when hero is offscreen
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      canvasVisible = entry.isIntersecting;
      if (canvasVisible && !animFrame) {
        animateParticles();
      }
    });
  }, { threshold: 0 });

  const heroSection = document.getElementById('home');
  if (heroSection) heroObserver.observe(heroSection);

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          this.x -= dx * 0.005;
          this.y -= dy * 0.005;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    // Reduce particles on mobile for performance
    const isMobile = window.innerWidth <= 768;
    const area = canvas.width * canvas.height;
    const divisor = isMobile ? 20000 : 12000;
    const count = Math.min(Math.floor(area / divisor), isMobile ? 40 : 80);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    if (!canvasVisible) {
      animFrame = null;
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    animFrame = requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // ========================================
  // NAVBAR - Scroll Effect
  // ========================================

  const navbar = document.getElementById('navbar');

  function handleNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ========================================
  // SCROLL PROGRESS BAR
  // ========================================

  const scrollProgress = document.getElementById('scrollProgress');

  function handleScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  // ========================================
  // ACTIVE NAV LINK
  // ========================================

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ========================================
  // MOBILE MENU
  // ========================================

  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click (desktop nav + mobile bottom nav)
  const allCloseLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allCloseLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ========================================
  // SCROLL REVEAL (Intersection Observer)
  // ========================================

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========================================
  // SCROLL EVENT HANDLER (Throttled)
  // ========================================

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbar();
        handleScrollProgress();
        handleActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial calls
  handleNavbar();
  handleScrollProgress();
  handleActiveLink();

  // ========================================
  // SMOOTH SCROLL (for older browsers)
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // GALLERY - Image Fallback
  // ========================================

  document.querySelectorAll('.gallery-img').forEach(img => {
    const fallback = () => img.closest('.gallery-item').classList.add('gallery-fallback');
    if (img.complete && img.naturalWidth === 0) {
      fallback();
    } else {
      img.addEventListener('error', fallback, { once: true });
    }
  });

  // ========================================
  // GITHUB - Live Stats
  // ========================================

  const GITHUB_USERNAME = 'GowthamAI-ENGR';
  const statRepos = document.getElementById('statRepos');
  const statFollowers = document.getElementById('statFollowers');
  const statFollowing = document.getElementById('statFollowing');

  fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    .then(res => {
      if (!res.ok) throw new Error('GitHub API request failed');
      return res.json();
    })
    .then(data => {
      if (typeof data.public_repos === 'number') {
        statRepos.textContent = data.public_repos;
        statRepos.setAttribute('data-counter', data.public_repos);
      }
      if (typeof data.followers === 'number') {
        statFollowers.textContent = data.followers;
        statFollowers.setAttribute('data-counter', data.followers);
      }
      if (typeof data.following === 'number') {
        statFollowing.textContent = data.following;
        statFollowing.setAttribute('data-counter', data.following);
      }
    })
    .catch(() => {
      statRepos.textContent = '9+';
      statFollowers.textContent = '–';
      statFollowing.textContent = '–';
    });

});