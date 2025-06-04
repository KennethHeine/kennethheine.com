// Modern Static Web App JavaScript
document.addEventListener('DOMContentLoaded', function () {
  console.log('Azure Static Web App loaded successfully!');

  // Header click interactivity
  const header = document.querySelector('header h1');
  if (header) {
    header.addEventListener('click', function () {
      header.style.color = header.style.color === 'gold' ? '' : 'gold';
    });
  }

  // Update footer with current year
  const footer = document.querySelector('footer p');
  if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} My Azure Static Web App`;
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Add a simple animation to sections
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Add loading animation completion
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
