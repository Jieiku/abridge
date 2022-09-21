+++
title = "Embedded Youtube Videos"
description = "Sample article showcasing a custom Zola shortcode for embedding Youtube Videos into your pages."
date = 2021-05-08
draft = false

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","video"]
[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Youtube"
+++

Zola has many shortcodes, and new are easily added, this example shows youtube.
<!-- more -->

## Youtube

with `yt(id="the_id_here")`

- `id`: the video id (mandatory)
- `playlist`: the playlist id (optional)
- `class`: a class to add to the &lt;div&gt; surrounding the iframe (optional)
- `autoplay`: when set to "true", the video autoplays on load (optional)
- `title` - set alt title for the iframe (optional, defaults to "Youtube")
- `cookie` - set to "true" if you want tracking cookies, otherwise it defaults to false.

{{ yt(id="32gyFIWecuw") }}
