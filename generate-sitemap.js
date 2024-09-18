import { writeFileSync } from "fs";
import { resolve } from "path";

const routes = [{ path: "/" }, { path: "/pathfinding" }, { path: "/sorting" }];

const hostname = "https://algo-viz.friedrichvoelkers.de";

function generateSitemap() {
  const urls = routes
    .map((route) => {
      return `<url>
      <loc>${hostname}${route.path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  // Speichere die Sitemap in das `public`-Verzeichnis
  writeFileSync(resolve("./public/sitemap.xml"), sitemap);
  console.log("Sitemap generated successfully!");
}

generateSitemap();
