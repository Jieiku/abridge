class Pwa {

    constructor(self) {
        this.scope = self;
        const Version = new URL(location).searchParams.get("v");
        this.CACHE_VERSION = Version;
        //this.BASE_CACHE_FILES=['/js/theme.min.js','/js/theme_light.min.js','/abridge.css','/js/abridge.min.js','/','/404.html','/offline/','/manifest.json'];
        this.BASE_CACHE_FILES = ['/404.html','/_headers','/abridge.css','/android-chrome-192x192.png','/android-chrome-512x512.png','/apple-touch-icon.png','/atom.xml','/banner.png','/browserconfig.xml','/favicon-16x16.png','/favicon-32x32.png','/favicon.ico','/favicon.svg','/','/katex.min.css','/m1024.png','/m128.png','/m192.png','/m384.png','/m48.png','/m512.png','/m72.png','/m96.png','/manifest.json','/manifest.min.json','/mstile-150x150.png','/nojs.css','/robots.txt','/safari-pinned-tab.svg','/search_index.en.json','/search_index.es.json','/search_index.fr.json','/sitemap.xml','/about/','/archive/','/blog/','/contact/','/es/atom.xml','/es/','/fonts/KaTeX_AMS-Regular.woff2','/fonts/KaTeX_Caligraphic-Bold.woff2','/fonts/KaTeX_Caligraphic-Regular.woff2','/fonts/KaTeX_Fraktur-Bold.woff2','/fonts/KaTeX_Fraktur-Regular.woff2','/fonts/KaTeX_Main-Bold.woff2','/fonts/KaTeX_Main-BoldItalic.woff2','/fonts/KaTeX_Main-Italic.woff2','/fonts/KaTeX_Main-Regular.woff2','/fonts/KaTeX_Math-BoldItalic.woff2','/fonts/KaTeX_Math-Italic.woff2','/fonts/KaTeX_SansSerif-Bold.woff2','/fonts/KaTeX_SansSerif-Italic.woff2','/fonts/KaTeX_SansSerif-Regular.woff2','/fonts/KaTeX_Script-Regular.woff2','/fonts/KaTeX_Size1-Regular.woff2','/fonts/KaTeX_Size2-Regular.woff2','/fonts/KaTeX_Size3-Regular.woff2','/fonts/KaTeX_Size4-Regular.woff2','/fonts/KaTeX_Typewriter-Regular.woff2','/fonts/Roboto-Bold.woff2','/fonts/Roboto-Italic.woff2','/fonts/Roboto-Mono-Italic.woff2','/fonts/Roboto-Mono.woff2','/fonts/Roboto.woff2','/fr/atom.xml','/fr/','/images/ferris-gesture.svg','/images/ferris.svg','/js/abridge.min.js','/js/abridge_nopwa.min.js','/js/abridge_nosearch.min.js','/js/abridge_nosearch_nopwa.min.js','/js/codecopy.js','/js/elasticlunr.min.js','/js/email.js','/js/katex-auto-render.min.js','/js/katex.min.js','/js/katexbundle.min.js','/js/katexbundle.min.old.js','/js/katexoptions.js','/js/lunr.da.js','/js/lunr.da.min.js','/js/lunr.de.js','/js/lunr.de.min.js','/js/lunr.du.js','/js/lunr.du.min.js','/js/lunr.es.js','/js/lunr.es.min.js','/js/lunr.fi.js','/js/lunr.fi.min.js','/js/lunr.fr.js','/js/lunr.fr.min.js','/js/lunr.hu.js','/js/lunr.hu.min.js','/js/lunr.it.js','/js/lunr.it.min.js','/js/lunr.jp.js','/js/lunr.jp.min.js','/js/lunr.no.js','/js/lunr.no.min.js','/js/lunr.pt.js','/js/lunr.pt.min.js','/js/lunr.ro.js','/js/lunr.ro.min.js','/js/lunr.ru.js','/js/lunr.ru.min.js','/js/lunr.stemmer.support.js','/js/lunr.stemmer.support.min.js','/js/lunr.sv.js','/js/lunr.sv.min.js','/js/lunr.tr.js','/js/lunr.tr.min.js','/js/lunr.zh.js','/js/lunr.zh.min.js','/js/mathtex-script-type.min.js','/js/pagefind-entry.json','/js/pagefind-highlight.js','/js/pagefind-modular-ui.css','/js/pagefind-modular-ui.js','/js/pagefind-ui.css','/js/pagefind-ui.js','/js/pagefind.en_1792586f0b.pf_meta','/js/pagefind.en_241ff3d2af.pf_meta','/js/pagefind.en_273ed092cb.pf_meta','/js/pagefind.en_29ab23549b.pf_meta','/js/pagefind.en_46dccfdcdc.pf_meta','/js/pagefind.en_4c9cd09044.pf_meta','/js/pagefind.en_6621287541.pf_meta','/js/pagefind.en_6b4de85f5f.pf_meta','/js/pagefind.en_8026e04ec8.pf_meta','/js/pagefind.en_80be24246c.pf_meta','/js/pagefind.en_89a60d49c1.pf_meta','/js/pagefind.en_92dac6ac34.pf_meta','/js/pagefind.en_9c76dc4318.pf_meta','/js/pagefind.en_a8e986349a.pf_meta','/js/pagefind.en_aa9d8becb1.pf_meta','/js/pagefind.en_ae32eb6bd7.pf_meta','/js/pagefind.en_b33f1f6fbc.pf_meta','/js/pagefind.en_b62b8c82b7.pf_meta','/js/pagefind.en_ba3c3624c6.pf_meta','/js/pagefind.en_c7cb1f93ed.pf_meta','/js/pagefind.en_ca1955b284.pf_meta','/js/pagefind.en_d458b2935a.pf_meta','/js/pagefind.en_e5ccdd926c.pf_meta','/js/pagefind.en_f93e15fbc1.pf_meta','/js/pagefind.es_336d82169d.pf_meta','/js/pagefind.es_d9188c3e85.pf_meta','/js/pagefind.fr_27d4761375.pf_meta','/js/pagefind.fr_71b4438c85.pf_meta','/js/pagefind.fr_7a5fa85434.pf_meta','/js/pagefind.fr_e88c2b9ec2.pf_meta','/js/pagefind.fr_efc667e93b.pf_meta','/js/pagefind.fr_fbab816ea0.pf_meta','/js/pagefind.index.js','/js/pagefind.js','/js/prestyle.js','/js/search.js','/js/search.pagefind.js','/js/search_elasticlunr.min.js','/js/search_elasticlunr_jindex.min.js','/js/search_stork.min.js','/js/search_tinysearch.min.js','/js/searchjava.js','/js/searchjavaugly.js','/js/stork.js','/js/stork_config.js','/js/sw_load.js','/js/sw_load.min.js','/js/theme.js','/js/theme.min.js','/js/theme_button.js','/js/theme_light.js','/js/theme_light.min.js','/js/tinysearch.js','/js/wasm.en.pagefind','/js/wasm.es.pagefind','/js/wasm.fr.pagefind','/js/wasm.unknown.pagefind','/offline/','/overview-abridge/','/overview-abridge/lighthouse.png','/overview-code-blocks/','/overview-images/corro.svg','/overview-images/ferris-gesture.png','/overview-images/ferris-gesture.svg','/overview-images/ferris-happy.svg','/overview-images/ferris.svg','/overview-images/','/overview-markdown-and-style/','/overview-math/','/overview-rich-content/','/overview-rich-content/over9000-400.avif','/overview-rich-content/over9000-640.avif','/overview-rich-content/over9000-640.webp','/overview-rich-content/over9000-960.avif','/overview-rich-content/over9000.mp3','/overview-rich-content/over9000.ogg','/overview-rich-content/over9000_av1.mp4','/overview-rich-content/over9000_vp9.webm','/overview-showdata/','/privacy/','/tags/','/es/archive/','/es/blog/','/es/tags/','/fr/about/','/fr/archive/','/fr/blog/','/fr/contact/','/fr/offline/','/fr/overview-abridge/','/fr/overview-abridge/lighthouse.png','/fr/overview-code-blocks/','/fr/overview-images/corro.svg','/fr/overview-images/ferris-gesture.png','/fr/overview-images/ferris-gesture.svg','/fr/overview-images/ferris-happy.svg','/fr/overview-images/ferris.svg','/fr/overview-images/','/fr/overview-markdown-and-style/','/fr/overview-math/','/fr/overview-rich-content/','/fr/overview-rich-content/over9000-400.avif','/fr/overview-rich-content/over9000-640.avif','/fr/overview-rich-content/over9000-640.webp','/fr/overview-rich-content/over9000-960.avif','/fr/overview-rich-content/over9000.mp3','/fr/overview-rich-content/over9000.ogg','/fr/overview-rich-content/over9000_av1.mp4','/fr/overview-rich-content/over9000_vp9.webm','/fr/overview-showdata/','/fr/privacy/','/fr/tags/','/js/fragment/en_1570a39.pf_fragment','/js/fragment/en_29e94de.pf_fragment','/js/fragment/en_2a5b739.pf_fragment','/js/fragment/en_39177ce.pf_fragment','/js/fragment/en_53842db.pf_fragment','/js/fragment/en_68f7d46.pf_fragment','/js/fragment/en_695336c.pf_fragment','/js/fragment/en_71961cd.pf_fragment','/js/fragment/en_72b9b65.pf_fragment','/js/fragment/en_7591ddd.pf_fragment','/js/fragment/en_ae9bc06.pf_fragment','/js/fragment/en_afd5968.pf_fragment','/js/fragment/en_c89398f.pf_fragment','/js/fragment/en_e34582f.pf_fragment','/js/fragment/en_fa929d2.pf_fragment','/js/fragment/es_48d2ed8.pf_fragment','/js/fragment/es_6ed9dd3.pf_fragment','/js/fragment/fr_3165bcb.pf_fragment','/js/fragment/fr_33fd725.pf_fragment','/js/fragment/fr_545b41b.pf_fragment','/js/fragment/fr_8711a1a.pf_fragment','/js/fragment/fr_8ce7796.pf_fragment','/js/fragment/fr_9658651.pf_fragment','/js/fragment/fr_a56b4f4.pf_fragment','/js/fragment/fr_ccc7d84.pf_fragment','/js/fragment/fr_e14f3b2.pf_fragment','/js/fragment/fr_e4b7ea8.pf_fragment','/js/fragment/fr_fbc385b.pf_fragment','/js/index/en_11ae847.pf_index','/js/index/en_14da37e.pf_index','/js/index/en_169fb42.pf_index','/js/index/en_1f80bef.pf_index','/js/index/en_234cf17.pf_index','/js/index/en_2811cfe.pf_index','/js/index/en_2be012e.pf_index','/js/index/en_2ec0b9d.pf_index','/js/index/en_45fb9bf.pf_index','/js/index/en_4651d57.pf_index','/js/index/en_6798f28.pf_index','/js/index/en_7be7479.pf_index','/js/index/en_85e52da.pf_index','/js/index/en_8d58537.pf_index','/js/index/en_997d931.pf_index','/js/index/en_9f43c7e.pf_index','/js/index/en_a3606ee.pf_index','/js/index/en_b6a7cc2.pf_index','/js/index/en_b8dd484.pf_index','/js/index/en_ba786a5.pf_index','/js/index/en_d0196ec.pf_index','/js/index/en_d23847b.pf_index','/js/index/en_dabafb2.pf_index','/js/index/en_f7e2176.pf_index','/js/index/es_17dca74.pf_index','/js/index/es_29a1d7e.pf_index','/js/index/fr_614292a.pf_index','/js/index/fr_985fb7b.pf_index','/js/index/fr_a5b234c.pf_index','/js/index/fr_dca1a45.pf_index','/js/index/fr_eaa534f.pf_index','/js/index/fr_f7ce1ad.pf_index','/overview-images/img/ferris-gesture.svg','/overview-images/img/ferris.svg','/page/1/','/page/2/','/page/3/','/page/4/','/tags/audio/atom.xml','/tags/audio/','/tags/config/atom.xml','/tags/config/','/tags/data/atom.xml','/tags/data/','/tags/features/atom.xml','/tags/features/','/tags/images/atom.xml','/tags/images/','/tags/markdown/atom.xml','/tags/markdown/','/tags/mathematics/atom.xml','/tags/mathematics/','/tags/shortcodes/atom.xml','/tags/shortcodes/','/tags/video/atom.xml','/tags/video/','/video-streaming-sites/overview-embed-streamable/','/video-streaming-sites/overview-embed-vimeo/','/video-streaming-sites/overview-embed-youtube/','/blog/page/1/','/es/page/1/','/es/tags/features/atom.xml','/es/tags/features/','/es/tags/shortcodes/atom.xml','/es/tags/shortcodes/','/es/tags/video/atom.xml','/es/tags/video/','/es/video-streaming-sites/overview-embed-streamable/','/fr/overview-images/img/ferris-gesture.svg','/fr/overview-images/img/ferris.svg','/fr/page/1/','/fr/page/2/','/fr/page/3/','/fr/page/4/','/fr/tags/audio/atom.xml','/fr/tags/audio/','/fr/tags/config/atom.xml','/fr/tags/config/','/fr/tags/data/atom.xml','/fr/tags/data/','/fr/tags/features/atom.xml','/fr/tags/features/','/fr/tags/images/atom.xml','/fr/tags/images/','/fr/tags/markdown/atom.xml','/fr/tags/markdown/','/fr/tags/mathematics/atom.xml','/fr/tags/mathematics/','/fr/tags/shortcodes/atom.xml','/fr/tags/shortcodes/','/fr/tags/video/atom.xml','/fr/tags/video/','/fr/video-streaming-sites/overview-embed-streamable/','/fr/video-streaming-sites/overview-embed-vimeo/','/fr/video-streaming-sites/overview-embed-youtube/','/es/blog/page/1/','/fr/blog/page/1/'];
        this.host = `${self.location.protocol}//${self.location.host}`;
        console.info(`Host: ${this.host}`);
        this.OFFLINE_PAGE = '/offline/';
        this.NOT_FOUND_PAGE = '/404.html';
        this.CACHE_NAME = `content-v${this.CACHE_VERSION}`;
        // 3600=1hour, 28800=8hours, 86400=1day, 604800=1week, 1209600=2weeks
        this.NORM_TTL = 0;
        this.LONG_TTL = 0;
        // keep the ttl on these lower:
        this.TTL_NORM = ["sw.min.js", "sw_load.min.js"];
        // rarely change, may be a good idea to periodically refresh, incase I change these and forget to increment service worker version:
        this.TTL_LONG = ["jpg", "jpeg", "png", "gif", "webp", "avif", "ico", "svg", "xsl", "txt"];
        // never change, cache forever unless service worker version is incremented:
        this.TTL_EXEMPT = ["js", "css", "otf", "eot", "ttf", "woff", "woff2", "mp4", "webm", "mp3", "ogg"];
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
    getFileName(url) {
        const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
        return (filename.endsWith('/')) ? '/' : filename;
    }

    getTTL(url) {
        if (typeof url === 'string') {
            const extension = this.getFileExtension(url);
            const filename = this.getFileName(url);

            if (this.TTL_NORM.indexOf(filename) > -1) {
                console.info(url + ' contains a TTL_NORM filename');
                return this.NORM_TTL;
            }
            if (this.TTL_LONG.indexOf(extension) > -1) {
                console.info(url + ' contains a TTL_LONG extension');
                return this.LONG_TTL;
            }
            if (this.TTL_EXEMPT.indexOf(extension) > -1) {
                console.info(url + ' contains a TTL_EXEMPT extension');
                return null;
            }
            console.info(url + ' TTL_NORM');
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
                        if (typeof event.request.url === 'string') {
                            console.info("url: "+event.request.url)
                        }
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
