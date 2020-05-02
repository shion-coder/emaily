const { createProxyMiddleware } = require('http-proxy-middleware');

/* -------------------------------------------------------------------------- */

module.exports = function(app) {
  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: 'http://localhost:4000',
    }),
  );

  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'http://localhost:4000',
    }),
  );
};
