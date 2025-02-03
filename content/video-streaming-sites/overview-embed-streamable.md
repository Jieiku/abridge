+++
date = 2021-05-06T15:00:00Z
description = "Sample article showcasing a custom Zola shortcode for embedding Streamable Videos into your pages."
draft = false
title = "Embed Streamable"

[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Streamable"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Shortcodes",
    "Video",
]
+++
Zola has many shortcodes, and new are easily added, this example shows streamable.

<!-- more -->

## Streamable

### Usage

```rs
{{/* streamable(id="92ok4") */}}
```

- `id` - the video id (mandatory)
- `class` - a class to add to the &lt;div&gt; surrounding the iframe (optional)
- `title` - set alt title for the iframe (optional, defaults to "Streamable")

### Output

```html
{{ streamable(id="92ok4") }}
```

{{ streamable(id="92ok4") }}
