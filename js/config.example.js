// Copy to config.js and fill in your Fourthwall storefront token.
// For GitHub Pages deployment, set FOURTHWALL_TOKEN as a repository secret.
window.DP = {
  token: 'FOURTHWALL_TOKEN_HERE',
  checkout: 'mindmush-shop.fourthwall.com',
  currency: 'USD',
  cameoUrl: 'https://www.cameo.com/2021donpollo',
  calls: [
    { slug: '5min-call-with-don-pollo', label: '5 min', price: '$20' },
    { slug: '10min-call-with-don-pollo', label: '10 min', price: '$30' },
  ],
  // Slugs to hide from the merch grid (e.g. call products not in the tiers above).
  excludeSlugs: ['don-pollo-call'],
  // Product slugs in preferred display order (aesthetic sorting).
  // Products matching these slugs appear first, in this order.
  // Any remaining products appear after in their default API order.
  productOrder: [
    'kingofohio',
    'team-don-pollo-shirt',
    'mug',
    'un-video-mas',
    'don-pollo-tshirt',
  ],
};
