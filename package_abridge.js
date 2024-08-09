const fs = require('fs');
const path = require("path");
const TOML = require('fast-toml');
const UglifyJS = require('uglify-js');
const jsonminify = require("jsonminify");
const util  = require("util");
const { exec } = require("child_process");
const { exit } = require('process');
const execPromise = util.promisify(exec);

if (!(fs.existsSync('config.toml'))) {
  throw new Error('ERROR: cannot find config.toml!');
}
const tomlString = String(fs.readFileSync('config.toml'));
const data = TOML.parse(tomlString);
const js_prestyle = data.extra.js_prestyle;
const js_switcher = data.extra.js_switcher;
const js_email_encode = data.extra.js_email_encode;
const js_copycode = data.extra.js_copycode;
const search_library = data.extra.search_library;
const index_format = data.search.index_format;
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

// This is used to pass arguments to zola via npm, for example:
// npm run abridge -- "--base-url https://abridge.pages.dev"
var args = process.argv[2] ? ' '+process.argv[2] : '';

// check if abridge is used directly or as a theme.
bpath = '';
if (fs.existsSync('./themes')) {
  bpath = 'themes/abridge/';
}

async function execWrapper(cmd) {
  const { stdout, stderr } = await execPromise(cmd);
  if (stdout) {
    console.log(stdout);
  }
  if (stderr) {
    console.log('ERROR: '+stderr);
  }
}

async function abridge() {
  await sync();
  const { replaceInFileSync } = await import('replace-in-file');
  if (search_library === 'offline') {
    replaceInFileSync({files: 'config.toml', from: /index_format.*=.*/g, to: "index_format = \"elasticlunr_javascript\""});
    //replaceInFileSync({files: 'config.toml', from: /base_url.*=.*/g, to: "base_url = \""+__dirname+"\/public\""});
    args = args + " -u \""+__dirname+"\/public\""
  } else if (search_library === 'elasticlunrjava') {
    replaceInFileSync({files: 'config.toml', from: /index_format.*=.*/g, to: "index_format = \"elasticlunr_javascript\""});
  } else if (search_library === 'elasticlunr') {
    replaceInFileSync({files: 'config.toml', from: /index_format.*=.*/g, to: "index_format = \"elasticlunr_json\""});
  } else if (search_library === 'pagefind') {
    replaceInFileSync({files: 'config.toml', from: /index_format.*=.*/g, to: "index_format = \"fuse_json\""});
  } else if (search_library === 'tinysearch') {
    replaceInFileSync({files: 'config.toml', from: /index_format.*=.*/g, to: "index_format = \"fuse_json\""});
  }

  console.log('Zola Build to generate files for minification:');
  await execWrapper('zola build'+args);

  //check that static/js exists, do this after zola build, it will handle creating static if missing.
  var jsdir = 'static/js';
  try {
    fs.mkdirSync(jsdir);
  } catch(e) {
    if (e.code != 'EEXIST') throw e;
  }

  base_url = data.base_url;
  if (base_url.slice(-1) == "/") {
      base_url = base_url.slice(0, -1);
  }

  if (search_library === 'pagefind') {
    // Run the pagefind script to generate the index files.
    // Has to happen at start otherwise, it happens too late asyncronously.
    const createIndex = require('./static/js/pagefind.index.cjs'); // run the pagefind index.js script
    await createIndex(); // makes program wait for pagefind build execution
  } else {
    _rmRegex(path.join(bpath, "static/js/"),/^wasm.*pagefind$/);
    _rmRegex(path.join(bpath, "static/js/"),/^pagefind.*pf_meta$/);
    _rmRegex(path.join(bpath, "static/js/"),/^pagefind-entry\.json$/);
    _rmRecursive(path.join(bpath, "static/js/index"));
    _rmRecursive(path.join(bpath, "static/js/fragment"));
  }

  // cleanup
  _rmRegex(path.join(bpath, "static/js/"),/^pagefind\.js$/);//pagefind temporary intermediate files
  _rmRegex(path.join(bpath, "static/js/"),/^pagefind-.*\.js$/);//pagefind temporary intermediate files
  _rmRegex(path.join(bpath, "static/js/"),/^pagefind-.*\.css$/);//pagefind temporary intermediate files


  if (pwa) {// Update pwa settings, file list, and hashes.
    if (typeof pwa_VER !== 'undefined' && typeof pwa_NORM_TTL !== 'undefined' && typeof pwa_LONG_TTL !== 'undefined' && typeof pwa_TTL_NORM !== 'undefined' && typeof pwa_TTL_LONG !== 'undefined' && typeof pwa_TTL_EXEMPT !== 'undefined') {
      // update from abridge theme.
      fs.copyFileSync(bpath+'static/sw.js', 'static/sw.js');
      fs.copyFileSync(bpath+'static/js/sw_load.js', 'static/js/sw_load.js');
      // Update settings in PWA javascript file, using options parsed from config.toml.  sw.min.js?v=3.10.0",  "++"
      if (fs.existsSync('static/js/sw_load.js')) {
        sw_load_min = '.js?v=';
        if (js_bundle) {
          sw_load_min = '.min.js?v=';
        }
        replaceInFileSync({files: 'static/js/sw_load.js', from: /sw.*v=.*/g, to: "sw"+sw_load_min+pwa_VER+"\","});
      }
      if (fs.existsSync('static/sw.js')) {
        replaceInFileSync({files: 'static/sw.js', from: /NORM_TTL.*=.*/g, to: "NORM_TTL = "+pwa_NORM_TTL+";"});
        replaceInFileSync({files: 'static/sw.js', from: /LONG_TTL.*=.*/g, to: "LONG_TTL = "+pwa_LONG_TTL+";"});
        replaceInFileSync({files: 'static/sw.js', from: /TTL_NORM.*=.*/g, to: "TTL_NORM = ["+pwa_TTL_NORM+"];"});
        replaceInFileSync({files: 'static/sw.js', from: /TTL_LONG.*=.*/g, to: "TTL_LONG = ["+pwa_TTL_LONG+"];"});
        replaceInFileSync({files: 'static/sw.js', from: /TTL_EXEMPT.*=.*/g, to: "TTL_EXEMPT = ["+pwa_TTL_EXEMPT+"];"});
      }

      if (pwa_cache_all === true) {
        console.log('info: pwa_cache_all = true in config.toml, so caching the entire site.\n');
        // Generate array from the list of files, for the entire site.

        var dir = 'public';
        try {
          fs.mkdirSync(dir);
        } catch(e) {
          if (e.code != 'EEXIST') throw e;
        }
        const path = './public/';
        cache = '';
        files = fs.readdirSync(path, { recursive: true, withFileTypes: false })
        .forEach(
          (file) => {
            // check if is directory, if not then add the path/file
            if (!fs.lstatSync(path+file).isDirectory()) {
              // format output
              item = "/"+file.replace(/index\.html$/i,'');// strip index.html from path
              item = item.replace(/\\/g,'/');// replace backslash with forward slash for Windows
              item = item.replace(/^\/sw(\.min)?\.js/i,'');// dont cache service worker
              item = item.replace(/^\/_headers/i,'');// dont cache the cloudflare _headers file

              // if formatted output is not empty line then append it to cache var
              if (item != '') {// skip empty lines
                cache = cache+"'"+item+"',";
              }
            }
          }
        );
        cache = cache.slice(0, -1)// remove the last comma
      } else if (pwa_BASE_CACHE_FILES) {
        cache = pwa_BASE_CACHE_FILES;
      }

      cache = cache.split(",").sort().join(",")//sort the cache list, this should help keep the commit history cleaner.
      cache = 'this.BASE_CACHE_FILES = ['+cache+'];';
      // update the BASE_CACHE_FILES variable in the sw.js service worker file
      results = replaceInFileSync({
        files: 'static/sw.js',
        from: /this\.BASE_CACHE_FILES =.*/g,
        to: cache,
        countMatches: true,
      });
    } else {
      throw new Error('ERROR: pwa requires that pwa_VER, pwa_NORM_TTL, pwa_LONG_TTL, pwa_TTL_NORM, pwa_TTL_LONG, pwa_TTL_EXEMPT are set in config.toml.');
    }
  }

  if (bpath === '') {// abridge used directly
    _headersWASM();
    // These are truely static js files, so they should only need to be updated by the abridge maintainer or contributors.
    minify(['static/js/theme.js']);
    minify(['static/js/theme_light.js']);
    // Something went wrong with minifying katexbundle, so commenting this out for now
    // minify(['static/js/katex.min.js','static/js/mathtex-script-type.min.js','static/js/katex-auto-render.min.js','static/js/katexoptions.js'],'static/js/katexbundle.min.js');
    minify(['static/js/elasticlunr.min.js','static/js/search.js'],'static/js/search_elasticlunr.min.js');
    minify(['static/js/tinysearch.js'],'static/js/search_tinysearch.min.js');
    minify(['static/js/prestyle.js','static/js/theme_button.js','static/js/email.js','static/js/codecopy.js','static/js/sw_load.js'],'static/js/abridge_nosearch.min.js');
    minify(['static/js/prestyle.js','static/js/theme_button.js','static/js/email.js','static/js/codecopy.js'],'static/js/abridge_nosearch_nopwa.min.js');
    minify(['static/js/sw_load.js']);
    minify(['static/sw.js']);
  } else if (pwa) {
    minify(['static/js/sw_load.js']);
    minify(['static/sw.js']);
  }

  // if manifest.json is present, then minify it.
  if (fs.existsSync('static/manifest.json')) {
    let out;
    try {
      out = JSON.minify(fs.readFileSync('static/manifest.json', {encoding:"utf-8"}));
    } catch(err) {
      console.log(err);
    }
    fs.writeFileSync('static/manifest.min.json', out);
  }

  abridge_bundle = bundle(bpath,js_prestyle,js_switcher,js_email_encode,js_copycode,search_library,index_format,uglyurls,false);
  minify(abridge_bundle,'static/js/abridge_nopwa.min.js');

  abridge_bundle = bundle(bpath,js_prestyle,js_switcher,js_email_encode,js_copycode,search_library,index_format,uglyurls,pwa);
  minify(abridge_bundle,'static/js/abridge.min.js');

  // cleanup
  _rmRegex(path.join(bpath, "static/js/"),/^pagefind_search\.js$/);//pagefind intermediate file that is now in bundle.

  console.log('Zola Build to generate new integrity hashes for the previously minified files:');
  await execWrapper('zola build'+args);
}

async function _headersWASM() {
  // running WASM in the browser requires wasm-unsafe-eval if using Content-Security-Policy:
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_webassembly_execution
  // This function adds wasm-unsafe-eval to the pagefind and tinysearch demos without adding it to the elasticlunr demo.
  const { replaceInFileSync } = await import('replace-in-file');
  if (search_library === 'pagefind') {
    replaceInFileSync({files: 'static/_headers', from: /script-src 'self'/g, to: "script-src 'wasm-unsafe-eval' 'self'"});
  } else if (search_library === 'tinysearch') {
    replaceInFileSync({files: 'static/_headers', from: /script-src 'self'/g, to: "script-src 'wasm-unsafe-eval' 'self'"});
  } else {
    replaceInFileSync({files: 'static/_headers', from: /script-src 'wasm-unsafe-eval' 'self'/g, to: "script-src 'self'"});
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

function _rmRegex(path,regex) {
  try {
    fs.readdirSync(path).filter(f => regex.test(f)).forEach(f => fs.unlinkSync(path + f));
  } catch (error) {
    if (error.code !== 'ENOENT') {// Ignore if does not exist, that is the desired result.
      console.error("An error occurred:", error);
    }
  }
}

function bundle(bpath,js_prestyle,js_switcher,js_email_encode,js_copycode,search_library,index_format,uglyurls,pwa) {
  minify_files = [];

  if (js_prestyle) {
    minify_files.push(bpath+'static/js/prestyle.js');
  }
  if (js_switcher) {
    minify_files.push(bpath+'static/js/theme_button.js');
  }
  if (js_email_encode) {
    minify_files.push(bpath+'static/js/email.js');
  }
  if (js_copycode) {
    minify_files.push(bpath+'static/js/codecopy.js');
  }
  if (search_library) {
      if ((search_library === 'offline' || (search_library === 'elasticlunrjava' && uglyurls === true))) {
        minify_files.push('public/search_index.en.js');
        minify_files.push(bpath+'static/js/elasticlunr.min.js');
        minify_files.push(bpath+'static/js/searchjavaugly.js');
      } else if (search_library === 'elasticlunrjava') {
        minify_files.push('public/search_index.en.js');
        minify_files.push(bpath+'static/js/elasticlunr.min.js');
        minify_files.push(bpath+'static/js/searchjava.js');
      } else if (search_library === 'elasticlunr') {//abridge default
        minify_files.push(bpath+'static/js/elasticlunr.min.js');
        minify_files.push(bpath+'static/js/search.js');
      } else if (search_library === 'pagefind') {
        minify_files.push(bpath+'static/js/pagefind_search.js');
      } else if (search_library === 'tinysearch') {
        minify_files.push(bpath+'static/js/tinysearch.js');
      }
  }
  if (pwa) {
    minify_files.push('static/js/sw_load.js');
  }
  return minify_files;
}

function minify(fileA,outfile) {
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
    outfile = fileA[0].slice(0,-2)+'min.js';
  }
  var filesContents = fileA.map(function (file) {// array input to support multiple files
      return fs.readFileSync(file, 'utf8');
  });

  result = UglifyJS.minify(filesContents, options);
  fs.writeFileSync(outfile, result.code);

}

async function searchChange(searchOption) {
  const { replaceInFileSync } = await import('replace-in-file');
  replaceInFileSync({files: 'config.toml', from: /search_library.*=.*/g, to: 'search_library = \"'+searchOption+'\"'});
}

if (args === ' offline') {
  searchChange('offline');
} else if (args === ' elasticlunrjava') {
  searchChange('elasticlunrjava');
} else if (args === ' elasticlunr') {// Zola default search_library
  // I should not need to do cleanup here as well... but this is what works for now to keep the repo clean.
  _rmRegex(path.join(bpath, "static/js/"),/^wasm.*pagefind$/);
  _rmRegex(path.join(bpath, "static/js/"),/^pagefind.*pf_meta$/);
  _rmRegex(path.join(bpath, "static/js/"),/^pagefind-entry\.json$/);
  _rmRecursive(path.join(bpath, "static/js/index"));
  _rmRecursive(path.join(bpath, "static/js/fragment"));
  searchChange('elasticlunr');
} else if (args === ' pagefind') {
  searchChange('pagefind');
} else if (args === ' tinysearch') {
  searchChange('tinysearch');
} else {
  abridge();
}

async function sync() {
  // Check if the submodule is present, if not skip entire function
  if (!fs.existsSync(path.join(__dirname, "themes/abridge"))) {
    return;
  }

  // Checks for changes from local version in static, package.json and config.toml
  // and if there are changes it sync from the submodule

  // Check for changes in static
  const staticFolder = path.join(__dirname, "static/js");
  const submoduleFolder = path.join(__dirname, "themes/abridge/static/js");

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
  const submodulePackageJson = path.join(
    __dirname,
    "themes/abridge/package.json"
  );

  const packageJsonContent = fs.readFileSync(packageJson, "utf-8");
  const submodulePackageJsonContent = fs.readFileSync(
    submodulePackageJson,
    "utf-8"
  );

  // Check for changes in dependencies - prompting an npm update
  let checkPackageVersion = function (content) {
    let matches = content.match(/"dependencies": \{([^}]+)\}/)[1]; // Look in the dependencies section
    return [...matches.matchAll(/"(\w+-\w+|\w+)": "[^0-9]*([0-9])/g)].map(match => ({ // Extract all packages and their major version number (aka for breaking changes which need an update)
      name: match[1],
      majorVersion: match[2]
    })).sort((a, b) => a.name.localeCompare(b.name));
  };

  if (packageJsonContent !== submodulePackageJsonContent) {
    console.log("Updating package.json from submodule");
    fs.copyFileSync(submodulePackageJson, packageJson);
  }

  const packageVersionLocal = checkPackageVersion(packageJsonContent);
  const packageVersionSubmodule = checkPackageVersion(submodulePackageJsonContent);
  if (JSON.stringify(packageVersionLocal) !== JSON.stringify(packageVersionSubmodule)) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "warning:",
      "The packages are out of date, please run `npm install` to update them."
    );
    exit(1);
  }
  console.log(packageVersionLocal, packageVersionSubmodule);

  const configToml = path.join(__dirname, "config.toml");
  const submoduleConfigToml = path.join(
    __dirname,
    "themes/abridge/config.toml"
  );

  let adjustTomlContent = function (content) {
    content = content.replace(/^\s+|\s+$|\s+(?=\s)/g, ""); // Remove all leading and trailing whitespaces and multiple whitespaces
    content = content.replace(/(^#)(?=\s*\w+\s*=\s*)|[[:blank:]]*#.*$/gm, ""); // A regex to selectively remove all comments, and to uncomment all commented config lines
    content = content.replace(/(\[([^]]*)\])|(\{([^}]*)\})/gs, ""); // A regex to remove all tables and arrays
    content = content.replace(
      /(^#.*$|(["']).*?\2|(?<=\s)#.*$|\btrue\b|\bfalse\b)/gm,
      ""
    ); // A regex to remove all user added content, (so you can tell if the .toml format has changed)
    return content.trim(); // Finally remove any leading or trailing white spaces
  };

  const configTomlContent = adjustTomlContent(
    fs.readFileSync(configToml, "utf-8")
  );
  const submoduleConfigTomlContent = adjustTomlContent(
    fs.readFileSync(submoduleConfigToml, "utf-8")
  );

  if (configTomlContent !== submoduleConfigTomlContent) {
    // This should say info: then the message in blue (which works in every terminal)
    console.log(
      "\x1b[34m%s\x1b[0m",
      "info:",
      "The config.toml file format may have changed, please update it manually."
    );
  }
}
