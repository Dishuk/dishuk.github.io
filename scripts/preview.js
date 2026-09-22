const fs = require('fs');
const http = require('http');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const port = Number(process.env.PORT) || 8090;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
};

if (!['index.html', '404.html'].every(file => fs.existsSync(path.join(dist, file)))) {
  console.error('No complete build found. Run "make build" (or "npm run build") first.');
  process.exit(1);
}

function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^([.][.][/\\])+/, '');
  const file = path.join(dist, clean);

  if (!file.startsWith(dist)) {
    return null;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    const index = path.join(file, 'index.html');

    return fs.existsSync(index) ? index : null;
  }

  return fs.existsSync(file) ? file : null;
}

http.createServer((request, response) => {
  const file = resolve(request.url);
  const status = file ? 200 : 404;
  const body = file ?? path.join(dist, '404.html');

  response.writeHead(status, { 'Content-Type': TYPES[path.extname(body)] || 'application/octet-stream' });
  fs.createReadStream(body).pipe(response);
}).listen(port, () => {
  console.log(`Serving the production build like GitHub Pages at http://localhost:${port}  (Ctrl+C to stop)`);
});
