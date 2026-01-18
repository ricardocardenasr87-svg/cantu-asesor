/* Cantú Asesores - App */

const CONFIG = {
  brandName: 'Cantú Asesores',
  advisorName: 'Ricardo Cantú',
  city: 'Monterrey, NL',
  email: 'tu-correo@ejemplo.com',
  whatsappNumber: '52XXXXXXXXXX', // Ej: 5218112345678
  bookingUrl: '', // Pega aquí tu enlace (Calendly o Google Appointment Schedule)
  bookingLabel: 'Agendar asesoría',
};

function $(sel, root = document){ return root.querySelector(sel); }
function $all(sel, root = document){ return Array.from(root.querySelectorAll(sel)); }

function buildHeader(){
  const headerHost = $('#site-header');
  if(!headerHost) return;

  headerHost.innerHTML = `
    <header class="site-header">
      <div class="container">
        <div class="topbar">
          <a class="brand" href="index.html" aria-label="Ir al inicio">
            <span class="brand-mark" aria-hidden="true">CA</span>
            <span class="brand-text">
              <span class="brand-name">${CONFIG.brandName}</span>
              <span class="brand-sub">Aseguradora Allianz • PPR • Estrategias de inversión</span>
            </span>
          </a>

          <button class="mobile-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="primary-nav">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <nav class="nav" id="primary-nav" aria-label="Secciones">
            <a href="index.html">Inicio</a>
            <a href="productos.html">Productos Allianz</a>
            <a href="ppr.html">PPR</a>
            <a href="inversion.html">Inversión (AMIB)</a>
            <a href="sobre-mi.html">Sobre mí</a>
            <a class="cta" href="agenda.html">${CONFIG.bookingLabel}</a>
          </nav>
        </div>
      </div>

      <div class="ticker" aria-label="Índices bursátiles del día">
        <div class="container">
          <div id="market-ticker"></div>
        </div>
      </div>
    </header>
  `;

  // Mobile nav toggle
  const toggle = $('.mobile-toggle', headerHost);
  const nav = $('#primary-nav', headerHost);
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Active link
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $all('nav a', headerHost).forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href === current) a.classList.add('active');
  });

  initTicker();
}

function buildFooter(){
  const footerHost = $('#site-footer');
  if(!footerHost) return;

  const year = new Date().getFullYear();
  footerHost.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-grid">
        <div>
          <div class="footer-brand">${CONFIG.brandName}</div>
          <p class="footer-muted">Asesoría personalizada en protección, retiro e inversión. Atención desde ${CONFIG.city}.</p>
          <div class="footer-chips">
            <span class="chip">PPR</span>
            <span class="chip">Seguros</span>
            <span class="chip">AMIB Figura 3</span>
          </div>
        </div>

        <div>
          <div class="footer-title">Contacto</div>
          <ul class="footer-list">
            <li><a data-email href="#">${CONFIG.email}</a></li>
            <li><a data-whatsapp href="#">WhatsApp</a></li>
            <li><a href="agenda.html">${CONFIG.bookingLabel}</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-title">Aviso</div>
          <p class="footer-muted" style="margin-top:10px">
            Este sitio es informativo y no constituye una oferta, recomendación pública o promesa de rendimiento.
            Las soluciones y estrategias se definen de forma personalizada de acuerdo con tu perfil y objetivos.
            “Allianz” es una marca registrada de su titular; este sitio no es oficial.
          </p>
        </div>
      </div>

      <div class="container footer-bottom">
        <small>© ${year} ${CONFIG.brandName}. Todos los derechos reservados.</small>
      </div>
    </footer>
  `;

  // Inject contact links
  wireContactLinks(footerHost);
}

function wireContactLinks(root = document){
  // Email
  $all('[data-email]', root).forEach(el => {
    el.textContent = CONFIG.email;
    el.setAttribute('href', `mailto:${CONFIG.email}`);
  });

  // WhatsApp
  const digits = (CONFIG.whatsappNumber || '').replace(/\D/g, '');
  const waUrl = digits ? `https://wa.me/${digits}` : '#';
  $all('[data-whatsapp]', root).forEach(el => {
    el.setAttribute('href', waUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // Booking links
  $all('[data-booking]', root).forEach(el => {
    if(CONFIG.bookingUrl){
      el.setAttribute('href', CONFIG.bookingUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.textContent = el.textContent || CONFIG.bookingLabel;
    } else {
      el.setAttribute('href', 'agenda.html');
    }
  });
}

function initTicker(){
  const host = $('#market-ticker');
  if(!host) return;

  // TradingView Ticker Tape widget (no backend needed)
  // Docs: https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/
  host.innerHTML = `
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
    </div>
  `;

  // Prevent multiple loads
  if(document.querySelector('script[data-tv-ticker]')) return;

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  script.async = true;
  script.setAttribute('data-tv-ticker', '1');
  script.innerHTML = JSON.stringify({
    symbols: [
      { proName: 'SP:SPX', title: 'S&P 500' },
      { proName: 'NASDAQ:NDX', title: 'Nasdaq 100' },
      { proName: 'DJ:DJI', title: 'Dow 30' },
      { proName: 'BMV:ME', title: 'IPC México' },
      { proName: 'FX_IDC:USDMXN', title: 'USD/MXN' }
    ],
    showSymbolLogo: true,
    isTransparent: true,
    displayMode: 'adaptive',
    colorTheme: 'dark',
    locale: 'es'
  });

  const container = host.querySelector('.tradingview-widget-container');
  container.appendChild(script);
}

function mountAgendaEmbed(){
  const placeholder = $('#booking-embed');
  if(!placeholder) return;

  // If the user provided a booking URL, we embed it.
  if(CONFIG.bookingUrl){
    placeholder.innerHTML = `
      <div class="card" style="padding:0; overflow:hidden">
        <div class="card-head">
          <div>
            <div class="muted">Agenda en línea</div>
            <h2 class="h2" style="margin:6px 0 0">Selecciona fecha y hora</h2>
          </div>
          <a class="btn ghost" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener">Abrir en otra pestaña</a>
        </div>
        <iframe class="booking-frame" src="${CONFIG.bookingUrl}" title="Agenda en línea"></iframe>
      </div>
    `;
  } else {
    placeholder.innerHTML = `
      <div class="card">
        <div class="card-head">
          <div>
            <div class="muted">Configura tu agenda</div>
            <h2 class="h2" style="margin:6px 0 0">Pega tu enlace de reservas</h2>
          </div>
        </div>
        <p>
          Edita <code>assets/app.js</code> y pega tu enlace en <code>CONFIG.bookingUrl</code>.
          Puede ser Calendly o un enlace de Google Appointment Schedule.
        </p>
        <div class="callouts">
          <a class="btn primary" href="#" data-whatsapp>Escríbeme por WhatsApp</a>
          <a class="btn ghost" href="#" data-email>Enviar correo</a>
        </div>
      </div>
    `;
  }

  wireContactLinks(placeholder);
}

function initPageEnhancements(){
  // Replace contact placeholders anywhere in page
  wireContactLinks(document);

  // If agenda embed exists, mount it
  mountAgendaEmbed();
}

document.addEventListener('DOMContentLoaded', () => {
  buildHeader();
  buildFooter();
  initPageEnhancements();
});
