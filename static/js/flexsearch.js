window.onload = function () {
    if (document.body.contains(document.goSearch)) {
        document.goSearch.onsubmit = function () { return goSearchNow() };

        (function () {
            var searchinput = document.getElementById("searchinput");
            var suggestions = document.getElementById("suggestions");
            var latinIndex;
            var cjkIndex;
            var ready = false;

            function isCjk(text) {
                return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/u.test(text);
            }

            function initSearch() {
                if (ready) return;
                if (!window.FlexSearch || !Array.isArray(window.flexsearchData)) return;

                latinIndex = new window.FlexSearch.Index({
                    tokenize: "tolerant",
                    encoder: window.FlexSearch.Charset.Default
                });
                cjkIndex = new window.FlexSearch.Index({
                    tokenize: "strict",
                    encoder: window.FlexSearch.Charset.CJK
                });

                for (var i = 0; i < window.flexsearchData.length; i++) {
                    var doc = window.flexsearchData[i];
                    var text = String(doc.title || "") + " " + String(doc.body || "");
                    latinIndex.add(i, text);
                    cjkIndex.add(i, text);
                }
                ready = true;
            }

            function suggestionFocus(e) {
                if (e.keyCode === 191 && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
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
                if (suggestions.classList.contains('d-none') || focusableSuggestions.length === 0) return;
                const focusable = [...focusableSuggestions];
                const index = focusable.indexOf(document.activeElement);
                let nextIndex = 0;
                if (e.keyCode === 38) {
                    e.preventDefault();
                    nextIndex = index > 0 ? index - 1 : 0;
                    focusableSuggestions[nextIndex].focus();
                } else if (e.keyCode === 40) {
                    e.preventDefault();
                    nextIndex = index + 1 < focusable.length ? index + 1 : index;
                    focusableSuggestions[nextIndex].focus();
                }
            }
            document.addEventListener("keydown", suggestionFocus);
            searchinput.addEventListener("focus", initSearch, { once: true });

            function closeSearchNow() {
                const main = document.querySelector("main");
                main.innerHTML = window.main;
            }

            function goSearchNow() {
                const main = document.querySelector("main");
                if (!window.main) window.main = main.innerHTML;
                var results = document.getElementById("suggestions");
                var ResultsClone = results.cloneNode(true);
                ResultsClone.id = "results";
                var headerDiv = document.createElement("div");
                headerDiv.innerHTML = '<form name="closeSearch"><h2><button type="submit" title="Close Search"><i class="svgs x"></i></button> <i class="svgs search"></i> <span class="search-query"></span></h2></form>';
                headerDiv.querySelector(".search-query").textContent = searchinput.value;
                ResultsClone.insertBefore(headerDiv, ResultsClone.firstChild);
                main.innerHTML = ResultsClone.outerHTML;
                results.innerHTML = "";
                searchinput.value = "";
                document.body.contains(document.closeSearch) && (document.closeSearch.onsubmit = function () { closeSearchNow() });
                return false;
            }

            function closeAllLists() {
                while (suggestions.firstChild) suggestions.removeChild(suggestions.firstChild);
            }

            function markTerm(target, input, term) {
                target.textContent = "";
                var text = String(input || "");
                var needle = String(term || "").trim();
                if (!needle) { target.textContent = text; return; }
                var lowerText = text.toLowerCase();
                var lowerNeedle = needle.toLowerCase();
                var start = 0, match;
                while ((match = lowerText.indexOf(lowerNeedle, start)) !== -1) {
                    target.appendChild(document.createTextNode(text.slice(start, match)));
                    var mark = document.createElement("mark");
                    mark.textContent = text.slice(match, match + needle.length);
                    target.appendChild(mark);
                    start = match + needle.length;
                }
                target.appendChild(document.createTextNode(text.slice(start)));
            }

            function excerpt(doc, query) {
                var source = String(doc.description || doc.body || "").replace(/\s+/g, " ").trim();
                if (source.length <= 220) return source;
                var q = String(query || "").toLowerCase();
                var pos = source.toLowerCase().indexOf(q);
                if (pos < 0) return source.slice(0, 217) + "...";
                var start = Math.max(0, pos - 80);
                var end = Math.min(source.length, start + 220);
                return (start ? "..." : "") + source.slice(start, end) + (end < source.length ? "..." : "");
            }

            function showResults() {
                var value = this.value.trim();
                closeAllLists();
                if (!value) return false;
                initSearch();
                if (!ready) return false;

                var index = isCjk(value) ? cjkIndex : latinIndex;
                var ids = index.search(value, { limit: 99, suggest: true });
                suggestions.classList.remove('d-none');

                for (var i = 0; i < ids.length; i++) {
                    var doc = window.flexsearchData[ids[i]];
                    if (!doc) continue;
                    var entry = document.createElement('div');
                    entry.innerHTML = '<a href><span></span><span></span></a>';
                    var a = entry.querySelector('a'),
                        t = entry.querySelector('span:first-child'),
                        d = entry.querySelector('span:nth-child(2)');
                    var baseMeta = document.querySelector('meta[name="base"]');
                    var portableBase = baseMeta ? baseMeta.getAttribute("content") : "";
                    a.href = portableBase && !/^[a-z][a-z0-9+.-]*:/i.test(portableBase)
                        ? portableBase + doc.url
                        : doc.url;
                    markTerm(t, doc.title, value);
                    markTerm(d, excerpt(doc, value), value);
                    suggestions.appendChild(entry);
                }
            }

            searchinput.addEventListener("input", showResults);
            document.addEventListener("click", function (e) {
                if (e.target !== searchinput) closeAllLists();
            });
            window.goSearchNow = goSearchNow;
        })();
    }
};
