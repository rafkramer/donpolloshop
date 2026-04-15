/* ============================================
   FOURTHWALL STOREFRONT API
   ============================================ */
const FW = (() => {
  const c = window.DP || {};
  const API = 'https://storefront-api.fourthwall.com/v1';
  const t = c.token;

  function u(path, p = {}) {
    p.storefront_token = t;
    return `${API}${path}?${new URLSearchParams(p)}`;
  }

  async function get(path, p) {
    const r = await fetch(u(path, p));
    if (!r.ok) throw new Error(r.status);
    return r.json();
  }

  async function post(path, body) {
    const r = await fetch(u(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error(r.status);
    return r.json();
  }

  const CK = 'dp_cart';
  const cid = () => localStorage.getItem(CK);
  const saveCid = (id) => localStorage.setItem(CK, id);

  return {
    getProducts: () => get('/collections/all/products', { currency: c.currency || 'USD', size: '50' }).then(d => d.results || []),
    getProduct: (slug) => get(`/products/${slug}`),
    getCart: async () => { const id = cid(); if (!id) return null; try { return await get(`/carts/${id}`); } catch { localStorage.removeItem(CK); return null; } },
    addToCart: async (vid, qty = 1) => {
      let id = cid();
      if (!id) { const cart = await post('/carts', { items: [] }); id = cart.id; saveCid(id); }
      return post(`/carts/${id}/add`, { items: [{ variantId: vid, quantity: qty }] });
    },
    removeFromCart: (vid) => { const id = cid(); if (!id) return; return post(`/carts/${id}/remove`, { items: [{ variantId: vid }] }); },
    checkoutUrl: () => { const id = cid(); if (!id) return null; return `https://${c.checkout}/cart/checkout?cartId=${id}&currency=${c.currency || 'USD'}`; },
  };
})();
