var sha256='b00061ff14234bb637b048af272163401458e658b12d3a7d440fff38f54d309c';
var sha384='S1U+nC05HTi/o4S13KbBlxk4d4/HoWRXeZmGy8QPTLs1SM5QjdDaxUsyBEvG850D';
function loadSearchNow() {
    var loadSearch = document.createElement('script');
    loadSearch.src = '/search_bundle.min.js?h=' + sha256;
    loadSearch.setAttribute('integrity', 'sha384-' + sha384);
    document.head.appendChild(loadSearch);
    document.getElementById('userinput').onclick = '';
}
window.onload = function() {
    document.getElementById('userinput').onclick = function() { return loadSearchNow() }
};