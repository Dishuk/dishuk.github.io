const fs = require('fs');
const path = require('path');

const SITE = 'https://dishuk.github.io';
const root = path.resolve(__dirname, '..');
const dist = path.resolve(root, process.argv[2] || 'dist');

const html = fs.readFileSync(path.join(dist, 'index.html'));
const sources = ['src/router/router.ts', 'src/content/registry.ts']
  .map(file => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
const routes = [...new Set([...sources.matchAll(/path:\s*'(\/[a-z0-9-]+)'/g)].map(match => match[1]))];

for (const route of routes) {
  const dir = path.join(dist, route.slice(1));

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

fs.writeFileSync(path.join(dist, '404.html'), html);

const urls = ['/', ...routes].map(route => `  <url><loc>${SITE}${route}</loc></url>`).join('\n');

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`spa-routes: ${routes.length} route pages, 404.html, sitemap.xml, robots.txt → ${path.relative(root, dist)}`);
