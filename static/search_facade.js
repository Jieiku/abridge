function loadSearchNow() {
    var loadSearch = document.createElement('script');
    loadSearch.setAttribute('src', '/search_bundle.min.js');
    document.head.appendChild(loadSearch);
    document.getElementById('userinput').onclick = '';
}
window.onload = function() {
    document.getElementById('userinput').onclick = function() { return loadSearchNow() }
};