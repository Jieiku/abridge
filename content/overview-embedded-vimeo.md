+++
title = "Embedded Vimeo Videos"
date = 2021-05-07

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","video"]
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
- `title` - set alt title for the iframe (optional, defaults to "Youtube")
- `cookie` - set to "true" if you want tracking cookies, otherwise it defaults to false.

{{ vm(id="514402648") }}
