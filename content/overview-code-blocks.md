+++
title = "Code Blocks and Themes"
description = "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
date = 2022-05-17

[taxonomies]
categories = ["Features"]
tags = ["Markdown"]
[extra]
toc = true
+++

This article shows various Code Blocks allowing to easily compare sublime themes.
<!-- more -->
## Code Blocks

Code blocks.. ❤️ with automatic syntax highlighting ✨‍

See [the docs](https://www.getzola.org/documentation/content/syntax-highlighting/) for options.

### Inline Code block

If we want, we can also `specify inline code` which is useful for `the small stuff`.

### rust
```rust
//! jelly-actix-web-starter - A starter template for actix-web projects that feels very Django-esque. Avoid the boring stuff and move faster.

use jelly::actix_web;
use mainlib;
use std::io;

#[actix_web::main]
async fn main() -> io::Result<()> {
    mainlib::main().await
}
```

### html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <!--Main Content Area-->
  <p>Test</p>
</body>
</html>
```

### javascript
```javascript
function closeSearch() {//close the search displaying the regular page.
    const e = document.querySelector("main");
    e.innerHTML = window.main
}

function goSearch() {// on enter key or search icon click display results to the page.
    const e = document.querySelector("main");
    window.main || (window.main = e.innerHTML);
    var t = document.getElementById("suggestions"),
        n = ((ResultsClone = t.cloneNode(!0)).id = "results", document.createElement("div")),
        o = '<h2><button type="button" title="Close Search" onclick="closeSearch()"><i class="svgs x"></i></button> Results For: '.concat(document.getElementById("userinput").value, "</h2>");
    return n.innerHTML = o, ResultsClone.insertBefore(n, ResultsClone.firstChild), e.innerHTML = ResultsClone.outerHTML, t.innerHTML = "", document.getElementById("userinput").value = "", !1
}! function() {
  // search function code goes here
}
```

### php
```php
<?php
/**
 * Postfix Admin
 */
require_once('common.php');
$CONF = Config::getInstance()->getAll();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (!isset($_SESSION['PFA_token'])) {
        die("Invalid token (session timeout; refresh the page and try again?)");
    }
    $fUsername = trim(safepost('fUsername'));
    if ($lang != check_language(false)) { # only set cookie if language selection was changed
        setcookie('lang', $lang, time() + 60*60*24*30); # language cookie, lifetime 30 days
    }
}

$_SESSION['PFA_token'] = md5(uniqid("pfa" . rand(), true));

/* vim: set expandtab softtabstop=4 tabstop=4 shiftwidth=4: */
```


### json
```json
{
    "name": "Abridge Zola Theme",
    "short_name": "Abridge",
    "start_url": "https://jieiku.github.io/abridge-demo/",
    "description": "Fast & Lightweight Zola Theme",
    "scope": "/",
    "display": "standalone",
    "theme_color": "#222222",
    "background_color": "#111111",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-192x192x128m.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        }
    ]
}
```


