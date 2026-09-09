const renderData = () => {
  const data = window.SITE_DATA || {};

  const navList = document.getElementById('nav-list');
  if (navList && Array.isArray(data.navigation)) {
    navList.innerHTML = data.navigation
      .map(
        (item) => `
          <li><a href="${item.href}">${item.label}</a></li>
        `
      )
      .join('');
  }

  const pillarGrid = document.getElementById('pillar-grid');
  if (pillarGrid && Array.isArray(data.pillars)) {
    pillarGrid.innerHTML = data.pillars
      .map(
        (pillar, index) => `
          <article class="pillar-card reveal">
            <div class="pillar-icon" aria-hidden="true">
              ${getIcon(index)}
            </div>
            <h3>${pillar.title}</h3>
            <p>${pillar.description}</p>
          </article>
        `
      )
      .join('');
  }

  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid && Array.isArray(data.services)) {
    servicesGrid.innerHTML = [
      ...data.services.map(
        (service, index) => `
          <article class="service-card reveal">
            <div class="service-icon" aria-hidden="true">${getIcon(index + 3)}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <span class="service-code">${service.code}</span>
          </article>
        `
      ),
      `
        <article class="service-card service-card--cta reveal">
          <div class="service-icon" aria-hidden="true">${getIcon(6)}</div>
          <h3>¿Necesitas otro estudio?</h3>
          <p>Solicita una evaluación para definir el servicio técnico más adecuado para tu operación.</p>
          <a class="btn btn-primary" href="#contacto" style="margin-top:1rem;">Consultar servicio</a>
        </article>
      `
    ].join('');
  }

  const standardsGrid = document.getElementById('standards-grid');
  if (standardsGrid && Array.isArray(data.standards)) {
    standardsGrid.innerHTML = data.standards
      .map(
        (standard) => `
          <article class="standard-card reveal">
            <strong>${standard.nom}</strong>
            <p>${standard.label}</p>
          </article>
        `
      )
      .join('');
  }

  const processTimeline = document.getElementById('process-timeline');
  if (processTimeline && Array.isArray(data.process)) {
    processTimeline.innerHTML = data.process
      .map(
        (item) => `
          <article class="process-step reveal">
            <div class="process-step-number">${item.step}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </article>
        `
      )
      .join('');
  }

  const benefitsGrid = document.getElementById('benefits-grid');
  if (benefitsGrid && Array.isArray(data.benefits)) {
    benefitsGrid.innerHTML = data.benefits
      .map(
        (benefit, index) => `
          <article class="benefit-card reveal">
            <div class="benefit-icon" aria-hidden="true">${getIcon(index + 9)}</div>
            <h3>${benefit.title}</h3>
            <p>${benefit.description}</p>
          </article>
        `
      )
      .join('');
  }

  const industriesGrid = document.getElementById('industries-grid');
  if (industriesGrid && Array.isArray(data.industries)) {
    industriesGrid.innerHTML = data.industries
      .map(
        (industry) => `
          <article class="industry-card reveal">
            <p>${industry}</p>
          </article>
        `
      )
      .join('');
  }
};

const getIcon = (index) => {
  const icons = [
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 18L10 12L13 15L20 8M20 8H15M20 8V13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 18V6M19 18V10M12 18V13.5M3 18H21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18V7.5L12 4L18 7.5V18M9 15.5L12 18L15 15.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3V21M3 12H21M7 7L17 17M17 7L7 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12H19M12 5V19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 15L9 11L12 14L19 7M19 7H14M19 7V12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18L18 6M18 18L6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 9.5L12 4L21 9.5V14.5L12 20L3 14.5V9.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 12H17M12 7V17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 17.5L9.5 12L13 15.5L20 8.5M20 8.5H15.5M20 8.5V13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18V8M12 18V6M17 18V10M4 18H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 14L9 10L12 13L19 6M19 6H14.5M19 6V10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12H20M12 4V20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16L10 10L13 13L20 6M20 6H15M20 6V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  ];

  return icons[index % icons.length];
};

const initRevealAnimations = () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
};

const initMobileNav = () => {
  const toggleButton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  toggleButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggleButton?.setAttribute('aria-expanded', 'false');
    });
  });
};

const initContactForm = () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitButton = form?.querySelector('.submit-btn');

  if (!form || !submitButton || !status) {
    return;
  }

  const setStatus = (type, message) => {
    status.className = 'form-status';
    status.classList.add(type);
    status.textContent = message;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const privacy = form.querySelector('#privacy');
    if (!form.checkValidity() || !privacy.checked) {
      form.reportValidity();
      setStatus('error', 'Completa todos los campos y acepta el aviso de privacidad.');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    setStatus('loading', 'Enviando su solicitud...');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      form.reset();
      setStatus('success', 'Solicitud enviada correctamente. Nuestro equipo se pondrá en contacto pronto.');
    } catch (error) {
      setStatus('error', 'Ocurrió un error al enviar la solicitud. Inténtalo nuevamente.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Enviar solicitud';
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderData();
  initRevealAnimations();
  initMobileNav();
  initContactForm();
});
