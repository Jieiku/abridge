var baseUrl = document.querySelector("meta[name='base']").getAttribute("content");
if (baseUrl.slice(-1) == "/") {
    baseUrl = baseUrl.slice(0, -1);
}
var sha256='6207e0e054d79360bf9ba96c57c29cd0fc74dad470108d2967ab5f4a8059be6e';
var sha384='v7zeE9S7EtbyaWph0D+9ntMWbjg4318Of0zydaSQWel5E7MtOYLQH4JcTHtm9w3C';
function loadSearchNow() {
    var loadSearch = document.createElement('script');
    loadSearch.src = baseUrl + '/search_bundle_tinysearch.min.js?h=' + sha256;
    loadSearch.setAttribute('integrity', 'sha384-' + sha384);
    loadSearch.setAttribute('type', 'module');
    document.head.appendChild(loadSearch);
    document.getElementById('searchinput').onclick = '';
}
window.onload = function() {
    document.getElementById('searchinput').onclick = function() { return loadSearchNow() }
};
