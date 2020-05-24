var express = require('express');
var app = express();
var newBaseURL = process.env.NEW_BASE_URL || 'https://pavlok-redirected.herokuapp.com';
var redirectStatus = parseInt(process.env.REDIRECT_STATUS || 302);
var port = process.env.PORT || 5000;

const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
const options = {
  target: newBaseURL, // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    // '^/api/old-path': '/api/new-path', // rewrite path
    // '^/api/remove/path': '/path', // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    // 'dev.localhost:3000': 'http://localhost:8000',
  },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
app.use('/', exampleProxy);
app.listen(port);
