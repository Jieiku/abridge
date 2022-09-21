+++
title = "Embedded Vimeo Videos"
description = "Sample article showcasing a custom Zola shortcode for embedding Vimeo Videos into your pages."
date = 2021-05-07
draft = false

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","video"]
[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Vimeo"
+++

Zola has many shortcodes, and new are easily added, this example shows vimeo.
<!-- more -->

## Vimeo

with `vm(id="id_here")`

- `id`: the video id (mandatory)
- `class`: a class to add to the &lt;div&gt; surrounding the iframe (optional)
- `autoplay`: when set to "true", the video autoplays on load (optional)
- `loop`: when set to "true", the video plays on a loop (optional)
- `noautopause`: when set to "true", the video will not autopause (optional)
- `title` - set alt title for the iframe (optional, defaults to "Vimeo")
- `cookie` - set to "true" if you want tracking cookies, otherwise it defaults to false.

{{ vm(id="514402648") }}
