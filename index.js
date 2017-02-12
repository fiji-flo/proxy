/* global require process */
"use strict";
const https = require('https');
const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');
const jsonfile = require('jsonfile');

const config = jsonfile.readFileSync(process.argv[2]);

const ssl = config.ssl;
const options = {
  key: fs.readFileSync(ssl.key),
  cert: fs.readFileSync(ssl.cert),
  ca: fs.readFileSync(ssl.ca)
};

const proxyRules = config.rules;

const proxy = httpProxy.createProxy();

function handle(req, res) {

  if (req.headers.host in proxyRules) {
    const target = proxyRules[req.headers.host];
    return proxy.web(req, res, {
      target: target,
      xfwd: true,
      changeOrigin: false
    });
  }

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  return res.end('This is not the site you\'re looking for!');
}

function force(req, res) {
    res.writeHead(302, {
      'Location': "https://" + req.headers["host"] + req.url
    });
    res.end();
}

https.createServer(options, handle).listen(443);
http.createServer(config.forceHttps ? force : handle).listen(80);
