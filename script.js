const revealElements = document.querySelectorAll('.reveal');
const staggerElements = document.querySelectorAll('.stagger');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach((element) => observer.observe(element));

staggerElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
  observer.observe(element);
});

const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const button = contactForm.querySelector('button[type="submit"]');
  const originalText = button?.textContent || 'Enviar solicitud';

  if (button) {
    button.textContent = 'Solicitud enviada';
    button.disabled = true;
  }

  contactForm.reset();

  setTimeout(() => {
    if (button) {
      button.textContent = originalText;
      button.disabled = false;
    }
  }, 2200);
});
