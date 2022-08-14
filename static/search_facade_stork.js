var baseUrl = document.querySelector("meta[name='base']").getAttribute("content");
if (baseUrl.slice(-1) == "/") {
    baseUrl = baseUrl.slice(0, -1);
}
var sha256='68af89cfa05d9c51e17c945e6618c3a4774d1fac04f5e7cb64cbad320434df6b';
var sha384='Ajv5IIpSqbhU7cpXEKLoVY5X8Tgp5xoOE36zyqjRgK5uyw6d9X5b05K7l4pMsZG0';
function loadSearchNow() {
    var loadSearch = document.createElement('script');
    loadSearch.src = baseUrl + '/search_bundle_stork.min.js?h=' + sha256;
    loadSearch.setAttribute('integrity', 'sha384-' + sha384);
    loadSearch.setAttribute('type', 'module');
    document.head.appendChild(loadSearch);
    document.getElementById('searchinput').onclick = '';
}
window.onload = function() {
    document.getElementById('searchinput').onclick = function() { return loadSearchNow() }
};
