const fs = require('fs');
const path = require("path");
const TOML = require('fast-toml');
const UglifyJS = require('uglify-js');
const jsonminify = require("jsonminify");
const replace = require('replace-in-file');
const util  = require("util");
const { exec } = require("child_process");
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
const offline = data.extra.offline;
const online_url = data.extra.online_url;
const online_indexformat = data.extra.online_indexformat;
const pwa = data.extra.pwa;
const pwa_VER = data.extra.pwa_VER;
const pwa_NORM_TTL = data.extra.pwa_NORM_TTL;
const pwa_LONG_TTL = data.extra.pwa_LONG_TTL;
const pwa_TTL_NORM = data.extra.pwa_TTL_NORM;
const pwa_TTL_LONG = data.extra.pwa_TTL_LONG;
const pwa_TTL_EXEMPT = data.extra.pwa_TTL_EXEMPT;
const pwa_cache_all = data.extra.pwa_cache_all;
const pwa_BASE_CACHE_FILES = data.extra.pwa_BASE_CACHE_FILES;

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
  if (offline === false) {
    if (typeof online_url !== 'undefined' && typeof online_indexformat !== 'undefined') {
      replace.sync({files: 'config.toml', from: /base_url.*=.*/g, to: "base_url = \""+online_url+"\""});
      replace.sync({files: 'config.toml', from: /index_format.*=.*/g, to: "index_format = \""+online_indexformat+"\""});
    }
  } else if (offline === true) {
    if (typeof online_url !== 'undefined' && typeof online_indexformat !== 'undefined') {
      replace.sync({files: 'config.toml', from: /base_url.*=.*/g, to: "base_url = \""+__dirname+"\/public\""});
      replace.sync({files: 'config.toml', from: /index_format.*=.*/g, to: "index_format = \"elasticlunr_javascript\""});
    } else {
      throw new Error('ERROR: offline = true requires that online_url and online_indexformat are set in config.toml, so that the base_url and index_format can be restored if offline is later set to false.');
    }
  }

  console.log('Zola Build to generate files for minification:');
  await execWrapper('zola build');

  //check that static/js exists, do this after zola build, it will handle creating static if missing.
  var jsdir = 'static/js';
  try {
    fs.mkdirSync(jsdir);
  } catch(e) {
    if (e.code != 'EEXIST') throw e;
  }

  // check if abridge is used directly or as a theme.
  bpath = '';
  if (fs.existsSync('./themes')) {
    bpath = 'themes/abridge/';
  }

  base_url = data.base_url;
  if (base_url.slice(-1) == "/") {
      base_url = base_url.slice(0, -1);
  }

  if (search_library === 'elasticlunr') {
    if (fs.existsSync('content/static/stork_toml.md')) {
      replace.sync({files: 'content/static/stork_toml.md', from: /draft.*=.*/g, to: "draft = true"});
    }
    if (fs.existsSync('content/static/tinysearch_json.md')) {
      replace.sync({files: 'content/static/tinysearch_json.md', from: /draft.*=.*/g, to: "draft = true"});
    }
  } else if (search_library === 'tinysearch') {
    if (!fs.existsSync('content/static/tinysearch_json.md')) {// 'content/static/tinysearch_json.md' file is missing, copy from abridge theme.
      fs.copyFileSync(bpath+'content/static/tinysearch_json.md', 'content/static/tinysearch_json.md',fs.constants.COPYFILE_EXCL);
    }
    if (fs.existsSync('content/static/stork_toml.md')) {
      replace.sync({files: 'content/static/stork_toml.md', from: /draft.*=.*/g, to: "draft = true"});
    }
    if (fs.existsSync('content/static/tinysearch_json.md')) {
      replace.sync({files: 'content/static/tinysearch_json.md', from: /draft.*=.*/g, to: "draft = false"});
    }
    // zola build && mkdir -p tmp && tinysearch --optimize --path tmp public/data_tinysearch/index.html && rsync -avz tmp/*.wasm static/ && rm -rf tmp
  } else if (search_library === 'stork') {

    if (!fs.existsSync('content/static/stork_toml.md')) {// 'content/static/stork_toml.md' file is missing, copy from abridge theme.
      fs.copyFileSync(bpath+'content/static/stork_toml.md', 'content/static/stork_toml.md',fs.constants.COPYFILE_EXCL);
    }
    if (fs.existsSync('content/static/stork_toml.md')) {
      replace.sync({files: 'content/static/stork_toml.md', from: /draft.*=.*/g, to: "draft = false"});
    }
    if (fs.existsSync('content/static/tinysearch_json.md')) {
      replace.sync({files: 'content/static/tinysearch_json.md', from: /draft.*=.*/g, to: "draft = true"});
    }
    // zola build && stork build --input public/data_stork/index.html --output static/stork.st
  }

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
        replace.sync({files: 'static/js/sw_load.js', from: /sw.*v=.*/g, to: "sw"+sw_load_min+pwa_VER+"\","});
      }
      if (fs.existsSync('static/sw.js')) {
        replace.sync({files: 'static/sw.js', from: /NORM_TTL.*=.*/g, to: "NORM_TTL = "+pwa_NORM_TTL+";"});
        replace.sync({files: 'static/sw.js', from: /LONG_TTL.*=.*/g, to: "LONG_TTL = "+pwa_LONG_TTL+";"});
        replace.sync({files: 'static/sw.js', from: /TTL_NORM.*=.*/g, to: "TTL_NORM = ["+pwa_TTL_NORM+"];"});
        replace.sync({files: 'static/sw.js', from: /TTL_LONG.*=.*/g, to: "TTL_LONG = ["+pwa_TTL_LONG+"];"});
        replace.sync({files: 'static/sw.js', from: /TTL_EXEMPT.*=.*/g, to: "TTL_EXEMPT = ["+pwa_TTL_EXEMPT+"];"});
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
        cache = 'this.BASE_CACHE_FILES = [';
        files = fs.readdirSync(path, { recursive: true, withFileTypes: false })
        .forEach(
          (file) => {
            // check if is directory, if not then add the path/file
            if (!fs.lstatSync(path+file).isDirectory()) {
              // format output
              item = "/"+file.replace(/index\.html$/i,'');// strip index.html from path
              item = item.replace(/^\/sw(\.min)?\.js/i,'');// dont cache service worker

              // if formatted output is not empty line then append it to cache var
              if (item != '') {// skip empty lines
                cache = cache+"'"+item+"',";
              }
            }
          }
        );
        cache = cache.slice(0, -1)+'];'// remove the last comma and close the array
      } else if (pwa_BASE_CACHE_FILES) {
        cache = 'this.BASE_CACHE_FILES = ['+pwa_BASE_CACHE_FILES+'];';
      }

      // update the BASE_CACHE_FILES variable in the sw.js service worker file
      results = replace.sync({
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
    // These are truely static js files, so they should only need to be updated by abridge maintainer or contributors.
    minify(['static/js/theme.js']);
    minify(['static/js/theme_light.js']);
    minify(['static/js/katex.min.js','static/js/mathtex-script-type.min.js','static/js/katex-auto-render.min.js','static/js/katexoptions.js'],'static/js/katexbundle.min.js');
    minify(['static/js/elasticlunr.min.js','static/js/search.js'],'static/js/search_elasticlunr.min.js');
    minify(['static/js/stork.js','static/js/stork_config.js'],'static/js/search_stork.min.js');
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

  console.log('Zola Build to generate new integrity hashes for the previously minified files:');
  await execWrapper('zola build');
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
      if ((search_library === 'elasticlunr' && offline === true) || (search_library === 'elasticlunr' && index_format === 'elasticlunr_javascript' && uglyurls === true)) {
        minify_files.push('public/search_index.en.js');
        minify_files.push(bpath+'static/js/elasticlunr.min.js');
        minify_files.push(bpath+'static/js/searchjavaugly.js');
      } else if (search_library === 'elasticlunr' && index_format === 'elasticlunr_javascript') {
        minify_files.push('public/search_index.en.js');
        minify_files.push(bpath+'static/js/elasticlunr.min.js');
        minify_files.push(bpath+'static/js/searchjava.js');
      } else if (search_library === 'elasticlunr') {//abridge default
        minify_files.push(bpath+'static/js/elasticlunr.min.js');
        minify_files.push(bpath+'static/js/search.js');
      } else if (search_library === 'stork') {
        minify_files.push(bpath+'static/js/stork.js');
        minify_files.push(bpath+'static/js/stork_config.js');
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

abridge();
