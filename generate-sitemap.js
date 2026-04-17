import fs from 'fs';

const raw = fs.readFileSync('./src/assets/akumanomi2.json', 'utf-8');
const data = JSON.parse(raw);
const baseUrl = 'https://akumanomikuzan.vercel.app';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${data.map(fruit => `  <url>
    <loc>${baseUrl}/fruit/${slugify(fruit.name)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap.trim() + '\n');
console.log('Sitemap gerado com sucesso em public/sitemap.xml!');
