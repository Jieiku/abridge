+++
title = "Embed Streamable Video"
description = "Sample article showcasing a custom Zola shortcode for embedding Streamable Videos into your pages."
date = 2021-05-06
draft = false

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","video"]
[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Streamable"
+++

Zola has many shortcodes, and new are easily added, this example shows streamable.
<!-- more -->

## Streamable

### Usage

```rs
{{/* streamable(id="92ok4") */}}
```

- `id`: the video id (mandatory)
- `class`: a class to add to the &lt;div&gt; surrounding the iframe (optional)
- `title` - set alt title for the iframe (optional, defaults to "Streamable")

### Output
```html
{{ streamable(id="92ok4") }}
```
{{ streamable(id="92ok4") }}
