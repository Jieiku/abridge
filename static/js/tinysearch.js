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
                var headerContent = '<form name="closeSearch"><h2><button type="submit" title="Close Search"><i class="svgs x"></i></button> <i class="svgs search"></i> <span class="search-query"></span></h2></form>';
                headerDiv.innerHTML = headerContent;
            headerDiv.querySelector(".search-query").textContent = document.getElementById("searchinput").value;
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

            function markTerm(target, input, term) {
                target.textContent = "";
                var text = String(input || "");
                var needle = String(term || "");
                if (!needle) {
                    target.textContent = text;
                    return;
                }
                var lowerText = text.toLowerCase();
                var lowerNeedle = needle.toLowerCase();
                var start = 0;
                var match;
                while ((match = lowerText.indexOf(lowerNeedle, start)) !== -1) {
                    target.appendChild(document.createTextNode(text.slice(start, match)));
                    var mark = document.createElement("mark");
                    mark.textContent = text.slice(match, match + needle.length);
                    target.appendChild(mark);
                    start = match + needle.length;
                }
                target.appendChild(document.createTextNode(text.slice(start)));
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
                        t.textContent = title || "";
                        markTerm(d, meta || "", val);

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
            var queryPtr = 0;
            var queryCapacity = 0;
            var textEncoder = new TextEncoder();
            var textDecoder = new TextDecoder("utf-8");

            function reserveQueryMemory() {
                // Tinysearch's dependency-free WASM API does not export an allocator
                // for query strings. Reserve one private page at the end of linear
                // memory and reuse it for every query. memory.grow() returns the old
                // page count, which gives us the start address of the new page.
                var oldPages = memory.grow(1);
                queryPtr = oldPages * 65536;
                queryCapacity = 65536;
            }

            function stringToWasmPtr(str) {
                var bytes = textEncoder.encode(str);
                if (bytes.length > queryCapacity) {
                    throw new Error("Search query is too long");
                }
                new Uint8Array(memory.buffer, queryPtr, bytes.length).set(bytes);
                return { ptr: queryPtr, length: bytes.length };
            }

            function wasmPtrToString(ptr) {
                if (!ptr) return null;
                var memoryArray = new Uint8Array(memory.buffer);
                var length = 0;
                while (memoryArray[ptr + length] !== 0) {
                    length++;
                    if (ptr + length >= memoryArray.length || length > 10 * 1024 * 1024) {
                        throw new Error("Invalid Tinysearch result string");
                    }
                }
                return textDecoder.decode(memoryArray.subarray(ptr, ptr + length));
            }

            function doSearch(query, limit) {
                if (!wasmReady || !query) return [];
                limit = limit || 10;
                var resultPtr = 0;
                try {
                    var queryAllocation = stringToWasmPtr(query);
                    resultPtr = searchFunction(queryAllocation.ptr, queryAllocation.length);
                    if (!resultPtr) return [];

                    var resultString = wasmPtrToString(resultPtr);
                    if (!resultString) return [];
                    var results = JSON.parse(resultString);
                    return Array.isArray(results) ? results.slice(0, limit) : [];
                } catch (err) {
                    console.error("tinysearch error:", err);
                    return [];
                } finally {
                    if (resultPtr) {
                        freeFunction(resultPtr);
                    }
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
                reserveQueryMemory();
                wasmReady = true;
            }

            autocomplete(document.getElementById("searchinput"));
            document.goSearch.onsubmit = function () { return goSearchNow() };
        }());
    }
};
