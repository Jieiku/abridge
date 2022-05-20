+++
title = "Rich Content"
description = "A brief description of Zola Shortcodes"
date = 2021-05-06

[taxonomies]
categories = ["Features"]
tags = ["video", "audio", "images", "shortcodes"]
[extra]
toc = true
+++

Several custom shortcodes are included to augment CommonMark (courtesy of d3c3nt theme), in addition to those [already provided by Zola][built-in]. `video`, `image`, `gif`, and `audio` were created to help you take advantage of modern HTML elements in your writing.

<!-- more -->

## Video

The `video` shortcode takes a `sources` parameter (an array of strings)
and returns a `<video>` tag. Each string in the `sources` array should
be a path to a video file of a different type (`webm`, `mp4`, etc). Each
individual source is then converted into a `<source>` tag, and the
element is returned.

### Usage
```rs
{{/* video(sources=["example.webm", "example.mp4"]) */}}
```
### Output
```html
{{ video(sources=["example.webm", "example.mp4"]) }}
```

## Image

The `image` shortcode returns a `<picture>` tag and accepts three
parameters: `sources` (an array of strings), `fallback_path`, and
`fallback_alt` (both strings).

Each string in the `sources` array should be a path to an image file of
a different type (`webp`, `png`, `jpg`, etc). `fallback_path` and
`fallback_alt` are used to create an `<img>` tag for the browser to fall
back on if the other formats aren't yet supported.

### Usage
```rs
{{/* image(sources=["example.webp", "example.jpg", "example.png"], fallback_path="example.png", fallback_alt="Lorem Ipsum") */}}
```
### Output
```html
{{ image(sources=["example.webp", "example.jpg", "example.png"], fallback_path="example.png", fallback_alt="Lorem Ipsum") }}
```

## GIF

The `gif` shortcode is exactly the same as the [video shortcode][video]
– it takes an array of strings called `sources` and returns a
`<video>` tag. The only difference is in the outermost tag, which has
four additional properties: `autoplay`, `loop`, `muted`, `playsinline`.

Using the `<video>` tag in place of gifs allows for reduced file sizes,
which is especially important in regions where internet is slower or
less reliable.

### Usage
```rs
{{/* gif(sources=["example.webm", "example.mp4"]) */}}
```
### Output
```html
{{ gif(sources=["example.webm", "example.mp4"]) }}
```

## Audio

The `audio` shortcode takes a `sources` array of strings and returns an
`<audio>` tag. Each string in the `sources` array should be a path to an
audio file of a different type (`wav`, `ogg`, `mp3`, etc).

### Usage
```rs
{{/* audio(sources=["example.mp3", "example.ogg", "example.flac", "example.wav"]) */}}
```
### Output
```html
{{ audio(sources=["example.mp3", "example.ogg", "example.flac", "example.wav"]) }}
```
{{ audio(sources=["over9000.mp3", "over9000.ogg", "over9000.flac", "over9000.wav"]) }}

[built-in]: https://www.getzola.org/documentation/content/shortcodes/#built-in-shortcodes
