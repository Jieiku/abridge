+++
title = "Rich Content"
description = "A brief description of custom Shortcodes for Zola that implement modern html elements: video, image, gif, audio."
date = 2021-05-15T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Video","Audio","Images","Shortcodes"]
[extra]
keywords = "Images, Videos, Audio, Gif, Rich Content, Shortcodes"
toc = true
series = "Features"
+++

Several custom shortcodes are included to augment CommonMark. `video`, `image`, `gif`, and `audio` were created to help you take advantage of modern HTML elements in your writing.

<!-- more -->

## Video

- `sources` is an array of video file paths. (mandatory)
- `class` sets a class for the video.
- `caption` sets the caption text below the video.
- `w` sets the width of the video.
- `h` sets the height of the video.
- `autoplay` when set, autoplays the video on load.
- `loop` when set, plays the video on a loop.
- `muted` when set, sets the audio muted initially.
- `playsinline` when set, plays the video embeded instead of fullscreen on mobile browsers.

** sources can be same path, relative path, or root path, like the [img shortcode](https://abridge.pages.dev/overview-images/#img-shortcode) **

**Optional Classes:**

- `ci` can be used to center the image.
- `fr` can be used to float the image right.
- `fl` can be used to float the image left.
- `b1` can be used to add a 1px border.

### Usage
```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```
### Output
```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

### Usage
```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") */}}
```
### Output
```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") }}
```
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") }}

## Image

The `image` shortcode returns a `<picture>` tag with multiple sources.

Each string in the `sources` array should be a path to an image file of a different type (`avif`, `webp`, `png`, `jpg`, etc).
 The last image in the `sources` array is used to create an `<img>` tag for the browser to fall back on if the other formats are not yet supported.

- `sources` is an array of image file paths. (mandatory)
- `class` sets a class for the image.
- `caption` sets the caption text below the image.
- `w` sets the width of the image.
- `h` sets the height of the image.

** sources can be same path, relative path, or root path, like the [img shortcode](https://abridge.pages.dev/overview-images/#img-shortcode) **

**Optional Classes:**

- `ci` can be used to center the image.
- `fr` can be used to float the image right.
- `fl` can be used to float the image left.
- `b1` can be used to add a 1px border.

### Usage
```rs
{{/* image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="ITS OVER 9000!") */}}
```
### Output
```html
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="ITS OVER 9000!") }}
```
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="ITS OVER 9000!") }}

## GIF

The `gif` shortcode is exactly the same as the [video shortcode](#video).
 The only difference is it automatically has the additional properties: `autoplay`, `loop`, `muted`, `playsinline`.

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

- `sources` is an array of file paths. (mandatory)
- `class` sets a class for the audio.
- `caption` sets the caption text below the audio.
- `autoplay` when set, autoplays the audio on load.
- `loop` when set, plays the audio on a loop.
- `muted` when set, sets the audio muted initially.

** sources can be same path, relative path, or root path, like the [img shortcode](https://abridge.pages.dev/overview-images/#img-shortcode) **

**Optional Classes:**

- `ci` can be used to center the image.
- `fr` can be used to float the image right.
- `fl` can be used to float the image left.
- `b1` can be used to add a 1px border.

### Usage
```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) */}}
```
### Output
```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) }}
```
{{ audio(sources=["over9000.ogg", "over9000.mp3"]) }}

### Usage
```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"] class="ci b1" caption="It's Over 9000!!") */}}
```
### Output
```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"] class="ci b1" caption="It's Over 9000!!") }}
```
{{ audio(sources=["over9000.ogg", "over9000.mp3"] class="ci b1" caption="It's Over 9000!!") }}
