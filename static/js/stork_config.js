function loadStork() {
    var baseUrl = document.querySelector("meta[name='base']").getAttribute("content");
    if (baseUrl.slice(-1) == "/") {
        baseUrl = baseUrl.slice(0, -1);
    }
    stork.initialize(baseUrl + "/stork.wasm").then(() => {
        console.log("Finished downloading WASM");
    })
    .catch(e => {
        console.error(e);
    }); // download WASM
    stork.register("stork",baseUrl + "/stork.st");
}
var loaded = false;
window.onload = function() {
    document.body.contains(document.goSearch) && (document.goSearch.onsubmit = function() { return goSearchNow() })
    document.getElementById('searchinput').onfocus = function() {
        if (!loaded) {
            loadStork();
            loaded = true;
            document.body.contains(document.goSearch) && (document.goSearch.onsubmit = function() { return goSearchNow() })
        }
        document.getElementById('searchinput').onfocus = '';
    }
};
