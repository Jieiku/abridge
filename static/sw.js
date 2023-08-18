class Pwa {

    constructor(self) {
        this.scope = self;
        const Version = new URL(location).searchParams.get("v");
        this.CACHE_VERSION = Version;
// zola is unable to template js files, if it could then we could probably automate what to include here.
// I wanted to demonstrate that the entire site can be made available offline as a PWA, so I used the following linux command to generate the list of files to include:
// zola build && find public -type f | sed 's/^public//' | sed 's/^\/sw\..*//' | sed 's/.*sw_load.*//' | sed 's/index.html//' | sed 's/.*stork.*//' | sed 's/.*tinysearch.*//' | sort | uniq | sed "s/\(.*\)/            '\1',/"
//
// clickable links to check them (incase your service worker is not installing which can be caused by a missing file/url):
// zola build && find public -type f | sed 's/^public//' | sed 's/^\/sw\..*//' | sed 's/.*sw_load.*//' | sed 's/index.html//' | sed 's/.*stork.*//' | sed 's/.*tinysearch.*//' | sort | uniq | sed "s/\(.*\)/https:\/\/abridge\.netlify\.app\1/"
        this.BASE_CACHE_FILES = [
            '/',
            '/404.html',
            '/about/',
            '/abridge.css',
            '/android-chrome-192x192m.png',
            '/android-chrome-192x192.png',
            '/android-chrome-512x512.png',
            '/apple-touch-icon.png',
            '/archive/',
            '/atom.xml',
            '/banner.png',
            '/blog/',
            '/blog/blog-section/',
            '/blog/page/1/',
            '/browserconfig.xml',
            '/categories/',
            '/categories/features/',
            '/categories/features/atom.xml',
            '/contact/',
            '/elasticlunr.min.js',
            '/favicon-16x16.png',
            '/favicon-32x32.png',
            '/favicon.ico',
            '/favicon.svg',
            '/font/Abridge.woff2',
            '/font/Arimo-Bold.woff2',
            '/font/Arimo-Italic.woff2',
            '/font/Arimo.woff2',
            '/font/FiraCode.woff2',
            '/font/Roboto-Bold.woff2',
            '/font/Roboto-Italic.woff2',
            '/font/Roboto-Mono-Italic.woff2',
            '/font/Roboto-Mono.woff2',
            '/font/Roboto.woff2',
            '/fonts/KaTeX_AMS-Regular.woff2',
            '/fonts/KaTeX_Caligraphic-Bold.woff2',
            '/fonts/KaTeX_Caligraphic-Regular.woff2',
            '/fonts/KaTeX_Fraktur-Bold.woff2',
            '/fonts/KaTeX_Fraktur-Regular.woff2',
            '/fonts/KaTeX_Main-BoldItalic.woff2',
            '/fonts/KaTeX_Main-Bold.woff2',
            '/fonts/KaTeX_Main-Italic.woff2',
            '/fonts/KaTeX_Main-Regular.woff2',
            '/fonts/KaTeX_Math-BoldItalic.woff2',
            '/fonts/KaTeX_Math-Italic.woff2',
            '/fonts/KaTeX_SansSerif-Bold.woff2',
            '/fonts/KaTeX_SansSerif-Italic.woff2',
            '/fonts/KaTeX_SansSerif-Regular.woff2',
            '/fonts/KaTeX_Script-Regular.woff2',
            '/fonts/KaTeX_Size1-Regular.woff2',
            '/fonts/KaTeX_Size2-Regular.woff2',
            '/fonts/KaTeX_Size3-Regular.woff2',
            '/fonts/KaTeX_Size4-Regular.woff2',
            '/fonts/KaTeX_Typewriter-Regular.woff2',
            '/fr/',
            '/fr/about/',
            '/fr/archive/',
            '/fr/atom.xml',
            '/fr/blog/',
            '/fr/blog/blog-section/',
            '/fr/blog/page/1/',
            '/fr/categories/',
            '/fr/categories/features/',
            '/fr/categories/features/atom.xml',
            '/fr/contact/',
            '/fr/offline/',
            '/fr/overview-abridge/',
            '/fr/overview-code-blocks/',
            '/fr/overview-embed-streamable/',
            '/fr/overview-embed-vimeo/',
            '/fr/overview-embed-youtube/',
            '/fr/overview-images/',
            '/fr/overview-images/corro.svg',
            '/fr/overview-images/ferris-gesture.png',
            '/fr/overview-images/ferris-gesture.svg',
            '/fr/overview-images/ferris-happy.svg',
            '/fr/overview-images/ferris.svg',
            '/fr/overview-images/img/ferris-gesture.svg',
            '/fr/overview-images/img/ferris.svg',
            '/fr/overview-markdown-and-style/',
            '/fr/overview-math/',
            '/fr/overview-rich-content/',
            '/fr/overview-rich-content/ferris-gesture.svg',
            '/fr/overview-rich-content/ferris.svg',
            '/fr/overview-rich-content/over9000-400.avif',
            '/fr/overview-rich-content/over9000-640.avif',
            '/fr/overview-rich-content/over9000-640.webp',
            '/fr/overview-rich-content/over9000-960.avif',
            '/fr/overview-rich-content/over9000_av1.mp4',
            '/fr/overview-rich-content/over9000.mp3',
            '/fr/overview-rich-content/over9000.ogg',
            '/fr/overview-rich-content/over9000_vp9.webm',
            '/fr/page/1/',
            '/fr/page/2/',
            '/fr/page/3/',
            '/fr/page/4/',
            '/fr/posts/',
            '/fr/posts/posts-section/',
            '/fr/privacy/',
            '/fr/tags/',
            '/fr/tags/audio/',
            '/fr/tags/audio/atom.xml',
            '/fr/tags/config/',
            '/fr/tags/config/atom.xml',
            '/fr/tags/images/',
            '/fr/tags/images/atom.xml',
            '/fr/tags/markdown/',
            '/fr/tags/markdown/atom.xml',
            '/fr/tags/mathematics/',
            '/fr/tags/mathematics/atom.xml',
            '/fr/tags/shortcodes/',
            '/fr/tags/shortcodes/atom.xml',
            '/fr/tags/video/',
            '/fr/tags/video/atom.xml',
            '/js/abridge.min.js',
            '/js/codecopy.js',
            '/js/elasticlunr.min.js',
            '/js/email.js',
            '/js/katex-auto-render.min.js',
            '/js/katexbundle.min.js',
            '/js/katex.min.js',
            '/js/katexoptions.js',
            '/js/lunr.da.js',
            '/js/lunr.da.min.js',
            '/js/lunr.de.js',
            '/js/lunr.de.min.js',
            '/js/lunr.du.js',
            '/js/lunr.du.min.js',
            '/js/lunr.es.js',
            '/js/lunr.es.min.js',
            '/js/lunr.fi.js',
            '/js/lunr.fi.min.js',
            '/js/lunr.fr.js',
            '/js/lunr.fr.min.js',
            '/js/lunr.hu.js',
            '/js/lunr.hu.min.js',
            '/js/lunr.it.js',
            '/js/lunr.it.min.js',
            '/js/lunr.jp.js',
            '/js/lunr.jp.min.js',
            '/js/lunr.no.js',
            '/js/lunr.no.min.js',
            '/js/lunr.pt.js',
            '/js/lunr.pt.min.js',
            '/js/lunr.ro.js',
            '/js/lunr.ro.min.js',
            '/js/lunr.ru.js',
            '/js/lunr.ru.min.js',
            '/js/lunr.stemmer.support.js',
            '/js/lunr.stemmer.support.min.js',
            '/js/lunr.sv.js',
            '/js/lunr.sv.min.js',
            '/js/lunr.tr.js',
            '/js/lunr.tr.min.js',
            '/js/lunr.zh.js',
            '/js/lunr.zh.min.js',
            '/js/mathtex-script-type.min.js',
            '/js/prestyle.js',
            '/js/search_elasticlunr.min.js',
            '/js/searchjava.js',
            '/js/searchjavaugly.js',
            '/js/search.js',
            '/js/theme_button.js',
            '/js/theme.js',
            '/js/theme_light.js',
            '/js/theme_light.min.js',
            '/js/theme.min.js',
            '/katex.min.css',
            '/manifest.json',
            '/mstile-150x150.png',
            '/nojs.css',
            '/offline/',
            '/overview-abridge/',
            '/overview-code-blocks/',
            '/overview-embed-streamable/',
            '/overview-embed-vimeo/',
            '/overview-embed-youtube/',
            '/overview-images/',
            '/overview-images/corro.svg',
            '/overview-images/ferris-gesture.png',
            '/overview-images/ferris-gesture.svg',
            '/overview-images/ferris-happy.svg',
            '/overview-images/ferris.svg',
            '/overview-images/img/ferris-gesture.svg',
            '/overview-images/img/ferris.svg',
            '/overview-markdown-and-style/',
            '/overview-math/',
            '/overview-rich-content/',
            '/overview-rich-content/ferris-gesture.svg',
            '/overview-rich-content/ferris.svg',
            '/overview-rich-content/over9000-400.avif',
            '/overview-rich-content/over9000-640.avif',
            '/overview-rich-content/over9000-640.webp',
            '/overview-rich-content/over9000-960.avif',
            '/overview-rich-content/over9000_av1.mp4',
            '/overview-rich-content/over9000.mp3',
            '/overview-rich-content/over9000.ogg',
            '/overview-rich-content/over9000_vp9.webm',
            '/page/1/',
            '/page/2/',
            '/page/3/',
            '/page/4/',
            '/posts/',
            '/posts/posts-section/',
            '/privacy/',
            '/robots.txt',
            '/safari-pinned-tab.svg',
            '/search_index.en.json',
            '/search_index.fr.json',
            '/sitemap.xml',
            '/tags/',
            '/tags/audio/',
            '/tags/audio/atom.xml',
            '/tags/config/',
            '/tags/config/atom.xml',
            '/tags/images/',
            '/tags/images/atom.xml',
            '/tags/markdown/',
            '/tags/markdown/atom.xml',
            '/tags/mathematics/',
            '/tags/mathematics/atom.xml',
            '/tags/shortcodes/',
            '/tags/shortcodes/atom.xml',
            '/tags/video/',
            '/tags/video/atom.xml'
        ];
        this.host = `${self.location.protocol}//${self.location.host}`;
        console.info(`Host: ${this.host}`);
        this.OFFLINE_PAGE = '/offline/';
        this.NOT_FOUND_PAGE = '/404.html';
        this.CACHE_NAME = `content-v${this.CACHE_VERSION}`;
        // 3600=1hour, 28800=8hours, 86400=1day, 604800=1week, 1209600=2weeks
        this.NORM_TTL = 86400;// html, json, xml, anything else undefined
        this.LONG_TTL = 1209600;// js, css
        // rarely change, may be a good idea to periodically refresh, incase I change these and forget to increment the version:
        this.TTL_LONG = ["js", "css"];
        // never change, increment version if need to refresh cache:
        this.TTL_EXEMPT = ["jpg", "jpeg", "png", "gif", "webp", "avif", "ico", "svg", "otf", "eot", "ttf", "woff", "woff2", "xml", "xsl", "txt", "mp4", "webm", "mp3", "ogg"];
        // skip these extensions so they expire same time as html: st,wasm,json(search), xml(sitemap,atom,rss)
    }

    canCache(url) {
        if (url.startsWith("http://localhost")) {
            return false;
        }
        const result = url.toString().startsWith(this.host);
        return result;
    }

    getFileExtension(url) {
        const extension = url.split('.').reverse()[0].split('?')[0];
        return (extension.endsWith('/')) ? '/' : extension;
    }

    getTTL(url) {
        if (typeof url === 'string') {
            const extension = this.getFileExtension(url);
            if (this.TTL_LONG.indexOf(extension) > -1) {
                console.info(url + ' contains a TTL_LONG extension');
                //return this.LONG_TTL;
            }
            if (this.TTL_EXEMPT.indexOf(extension) > -1) {
                console.info(url + ' contains a TTL_EXEMPT extension');
                //return null;
            }
            return ~this.TTL_EXEMPT.indexOf(extension) ?
                null : this.NORM_TTL;
            return this.NORM_TTL;
        }
        return null;
    }

    async installServiceWorker() {
        try {
            await caches.open(this.CACHE_NAME).then((cache) => {
                return cache.addAll(this.BASE_CACHE_FILES);
            }, err => console.error(`Error with ${this.CACHE_NAME}`, err));
            return this.scope.skipWaiting();
        }
        catch (err) {
            return console.error("Error with installation: ", err);
        }
    }

    cleanupLegacyCache() {

        const currentCaches = [this.CACHE_NAME];

        return new Promise(
            (resolve, reject) => {
                caches.keys()
                    .then((keys) => keys.filter((key) => !~currentCaches.indexOf(key)))
                    .then((legacy) => {
                        if (legacy.length) {
                            Promise.all(legacy.map((legacyKey) => caches.delete(legacyKey))
                            ).then(() => resolve()).catch((err) => {
                                console.error("Error in legacy cleanup: ", err);
                                reject(err);
                            });
                        } else {
                            resolve();
                        }
                    }).catch((err) => {
                        console.error("Error in legacy cleanup: ", err);
                        reject(err);
                    });
            });
    }

    async preCacheUrl(url) {
        const cache = await caches.open(this.CACHE_NAME);
        const response = await cache.match(url);
        if (!response) {
            return fetch(url).then(resp => cache.put(url, resp.clone()));
        }
        return null;
    }

    register() {
        this.scope.addEventListener('install', event => {
            event.waitUntil(
                Promise.all([
                    this.installServiceWorker(),
                    this.scope.skipWaiting(),
                ]));
                console.info('SW Installed');
        });

        this.scope.addEventListener('activate', event => {
            event.waitUntil(Promise.all(
                [this.cleanupLegacyCache(),
                this.scope.clients.claim(),
                this.scope.skipWaiting()]).catch((err) => {
                    console.error("Activation error: ", err);
                    event.skipWaiting();
                }));
        });

        this.scope.addEventListener('fetch', event => {
            event.respondWith(
                caches.open(this.CACHE_NAME).then(async cache => {
                    // check if this is NOT a resource we allow cacheing (some other domain), if so fetch it instead of cache.
                    if (!this.canCache(event.request.url)) {
                        return fetch(event.request);
                    }
                    // check the cache for the requested resource
                    const response = await cache.match(event.request);
                    if (response) {
                        const headers = response.headers.entries();
                        let date = null;
                        for (let pair of headers) {
                            if (pair[0] === 'date') {
                                date = new Date(pair[1]);
                                break;
                            }
                        }
                        // date is not working, so ignore TTL and just serve the cached resource.
                        if (!date) {
                            return response;
                        }
                        const age = parseInt(((new Date().getTime() - date.getTime()) / 1000).toString());
                        const ttl = this.getTTL(event.request.url);
                        if (ttl === null || (ttl && age < ttl)) {
                            // return the resource if it is not beyond the TTL
                            return response;
                        }
                    }
                    // if we made it here then we either did not have the cache, or the TTL was expired.
                    return fetch(event.request.clone()).then(resp => {
                        if (resp.status < 400) {
                            if (this.canCache(event.request.url)) {
                                cache.put(event.request, resp.clone());
                            }
                            return resp;
                        }
                        else {
                            return cache.match(this.NOT_FOUND_PAGE);
                        }
                    }).catch(err => {
                        // if we made it here then we were unable to fetch the resource.
                        // maybe we were only fetching because of expired TTL, so use the cache regardless of TTL:
                        if (response) {
                            return response;
                        }
                        // if we made it here then we were unable to fetch the resource and do not have it cached.
                        console.error(`Error fetching ${event.request.url} resulted in offline`, err);
                        return cache.match(this.OFFLINE_PAGE);
                    })
                }));
        });
    }
}

const pwa = new Pwa(self);
pwa.register();
