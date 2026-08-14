window.onload = function () {
    if (document.body.contains(document.goSearch)) {
        document.goSearch.onsubmit = function () { return goSearchNow() };

        (function () {
            var searchinput = document.getElementById("searchinput");
            var suggestions = document.getElementById("suggestions");

            function getBaseUrl() {
                var baseUrl = document.querySelector("meta[name='base']").getAttribute("content");
                if (baseUrl && baseUrl.slice(-1) == "/") {
                    baseUrl = baseUrl.slice(0, -1);
                }
                return baseUrl || "";
            }

            // Permalinks in the WASM index were baked at build time (zola base_url).
            // Rewrite to the live site from <meta name="base"> so links match the current host.
            function resolveResultUrl(url) {
                if (!url) return url;
                var baseUrl = getBaseUrl();
                if (!baseUrl) return url;
                try {
                    if (url.charAt(0) === "/") {
                        return baseUrl + url;
                    }
                    var parsed = new URL(url, baseUrl);
                    var base = new URL(baseUrl);
                    return base.origin + parsed.pathname + parsed.search + parsed.hash;
                } catch (e) {
                    return url;
                }
            }

            function suggestionFocus(e) {
                if (e.keyCode === 191
                    && document.activeElement.tagName !== "INPUT"
                    && document.activeElement.tagName !== "TEXTAREA") {
                    e.preventDefault();
                    searchinput.focus();
                    suggestions.classList.remove('d-none');
                }

                if (e.keyCode === 27) {
                    searchinput.blur();
                    suggestions.classList.add('d-none');
                    closeAllLists();
                }

                const focusableSuggestions = suggestions.querySelectorAll('a');
                if (suggestions.classList.contains('d-none')
                    || focusableSuggestions.length === 0) {
                    return;
                }
                const focusable = [...focusableSuggestions];
                const index = focusable.indexOf(document.activeElement);

                let nextIndex = 0;

                if (e.keyCode === 38) {
                    e.preventDefault();
                    nextIndex = index > 0 ? index - 1 : 0;
                    focusableSuggestions[nextIndex].focus();
                }
                else if (e.keyCode === 40) {
                    e.preventDefault();
                    nextIndex = index + 1 < focusable.length ? index + 1 : index;
                    focusableSuggestions[nextIndex].focus();
                }
            }
            document.addEventListener("keydown", suggestionFocus);

            var loaded = false;
            document.getElementById('searchinput').onfocus = function () {
                if (!loaded) {
                    lazyLoad();
                    loaded = true;
                }
                document.getElementById('searchinput').onfocus = '';
            };

            async function lazyLoad() {
                // Post-0.9 tinysearch (no wasm-pack): tinysearch_engine.wasm
                await initWasm(getBaseUrl() + "/tinysearch_engine.wasm");
            }

            function closeSearchNow() {
                const main = document.querySelector("main");
                main.innerHTML = window.main;
            }

            function goSearchNow() {
                const main = document.querySelector("main");
                if (!window.main) {
                    window.main = main.innerHTML;
                }
                var results = document.getElementById("suggestions");

                var ResultsClone = results.cloneNode(true);
                ResultsClone.id = "results";

                var headerDiv = document.createElement("div");
                var headerContent = '<form name="closeSearch"><h2><button type="submit" title="Close Search"><i class="svgs x"></i></button> <i class="svgs search"></i> '.concat(document.getElementById("searchinput").value, "</h2></form>");
                headerDiv.innerHTML = headerContent;
                ResultsClone.insertBefore(headerDiv, ResultsClone.firstChild);

                main.innerHTML = ResultsClone.outerHTML;
                results.innerHTML = "";
                document.getElementById("searchinput").value = "";
                document.body.contains(document.closeSearch) && (document.closeSearch.onsubmit = function () { closeSearchNow() });
                return false;
            }

            function closeAllLists(elmnt) {
                while (suggestions.firstChild) {
                    suggestions.removeChild(suggestions.firstChild);
                }
            }

            function markTerm(input, term) {
                if (!input) return "";
                return String(input).replace(new RegExp('(^|)(' + term + ')(|$)', 'ig'), '$1<mark>$2</mark>$3');
            }

            function unwrapMeta(meta) {
                if (!meta) return "";
                if (typeof meta === "string" && meta.charAt(0) === "{") {
                    try {
                        var m = JSON.parse(meta);
                        return m.meta || m.description || Object.values(m)[0] || "";
                    } catch (e) {
                        return meta;
                    }
                }
                return meta;
            }

            function autocomplete(inp) {
                inp.addEventListener("input", function (e) {
                    var entry, i, val = this.value;

                    closeAllLists();
                    if (!val) {
                        return false;
                    }
                    if (!wasmReady) {
                        return false;
                    }

                    let arr = doSearch(val, 99);

                    for (i = 0; i < arr.length; i++) {
                        let elem = arr[i];
                        var title, url, meta;
                        if (Array.isArray(elem)) {
                            title = elem[0];
                            url = elem[1];
                            meta = elem[2];
                        } else {
                            title = elem.title;
                            url = elem.url;
                            meta = unwrapMeta(elem.meta || elem.description || "");
                        }

                        entry = document.createElement("DIV");
                        entry.innerHTML = '<a href><span></span><span></span></a>';
                        var a = entry.querySelector('a'),
                            t = entry.querySelector('span:first-child'),
                            d = entry.querySelector('span:nth-child(2)');
                        var resolved = resolveResultUrl(url);
                        a.href = resolved + (resolved.indexOf('?') >= 0 ? '&' : '?') + 'q=' + encodeURIComponent(val);
                        t.innerHTML = title || "";
                        d.innerHTML = markTerm(meta || "", val);

                        suggestions.appendChild(entry);
                    }
                });
            }

            // ---- New tinysearch WASM API (vanilla cargo build, no wasm-pack) ----
            var wasmModule = null;
            var memory = null;
            var searchFunction = null;
            var freeFunction = null;
            var wasmReady = false;
            var textEncoder = new TextEncoder();
            var textDecoder = new TextDecoder("utf-8");

            function stringToWasmPtr(str) {
                var bytes = textEncoder.encode(str + "\0");
                var ptr = 0;
                if (wasmModule.exports.__wbindgen_malloc) {
                    ptr = wasmModule.exports.__wbindgen_malloc(bytes.length);
                }
                if (!ptr) {
                    ptr = 1024;
                }
                new Uint8Array(memory.buffer, ptr, bytes.length).set(bytes);
                return ptr;
            }

            function wasmPtrToString(ptr) {
                if (!ptr) return null;
                var memoryArray = new Uint8Array(memory.buffer);
                var length = 0;
                while (memoryArray[ptr + length] !== 0) {
                    length++;
                    if (length > 10 * 1024 * 1024) break;
                }
                return textDecoder.decode(memoryArray.subarray(ptr, ptr + length));
            }

            function doSearch(query, limit) {
                if (!wasmReady || !query) return [];
                limit = limit || 10;
                try {
                    var queryPtr = stringToWasmPtr(query);
                    var resultPtr = searchFunction(queryPtr, limit);

                    if (wasmModule.exports.__wbindgen_free && queryPtr > 1024) {
                        wasmModule.exports.__wbindgen_free(queryPtr, query.length + 1);
                    }

                    if (!resultPtr) return [];

                    var resultString = wasmPtrToString(resultPtr);
                    freeFunction(resultPtr);

                    if (!resultString) return [];
                    var results = JSON.parse(resultString);
                    return Array.isArray(results) ? results : [];
                } catch (err) {
                    console.error("tinysearch error:", err);
                    return [];
                }
            }

            async function initWasm(url) {
                var response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch WASM: " + response.status + " " + response.statusText + " (" + url + ")");
                }
                var wasmBytes = await response.arrayBuffer();
                var module = await WebAssembly.instantiate(wasmBytes);
                wasmModule = module.instance;
                memory = wasmModule.exports.memory;
                searchFunction = wasmModule.exports.search;
                freeFunction = wasmModule.exports.free_search_result;

                if (!searchFunction || !freeFunction || !memory) {
                    throw new Error("Required WASM exports not found (need search, free_search_result, memory)");
                }
                wasmReady = true;
            }

            autocomplete(document.getElementById("searchinput"));
            document.goSearch.onsubmit = function () { return goSearchNow() };
        }());
    }
};
