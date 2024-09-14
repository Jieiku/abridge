+++
title = "Showdata Shortcode"
description = "A brief description of a custom Shortcode for Zola that implements loading and displaying external data."
date = 2021-05-04T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Data","Shortcodes"]
[extra]
keywords = "Data, Load, External, Shortcodes"
toc = true
series = "Features"
+++

The `showdata` shortcode can load and display data from an external source via Zola's [load_data()](https://www.getzola.org/documentation/templates/overview/#load-data) function.

<!-- more -->

These are the parameters, currently all 3 are required.

- `src` path or url to file (if url, must include the http(s):// prefix).
- `type` the type of file to load. ([supported types](https://www.getzola.org/documentation/templates/overview/#load-data))
- `key` the field in the data that you want to display.

## Usage

This theme requires version &#123;&#123; showdata(src="../theme.toml" type="toml" key="min_version") &#125;&#125; or later of Zola.

## Output

This theme requires version {{ showdata(src="../theme.toml" type="toml" key="min_version") }} or later of Zola.
