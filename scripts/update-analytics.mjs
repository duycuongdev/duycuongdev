import { readFile, writeFile } from "node:fs/promises";

const username = process.env.GITHUB_USERNAME || "duycuongdev";
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "duycuongdev-profile-updater",
  ...(token ? { Authorization: `Bearer ${token}` } : {})
};

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${path}`);
  }
  return response.json();
}

const user = await github(`/users/${username}`);
const repos = await github(`/users/${username}/repos?per_page=100&type=owner`);
const totals = new Map();

for (const repo of repos) {
  const languages = await github(`/repos/${username}/${repo.name}/languages`);
  for (const [language, bytes] of Object.entries(languages)) {
    totals.set(language, (totals.get(language) || 0) + bytes);
  }
}

const languages = [...totals.entries()].sort((a, b) => b[1] - a[1]);
const totalBytes = languages.reduce((sum, [, bytes]) => sum + bytes, 0);
const colors = ["#facc15", "#a855f7", "#3b82f6", "#f97316", "#22d3ee"];
const topLanguages = languages.slice(0, 4);
const primary = topLanguages[0]?.[0] || "N/A";
const formatPercent = (bytes) => totalBytes ? `${((bytes / totalBytes) * 100).toFixed(2)}%` : "0.00%";
const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (char) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
}[char]));

let x = 70;
let bars = `<rect x="70" y="360" width="760" height="10" rx="5" fill="#1e293b"/>`;
let legend = "";
for (const [index, [language, bytes]] of topLanguages.entries()) {
  const width = index === topLanguages.length - 1 ? 830 - x : Math.round((bytes / totalBytes) * 760);
  bars += `<rect x="${x}" y="360" width="${width}" height="10"${index === 0 || index === topLanguages.length - 1 ? ' rx="5"' : ""} fill="${colors[index]}"/>`;
  const legendX = 76 + index * 190;
  legend += `<circle cx="${legendX}" cy="386" r="4" fill="${colors[index]}"/><text x="${legendX + 12}" y="390" class="small">${escapeXml(language)} ${formatPercent(bytes)}</text>`;
  x += width;
}

let svg = await readFile("analytics.svg", "utf8");
const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
const values = [
  ["Total Stars Earned:", stars],
  ["Public Repositories:", user.public_repos],
  ["Followers:", user.followers],
  ["Following:", user.following],
  ["Profile created:", new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })]
];
svg = svg.replace(/(Updated )[^<]+/, (_, prefix) => `${prefix}${new Date().toISOString().slice(0, 10)}`);
for (const [label, value] of values) {
  const pattern = new RegExp(`(${label}<\\/text><text[^>]*>)[^<]+`);
  svg = svg.replace(pattern, (_, prefix) => `${prefix}${value}`);
}
svg = svg.replace(/(<text[^>]*>)[^<]+(<\/text>\s*<text[^>]*>PUBLIC REPOS)/, (_, prefix, suffix) => `${prefix}${user.public_repos}${suffix}`);
svg = svg.replace(/(<text[^>]*>)[^<]+(<\/text>\s*<text[^>]*>Repositories)/, (_, prefix, suffix) => `${prefix}${user.public_repos}${suffix}`);
svg = svg.replace(/(<text[^>]*>)[^<]+(<\/text>\s*<text[^>]*>Stars earned)/, (_, prefix, suffix) => `${prefix}${stars}${suffix}`);
svg = svg.replace(/(Primary: )[^<]+/, (_, prefix) => `${prefix}${escapeXml(primary)}`);
svg = svg.replace(/<!--LANGUAGE_BAR_START-->[\s\S]*?<!--LANGUAGE_BAR_END-->/, `<!--LANGUAGE_BAR_START-->${bars}${legend}<!--LANGUAGE_BAR_END-->`);
await writeFile("analytics.svg", svg);
