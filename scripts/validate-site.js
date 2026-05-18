const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pages = ["index.html", "post.html", "about.html"];
const missing = [];
const postDataScripts = [];
const pageScripts = {};

const resolveFromRoot = (relativePath) => path.join(root, relativePath);
const existsFromRoot = (relativePath) => fs.existsSync(resolveFromRoot(relativePath));

for (const page of pages) {
  const html = fs.readFileSync(resolveFromRoot(page), "utf8");
  pageScripts[page] = [];

  for (const match of html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/g)) {
    const assetPath = match[1];

    if (!/^(https?:|#)/.test(assetPath) && !existsFromRoot(assetPath)) {
      missing.push(`${page}: ${assetPath}`);
    }

    if (page === "index.html" && /^posts\/.+Post\.js$/.test(assetPath)) {
      postDataScripts.push(assetPath);
    }

    if (assetPath.endsWith(".js")) {
      pageScripts[page].push(assetPath);
    }
  }
}

const indexDataScripts = pageScripts["index.html"].filter((file) => file.startsWith("posts/"));
const postDataPageScripts = pageScripts["post.html"].filter((file) => file.startsWith("posts/"));

if (indexDataScripts.join("\n") !== postDataPageScripts.join("\n")) {
  missing.push("index.html and post.html do not load the same post scripts in the same order");
}

global.window = {};

for (const file of [...postDataScripts, "scripts/posts.js"]) {
  require(resolveFromRoot(file));
}

for (const post of window.BIRD_POSTS) {
  const imagePaths = [post.image, post.displayImage, ...(post.images || [])].filter(Boolean);

  for (const imagePath of imagePaths) {
    if (!existsFromRoot(imagePath)) {
      missing.push(`${post.slug}: ${imagePath}`);
    }
  }
}

if (missing.length) {
  console.error(missing.join("\n"));
  process.exit(1);
}

console.log(`Validated ${window.BIRD_POSTS.length} posts.`);
