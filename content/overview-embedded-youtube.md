+++
title = "Embedded Youtube Videos"
date = 2021-05-08

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","video"]
+++

Zola has many shortcodes, and new are easily added, this example shows youtube.
<!-- more -->

## Youtube

with `yt(id="the_id_here")`

- `id`: the video id (mandatory)
- `playlist`: the playlist id (optional)
- `class`: a class to add to the <div> surrounding the iframe (optional)
- `autoplay`: when set to "true", the video autoplays on load (optional)
- `title` - set alt title for the iframe (optional, defaults to "Youtube")
- `cookie` - set to "true" if you want tracking cookies, otherwise it defaults to false.

{{ yt(id="32gyFIWecuw") }}
