// Erkennt automatisch, ob der Build in GitHub Actions läuft (dort ist
// GITHUB_ACTIONS immer "true" gesetzt). Nur dann wird der Pfadpräfix für
// GitHub Pages aktiviert – lokale `npm run dev` / `npm run build` bleiben
// unter "/" erreichbar.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

let basePath = "";
if (isGithubActions) {
  // GITHUB_REPOSITORY hat das Format "owner/repo-name"
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  basePath = repo ? `/${repo}` : "";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Statischer HTML/CSS/JS-Export für GitHub Pages (kein Node-Server nötig)
  output: "export",
  // Erzeugt .../index.html statt .../route.html – wichtig für saubere
  // URLs auf einem einfachen statischen Host wie GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

module.exports = nextConfig;
