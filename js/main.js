/* ========================================
   GOWTHAM RAVI - AI/ML PORTFOLIO
   Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

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
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if ('scrollBehavior' in document.documentElement.style) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        const navHeight = (document.getElementById('navbar') || { offsetHeight: 80 }).offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
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