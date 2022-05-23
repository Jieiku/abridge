+++
title = "imagehover Shortcode"
date = 2021-05-17

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","images"]
+++

This shortcode accepts an array of images, the first element is the one you are comparing to all the others.

The first image in the array is displayed and the image changes to the one your comparing when you hover the mouse over it.
<!-- more -->

This can also be used to compare just one picture with another by passing only two files in the array.

- w is the width of the image.
- h is the height of the image.
- p is the percent size that you want the image to use on the page. (50 is the default)

### Usage (same path)
```rs
{{/* imagehover(sources=["ferris.svg", "ferris-gesture.svg", "ferris-happy.svg"] w=600 h=400 p=45) */}}
```
### Output
```html
{{ imagehover(sources=["ferris.svg", "ferris-gesture.svg", "ferris-happy.svg"] w=600 h=400 p=45) }}
```
{{ imagehover(sources=["ferris.svg", "ferris-gesture.svg", "ferris-happy.svg"] w=600 h=400 p=45) }}

### Usage (relative path ./)
```rs
{{/* imagehover(sources=["./img/ferris.svg", "./img/ferris-gesture.svg"] w=600 h=400 p=45) */}}
```
### Output
```html
{{ imagehover(sources=["./img/ferris.svg", "./img/ferris-gesture.svg"] w=600 h=400 p=45) }}
```
{{ imagehover(sources=["./img/ferris.svg", "./img/ferris-gesture.svg"] w=600 h=400 p=45) }}

### Usage (root path /)
```rs
{{/* imagehover(sources=["/overview-images/ferris.svg", "/overview-images/ferris-gesture.svg"] w=600 h=400 p=45) */}}
```
### Output
```html
{{ imagehover(sources=["/overview-images/ferris.svg", "/overview-images/ferris-gesture.svg"] w=600 h=400 p=45) }}
```
{{ imagehover(sources=["/overview-images/ferris.svg", "/overview-images/ferris-gesture.svg"] w=600 h=400 p=45) }}
