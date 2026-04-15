/* ============================================
   DON POLLO SHOP — UI
   ============================================ */

// =====================
// I18N
// =====================
const I18N = {
  en: {
    'nav.shop': 'Shop',
    'nav.calls': 'Calls',
    'hero.title': 'DON POLLO<br>SHOP',
    'hero.sub': 'Official merch drops are here. Rep the brand, look fire.',
    'hero.btn.shop': 'Shop Now',
    'hero.btn.call': 'Calls \u2014 Coming Soon',
    'marquee.merch': 'FRESH MERCH',
    'marquee.shop': 'DON POLLO SHOP',
    'marquee.call': 'CALLS COMING SOON',
    'marquee.drops': 'NEW DROPS',
    'marquee.rep': 'REP THE BRAND',
    'merch.title': 'Merch',
    'merch.showMore': 'Show More',
    'merch.showLess': 'Show Less',
    'calls.title': '1-on-1 Calls',
    'calls.desc': '1-on-1 video call with Don Pollo. Talk about whatever you want\u2014content, collabs, life, or literally anything. Your call, your rules.',
    'calls.comingSoon': 'Coming Soon',
    'calls.comingSoonNote': 'Calls are launching soon. Stay tuned\u2014you\u2019ll be the first to know.',
    'calls.note': 'You\u2019ll get a booking link after purchase to pick your slot.',
    'calls.tag': 'Most booked',
    'calls.book': 'Book',
    'calls.videoCall': 'video call',
    'calls.unavailable': 'Coming Soon',
    'reviews.title': 'What People Are Saying',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.refund': 'Refund Policy',
    'footer.copy': '\u00A9 2025 Don Pollo Shop. All rights reserved.',
    'cart.title': 'Your Bag',
    'cart.empty': 'Nothing here yet.',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'remove',
    'modal.add': 'Add to Bag',
    'modal.adding': '...',
    'modal.failed': 'Failed \u2014 try again',
    'opt.color': 'Color',
    'opt.size': 'Size',
    'rev.1': '"Tee quality is actually crazy. Wore it to school and got compliments from people I don\u2019t even talk to."',
    'rev.2': '"Shipping was fast. The fit is perfect. Already wearing it right now typing this review."',
    'rev.3': '"The designs go hard. My whole friend group copped one after seeing mine."',
    'rev.4': '"Don Pollo merch hits different. Best quality I\u2019ve bought online fr."',
  },
  es: {
    'nav.shop': 'Tienda',
    'nav.calls': 'Llamadas',
    'hero.title': 'DON POLLO<br>SHOP',
    'hero.sub': 'El merch oficial ya lleg\u00F3. P\u00F3ntelo y que se note.',
    'hero.btn.shop': 'Comprar',
    'hero.btn.call': 'Llamadas \u2014 Pr\u00F3ximamente',
    'marquee.merch': 'MERCH NUEVO',
    'marquee.shop': 'DON POLLO SHOP',
    'marquee.call': 'LLAMADAS PR\u00D3XIMAMENTE',
    'marquee.drops': 'NUEVOS DROPS',
    'marquee.rep': 'REP LA MARCA',
    'merch.title': 'Merch',
    'merch.showMore': 'Ver M\u00E1s',
    'merch.showLess': 'Ver Menos',
    'calls.title': 'Llamadas 1 a 1',
    'calls.desc': 'Videollamada 1 a 1 con Don Pollo. Habla de lo que quieras\u2014contenido, collabs, la vida, o literalmente lo que sea. Tu llamada, tus reglas.',
    'calls.comingSoon': 'Pr\u00F3ximamente',
    'calls.comingSoonNote': 'Las llamadas llegan pronto. Qu\u00E9date pendiente\u2014ser\u00E1s el primero en saberlo.',
    'calls.note': 'Recibir\u00E1s un link de reserva despu\u00E9s de la compra para elegir tu horario.',
    'calls.tag': 'M\u00E1s reservado',
    'calls.book': 'Reservar',
    'calls.videoCall': 'videollamada',
    'calls.unavailable': 'Pr\u00F3ximamente',
    'reviews.title': 'Lo Que Dice la Gente',
    'footer.terms': 'T\u00E9rminos de Servicio',
    'footer.privacy': 'Pol\u00EDtica de Privacidad',
    'footer.refund': 'Pol\u00EDtica de Reembolso',
    'footer.copy': '\u00A9 2025 Don Pollo Shop. Todos los derechos reservados.',
    'cart.title': 'Tu Bolsa',
    'cart.empty': 'Nada aqu\u00ED todav\u00EDa.',
    'cart.total': 'Total',
    'cart.checkout': 'Pagar',
    'cart.remove': 'quitar',
    'modal.add': 'A\u00F1adir a la Bolsa',
    'modal.adding': '...',
    'modal.failed': 'Fall\u00F3 \u2014 intenta de nuevo',
    'opt.color': 'Color',
    'opt.size': 'Talla',
    'rev.1': '"\u00A1La calidad de la camiseta es una locura! La us\u00E9 en la escuela y me llovieron cumplidos de gente que ni me habla."',
    'rev.2': '"El env\u00EDo fue r\u00E1pido. La talla es perfecta. Ya la tengo puesta mientras escribo esta rese\u00F1a."',
    'rev.3': '"Los dise\u00F1os son brutales. Todo mi grupo se compr\u00F3 una despu\u00E9s de ver la m\u00EDa."',
    'rev.4': '"El merch de Don Pollo pega diferente. La mejor calidad que he comprado online."',
  }
};

let currentLang = 'en';

function detectLanguage() {
  const stored = localStorage.getItem('dp_lang');
  if (stored && I18N[stored]) return stored;
  const nav = (navigator.language || '').toLowerCase();
  return nav.startsWith('es') ? 'es' : 'en';
}

function t(key) {
  return I18N[currentLang]?.[key] || I18N.en[key] || key;
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('dp_lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (val.includes('<br>') || val.includes('<')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  const sw = document.getElementById('langSwitch');
  if (sw) sw.dataset.lang = lang;
  renderCart();
  updateCallTierText();
}

function updateCallTierText() {
  document.querySelectorAll('.call-tier-tag').forEach(el => {
    el.textContent = t('calls.tag');
  });
  document.querySelectorAll('.tier-buy').forEach(btn => {
    btn.textContent = t('calls.unavailable');
    btn.disabled = true;
  });
  const calls = window.DP?.calls || [];
  document.querySelectorAll('.call-tier-name').forEach((el, idx) => {
    if (calls[idx]) {
      el.textContent = `${calls[idx].label} ${t('calls.videoCall')}`;
    }
  });
  const comingSoon = document.querySelector('.calls-coming-soon');
  if (comingSoon) comingSoon.textContent = t('calls.comingSoonNote');
}

function setupI18n() {
  currentLang = detectLanguage();
  applyLanguage(currentLang);
  const sw = document.getElementById('langSwitch');
  if (sw) {
    sw.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'es' : 'en';
      applyLanguage(newLang);
    });
  }
}

// =====================
// CORE
// =====================
let products = [];
let cart = null;
let selVariant = null;
let curProduct = null;
let showingAll = false;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const PLACEHOLDERS = [
  { name: 'Classic Tee — Black', price: 30, bg: '#1a1816', fg: '#fff' },
  { name: 'Classic Tee — Cream', price: 30, bg: '#f0ece6', fg: '#1a1816' },
  { name: 'Logo Tee — Navy', price: 30, bg: '#1b3a5c', fg: '#fff' },
  { name: 'Don Pollo Tee — Charcoal', price: 30, bg: '#333', fg: '#aaa' },
  { name: 'Don Pollo Tee — Orange', price: 32, bg: '#e84416', fg: '#fff' },
];

function teeSVG(fg) {
  return `<svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62 30L28 58l18 18 14-12v118h80V64l14 12 18-18-34-28c-4 8-16 16-28 16s-24-8-28-16z"
      fill="${fg}" fill-opacity=".15" stroke="${fg}" stroke-opacity=".2" stroke-width="3"/>
  </svg>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  setupVideo();
  setupCart();
  setupModal();
  setupCalls();
  setupShowMore();
  setupI18n();
  await loadProducts();
  await refreshCart();
});

// =====================
// VIDEO
// =====================
function setupVideo() {
  const vid = $('video');
  const container = vid?.closest('.hero-video');
  const empty = $('#vidEmpty');
  if (!vid || !container) return;
  vid.addEventListener('loadeddata', () => { if (empty) empty.style.display = 'none'; });
  vid.addEventListener('error', () => { container.style.display = 'none'; });
}

// =====================
// PRODUCTS
// =====================
function sortProducts(items) {
  const order = window.DP?.productOrder || [];
  if (!order.length) return items;
  return [...items].sort((a, b) => {
    const ai = order.indexOf(a.slug);
    const bi = order.indexOf(b.slug);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });
}

async function loadProducts() {
  try {
    const apiProducts = await FW.getProducts();
    const callSlugs = (window.DP?.calls || []).map(c => c.slug);
    const excludeSlugs = window.DP?.excludeSlugs || [];
    const merch = apiProducts.filter(p =>
      !callSlugs.includes(p.slug) && !excludeSlugs.includes(p.slug)
    );
    if (merch.length > 0) {
      products = sortProducts(merch);
      renderAPIProducts(products);
      return;
    }
  } catch(e) {
    console.error('API unavailable, showing placeholders:', e);
  }
  renderPlaceholders();
}

function renderAPIProducts(items) {
  const grid = $('#productsGrid');
  grid.innerHTML = '';
  items.forEach((p, i) => {
    const img = p.images?.[0];
    const price = p.variants?.[0]?.unitPrice;
    const card = document.createElement('div');
    card.className = 'p-card';
    card.innerHTML = `
      <div class="p-card-img">
        ${img ? `<img src="${img.url}" alt="${p.name}" loading="lazy">` : `<div class="p-card-ph" style="background:#eee">${teeSVG('#999')}<span>DON POLLO</span></div>`}
      </div>
      <div class="p-card-body">
        <p class="p-card-name">${p.name}</p>
        <p class="p-card-price">${fmt(price)}</p>
      </div>`;
    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });
  grid.querySelectorAll('.p-card').forEach((c, i) => {
    if (i >= 3) c.classList.add('hidden');
  });
  if (grid.children.length > 3) $('#showMoreWrap').style.display = '';
}

function renderPlaceholders() {
  const grid = $('#productsGrid');
  grid.innerHTML = '';
  PLACEHOLDERS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'p-card' + (i >= 3 ? ' hidden' : '');
    card.innerHTML = `
      <div class="p-card-img">
        <div class="p-card-ph" style="background:${p.bg}">
          ${teeSVG(p.fg)}
          <span style="color:${p.fg}">DON POLLO</span>
        </div>
      </div>
      <div class="p-card-body">
        <p class="p-card-name">${p.name}</p>
        <p class="p-card-price">$${p.price}</p>
      </div>`;
    grid.appendChild(card);
  });
  $('#showMoreWrap').style.display = '';
}

function setupShowMore() {
  const btn = $('#showMoreBtn');
  btn.addEventListener('click', () => {
    showingAll = !showingAll;
    const key = showingAll ? 'merch.showLess' : 'merch.showMore';
    btn.dataset.i18n = key;
    btn.textContent = t(key);
    if (showingAll) {
      $$('.p-card').forEach(c => c.classList.remove('hidden'));
    } else {
      $$('.p-card').forEach((c, i) => { if (i >= 3) c.classList.add('hidden'); });
    }
  });
}

// =====================
// MODAL
// =====================
const sel = { color: null, size: null };

function setupModal() {
  $('#modalX').addEventListener('click', closeModal);
  $('#modalBg').addEventListener('click', closeModal);
  $('#modalAddBtn').addEventListener('click', addFromModal);
}

function openModal(p) {
  curProduct = p;
  selVariant = null;
  sel.color = null; sel.size = null;
  const img = p.images?.[0];
  const price = p.variants?.[0]?.unitPrice;
  $('#modalImg').src = img?.url || '';
  $('#modalName').textContent = p.name;
  $('#modalPrice').textContent = fmt(price);
  const details = p.additionalInformation?.find(i => i.type === 'MORE_DETAILS');
  $('#modalHtml').innerHTML = details?.bodyHtml || p.description || '';
  const thumbs = $('#modalThumbs');
  thumbs.innerHTML = '';
  (p.images || []).slice(0, 6).forEach((im, i) => {
    const t = document.createElement('img');
    t.src = im.url; t.alt = '';
    if (i === 0) t.classList.add('active');
    t.addEventListener('click', () => {
      $('#modalImg').src = im.url;
      thumbs.querySelectorAll('img').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
    thumbs.appendChild(t);
  });
  buildVariants(p);
  $('#modalBg').classList.add('open');
  $('#modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#modalBg').classList.remove('open');
  $('#modal').classList.remove('open');
  document.body.style.overflow = '';
}

function buildVariants(p) {
  const wrap = $('#modalOptions');
  wrap.innerHTML = '';
  if (!p.variants || p.variants.length <= 1) { selVariant = p.variants?.[0]?.id; return; }
  const colors = new Map();
  const sizes = [];
  p.variants.forEach(v => {
    if (v.attributes?.color && !colors.has(v.attributes.color.name))
      colors.set(v.attributes.color.name, v.attributes.color.swatch);
    if (v.attributes?.size && !sizes.includes(v.attributes.size.name))
      sizes.push(v.attributes.size.name);
  });
  if (colors.size > 0) {
    const g = document.createElement('div'); g.className = 'opt-group';
    g.innerHTML = `<p class="opt-label">${t('opt.color')}</p>`;
    const row = document.createElement('div'); row.className = 'opt-row';
    colors.forEach((sw, name) => {
      const b = document.createElement('button');
      b.className = 'opt-swatch'; b.style.background = sw || '#ccc';
      b.title = name; b.dataset.color = name;
      b.addEventListener('click', () => pickOpt('color', name, p));
      row.appendChild(b);
    });
    g.appendChild(row); wrap.appendChild(g);
  }
  if (sizes.length > 0) {
    const g = document.createElement('div'); g.className = 'opt-group';
    g.innerHTML = `<p class="opt-label">${t('opt.size')}</p>`;
    const row = document.createElement('div'); row.className = 'opt-row';
    sizes.forEach(name => {
      const b = document.createElement('button');
      b.className = 'opt-btn'; b.textContent = name; b.dataset.size = name;
      b.addEventListener('click', () => pickOpt('size', name, p));
      row.appendChild(b);
    });
    g.appendChild(row); wrap.appendChild(g);
  }
}

function pickOpt(type, val, p) {
  sel[type] = val;
  if (type === 'color')
    $$('.opt-swatch').forEach(b => b.classList.toggle('active', b.dataset.color === val));
  else
    $$('.opt-btn').forEach(b => b.classList.toggle('active', b.dataset.size === val));
  const match = p.variants.find(v => {
    const c = !sel.color || v.attributes?.color?.name === sel.color;
    const s = !sel.size || v.attributes?.size?.name === sel.size;
    return c && s;
  });
  if (match) {
    selVariant = match.id;
    $('#modalPrice').textContent = fmt(match.unitPrice);
    if (match.images?.[0]) $('#modalImg').src = match.images[0].url;
  }
}

async function addFromModal() {
  const vid = selVariant || curProduct?.variants?.[0]?.id;
  if (!vid) return;
  const btn = $('#modalAddBtn');
  btn.textContent = t('modal.adding'); btn.disabled = true;
  try {
    await FW.addToCart(vid);
    await refreshCart();
    closeModal(); openCart();
  } catch(e) {
    console.error(e); btn.textContent = t('modal.failed');
  } finally {
    setTimeout(() => { btn.textContent = t('modal.add'); btn.disabled = false; }, 1200);
  }
}

// =====================
// CART
// =====================
function setupCart() {
  $('#cartBtn').addEventListener('click', toggleCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#cartOverlay').addEventListener('click', closeCart);
  $('#checkoutBtn').addEventListener('click', () => {
    const url = FW.checkoutUrl();
    if (url) window.location.href = url;
  });
}
function toggleCart() { $('#cartDrawer').classList.toggle('open'); $('#cartOverlay').classList.toggle('open'); }
function openCart() { $('#cartDrawer').classList.add('open'); $('#cartOverlay').classList.add('open'); }
function closeCart() { $('#cartDrawer').classList.remove('open'); $('#cartOverlay').classList.remove('open'); }

async function refreshCart() { cart = await FW.getCart(); renderCart(); }

function renderCart() {
  const items = cart?.items || [];
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const badge = $('#cartBadge');
  badge.textContent = count; badge.dataset.count = count;
  if (!items.length) {
    $('#cartBody').innerHTML = `<p class="drawer-mt">${t('cart.empty')}</p>`;
    $('#cartBottom').style.display = 'none'; return;
  }
  $('#cartBottom').style.display = '';
  let total = 0; $('#cartBody').innerHTML = '';
  items.forEach(item => {
    const v = item.variant;
    const p = v.unitPrice?.value || 0;
    const line = p * item.quantity; total += line;
    const img = v.images?.[0];
    const el = document.createElement('div'); el.className = 'ci';
    el.innerHTML = `
      <div class="ci-img">${img ? `<img src="${img.url}" alt="">` : ''}</div>
      <div class="ci-info">
        <p class="ci-name">${v.product?.name || v.name}</p>
        <p class="ci-meta">${v.attributes?.description || ''}${item.quantity > 1 ? ' x' + item.quantity : ''}</p>
        <div class="ci-row">
          <span class="ci-price">$${line.toFixed(2)}</span>
          <button class="ci-rm" data-vid="${v.id}">${t('cart.remove')}</button>
        </div>
      </div>`;
    el.querySelector('.ci-rm').addEventListener('click', async e => {
      await FW.removeFromCart(e.target.dataset.vid); await refreshCart();
    });
    $('#cartBody').appendChild(el);
  });
  $('#cartTotalPrice').textContent = `$${total.toFixed(2)}`;
}

// =====================
// CALLS (Coming Soon)
// =====================
function setupCalls() {
  const wrap = $('#callOptions');
  const calls = window.DP?.calls || [];
  if (!calls.length) return;
  calls.forEach((call, i) => {
    const tier = document.createElement('div'); tier.className = 'call-tier call-tier-disabled';
    tier.innerHTML = `
      ${i === 1 ? `<span class="call-tier-tag">${t('calls.tag')}</span>` : ''}
      <div>
        <p class="call-tier-name">${call.label} ${t('calls.videoCall')}</p>
        <p class="call-tier-price">${call.price || ''}</p>
      </div>
      <button class="btn btn-accent btn-sm tier-buy" disabled>${t('calls.unavailable')}</button>`;
    wrap.appendChild(tier);
  });
}

function updateCallTierButtons() {
  document.querySelectorAll('.tier-buy').forEach(btn => {
    btn.textContent = t('calls.unavailable');
    btn.disabled = true;
  });
}

// =====================
// HELPERS
// =====================
function fmt(m) { return m ? `$${m.value % 1 === 0 ? m.value : m.value.toFixed(2)}` : ''; }

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
});

// =====================
// INFINITE SCROLLERS
// =====================
function initScroller(track, speed) {
  if (!track || !track.children.length) return;
  requestAnimationFrame(() => {
    const origItems = Array.from(track.children);
    const viewW = track.parentElement.offsetWidth;
    // Clone items until we have at least 2x the viewport width
    while (track.scrollWidth < viewW * 3) {
      origItems.forEach(item => track.appendChild(item.cloneNode(true)));
    }
    const half = track.scrollWidth / 2;
    const name = 'scroll-' + Math.random().toString(36).slice(2, 8);
    const style = document.createElement('style');
    style.textContent = `@keyframes ${name} { from { transform: translateX(0); } to { transform: translateX(-${half}px); } }`;
    document.head.appendChild(style);
    track.style.animation = `${name} ${speed}s linear infinite`;
  });
}

(function initScrollers() {
  initScroller(document.querySelector('#marqueeTrack'), 18);
  initScroller(document.querySelector('.reviews-track'), 30);
})();
