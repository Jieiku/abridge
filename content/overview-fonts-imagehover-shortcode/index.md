+++
title = "Image Comparison imagehover Shortcode"
date = 2021-05-04

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","image"]
+++

This shortcode accepts an array of images, the first element is the one you are comparing to all the others.

When you hover your mouse over an image, it will display the first image in the array.

Size is a percent value (50 is the default).
<!-- more -->

with `imagehover(sources=["file1.jpg", "file2.jpg", "file3.jpg"] size=50)`

{{ imagehover(sources=["System.png", "DroidSans.png", "Roboto.png", "Arimo.png", "Lato.png", "Ubuntu.png"] size=50) }}
