window.onload = function() {
    document.getElementById('searchinput').onclick = function() {
        var baseUrl = document.querySelector("meta[name='base']").getAttribute("content");
        if (baseUrl.slice(-1) == "/") {
            baseUrl = baseUrl.slice(0, -1);
        }
        var sha256='1532d7e7d8292eec3ae8364d3d76029049533141d0674e4a02b1a17986e5f8ef';
        var sha384='POHXtCCwUbHtLT1Hn4+cEysiGJyU7RbnIQKfucRPc9gAquQsFc6j4Zca1HoWo+GS';
        var loadSearch = document.createElement('script');
        loadSearch.src = baseUrl + '/search_bundle_tinysearch.min.js?h=' + sha256;
        loadSearch.setAttribute('integrity', 'sha384-' + sha384);
        loadSearch.setAttribute('type', 'module');
        document.head.appendChild(loadSearch);
        document.getElementById('searchinput').onclick = '';
    }
};
