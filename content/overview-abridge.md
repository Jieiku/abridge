+++
title = "Abridge Zola Theme and css Framework"
date = 2021-05-16

[taxonomies]
categories = ["Features"]
tags = ["theme","config"]
+++

For quick setup copy the config.toml from the abridge theme into the root of your zola site, this will give you a base configuration with all config values used.
<!-- more -->
You can then edit or comment out the values in this file as necessary.

You should also uncomment out the line #theme = "abridge" in your root zola config.toml file. This tells your root zola site to use the abridge theme in the themes folder.

You can set the number of items that appear on the home page by editing `themes\abridge\content\_index.md` file and adjusting `paginate_by = 5`

You can set the overal page width by editing `themes\abridge\sass\_variables.scss` file, and adjusting these two lines:

```scss
$mw:50% !default;// max-width
$mb:1200px !default;// value at which to switch from fluid layout to using max-width
```
