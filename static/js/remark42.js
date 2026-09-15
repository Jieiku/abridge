"use strict";

(function () {
    var container = document.getElementById("remark42");
    if (!container) return;

    var host = (container.dataset.remark42Host || "").replace(/\/+$/, "");
    var siteId = container.dataset.remark42SiteId || "";
    if (!host || !siteId) return;

    window.remark_config = {
        host: host,
        site_id: siteId,
        components: ["embed"]
    };

    for (var i = 0; i < window.remark_config.components.length; i++) {
        var script = document.createElement("script");
        var extension = ".js";
        if ("noModule" in script) {
            script.type = "module";
            extension = ".mjs";
        } else {
            script.async = true;
            script.defer = true;
        }
        script.src = host + "/web/" + window.remark_config.components[i] + extension;
        (document.head || document.body).appendChild(script);
    }
}());
