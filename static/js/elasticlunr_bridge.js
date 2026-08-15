// Runs inside the IIFE opened by elasticlunr_scope_begin.js, after elasticlunr.min.js.
// Capture the UMD export, drop window.elasticlunr, keep a temporary window.lunr for
// on-demand language packs (stemmer.support, lunr.fr, …), then remove lunr after load.
var elasticlunr = window.elasticlunr;
try { delete window.elasticlunr; } catch (e) {}
window.lunr = elasticlunr;

// Language scripts use defer and run before DOMContentLoaded, in document order.
document.addEventListener("DOMContentLoaded", function () {
  try { delete window.lunr; } catch (e) {}
});
