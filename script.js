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

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(Number(value) || 0);

const addQuoteItem = (values = {}) => {
  const items = document.getElementById('quote-items');
  if (!items) return;

  const row = document.createElement('div');
  row.className = 'quote-item-row';
  row.innerHTML = `
    <input class="quote-item-description" type="text" placeholder="Descripción del servicio" value="${escapeHtml(values.description || '')}" required />
    <input class="quote-item-unit" type="text" placeholder="Unidad" value="${escapeHtml(values.unit || 'PUNTO')}" required />
    <input class="quote-item-quantity" type="number" min="0" step="any" placeholder="0" value="${escapeHtml(values.quantity || 1)}" required />
    <input class="quote-item-price" type="number" min="0" step="0.01" placeholder="0.00" value="${escapeHtml(values.price || 0)}" required />
    <output class="quote-item-total">${formatCurrency(0)}</output>
    <button class="remove-quote-item" type="button" aria-label="Eliminar servicio">×</button>
  `;

  const updateRowTotal = () => {
    const quantity = Number(row.querySelector('.quote-item-quantity').value) || 0;
    const price = Number(row.querySelector('.quote-item-price').value) || 0;
    row.querySelector('.quote-item-total').textContent = formatCurrency(quantity * price);
  };

  row.querySelectorAll('input').forEach((input) => input.addEventListener('input', updateRowTotal));
  row.querySelector('.remove-quote-item').addEventListener('click', () => {
    if (items.children.length > 1) row.remove();
    else row.querySelectorAll('input').forEach((input) => { input.value = ''; });
  });
  items.appendChild(row);
  updateRowTotal();
};

const initQuoteBuilder = () => {
  const form = document.getElementById('quote-form');
  const adminSection = document.getElementById('cotizador');
  const items = document.getElementById('quote-items');
  const addButton = document.getElementById('add-quote-item');
  const preview = document.getElementById('quote-preview');
  const status = document.getElementById('quote-form-status');

  if (!form || !adminSection || !items || !addButton || !preview || !status) return;

  const syncPrivateView = () => {
    const isPrivateView = window.location.hash === '#cotizador';
    document.body.classList.toggle('quote-admin-visible', isPrivateView);
    if (isPrivateView) adminSection.scrollIntoView({ block: 'start' });
  };

  document.getElementById('quote-date').value = new Date().toISOString().slice(0, 10);
  addQuoteItem({ description: 'Reconocimiento y evaluación NOM-010-STPS-2014', unit: 'SUSTANCIA' });
  addButton.addEventListener('click', () => addQuoteItem());
  window.addEventListener('hashchange', syncPrivateView);
  syncPrivateView();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.className = 'form-status error';
      status.textContent = 'Completa los campos obligatorios antes de generar la cotización.';
      return;
    }

    const getValue = (id) => document.getElementById(id).value.trim();
    const rows = [...items.querySelectorAll('.quote-item-row')].map((row) => {
      const quantity = Number(row.querySelector('.quote-item-quantity').value) || 0;
      const price = Number(row.querySelector('.quote-item-price').value) || 0;
      return {
        description: row.querySelector('.quote-item-description').value.trim(),
        unit: row.querySelector('.quote-item-unit').value.trim(),
        quantity,
        price,
        total: quantity * price
      };
    });

    const subtotal = rows.reduce((sum, row) => sum + row.total, 0);
    const tax = subtotal * 0.16;
    const total = subtotal + tax;
    const date = new Date(`${getValue('quote-date')}T12:00:00`).toLocaleDateString('es-MX');

    preview.innerHTML = `
      <div class="quote-print-sheet">
        <header class="quote-print-header">
          <img class="quote-print-logo" src="assets/geter-icon-256.png" alt="Ícono de GETER" />
          <div class="quote-print-company">
            <h1>GETER S.A. de C.V.</h1>
            <p>Ingeniería · Inspección · Laboratorio</p>
            <p>Servicios técnicos para el cumplimiento normativo</p>
          </div>
          <div class="quote-print-meta">
            <p><strong>Folio</strong>${escapeHtml(getValue('quote-folio'))}</p>
            <p><strong>Fecha</strong>${escapeHtml(date)}</p>
            <p><strong>Vigencia</strong>${escapeHtml(getValue('quote-validity'))}</p>
          </div>
        </header>

        <div class="quote-print-band">Datos del cliente</div>
        <div class="quote-print-columns">
          <div class="quote-print-company"><p><strong>Nombre de la empresa</strong>${escapeHtml(getValue('quote-company'))}</p><p><strong>Dirección</strong>${escapeHtml(getValue('quote-address'))}</p></div>
          <div class="quote-print-company"><p><strong>Representante</strong>${escapeHtml(getValue('quote-representative'))}</p><p><strong>A quién va dirigida</strong>${escapeHtml(getValue('quote-attention'))}</p></div>
        </div>

        <div class="quote-print-band">Propuesta técnico-económica</div>
        <table class="quote-print-table">
          <thead><tr><th>No.</th><th>Descripción</th><th>Unidad</th><th>Cantidad</th><th>Precio/U</th><th>Total</th></tr></thead>
          <tbody>${rows.map((row, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(row.description)}</td><td>${escapeHtml(row.unit)}</td><td>${row.quantity}</td><td>${formatCurrency(row.price)}</td><td>${formatCurrency(row.total)}</td></tr>`).join('')}</tbody>
        </table>
        <table class="quote-print-totals"><tbody>
          <tr><td>Subtotal</td><td>${formatCurrency(subtotal)}</td></tr>
          <tr><td>IVA 16%</td><td>${formatCurrency(tax)}</td></tr>
          <tr><td>Total</td><td>${formatCurrency(total)}</td></tr>
        </tbody></table>

        <div class="quote-print-band">Condiciones generales</div>
        <ul class="quote-print-conditions">
          <li>Condiciones de pago: ${escapeHtml(getValue('quote-payment'))}</li>
          <li>Tiempo de entrega: ${escapeHtml(getValue('quote-delivery'))}, previa entrega de la documentación solicitada y liberación de las áreas.</li>
          <li>Los precios están expresados en moneda nacional e incluyen IVA.</li>
          <li>Los servicios adicionales o alcances no especificados se cotizarán por separado.</li>
        </ul>

        <div class="quote-print-band">Notas</div>
        <p>${escapeHtml(getValue('quote-notes')).replaceAll('\n', '<br />')}</p>
        <div class="quote-signatures"><div>Representante de GETER</div><div>Aceptación del cliente</div></div>
      </div>
    `;

    preview.classList.add('is-visible');
    status.className = 'form-status success';
    status.textContent = 'Cotización generada. Se abrirá el diálogo para guardarla como PDF.';

    const previewImages = [...preview.querySelectorAll('img')];
    await Promise.all(
      previewImages.map((image) => {
        if (image.complete && image.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      })
    );

    document.body.classList.add('quote-printing');
    window.requestAnimationFrame(() => window.print());
    window.setTimeout(() => document.body.classList.remove('quote-printing'), 500);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderData();
  initRevealAnimations();
  initMobileNav();
  initContactForm();
  initQuoteBuilder();
});
