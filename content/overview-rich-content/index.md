+++
title = "Rich Content"
description = "A brief description of custom Shortcodes for Zola that implement modern html elements: video, image, gif, audio."
date = 2021-05-15
draft = false

[taxonomies]
tags = ["Features","Video","Audio","Images","Shortcodes"]
[extra]
keywords = "Images, Videos, Audio, Gif, Rich Content, Shortcodes"
toc = true
series = "Features"
+++

Several custom shortcodes are included to augment CommonMark (courtesy of [d3c3nt theme](https://d3c3nt.figbert.com/posts/rich-content/)). `video`, `image`, `gif`, and `audio` were created to help you take advantage of modern HTML elements in your writing.

<!-- more -->

## Video

The `video` shortcode takes a `sources` parameter (an array of strings)
and returns a `<video>` tag. Each string in the `sources` array should
be a path to a video file of a different type (`webm`, `mp4`, etc). Each
individual source is then converted into a `<source>` tag, and the
element is returned.

### Usage
```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```
### Output
```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

## Image

The `image` shortcode returns a `<picture>` tag and accepts three
parameters: `sources` (an array of strings), `fallback_path`, and
`fallback_alt` (both strings).

Each string in the `sources` array should be a path to an image file of
a different type (`avif`, `webp`, `png`, `jpg`, etc). `fpath` and
`falt` are used to create an `<img>` tag for the browser to fall
back on if the other formats aren't yet supported, fw and fh set the width and height of the fallback

### Usage
```rs
{{/* image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif"], fpath="over9000-640.webp", fw=640, fh=480, falt="ITS OVER 9000!") */}}
```
### Output
```html
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif"], fpath="over9000-640.webp", fw=640, fh=480, falt="ITS OVER 9000!") }}
```
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif"], fpath="over9000-640.webp", fw=640, fh=480, falt="ITS OVER 9000!") }}

## GIF

The `gif` shortcode is exactly the same as the [video shortcode](#video)
– it takes an array of strings called `sources` and returns a
`<video>` tag. The only difference is in the outermost tag, which has
four additional properties: `autoplay`, `loop`, `muted`, `playsinline`.

Using the `<video>` tag in place of gifs allows for reduced file sizes,
which is especially important in regions where internet is slower or
less reliable.

### Usage
```rs
{{/* gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```
### Output
```html
{{ gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```
{{ gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

## Audio

The `audio` shortcode takes a `sources` array of strings and returns an
`<audio>` tag. Each string in the `sources` array should be a path to an
audio file of a different type (`ogg`, `mp3`, `flac`, `wav`, etc).
The browser will play the first type it supports, so placing them in order of size smallest to largest will use the least bandwidth if that is your goal.

### Usage
```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) */}}
```
### Output
```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) }}
```
{{ audio(sources=["over9000.ogg", "over9000.mp3"]) }}
