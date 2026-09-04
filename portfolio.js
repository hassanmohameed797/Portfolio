document.addEventListener('DOMContentLoaded', function () {

  // ==================== REVEAL ON SCROLL (single lightweight observer) ====================
  const revealTargets = document.querySelectorAll(
    '.about-text, .focus-card, .environment-card, .skill-category, .project-card, .education-item, .contact-item, .section-header'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  // ==================== SMOOTH SCROLL FOR NAV LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = href.length > 1 ? document.querySelector(href) : null;
      if (target) {
        e.preventDefault();
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.getBoundingClientRect().height + 16 : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileNav();
      }
    });
  });

  // ==================== ACTIVE NAV LINK ====================
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => navObserver.observe(section));

  // ==================== MOBILE NAV TOGGLE ====================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksWrap = document.querySelector('.nav-links');

  function closeMobileNav() {
    if (navToggle && navLinksWrap) {
      navToggle.classList.remove('open');
      navLinksWrap.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (navToggle && navLinksWrap) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.classList.toggle('open');
      navLinksWrap.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ==================== SCROLL TO TOP BUTTON ====================
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('visible', window.pageYOffset > 400);
    }, { passive: true });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
