import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import http from 'http';
import bundle from './dev-server/bundle.js';

let proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');

// Set public path
app.use(express.static(publicPath));

// TODO: For full stack, set API routes

if (!isProduction) {

  // Bundle assets
  bundle();

  // Match all HTTP verbs for build to the proxy
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://127.0.0.1:3001'
    });
  });

  // Match all HTTP verbs for socket.io to the proxy
  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
    });
  });


  proxy.on('error', function(e) {
    // Just catch it
    console.error(e);
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  var server = http.createServer(app);

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(port, function () {
    console.log('Server running on port ' + port);
  });

} else {

  // And run the server
  app.listen(port, function () {
    console.log('Server running on port ' + port);
  });

}



