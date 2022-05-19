+++
title = "Image Comparison imagehover Shortcode"
date = 2021-05-04

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","image"]
+++

This shortcode accepts an array of images, the first element is the one you are comparing to all the others.

The first image in the array is displayed, hover you mouse over the image to display the one your comparing to.
<!-- more -->

with `imagehover(sources=["System.png", "DroidSans.png", "Roboto.png", "Arimo.png", "Lato.png", "Ubuntu.png"] width=560 height=650 size=45`

- width is the width of the image.
- height is the height of the image.
- size is the percent size that you want the image to use on the page.(50 is the default)

{{ imagehover(sources=["System.png", "DroidSans.png", "Roboto.png", "Arimo.png", "Lato.png", "Ubuntu.png"] width=560 height=650 size=45) }}
