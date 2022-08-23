window.onload = function() {
    document.getElementById('searchinput').onclick = function() {
        var baseUrl = document.querySelector("meta[name='base']").getAttribute("content");
        if (baseUrl.slice(-1) == "/") {
            baseUrl = baseUrl.slice(0, -1);
        }
        var sha256='07a791ddc469ec9b7e93fa64a81899b6c12bb3143e8bd0d1aee0b6dacc885b7e';
        var sha384='ePgzx2d0I+A6dkB+OTuOp13dsBEsL9f847ocaay/uDpwIyj0DUwOm7sEB01VpEiL';
        var loadSearch = document.createElement('script');
        loadSearch.src = baseUrl + '/search_bundle_stork.min.js?h=' + sha256;
        loadSearch.setAttribute('integrity', 'sha384-' + sha384);
        loadSearch.setAttribute('type', 'module');
        document.head.appendChild(loadSearch);
        document.getElementById('searchinput').onclick = '';
    }
};
