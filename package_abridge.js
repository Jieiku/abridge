'use strict';

const fs = require('fs');
const path = require("path");
const TOML = require('fast-toml');
const UglifyJS = require('uglify-js');
const jsonminify = require("jsonminify");
const { parseArgs } = require("util");
const { spawn } = require("child_process");
const { exit } = require('process');
const { pathToFileURL } = require('url');

// Make every relative filesystem operation deterministic and rooted at the
// directory containing this build script, even when Node is launched elsewhere.
process.chdir(__dirname);

if (!(fs.existsSync('zola.toml'))) {
  throw new Error('ERROR: cannot find zola.toml!');
}
const tomlString = String(fs.readFileSync('zola.toml'));
const data = TOML.parse(tomlString);
const js_prestyle = data.extra.js_prestyle;
const js_switcher = data.extra.js_switcher;
const js_email_encode = data.extra.js_email_encode;
const js_copycode = data.extra.js_copycode;
let search_library = data.extra.search_library;
let index_format = data.search.index_format;
const uglyurls = data.extra.uglyurls;
const js_bundle = data.extra.js_bundle;
const pwa = data.extra.pwa;
const pwa_VER = data.extra.pwa_VER;
const pwa_NORM_TTL = data.extra.pwa_NORM_TTL;
const pwa_LONG_TTL = data.extra.pwa_LONG_TTL;
const pwa_TTL_NORM = data.extra.pwa_TTL_NORM;
const pwa_TTL_LONG = data.extra.pwa_TTL_LONG;
const pwa_TTL_EXEMPT = data.extra.pwa_TTL_EXEMPT;
const pwa_cache_all = data.extra.pwa_cache_all;
const pwa_BASE_CACHE_FILES = data.extra.pwa_BASE_CACHE_FILES;
const pwa_IGNORE_FILES = data.extra.pwa_IGNORE_FILES;
const prune_unreferenced_extensions = data.extra.prune_unreferenced_extensions;
const prune_unreferenced_debug = data.extra.prune_unreferenced_debug ?? false;

if (typeof prune_unreferenced_extensions !== 'undefined' &&
    (!Array.isArray(prune_unreferenced_extensions) || !prune_unreferenced_extensions.every(ext => typeof ext === 'string' && /^[A-Za-z0-9]+$/.test(ext)))) {
  throw new Error('ERROR: prune_unreferenced_extensions must be an array of extension names such as [\"js\", \"css\"].');
}
if (typeof prune_unreferenced_debug !== 'boolean') {
  throw new Error('ERROR: prune_unreferenced_debug must be true or false.');
}

// Parse Abridge build options explicitly. Zola is launched directly without a shell.
const VALID_MODES = new Set(['offline', 'offlineflexsearch', 'elasticlunrjava', 'elasticlunr', 'pagefind', 'tinysearch', 'flexsearch']);
const { values: cli } = parseArgs({
  args: process.argv.slice(2),
  options: {
    mode: { type: 'string' },
    'base-url': { type: 'string' },
    drafts: { type: 'boolean', default: false },
  },
  strict: true,
  allowPositionals: false,
});
if (cli.mode && !VALID_MODES.has(cli.mode)) {
  throw new Error(`ERROR: invalid --mode "${cli.mode}". Valid modes: ${[...VALID_MODES].join(', ')}`);
}
if (search_library && !VALID_MODES.has(search_library)) {
  throw new Error(`ERROR: invalid search_library "${search_library}" in zola.toml.`);
}
if (cli['base-url']) {
  let parsedBaseUrl;
  try {
    parsedBaseUrl = new URL(cli['base-url']);
  } catch {
    throw new Error('ERROR: --base-url must be a valid absolute HTTP(S) URL.');
  }
  if (!['http:', 'https:'].includes(parsedBaseUrl.protocol) || parsedBaseUrl.username || parsedBaseUrl.password) {
    throw new Error('ERROR: --base-url must be an HTTP(S) URL without embedded credentials.');
  }
}

function zolaBuildArgs() {
  const zolaArgs = ['build'];
  if (cli.drafts) zolaArgs.push('--drafts');
  if (search_library === 'offline' || search_library === 'offlineflexsearch') {
    zolaArgs.push('-u', path.join(__dirname, 'public'));
  } else if (cli['base-url']) {
    zolaArgs.push('--base-url', cli['base-url']);
  }
  return zolaArgs;
}

// Check whether Abridge is the project itself or is installed as a theme.
// When used as a theme, package_abridge.js is copied to the parent site's root,
// so only the parent contains ./themes/abridge next to this script.
const abridgeUsedAsTheme = fs.existsSync(path.join(__dirname, 'themes', 'abridge'));
const bpath = abridgeUsedAsTheme ? 'themes/abridge/' : '';
// Clean up generated search files left over from previous builds. Each search
// mode regenerates the artifacts it needs, so stale data from another mode
// must not leak into the next build or its PWA cache.
_rmRegex(path.join(__dirname, "static/js/"), /^wasm.*pagefind$/);
_rmRegex(path.join(__dirname, "static/js/"), /^pagefind.*pf_meta$/);
_rmRegex(path.join(__dirname, "static/js/"), /^pagefind-entry.*json$/);
_rmRecursive(path.join(__dirname, "static/js/index"));
_rmRecursive(path.join(__dirname, "static/js/fragment"));
_rmRegex(path.join(__dirname, "static/js/"), /^flexsearch_data\.[A-Za-z0-9_-]+\.js$/);
_rmRegex(path.join(__dirname, "static/"), /^tinysearch_engine(?:_bg\.wasm)?(?:\.d\.ts|\.js|\.wasm)?$/);


function walkMarkdownFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdownFiles(fullPath, files);
    else if (entry.isFile() && /\.md$/i.test(entry.name)) files.push(fullPath);
  }
  return files;
}

function findLiteEmbedIds() {
  const ids = { youtube: new Set(), vimeo: new Set(), streamable: new Set() };
  for (const file of walkMarkdownFiles(path.join(__dirname, 'content'))) {
    const source = fs.readFileSync(file, 'utf8');
    for (const provider of ['youtube', 'vimeo', 'streamable']) {
      const re = new RegExp(`\\{\\{<\\s*${provider}\\b[^>]*\\bid\\s*=\\s*[\"']([^\"']+)[\"'][^>]*\\/?>\\}\\}`, 'gi');
      for (const match of source.matchAll(re)) {
        const id = match[1].trim();
        const valid = provider === 'vimeo' ? /^\d+$/ : /^[A-Za-z0-9_-]+$/;
        if (!valid.test(id)) throw new Error(`ERROR: invalid ${provider} video id "${id}" in ${file}.`);
        ids[provider].add(id);
      }
    }
  }
  return ids;
}

async function fetchBuildAsset(url, label) {
  let response;
  try {
    response = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Abridge-Zola-Theme/2.0 (+https://github.com/Jieiku/abridge)' },
    });
  } catch (error) {
    throw new Error(`ERROR: failed to download ${label}: ${error.message}`);
  }
  if (!response.ok) throw new Error(`ERROR: failed to download ${label}: HTTP ${response.status} ${response.statusText}`);
  return response;
}

async function syncLiteEmbedThumbnails() {
  const ids = findLiteEmbedIds();
  if (!ids.youtube.size && !ids.vimeo.size && !ids.streamable.size) return;

  const root = path.join(__dirname, 'static', 'img', 'embed');
  const youtubeDir = path.join(root, 'youtube');
  const vimeoDir = path.join(root, 'vimeo');
  const streamableDir = path.join(root, 'streamable');
  fs.mkdirSync(youtubeDir, { recursive: true });
  fs.mkdirSync(vimeoDir, { recursive: true });
  fs.mkdirSync(streamableDir, { recursive: true });

  for (const id of [...ids.youtube].sort()) {
    const destination = path.join(youtubeDir, `${id}-1280.webp`);
    if (fs.existsSync(destination) && fs.statSync(destination).size > 0) continue;

    // YouTube does not guarantee a max-resolution poster for every video. Try
    // the largest WebP renditions first and gracefully fall back to hqdefault.
    const candidates = ['maxresdefault', 'sddefault', 'hqdefault'];
    let downloaded = false;
    for (const name of candidates) {
      let response;
      try {
        response = await fetch(`https://i.ytimg.com/vi_webp/${id}/${name}.webp`, {
          redirect: 'follow',
          headers: { 'User-Agent': 'Abridge-Zola-Theme/2.0 (+https://github.com/Jieiku/abridge)' },
        });
      } catch (_) {
        continue;
      }
      const type = (response.headers.get('content-type') || '').toLowerCase();
      if (!response.ok || !type.includes('image/webp')) continue;
      const body = Buffer.from(await response.arrayBuffer());
      if (!body.length) continue;
      fs.writeFileSync(destination, body);
      console.log(`Downloaded YouTube thumbnail: ${id} (${name})`);
      downloaded = true;
      break;
    }
    if (!downloaded) throw new Error(`ERROR: failed to download a usable YouTube thumbnail for ${id}.`);
  }

  for (const id of [...ids.vimeo].sort()) {
    const destination = path.join(vimeoDir, `${id}-1280.jpg`);
    if (fs.existsSync(destination) && fs.statSync(destination).size > 0) continue;
    const oembed = await fetchBuildAsset(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`, `Vimeo oEmbed metadata ${id}`);
    const metadata = await oembed.json();
    if (!metadata || typeof metadata.thumbnail_url !== 'string') {
      throw new Error(`ERROR: Vimeo oEmbed metadata for ${id} did not contain thumbnail_url.`);
    }

    // Extract Vimeo's stable image identifier from the oEmbed thumbnail, then
    // request a 1280x720 rendition from the image CDN instead of caching the
    // small oEmbed thumbnail itself.
    const thumbnail = new URL(metadata.thumbnail_url);
    const imageName = thumbnail.pathname.substring(thumbnail.pathname.lastIndexOf('/') + 1);
    const imageId = imageName.split('_')[0];
    if (!imageId) throw new Error(`ERROR: could not determine Vimeo thumbnail id for ${id}.`);
    const image = await fetchBuildAsset(`https://i.vimeocdn.com/video/${imageId}.jpg?mw=1280&mh=720&q=85`, `Vimeo thumbnail ${id}`);
    const type = (image.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('image/jpeg')) throw new Error(`ERROR: Vimeo thumbnail ${id} was not returned as JPEG (${type || 'unknown content type'}).`);
    fs.writeFileSync(destination, Buffer.from(await image.arrayBuffer()));
    console.log(`Downloaded Vimeo thumbnail: ${id} (1280px)`);
  }

  for (const id of [...ids.streamable].sort()) {
    const destination = path.join(streamableDir, `${id}-1280.jpg`);
    if (fs.existsSync(destination) && fs.statSync(destination).size > 0) continue;

    const oembed = await fetchBuildAsset(
      `https://api.streamable.com/oembed.json?url=${encodeURIComponent(`https://streamable.com/${id}`)}`,
      `Streamable oEmbed metadata ${id}`
    );
    const metadata = await oembed.json();
    if (!metadata || typeof metadata.thumbnail_url !== 'string') {
      throw new Error(`ERROR: Streamable oEmbed metadata for ${id} did not contain thumbnail_url.`);
    }

    // Streamable's oEmbed thumbnail URL is a resizable image endpoint. Ask it
    // for a 720px-tall poster (up to 1280px at 16:9) rather than caching the
    // small 300px rendition returned in the example oEmbed response.
    const thumbnail = new URL(metadata.thumbnail_url, 'https://streamable.com');
    thumbnail.protocol = 'https:';
    thumbnail.searchParams.set('height', '720');
    const image = await fetchBuildAsset(thumbnail.toString(), `Streamable thumbnail ${id}`);
    const type = (image.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('image/jpeg') && !type.includes('image/jpg')) {
      throw new Error(`ERROR: Streamable thumbnail ${id} was not returned as JPEG (${type || 'unknown content type'}).`);
    }
    fs.writeFileSync(destination, Buffer.from(await image.arrayBuffer()));
    console.log(`Downloaded Streamable thumbnail: ${id} (720px high)`);
  }
}

function syncKatexAssets() {
  const katexDist = path.join(__dirname, 'node_modules', 'katex', 'dist');
  if (!fs.existsSync(katexDist)) {
    throw new Error('ERROR: KaTeX dependency is missing. Run `npm install` (or `npm ci`) before building Abridge.');
  }

  const staticDir = path.join(__dirname, 'static');
  const staticJsDir = path.join(staticDir, 'js');
  const staticFontsDir = path.join(staticDir, 'fonts');
  fs.mkdirSync(staticJsDir, { recursive: true });
  fs.mkdirSync(staticFontsDir, { recursive: true });

  const copies = [
    [path.join(katexDist, 'katex.min.js'), path.join(staticJsDir, 'katex.min.js')],
    [path.join(katexDist, 'contrib', 'auto-render.min.js'), path.join(staticJsDir, 'katex-auto-render.min.js')],
    [path.join(katexDist, 'contrib', 'mathtex-script-type.min.js'), path.join(staticJsDir, 'mathtex-script-type.min.js')],
    [path.join(katexDist, 'katex.min.css'), path.join(staticDir, 'katex.min.css')],
  ];
  for (const [source, destination] of copies) {
    if (!fs.existsSync(source)) {
      throw new Error(`ERROR: expected KaTeX asset not found: ${source}`);
    }
    fs.copyFileSync(source, destination);
  }

  fs.cpSync(path.join(katexDist, 'fonts'), staticFontsDir, { recursive: true });

  // Keep the self-contained KaTeX bundle in sync with the individual assets.
  // The upstream files are already minified, so concatenate them rather than
  // running KaTeX through Abridge's aggressive Uglify settings.
  const bundleParts = [
    path.join(staticJsDir, 'katex.min.js'),
    path.join(staticJsDir, 'mathtex-script-type.min.js'),
    path.join(staticJsDir, 'katex-auto-render.min.js'),
    path.join(staticJsDir, 'katexoptions.js'),
  ];
  const bundle = bundleParts.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  fs.writeFileSync(path.join(staticJsDir, 'katexbundle.min.js'), bundle + '\n');
  const katexPackage = JSON.parse(fs.readFileSync(path.join(__dirname, 'node_modules', 'katex', 'package.json'), 'utf8'));
  console.log(`Synced KaTeX ${katexPackage.version} assets from locked npm dependency`);
}

function runCommand(command, args, missingCommandMessage) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false });
    child.on('error', (error) => {
      if (error.code === 'ENOENT' && missingCommandMessage) {
        reject(new Error(missingCommandMessage));
      } else {
        reject(error);
      }
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

function runZola() {
  return runCommand(
    'zola',
    zolaBuildArgs(),
    'ERROR: zola was not found in PATH.'
  );
}

function runTinysearch() {
  console.log('Creating Tinysearch index and WebAssembly...');
  return runCommand(
    'tinysearch',
    ['--release', '-m', 'wasm', '-o', '-p', 'static', 'public/search_index.en.json'],
    'ERROR: --mode tinysearch requires the tinysearch CLI to be installed and available in PATH.'
  );
}

async function abridge() {
  const { replaceInFileSync } = await import('replace-in-file');
  // Only the Abridge repository itself refreshes vendored KaTeX assets. Parent
  // sites use the vetted files shipped by the theme and must not rewrite them.
  if (!abridgeUsedAsTheme) {
    syncKatexAssets();
  }
  // Keep the Shadow DOM video components local so normal and file:// builds never depend on a CDN for their runtime.
  // lite-vimeo.js is vendored from Jieiku/lite-vimeo because Abridge uses its custom image slot API.
  await syncLiteEmbedThumbnails();

  // set index_format for chosen search_library accordingly.
  if (search_library === 'offline') {
    replaceInFileSync({ files: 'zola.toml', from: /index_format.*=.*/g, to: "index_format = \"elasticlunr_javascript\"" });
    index_format = 'elasticlunr_javascript';
  } else if (search_library === 'offlineflexsearch') {
    replaceInFileSync({ files: 'zola.toml', from: /index_format.*=.*/g, to: "index_format = \"fuse_json\"" });
    index_format = 'fuse_json';
  } else if (search_library === 'elasticlunrjava') {
    replaceInFileSync({ files: 'zola.toml', from: /index_format.*=.*/g, to: "index_format = \"elasticlunr_javascript\"" });
    index_format = 'elasticlunr_javascript';
  } else if (search_library === 'elasticlunr') {
    replaceInFileSync({ files: 'zola.toml', from: /index_format.*=.*/g, to: "index_format = \"elasticlunr_json\"" });
    index_format = 'elasticlunr_json';
  } else if (search_library === 'pagefind' || search_library === 'tinysearch' || search_library === 'flexsearch') {
    replaceInFileSync({ files: 'zola.toml', from: /index_format.*=.*/g, to: "index_format = \"fuse_json\"" });
    index_format = 'fuse_json';
  }

  // FlexSearch data is generated from Zola's fuse_json output, so the first
  // Zola build cannot contain the real data yet. Seed one harmless data file
  // for every configured language so get_url()/get_hash() can resolve the
  // assets during that bootstrap build. They are replaced immediately after
  // Zola emits search_index.<lang>.json, and the normal final Zola build then
  // writes the correct cache-busted URLs and integrity hashes.
  if (search_library === 'flexsearch' || search_library === 'offlineflexsearch') {
    const staticJsDir = path.join(__dirname, 'static', 'js');
    fs.mkdirSync(staticJsDir, { recursive: true });

    const flexDist = path.join(__dirname, 'node_modules', 'flexsearch', 'dist', 'flexsearch.compact.min.js');
    if (!fs.existsSync(flexDist)) {
      throw new Error('ERROR: FlexSearch modes require the locked flexsearch npm dependency. Run `npm install` (or `npm ci`).');
    }
    fs.copyFileSync(flexDist, path.join(staticJsDir, 'flexsearch.compact.min.js'));

    _rmRegex(staticJsDir, /^flexsearch_data\.[A-Za-z0-9_-]+\.js$/);
    const flexLanguages = new Set([data.default_language || 'en', ...Object.keys(data.languages || {})]);
    for (const lang of flexLanguages) {
      if (!/^[A-Za-z0-9_-]+$/.test(lang)) {
        throw new Error(`ERROR: unsupported language identifier for FlexSearch: ${lang}`);
      }
      fs.writeFileSync(path.join(staticJsDir, `flexsearch_data.${lang}.js`), 'window.flexsearchData=[];\n');
    }
  }

  console.log('Zola Build to generate files for minification:');
  await runZola();

  if (search_library === 'tinysearch') {
    const siteTinysearchConfig = path.join('tinysearch.toml');
    const themeTinysearchConfig = path.join(bpath, 'tinysearch.toml');
    const tinysearchConfig = fs.existsSync(siteTinysearchConfig) ? siteTinysearchConfig : themeTinysearchConfig;
    if (!fs.existsSync(tinysearchConfig)) {
      throw new Error('ERROR: Tinysearch mode requires tinysearch.toml (or themes/abridge/tinysearch.toml when Abridge is used as a theme).');
    }
    fs.copyFileSync(tinysearchConfig, path.join('public', 'tinysearch.toml'));
    console.log(`Using Tinysearch config: ${tinysearchConfig}`);
    await runTinysearch();
    _rmFile(path.join(__dirname, 'public', 'tinysearch.toml'));
    const tinysearchWasm = path.join('static', 'tinysearch_engine.wasm');
    if (!fs.existsSync(tinysearchWasm)) {
      throw new Error('ERROR: Tinysearch did not generate static/tinysearch_engine.wasm.');
    }
    fs.copyFileSync(tinysearchWasm, path.join('public', 'tinysearch_engine.wasm'));
  }

  if (search_library === 'flexsearch' || search_library === 'offlineflexsearch') {
    const indexFiles = fs.readdirSync(path.join(__dirname, 'public'))
      .filter((file) => /^search_index\.[A-Za-z0-9_-]+\.json$/.test(file))
      .sort();
    if (!indexFiles.length) throw new Error('ERROR: FlexSearch mode requires Zola fuse_json search indexes.');
    _rmRegex(path.join(__dirname, 'static', 'js'), /^flexsearch_data\.[A-Za-z0-9_-]+\.js$/);
    for (const file of indexFiles) {
      const match = /^search_index\.([A-Za-z0-9_-]+)\.json$/.exec(file);
      if (!match) continue;
      const lang = match[1];
      const parsed = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', file), 'utf8'));
      if (!Array.isArray(parsed)) throw new Error(`ERROR: unexpected FlexSearch source index format in ${file}.`);
      const records = [];
      for (const record of parsed) {
        if (!record || typeof record !== 'object') continue;
        records.push({
          title: String(record.title || ''),
          body: String(record.body || ''),
          description: String(record.description || record.meta || ''),
          url: (() => {
            let url = String(record.url || '');
            if (search_library !== 'offlineflexsearch') return url;

            // Keep portable offline search results relative to the site root.
            // The browser-side FlexSearch UI prefixes these with the per-page
            // relative root stored in <meta name="base">.
            const publicDir = path.resolve(__dirname, 'public');
            const publicUrl = pathToFileURL(publicDir).href.replace(/\/$/, '');
            const prefixes = [publicUrl, publicDir.replace(/\\/g, '/')];
            for (const prefix of prefixes) {
              if (url === prefix) {
                url = '';
                break;
              }
              if (url.startsWith(prefix + '/')) {
                url = url.slice(prefix.length + 1);
                break;
              }
            }
            url = url.replace(/^\/+/, '');
            if (url.endsWith('/')) url += 'index.html';
            return url || 'index.html';
          })()
        });
      }
      fs.writeFileSync(path.join(__dirname, 'static', 'js', `flexsearch_data.${lang}.js`),
        'window.flexsearchData=' + JSON.stringify(records) + ';\n');
      console.log(`Created FlexSearch data for ${lang}: ${records.length} documents`);
    }
  }

  //check that static/js exists, do this after zola build, it will handle creating static if missing.
  var jsdir = 'static/js';
  try {
    fs.mkdirSync(jsdir);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }

  let base_url = data.base_url;
  if (base_url.slice(-1) == "/") {
    base_url = base_url.slice(0, -1);
  }

  if (search_library === 'pagefind') {
    // Generate pagefind index at start, otherwise it happens too late asyncronously.
    await createPagefindIndex(); // makes program wait for pagefind build execution
    _rmRegex(path.join(__dirname, "static/js/"), /^pagefind\.js$/);//pagefind temporary intermediate files
    _rmRegex(path.join(__dirname, "static/js/"), /^pagefind-.*\.js$/);//pagefind temporary intermediate files
    _rmRegex(path.join(__dirname, "static/js/"), /^pagefind-.*\.css$/);//pagefind temporary intermediate files

    // This line in pagefind is causing a problem for the PWA:
    // var e = await (await fetch(this.basePath + "pagefind-entry.json?ts=" + Date.now())).json();
    // instead generate an epoch timestamp at build and add it to the filename.
    var hash = Math.floor(new Date().getTime() / 1000);
    fs.renameSync(path.join(__dirname, "static/js/pagefind-entry.json"), path.join(__dirname, "static/js/pagefind-entry-" + hash + ".json"));

    // Pagefind builds the entry URL in several forms across versions, e.g.:
    //   this.basePath+"pagefind-entry.json?ts="+Date.now()
    //   `${this.basePath}pagefind-entry.json?ts=${Date.now()}`
    // Replace those with a build-time hashed filename (no cache-bust query).
    // Also strip import.meta (ESM-only) so the classic <script defer> bundle parses.
    const pagefindSearchPath = path.join(__dirname, "static/js/pagefind_search.js");
    let pfSearch = fs.readFileSync(pagefindSearchPath, "utf8");
    const hashedEntry = "pagefind-entry-" + hash + ".json";
    const before = pfSearch;
    pfSearch = pfSearch
      // template literal: pagefind-entry.json?ts=${Date.now()}
      .replace(/pagefind-entry\.json\?ts=\$\{Date\.now\(\)\}/g, hashedEntry)
      // template literal with any expression: pagefind-entry.json?ts=${...}
      .replace(/pagefind-entry\.json\?ts=\$\{[^}]+\}/g, hashedEntry)
      // concat / plain: pagefind-entry.json?ts=
      .replace(/pagefind-entry\.json\?ts=/g, hashedEntry)
      // leftover bare filename (if ?ts= already stripped elsewhere)
      .replace(/pagefind-entry\.json/g, hashedEntry)
      // Date.now() used only for that cache-bust (safe after entry URL rewrite)
      .replace(/Date\.now\(\)/g, '""')
      .replace(/import\.meta\.url/g, "undefined")
      .replace(/import\.meta/g, "undefined");
    if (before === pfSearch) {
      throw new Error("ERROR: no pagefind-entry/import.meta substitutions applied to pagefind_search.js; Pagefind output may have changed.");
    }
    if (!pfSearch.includes(hashedEntry) || pfSearch.includes("pagefind-entry.json")) {
      throw new Error(`ERROR: Pagefind entry URL patch failed for ${hashedEntry}.`);
    }
    if (pfSearch.includes("import.meta")) {
      throw new Error("ERROR: import.meta remains in pagefind_search.js after compatibility patch.");
    }
    console.log("Patched pagefind_search.js to use", hashedEntry);
    fs.writeFileSync(pagefindSearchPath, pfSearch);

    //copy to public so the files are included in the PWA cache list if necessary.
    fs.copyFileSync(path.join(__dirname, "static/js/pagefind-entry-" + hash + ".json"), path.join(__dirname, "public/js/pagefind-entry-" + hash + ".json"))
    _cpRegex(path.join(__dirname, "static/js/"), path.join(__dirname, "public/js/"), /^pagefind-entry\.json$/);
    _cpRegex(path.join(__dirname, "static/js/"), path.join(__dirname, "public/js/"), /^pagefind.*pf_meta$/);
    _cpRegex(path.join(__dirname, "static/js/"), path.join(__dirname, "public/js/"), /^wasm.*pagefind$/);
    _cpRecursive(path.join(__dirname, "static/js/index"), path.join(__dirname, "public/js/index"));
    _cpRecursive(path.join(__dirname, "static/js/fragment"), path.join(__dirname, "public/js/fragment"));
  }

  // Prune configured unreferenced asset types before the PWA enumerates public/.
  // This keeps pwa_cache_all aligned with the files that will actually ship.
  pruneUnreferencedPublicAssets();

  if (pwa) {// Update pwa settings, file list, and hashes.
    if (typeof pwa_VER !== 'undefined' && typeof pwa_NORM_TTL !== 'undefined' && typeof pwa_LONG_TTL !== 'undefined' && typeof pwa_TTL_NORM !== 'undefined' && typeof pwa_TTL_LONG !== 'undefined' && typeof pwa_TTL_EXEMPT !== 'undefined') {
      if (typeof pwa_VER !== 'string' || !/^[A-Za-z0-9._-]+$/.test(pwa_VER)) {
        throw new Error('ERROR: pwa_VER must contain only letters, numbers, dots, underscores, or hyphens.');
      }
      for (const [name, value] of [
        ['pwa_NORM_TTL', pwa_NORM_TTL],
        ['pwa_LONG_TTL', pwa_LONG_TTL],
      ]) {
        if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
          throw new Error(`ERROR: ${name} must be a finite, non-negative TOML number in zola.toml.`);
        }
      }
      for (const [name, value] of [
        ['pwa_TTL_NORM', pwa_TTL_NORM],
        ['pwa_TTL_LONG', pwa_TTL_LONG],
        ['pwa_TTL_EXEMPT', pwa_TTL_EXEMPT],
        ['pwa_BASE_CACHE_FILES', pwa_BASE_CACHE_FILES],
        ['pwa_IGNORE_FILES', pwa_IGNORE_FILES],
      ]) {
        if (!Array.isArray(value)) throw new Error(`ERROR: ${name} must be a TOML array in zola.toml.`);
      }
      // update from abridge theme.
      fs.copyFileSync(bpath + 'static/sw.js', 'static/sw.js');
      fs.copyFileSync(bpath + 'static/js/sw_load.js', 'static/js/sw_load.js');
      // Update settings in PWA javascript file, using options parsed from zola.toml.  sw.min.js?v=3.10.0",  "++"
      if (fs.existsSync('static/js/sw_load.js')) {
        let sw_load_min = '.js?v=';
        if (js_bundle) {
          sw_load_min = '.min.js?v=';
        }
        replaceInFileSync({ files: 'static/js/sw_load.js', from: /sw.*v=.*/g, to: "sw" + sw_load_min + pwa_VER + "\"," });
      }
      if (fs.existsSync('static/sw.js')) {
        replaceInFileSync({ files: 'static/sw.js', from: /NORM_TTL.*=.*/g, to: "NORM_TTL = " + pwa_NORM_TTL + ";" });
        replaceInFileSync({ files: 'static/sw.js', from: /LONG_TTL.*=.*/g, to: "LONG_TTL = " + pwa_LONG_TTL + ";" });
        replaceInFileSync({ files: 'static/sw.js', from: /TTL_NORM.*=.*/g, to: "TTL_NORM = " + JSON.stringify(pwa_TTL_NORM) + ";" });
        replaceInFileSync({ files: 'static/sw.js', from: /TTL_LONG.*=.*/g, to: "TTL_LONG = " + JSON.stringify(pwa_TTL_LONG) + ";" });
        replaceInFileSync({ files: 'static/sw.js', from: /TTL_EXEMPT.*=.*/g, to: "TTL_EXEMPT = " + JSON.stringify(pwa_TTL_EXEMPT) + ";" });
      }

      let cacheFiles;
      if (pwa_cache_all === true) {
        console.log('info: pwa_cache_all = true in zola.toml, so caching the entire site.\n');
        fs.mkdirSync('public', { recursive: true });
        cacheFiles = [];
        const publicDir = './public/';
        for (const file of fs.readdirSync(publicDir, { recursive: true, withFileTypes: false })) {
          if (fs.lstatSync(path.join(publicDir, file)).isDirectory()) continue;
          let item = '/' + file.replace(/\\/g, '/').replace(/index\.html$/i, '');
          const itemLower = item.toLowerCase();
          const ignored = pwa_IGNORE_FILES.some((ignore) =>
            itemLower.startsWith('/' + String(ignore).replace(/^\/+/, '').toLowerCase())
          );
          if (!ignored && item !== '') cacheFiles.push(item);
        }
      } else {
        cacheFiles = [...pwa_BASE_CACHE_FILES];
      }

      cacheFiles.sort();
      const cache = 'this.BASE_CACHE_FILES = ' + JSON.stringify(cacheFiles) + ';';
      // update the BASE_CACHE_FILES variable in the sw.js service worker file
      replaceInFileSync({
        files: 'static/sw.js',
        from: /this\.BASE_CACHE_FILES =.*/g,
        to: cache,
        countMatches: true,
      });
    } else {
      throw new Error('ERROR: pwa requires that pwa_VER, pwa_NORM_TTL, pwa_LONG_TTL, pwa_TTL_NORM, pwa_TTL_LONG, pwa_TTL_EXEMPT are set in zola.toml.');
    }
  }

  if (bpath === '') {// abridge used directly
    _headersWASM();
    // These are truely static js files, so they should only need to be updated by the abridge maintainer or contributors.
    minify(['static/js/theme.js']);
    minify(['static/js/theme_light.js']);
    // Something went wrong with minifying katexbundle, so commenting this out for now
    // minify(['static/js/katex.min.js','static/js/mathtex-script-type.min.js','static/js/katex-auto-render.min.js','static/js/katexoptions.js'],'static/js/katexbundle.min.js');
    minify(['static/js/elasticlunr_scope_begin.js', 'static/js/elasticlunr.min.js', 'static/js/elasticlunr_bridge.js', 'static/js/search.js', 'static/js/elasticlunr_scope_end.js'], 'static/js/search_elasticlunr.min.js');
    minify(['static/js/tinysearch.js'], 'static/js/search_tinysearch.min.js');
    minify(['static/js/prestyle.js', 'static/js/theme_button.js', 'static/js/email.js', 'static/js/codecopy.js', 'static/js/sw_load.js'], 'static/js/abridge_nosearch.min.js');
    minify(['static/js/prestyle.js', 'static/js/theme_button.js', 'static/js/email.js', 'static/js/codecopy.js'], 'static/js/abridge_nosearch_nopwa.min.js');
    minify(['static/js/sw_load.js']);
    minify(['static/sw.js']);
  } else if (pwa) {
    minify(['static/js/sw_load.js']);
    minify(['static/sw.js']);
  }

  // if manifest.json is present, then minify it.
  if (fs.existsSync('static/manifest.json')) {
    const out = JSON.minify(fs.readFileSync('static/manifest.json', { encoding: "utf-8" }));
    fs.writeFileSync('static/manifest.min.json', out);
  }

  let abridge_bundle = bundle(bpath, js_prestyle, js_switcher, js_email_encode, js_copycode, search_library, index_format, uglyurls, false);
  minify(abridge_bundle, 'static/js/abridge_nopwa.min.js');

  abridge_bundle = bundle(bpath, js_prestyle, js_switcher, js_email_encode, js_copycode, search_library, index_format, uglyurls, pwa);
  minify(abridge_bundle, 'static/js/abridge.min.js');

  // cleanup
  _rmRegex(path.join(__dirname, "static/js/"), /^pagefind_search\.js$/);//pagefind intermediate file that is now in bundle.

  console.log('Zola Build to generate new integrity hashes for the previously minified files:');
  await runZola();

  if (search_library === 'offlineflexsearch') {
    makeOfflineFlexSearchPortable();
  }

  // The final Zola build copies static/ again, so prune once more. When
  // prune_unreferenced_debug is enabled, list final-pass removals for review.
  pruneUnreferencedPublicAssets(prune_unreferenced_debug);
}


function _rmFile(file) {
  try {
    fs.unlinkSync(file);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

function pruneUnreferencedPublicAssets(listRemoved = false) {
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) return;

  // Pruning is explicitly opt-in through zola.toml. If the setting is absent
  // or empty, leave public/ untouched. Extension names are normalized here.
  if (!Array.isArray(prune_unreferenced_extensions) || prune_unreferenced_extensions.length === 0) return;
  const prunableExtensions = new Set(prune_unreferenced_extensions.map(ext => `.${ext.toLowerCase()}`));
  const allFiles = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile()) allFiles.push(fullPath);
    }
  }
  walk(publicDir);

  const relative = (file) => path.relative(publicDir, file).replace(/\\/g, '/');
  const byRelative = new Map(allFiles.map(file => [relative(file), file]));
  const candidates = new Set(
    allFiles.filter(file => prunableExtensions.has(path.extname(file).toLowerCase()))
      .map(relative)
  );

  // HTML/XML are entry points. Prunable assets only become roots by being
  // referenced from an entry point (or recursively from reachable CSS/JS).
  const roots = allFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.html' || ext === '.htm' || ext === '.xml';
  });

  const reachable = new Set();
  const queue = [...roots];
  const scanned = new Set();

  function normalizeReference(ref, sourceRelative) {
    if (!ref) return null;
    let value = ref.trim().replace(/^['"]|['"]$/g, '');
    if (!value || value.startsWith('data:') || value.startsWith('blob:') || value.startsWith('#')) return null;
    value = value.split('#', 1)[0].split('?', 1)[0];
    try {
      if (/^https?:\/\//i.test(value)) value = new URL(value).pathname;
    } catch (_) {
      return null;
    }
    try { value = decodeURIComponent(value); } catch (_) {}
    if (value.startsWith('/')) return path.posix.normalize(value.slice(1));
    return path.posix.normalize(path.posix.join(path.posix.dirname(sourceRelative), value));
  }

  // Extract only syntactic resource references. Do not search arbitrary text:
  // documentation and search indexes may mention filenames without loading them.
  function extractReferences(text, sourceRelative) {
    const ext = path.posix.extname(sourceRelative).toLowerCase();
    const refs = new Set();
    const add = (value) => {
      const normalized = normalizeReference(value, sourceRelative);
      if (normalized && !normalized.startsWith('../')) refs.add(normalized);
    };

    if (ext === '.html' || ext === '.htm' || ext === '.xml') {
      // Resource-bearing HTML/XML attributes. srcset is split into individual URLs.
      const attrRe = /\b(?:src|href|poster|data-src|data-href)\s*=\s*(["'])(.*?)\1/gi;
      let match;
      while ((match = attrRe.exec(text))) add(match[2]);
      const srcsetRe = /\bsrcset\s*=\s*(["'])(.*?)\1/gi;
      while ((match = srcsetRe.exec(text))) {
        for (const item of match[2].split(',')) add(item.trim().split(/\s+/, 1)[0]);
      }
    } else if (ext === '.css') {
      let match;
      const urlRe = /url\(\s*(["']?)(.*?)\1\s*\)/gi;
      while ((match = urlRe.exec(text))) add(match[2]);
      const importRe = /@import\s+(?:url\(\s*)?(["'])(.*?)\1/gi;
      while ((match = importRe.exec(text))) add(match[2]);
    } else if (ext === '.js') {
      // Only quoted JS string literals can name runtime assets. This avoids
      // prose false positives while covering script/fetch/worker registrations.
      const stringRe = /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g;
      let match;
      while ((match = stringRe.exec(text))) {
        const value = match[2];
        if (/\.(?:js|css|woff2|json)(?:[?#]|$)/i.test(value)) add(value);
      }

      // Preserve runtime-generated language indexes such as
      // "search_index." + lang + ".json" without treating arbitrary prose as a reference.
      for (const candidate of candidates) {
        const basename = path.posix.basename(candidate);
        const firstDot = basename.indexOf('.');
        const lastDot = basename.lastIndexOf('.');
        if (firstDot <= 0 || lastDot <= firstDot) continue;
        const prefix = basename.slice(0, firstDot + 1);
        const suffix = basename.slice(lastDot);
        if (text.includes(JSON.stringify(prefix).slice(1, -1)) && text.includes(JSON.stringify(suffix).slice(1, -1))) {
          refs.add(candidate);
        }
      }
    }

    return refs;
  }

  while (queue.length) {
    const source = queue.shift();
    if (scanned.has(source)) continue;
    scanned.add(source);

    // With pwa_cache_all, generated workers intentionally contain the complete
    // cache list. They may be reachable, but their contents must not determine
    // reachability or they would keep every otherwise-unused asset alive.
    const sourceRelative = relative(source);
    if (sourceRelative === 'sw.js' || sourceRelative === 'sw.min.js') continue;

    let text;
    try {
      text = fs.readFileSync(source, 'utf8');
    } catch (_) {
      continue;
    }

    for (const ref of extractReferences(text, sourceRelative)) {
      if (!candidates.has(ref) || reachable.has(ref)) continue;
      reachable.add(ref);
      const target = byRelative.get(ref);
      if (target) queue.push(target);
    }
  }

  const removedFiles = [];
  for (const candidate of candidates) {
    if (reachable.has(candidate)) continue;
    _rmFile(byRelative.get(candidate));
    removedFiles.push(candidate);
  }

  // Tinysearch needs this temporary copy only while its index is generated.
  // It is build input rather than a deployable runtime asset.
  _rmFile(path.join(publicDir, 'tinysearch.toml'));

  removedFiles.sort();
  const extensionLabel = [...prunableExtensions].sort().join('/');
  console.log(`Pruned ${removedFiles.length} unreferenced public ${extensionLabel} file(s).`);
  if (listRemoved && removedFiles.length > 0) {
    for (const file of removedFiles) console.log(`  ${file}`);
  }
}

function makeOfflineFlexSearchPortable() {
  const publicDir = path.resolve(__dirname, 'public');
  const publicUrl = pathToFileURL(publicDir).href.replace(/\/$/, '');
  const publicPath = publicDir.replace(/\\/g, '/').replace(/\/$/, '');
  const encodedPath = encodeURI(publicPath);
  const baseVariants = [...new Set([publicUrl, publicPath, encodedPath])]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  const textExtensions = new Set(['.html', '.htm', '.css', '.xml', '.json', '.js', '.txt', '.webmanifest']);
  let rewritten = 0;

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (!entry.isFile() || !textExtensions.has(path.extname(entry.name).toLowerCase())) continue;

      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      const relativeDir = path.relative(path.dirname(fullPath), publicDir).replace(/\\/g, '/');
      const root = relativeDir ? relativeDir + '/' : './';

      for (const base of baseVariants) {
        content = content.split(base + '/').join(root);
        content = content.split(base).join(root.replace(/\/$/, ''));
      }

      // FlexSearch result URLs are site-root-relative strings. Each generated
      // HTML page exposes its own route back to the portable site root here.
      if (/\.html?$/i.test(entry.name)) {
        content = content.replace(
          /(<meta\s+name=["']base["']\s+content=["'])[^"']*(["']\s*\/?\>)/i,
          `$1${root}$2`
        );
      }

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        rewritten++;
      }
    }
  }

  walk(publicDir);

  // Fail closed: a relocatable build must not retain the absolute build path.
  const leftovers = [];
  function verify(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        verify(fullPath);
        continue;
      }
      if (!entry.isFile() || !textExtensions.has(path.extname(entry.name).toLowerCase())) continue;
      const content = fs.readFileSync(fullPath, 'utf8');
      if (baseVariants.some((base) => content.includes(base))) {
        leftovers.push(path.relative(publicDir, fullPath));
      }
    }
  }
  verify(publicDir);
  if (leftovers.length) {
    throw new Error(`ERROR: offlineflexsearch portability rewrite left absolute build paths in: ${leftovers.slice(0, 10).join(', ')}`);
  }
  console.log(`Made offlineflexsearch output relocatable (${rewritten} text files rewritten).`);
}

async function _headersWASM() {
  // running WASM in the browser requires wasm-unsafe-eval if using Content-Security-Policy:
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_webassembly_execution
  // This function adds wasm-unsafe-eval to the pagefind and tinysearch demos without adding it to the elasticlunr demo.
  const { replaceInFileSync } = await import('replace-in-file');
  if (search_library === 'pagefind') {
    replaceInFileSync({ files: 'static/_headers', from: /script-src 'self'/g, to: "script-src 'wasm-unsafe-eval' 'self'" });
  } else if (search_library === 'tinysearch') {
    replaceInFileSync({ files: 'static/_headers', from: /script-src 'self'/g, to: "script-src 'wasm-unsafe-eval' 'self'" });
  } else {
    replaceInFileSync({ files: 'static/_headers', from: /script-src 'wasm-unsafe-eval' 'self'/g, to: "script-src 'self'" });
  }
}

function _rmRecursive(targetFiles) {
  try {
    fs.rmSync(targetFiles, { recursive: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {// Ignore if does not exist, that is the desired result.
      console.error("An error occurred:", error);
    }
  }
}

function _cpRecursive(source, dest) {
  fs.cpSync(source, dest, { recursive: true });
}

function _rmRegex(dir, regex) {
  try {
    fs.readdirSync(dir).filter(f => regex.test(f)).forEach(f => fs.unlinkSync(path.join(dir, f)));
  } catch (error) {
    if (error.code !== 'ENOENT') {// Ignore if does not exist, that is the desired result.
      console.error("An error occurred:", error);
    }
  }
}

function _cpRegex(source, dest, regex) {
  fs.mkdirSync(dest, { recursive: true });
  const matches = fs.readdirSync(source).filter(f => regex.test(f));
  matches.forEach(f => fs.copyFileSync(path.join(source, f), path.join(dest, f)));
  return matches.length;
}

function bundle(bpath, js_prestyle, js_switcher, js_email_encode, js_copycode, search_library, index_format, uglyurls, pwa) {
  const minify_files = [];

  if (js_prestyle) {
    minify_files.push(path.join(bpath, 'static/js/prestyle.js'));
  }
  if (js_switcher) {
    minify_files.push(path.join(bpath, 'static/js/theme_button.js'));
  }
  if (js_email_encode) {
    minify_files.push(path.join(bpath, 'static/js/email.js'));
  }
  if (js_copycode) {
    minify_files.push(path.join(bpath, 'static/js/codecopy.js'));
  }
  if (search_library) {
    if ((search_library === 'offline' || (search_library === 'elasticlunrjava' && uglyurls === true))) {
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_scope_begin.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr.min.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_bridge.js'));
      minify_files.push(path.join(bpath, 'static/js/searchjavaugly.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_scope_end.js'));
    } else if (search_library === 'elasticlunrjava') {
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_scope_begin.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr.min.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_bridge.js'));
      minify_files.push(path.join(bpath, 'static/js/searchjava.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_scope_end.js'));
    } else if (search_library === 'elasticlunr') {//abridge default
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_scope_begin.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr.min.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_bridge.js'));
      minify_files.push(path.join(bpath, 'static/js/search.js'));
      minify_files.push(path.join(bpath, 'static/js/elasticlunr_scope_end.js'));
    } else if (search_library === 'pagefind') {
      minify_files.push(path.join(__dirname, 'static/js/pagefind_search.js'));
    } else if (search_library === 'tinysearch') {
      minify_files.push(path.join(bpath, 'static/js/tinysearch.js'));
    } else if (search_library === 'flexsearch' || search_library === 'offlineflexsearch') {
      minify_files.push(path.join(__dirname, 'static/js/flexsearch.compact.min.js'));
      minify_files.push(path.join(bpath, 'static/js/flexsearch.js'));
    }
  }
  if (pwa) {
    minify_files.push('static/js/sw_load.js');
  }
  return minify_files;
}

function minify(fileA, outfile) {
  const options = {
    mangle: true,
    compress: {
      //expression: true,//Parse a single expression, rather than a program (for parsing JSON).
      //global_defs: false,// a way to pass parameters
      //module: true,//Process input as ES module (implies --toplevel)
      //toplevel: true,//Compress and/or mangle variables in top level scope.
      hoist_funs: true,//hoist function declarations
      unsafe: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true,
      drop_console: true
    }
  }
  if (!outfile) {// outfile parameter omitted, infer based on input
    outfile = fileA[0].slice(0, -2) + 'min.js';
  }
  var filesContents = fileA.map(function (file) {// array input to support multiple files
    return fs.readFileSync(file, 'utf8');
  });

  // Join into one source unit. Uglify parses each array entry as a separate file, so an
  // IIFE split across elasticlunr_scope_begin.js / … / elasticlunr_scope_end.js would fail.
  var combined = filesContents.join('\n');
  const result = UglifyJS.minify(combined, options);
  if (result.error) {
    throw new Error('UglifyJS failed for ' + outfile + ': ' + result.error);
  }
  if (typeof result.code !== 'string') {
    throw new Error('UglifyJS produced no code for ' + outfile);
  }
  fs.writeFileSync(outfile, result.code);

}

async function searchChange(searchOption) {
  const { replaceInFileSync } = await import('replace-in-file');
  replaceInFileSync({ files: 'zola.toml', from: /^search_library\s*=.*/gm, to: 'search_library = \"' + searchOption + '\"' });
}

async function main() {
  await sync();
  if (cli.mode) {
    await searchChange(cli.mode);
    search_library = cli.mode;
  }
  await abridge();
}

main().catch((error) => {
  console.error(error);
  exit(1);
});

async function createPagefindIndex() {
  console.log("Creating Pagefind index...");
  const pagefind = await import("pagefind");// Dynamically import the pagefind module
  const publicFolder = path.join(__dirname, "public");
  const files = fs.readdirSync(publicFolder);
  let langArray = [];

  files.forEach((file) => {
    const match = /^search_index\.([A-Za-z0-9_-]+)\.json$/.exec(file);
    if (match) langArray.push(match[1]);
  });

  const { index } = await pagefind.createIndex();
  // Assuming index, fs, and path are already defined and properly imported

  // Convert each lang in langArray to a promise that performs the desired operations
  const promises = langArray.map((lang) =>
    (async () => {
      const filePath = path.join(__dirname, "public/search_index." + lang + ".json");

      // Read the file content synchronously (consider using async readFile for better performance)
      const fileContent = fs.readFileSync(filePath);
      const data = JSON.parse(fileContent);

      // Add each record to the index asynchronously
      for (const record of data) {
        await index.addCustomRecord({
          url: record.url,
          content: record.body,
          language: lang,
          meta: {
            title: record.title,
            description: record.meta,
          },
        });
      }
    })()
  );

  // Execute all promises concurrently
  await Promise.all(promises)
    .then(async () => {
      // Write the index files to disk
      const { errors } = await index.writeFiles({
        outputPath: path.join(__dirname, "./static/js/"),
      });
      if (errors.length > 0) {
        throw new Error(`Pagefind index write failed: ${errors.join('; ')}`);
      }
    })
    .then(async () => {
      // Edit the pagefind to convert from MJS to CJS
      const pagefindPath = path.join(__dirname, "static/js/pagefind.js");//source pagefind from node module
      let pagefindContent = fs.readFileSync(pagefindPath, "utf8");
      // Pagefind uses import.meta.url (ESM-only). Abridge bundles into a classic
      // <script defer> (not type=module), so strip import.meta or browsers throw
      // "Cannot use import.meta outside a module". Fallback basePath still works.
      pagefindContent = pagefindContent
        .replace(
          /initPrimary\(\)\{([^{}]*\{[^{}]*\})*[^{}]*\}/g,
          `initPrimary(){}`
        ) // Remove annoying function
        .replace(/;export\{[^}]*\}/g, "")
        .replace(/import\.meta\.url/g, "undefined")
        .replace(/import\.meta/g, "undefined");
      fs.writeFileSync(pagefindPath, pagefindContent);

      // now insert the CJS into the anonymous function within pagefind.search.js
      const pagefind_searchPath = path.join(bpath, "static/js/pagefind.search.js");//file to insert into
      const search_pagefindPath = path.join(__dirname, "static/js/pagefind_search.js");//output
      let pagefind_searchContent = fs.readFileSync(pagefind_searchPath, "utf8");
      // Now insert into pagefind.search.js at this location: //insertHere
      pagefind_searchContent = pagefind_searchContent.replace(/\/\/insertHere/g, pagefindContent);
      fs.writeFileSync(search_pagefindPath, pagefind_searchContent);

    })
    .then(async () => {
      await pagefind.close();
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      throw error;
    });
}

async function sync() {
  // Check if the submodule is present, if not skip entire function
  if (!fs.existsSync(path.join(__dirname, "themes/abridge"))) {
    return;
  }

  // Checks for changes from local version in static, package.json and zola.toml
  // and if there are changes it sync from the submodule

  // Check for changes in static
  const staticFolder = path.join(__dirname, "static/js");
  const submoduleFolder = path.join(__dirname, "themes/abridge/static/js");

  fs.mkdirSync(staticFolder, { recursive: true });

  const files = fs.readdirSync(staticFolder);

  files.forEach((file) => {
    if (file.endsWith(".js") && !file.endsWith(".min.js")) {
      try {
        const localFile = path.join(staticFolder, file);
        const submoduleFile = path.join(submoduleFolder, file);
        const localFileContent = fs.readFileSync(localFile, "utf-8");
        const submoduleFileContent = fs.readFileSync(submoduleFile, "utf-8");

        if (localFileContent !== submoduleFileContent) {
          console.log(`Updating ${file} from submodule`);
          fs.copyFileSync(submoduleFile, localFile);
        }
      } catch (error) {
        console.log(`Skipping ${file} due to error: ${error}`);
      }
    }
  });

  // Check for changes in package.json
  const packageJson = path.join(__dirname, "package.json");
  const submodulePackageJson = path.join(__dirname, "themes/abridge/package.json");

  const packageJsonContent = fs.readFileSync(packageJson, "utf-8");
  const submodulePackageJsonContent = fs.readFileSync(submodulePackageJson, "utf-8");

  // Any dependency-spec change requires reinstalling dependencies before the build.
  // Parse JSON instead of scraping package.json with regexes so scoped names, multiple
  // hyphens, and multi-digit versions are handled correctly.
  const packageDependencies = (content) => {
    const dependencies = JSON.parse(content).dependencies || {};
    return Object.fromEntries(Object.entries(dependencies).sort(([a], [b]) => a.localeCompare(b)));
  };
  const packageDependenciesLocal = packageDependencies(packageJsonContent);
  const packageDependenciesSubmodule = packageDependencies(submodulePackageJsonContent);

  if (packageJsonContent !== submodulePackageJsonContent) {
    console.log("Updating package.json from submodule");
    fs.copyFileSync(submodulePackageJson, packageJson);
  }

  if (JSON.stringify(packageDependenciesLocal) !== JSON.stringify(packageDependenciesSubmodule)) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "warning:",
      "The packages are out of date, please run `npm install` to update them."
    );
    exit(1);
  }

  const configToml = path.join(__dirname, "zola.toml");
  const submoduleConfigToml = path.join(__dirname, "themes/abridge/zola.toml");

  // Compare the configuration schema rather than normalized TOML text.
  // Commented example settings count as known settings, values do not matter,
  // downstream-only settings are allowed, and language tables are intentionally
  // ignored because sites may enable any subset of the example languages.
  const extractTomlSchema = (content) => {
    const keys = new Set();
    let section = "";
    let ignoreSection = false;

    // Split an inline table into top-level comma-separated members without
    // being confused by quoted strings or nested arrays/tables.
    const getInlineTableMembers = (value) => {
      const members = [];
      let token = "";
      let quote = null;
      let escaped = false;
      let depth = 0;

      for (let i = 1; i < value.length; i++) {
        const ch = value[i];

        if (quote) {
          token += ch;
          if (escaped) {
            escaped = false;
          } else if (ch === "\\") {
            escaped = true;
          } else if (ch === quote) {
            quote = null;
          }
          continue;
        }

        if (ch === '"' || ch === "'") {
          quote = ch;
          token += ch;
        } else if (ch === "{" || ch === "[") {
          depth++;
          token += ch;
        } else if (ch === "}" || ch === "]") {
          if (ch === "}" && depth === 0) {
            if (token.trim()) members.push(token.trim());
            break;
          }
          depth--;
          token += ch;
        } else if (ch === "," && depth === 0) {
          if (token.trim()) members.push(token.trim());
          token = "";
        } else {
          token += ch;
        }
      }

      return members;
    };

    for (const rawLine of content.split(/\r?\n/)) {
      let line = rawLine.trim();
      if (!line) continue;

      // Treat commented configuration examples as part of the schema. Prose
      // comments naturally fall through because they are not table/key syntax.
      line = line.replace(/^(?:#\s*)+/, "").trim();
      if (!line) continue;

      const tableMatch = line.match(/^\[\[?\s*([^\]]+?)\s*\]\]?/);
      if (tableMatch) {
        section = tableMatch[1].replace(/\s+/g, "");
        ignoreSection = section === "languages" || section.startsWith("languages.");
        continue;
      }

      if (ignoreSection) continue;

      const keyMatch = line.match(
        /^([A-Za-z0-9_-]+(?:\s*\.\s*[A-Za-z0-9_-]+)*)\s*=\s*(.*)$/
      );
      if (!keyMatch) continue;

      const key = keyMatch[1].replace(/\s+/g, "");
      const fullKey = section ? `${section}.${key}` : key;
      keys.add(fullKey);

      // Inline tables have schema of their own. Record member names so adding
      // a setting inside meta_post/meta_index/etc. is detected as a format change.
      const value = keyMatch[2].trim();
      if (value.startsWith("{")) {
        for (const member of getInlineTableMembers(value)) {
          const memberMatch = member.match(
            /^([A-Za-z0-9_-]+(?:\s*\.\s*[A-Za-z0-9_-]+)*)\s*=/
          );
          if (memberMatch) {
            const memberKey = memberMatch[1].replace(/\s+/g, "");
            keys.add(`${fullKey}.${memberKey}`);
          }
        }
      }
    }

    return keys;
  };

  const configTomlSchema = extractTomlSchema(
    fs.readFileSync(configToml, "utf-8")
  );
  const submoduleConfigTomlSchema = extractTomlSchema(
    fs.readFileSync(submoduleConfigToml, "utf-8")
  );

  // Parent sites may have extra/custom settings. Only warn when the current
  // Abridge reference config contains a non-language setting that the parent
  // zola.toml does not contain at all (active or commented).
  const missingConfigKeys = [...submoduleConfigTomlSchema].filter(
    (key) => !configTomlSchema.has(key)
  );

  if (missingConfigKeys.length > 0) {
    // This should say info: then the message in blue (which works in every terminal)
    console.log(
      "\x1b[34m%s\x1b[0m",
      "info:",
      "The zola.toml file format may have changed, please update it manually."
    );
  }
}
