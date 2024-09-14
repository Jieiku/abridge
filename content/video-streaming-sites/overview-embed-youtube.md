+++
title = "Embed Youtube"
description = "Sample article showcasing a custom Zola shortcode for embedding Youtube Videos into your pages."
date = 2021-05-08T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Shortcodes","Video"]
[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Youtube"
toc = true
series = "Features"
+++

Zola has many shortcodes, and new are easily added, this example shows youtube.
<!-- more -->

## Youtube

### Usage

```rs
{{/* youtube(id="32gyFIWecuw") */}}
```

- `id`: the video id (mandatory)
- `playlist`: the playlist id (optional)
- `class`: a class to add to the &lt;div&gt; surrounding the iframe (optional)
- `autoplay`: when set to "true", the video autoplays on load (optional)
- `title` - set alt title for the iframe (optional, defaults to "Youtube")
- `cookie` - set to "true" if you want tracking cookies, otherwise it defaults to false.

### Output

```html
{{ youtube(id="32gyFIWecuw") }}
```
{{ youtube(id="32gyFIWecuw") }}
