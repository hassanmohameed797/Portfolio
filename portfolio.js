// ==================== SCROLL ANIMATION ==================== 
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    threshold: 0.01,
    rootMargin: '0px 0px -10px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(12px)';
    element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(element);
  });
});

// ==================== SMOOTH SCROLL FOR NAV LINKS ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const navbar = document.querySelector('.navbar');
      const navbarOffset = navbar ? navbar.getBoundingClientRect().height + 24 : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ==================== ACTIVE NAV LINK HIGHLIGHT ==================== 
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.borderBottomColor = 'transparent';
    link.style.color = '#8b949e';
    if (link.getAttribute('href').substring(1) === current) {
      link.style.borderBottomColor = '#00d4ff';
      link.style.color = '#00d4ff';
    }
  });
});

// ==================== STAGGER ANIMATION FOR SKILL CARDS ==================== 
window.addEventListener('scroll', function() {
  const cards = document.querySelectorAll('.skill-category, .project-card, .contact-item');
  
  cards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    const isVisible = cardTop < window.innerHeight * 0.95;
    
    if (isVisible) {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 25);
    }
  });
});

// Initialize card animations
document.querySelectorAll('.skill-category, .project-card, .contact-item').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(12px)';
  card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
});

// ==================== PARALLAX EFFECT (OPTIONAL) ==================== 
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
}

// ==================== FORM INTERACTIONS ==================== 
const contactForm = document.querySelector('.cta-button');
if (contactForm) {
  contactForm.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.05)';
  });
  
  contactForm.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(-3px) scale(1)';
  });
}

// ==================== PROFILE PHOTO ANIMATION ==================== 
const profilePhoto = document.querySelector('.profile-badge');
if (profilePhoto) {
  profilePhoto.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05) rotate(2deg)';
  });
  
  profilePhoto.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
  });
  
  profilePhoto.style.transition = 'transform 0.3s ease';
}

// ==================== SCROLL TO TOP BUTTON ==================== 
function createScrollToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #00d4ff 0%, #58a6ff 100%);
    color: #0d1117;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    font-size: 1.2em;
    cursor: pointer;
    display: none;
    z-index: 99;
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
    transition: all 0.3s ease;
    font-weight: bold;
  `;
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
    } else {
      button.style.display = 'none';
    }
  });
  
  button.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
}

createScrollToTopButton();

// ==================== PAGE LOAD ANIMATION ==================== 
window.addEventListener('load', function() {
  document.body.style.opacity = '1';
});

document.body.style.opacity = '0.95';
document.body.style.transition = 'opacity 0.5s ease';
