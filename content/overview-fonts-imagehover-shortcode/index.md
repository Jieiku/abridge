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

This can also be used to compare just one picture with another by passing only two files in the array:

`imagehover(sources=["regular.png", "hover.png"] w=560 h=650 p=45`

To Compare many images just add more images to the array:

`imagehover(sources=["System.png", "DroidSans.png", "Roboto.png", "Arimo.png", "Lato.png", "Ubuntu.png"] w=560 h=650 p=45`

- w is the width of the image.
- h is the height of the image.
- p is the percent size that you want the image to use on the page.(50 is the default)

{{ imagehover(sources=["System.png", "DroidSans.png", "Roboto.png", "Arimo.png", "Lato.png", "Ubuntu.png"] w=560 h=650 p=45) }}
