// Copy to config.js and fill in your Fourthwall storefront token.
// For GitHub Pages deployment, set FOURTHWALL_TOKEN as a repository secret.
window.DP = {
  token: 'FOURTHWALL_TOKEN_HERE',
  checkout: 'donpolloshop.com',
  currency: 'USD',
  calls: [
    { slug: '5min-call-with-don-pollo', label: '5 min', price: '$20' },
    { slug: '10min-call-with-don-pollo', label: '10 min', price: '$30' },
  ],
};
