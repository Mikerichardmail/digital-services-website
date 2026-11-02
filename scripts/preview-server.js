import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { onRequest as handleSeoApi } from '../functions/api/seo.js';

const PORT = 4321;
const DIST = path.resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer(async (req, res) => {
  // Handle SEO API
  if (req.url.startsWith('/api/seo')) {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawBody = Buffer.concat(buffers);
      const url = new URL(req.url, `http://${req.headers.host || 'localhost:4321'}`);
      
      const webReq = new Request(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.method !== 'GET' && req.method !== 'HEAD' && rawBody.length > 0 ? rawBody : undefined
      });

      const response = await handleSeoApi({ request: webReq, env: process.env });
      const respHeaders = {};
      for (const [k, v] of response.headers.entries()) {
        respHeaders[k] = v;
      }
      res.writeHead(response.status, respHeaders);
      const body = await response.text();
      res.end(body);
      return;
    } catch (err) {
      console.error('[preview-server] API error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: true, message: err.message }));
      return;
    }
  }

  let reqPath = req.url.split('?')[0];

  // Decode URI component
  reqPath = decodeURIComponent(reqPath);

  let filePath = path.join(DIST, reqPath);

  // If path is a directory or points to root, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // 404
    const notFoundPage = path.join(DIST, '404.html');
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPage).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Preview Server] Running at http://localhost:${PORT}/`);
  console.log(`[Preview Server] Instagram Views page: http://localhost:${PORT}/instagram-views/`);
});
