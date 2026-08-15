// Include immediately after elasticlunr.min.js in the JS bundle.
//
// elasticlunr's UMD assigns window.elasticlunr. Keep a local binding for search.js
// in this same bundle, and expose window.lunr only long enough for optional
// on-demand language packs (lunr.stemmer.support.min.js, lunr.fr.min.js, …).
// Those scripts mutate the same object; after they run we drop the global name.
var elasticlunr = window.elasticlunr;
try { delete window.elasticlunr; } catch (e) {}
window.lunr = elasticlunr;

// head_js loads language scripts with defer, after this bundle. Deferred scripts
// run in document order before DOMContentLoaded, so stemmer/lang packs attach
// first; then we remove the temporary global. Local `elasticlunr` still has
// stemmerSupport / language plugins for search.
document.addEventListener("DOMContentLoaded", function () {
  try { delete window.lunr; } catch (e) {}
});
