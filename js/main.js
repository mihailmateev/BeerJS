/**
 * Vanilla JavaScript utilities for Beer.js Summit 2025.
 * The previous jQuery-based implementation has been replaced with
 * small, dependency-free functions. Each function is exported so that
 * it can be imported as an ES module.
 */

export function initFullHeight() {
  function setHeight() {
    document.querySelectorAll('.js-fullheight').forEach(el => {
      el.style.height = window.innerHeight + 'px';
    });
  }
  setHeight();
  window.addEventListener('resize', setHeight);
}

export function initLoader() {
  const loader = document.getElementById('ftco-loader');
  if (!loader) return;
  setTimeout(() => loader.classList.remove('show'), 1);
}

export function initNavigation() {
  const navbar = document.querySelector('.ftco_navbar');
  const toggler = document.querySelector('.navbar-toggler');
  const navMenu = document.getElementById('ftco-nav');
  const scrollWrap = document.querySelector('.js-scroll-wrap');

  if (toggler && navMenu) {
    toggler.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  window.addEventListener('scroll', () => {
    const st = window.pageYOffset;
    if (navbar) {
      if (st > 150) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled', 'sleep');
      }
      if (st > 350) {
        navbar.classList.add('awake');
        scrollWrap && scrollWrap.classList.add('sleep');
      } else {
        navbar.classList.remove('awake');
        navbar.classList.add('sleep');
        scrollWrap && scrollWrap.classList.remove('sleep');
      }
    }
  });
}

export function initDropdowns() {
  document.querySelectorAll('nav .dropdown').forEach(dropdown => {
    const link = dropdown.querySelector(':scope > a');
    const menu = dropdown.querySelector('.dropdown-menu');

    dropdown.addEventListener('mouseenter', () => {
      dropdown.classList.add('show');
      link && link.setAttribute('aria-expanded', 'true');
      menu && menu.classList.add('show');
    });

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('show');
      link && link.setAttribute('aria-expanded', 'false');
      menu && menu.classList.remove('show');
    });
  });
}

export function initCarousels() {
  document.querySelectorAll('.carousel-testimony, .carousel-speaker').forEach(container => {
    const items = container.children;
    if (items.length <= 1) return;
    let index = 0;
    Array.from(items).forEach((item, i) => {
      item.classList.toggle('active', i === 0);
    });
    setInterval(() => {
      items[index].classList.remove('active');
      index = (index + 1) % items.length;
      items[index].classList.add('active');
    }, 5000);
  });
}

export function initScrollAnimations() {
  const animatedItems = document.querySelectorAll('.ftco-animate');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const effect = el.dataset.animateEffect;
        el.classList.add(effect ? effect : 'fadeInUp', 'ftco-animated');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.95 });
  animatedItems.forEach(el => observer.observe(el));

  // Counter animation
  const numbers = document.querySelectorAll('.number');
  if (numbers.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          numbers.forEach(el => animateNumber(el));
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.95 });
    const trigger = document.getElementById('section-counter') || document.querySelector('.ftco-counter');
    trigger && counterObserver.observe(trigger);
  }

  function animateNumber(el) {
    const target = +el.dataset.number;
    const duration = 7000;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
}

export function initTimer() {
  function updateTimer() {
    const endTime = new Date('23 July 2025 16:30:00 GMT+03:00').getTime();
    const now = Date.now();
    const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));

    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const pad = num => String(num).padStart(2, '0');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerHTML = `${days}<span>Days</span>`;
    if (hoursEl) hoursEl.innerHTML = `${pad(hours)}<span>Hours</span>`;
    if (minutesEl) minutesEl.innerHTML = `${pad(minutes)}<span>Minutes</span>`;
    if (secondsEl) secondsEl.innerHTML = `${pad(seconds)}<span>Seconds</span>`;
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}

