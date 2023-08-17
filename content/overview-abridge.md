+++
title = "Abridge Zola Theme"
date = 2022-05-17
updated = 2023-07-21
draft = false

[taxonomies]
categories = ["Features"]
tags = ["config"]
+++

Abridge is a fast and lightweight Zola theme using semantic html, only ~6kb css before svg icons and syntax highlighting, no mandatory JS, and perfect [Lighthouse](https://pagespeed.web.dev/report?url=abridge.netlify.app), [YellowLabTools](https://yellowlab.tools/), and [Observatory](https://observatory.mozilla.org/analyze/abridge.netlify.app) scores. Here is a [Zola Themes Benchmarks](https://github.com/Jieiku/zola-themes-benchmarks/blob/main/README.md) Page.
<!-- more -->
For quick setup copy the config.toml from the abridge theme into the root of your zola site, this will give you a base configuration with all config values used.

You can then edit or comment out the values in this file as necessary.

You should also uncomment out the line #theme = "abridge" in your root zola config.toml file. This tells your root zola site to use the abridge theme in the themes folder.

## Pagination

You can set the number of items that appear on the home page by editing `content\_index.md` file and adjusting `paginate_by = 3`

## Sass Overrides

Abridge SCSS variables can be overrided by editing `sass\abridge.scss` file in your project's root sass folder.

### Page Width

```scss
$mw:75%,// max-width
```

### Abridge Theme Modes

```scss
$abridgeMode: "switcher",//valid values: switcher, auto, dark, light
```

### Colors and Styles

You can specify which color template you want to use as a base:
```scss
$color: "orange",// color template to use/override: orange, blue, blueshade
```

Then override individual colors as needed:
```scss
/// Dark Colors
$f1d: #ccc,// Font Color Primary
$f2d: #ddd,// Font Color Headers
$c1d: #111,// Background Color Primary
$c2d: #222,// Background Color Secondary
...
```

### Footer Social Icons

You should configure which social icons you plan to use. (makes the css file size smaller)

To simply turn them all off you can set `$enable-icons: false`

Otherwise enable only the icons you need, eg for mail you would set `$icon-mail: true`

You should then disable all the icons that you do not use.
