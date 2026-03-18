/* ============================================
   DON POLLO SHOP — UI
   ============================================ */
let products = [];
let cart = null;
let selVariant = null;
let curProduct = null;
let showingAll = false;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const COLORS = ['#1a1816','#f0ece6','#c62828','#1b3a5c','#333','#e84416'];

const PLACEHOLDERS = [
  { name: 'Classic Tee — Black', price: 30, bg: COLORS[0], fg: '#fff' },
  { name: 'Classic Tee — Cream', price: 30, bg: COLORS[1], fg: '#1a1816' },
  { name: 'Don Pollo Tee — Red', price: 32, bg: COLORS[2], fg: '#fff' },
  { name: 'Logo Tee — Navy', price: 30, bg: COLORS[3], fg: '#fff' },
  { name: 'Don Pollo Tee — Charcoal', price: 30, bg: COLORS[4], fg: '#aaa' },
  { name: 'Don Pollo Tee — Orange', price: 32, bg: COLORS[5], fg: '#fff' },
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
  await loadProducts();
  await refreshCart();
});

// =====================
// VIDEO
// =====================
function setupVideo() {
  const vid = $('video');
  const empty = $('#vidEmpty');
  if (!vid || !empty) return;
  vid.addEventListener('loadeddata', () => { empty.style.display = 'none'; });
  vid.addEventListener('error', () => { empty.style.display = ''; });
}

// =====================
// PRODUCTS
// =====================
async function loadProducts() {
  try {
    const apiProducts = await FW.getProducts();
    const callSlugs = (window.DP?.calls || []).map(c => c.slug);
    const merch = apiProducts.filter(p => !callSlugs.includes(p.slug));
    if (merch.length > 0) {
      products = merch;
      renderAPIProducts(merch);
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
    card.className = 'p-card' + (i >= 3 ? ' hidden' : '');
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
  if (items.length > 3) $('#showMoreWrap').style.display = '';
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
    if (showingAll) {
      $$('.p-card').forEach(c => c.classList.remove('hidden'));
      btn.textContent = 'Show Less';
    } else {
      $$('.p-card').forEach((c, i) => { if (i >= 3) c.classList.add('hidden'); });
      btn.textContent = 'Show More';
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
    g.innerHTML = '<p class="opt-label">Color</p>';
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
    g.innerHTML = '<p class="opt-label">Size</p>';
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
  btn.textContent = '...'; btn.disabled = true;
  try {
    await FW.addToCart(vid);
    await refreshCart();
    closeModal(); openCart();
  } catch(e) {
    console.error(e); btn.textContent = 'Failed — try again';
  } finally {
    setTimeout(() => { btn.textContent = 'Add to Bag'; btn.disabled = false; }, 1200);
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
    $('#cartBody').innerHTML = '<p class="drawer-mt">Nothing here yet.</p>';
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
          <button class="ci-rm" data-vid="${v.id}">remove</button>
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
// CALLS
// =====================
function setupCalls() {
  const wrap = $('#callOptions');
  const calls = window.DP?.calls || [];
  if (!calls.length) return;
  calls.forEach((call, i) => {
    const tier = document.createElement('div'); tier.className = 'call-tier';
    tier.innerHTML = `
      ${i === 1 ? '<span class="call-tier-tag">Most booked</span>' : ''}
      <div>
        <p class="call-tier-name">${call.label} video call</p>
        <p class="call-tier-price">${call.price || ''}</p>
      </div>
      <button class="btn btn-accent btn-sm tier-buy">Book</button>`;
    wrap.appendChild(tier);
    const btn = tier.querySelector('.tier-buy');
    FW.getProduct(call.slug).then(p => {
      const v = p.variants?.[0];
      if (v) {
        tier.querySelector('.call-tier-price').textContent = fmt(v.unitPrice);
        btn.addEventListener('click', async () => {
          btn.textContent = '...'; btn.disabled = true;
          try { await FW.addToCart(v.id); await refreshCart(); openCart(); }
          catch(e) { console.error(e); }
          btn.textContent = 'Book'; btn.disabled = false;
        });
      }
    }).catch(() => { btn.style.opacity = '.4'; btn.style.cursor = 'default'; });
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
