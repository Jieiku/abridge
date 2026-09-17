+++
date = 2021-05-08T15:00:00Z
description = "Sample article showcasing a custom Zola component for embedding YouTube Videos into your pages."
draft = false
title = "Embed YouTube"

[extra]
keywords = "Video, Components, Embed, Embedded, YouTube"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Components",
    "Video",
]
+++
Zola supports custom components that are easy to add. This example demonstrates a YouTube embed.

<!-- more -->

## YouTube

### Usage

{% raw %}
```rs
{{<youtube id="32gyFIWecuw" />}}
```
{% endraw %}

- `id` - the video id (mandatory)
- `playlist` - the playlist id (optional)
- `class` - a class to add to the &lt;div&gt; surrounding the iframe (optional)
- `autoplay` - when set to "true", the video autoplays on load (optional)
- `title` - set the accessible title for the iframe (optional, defaults to "YouTube")
- `cookie` - set to "true" if you want tracking cookies, otherwise it defaults to false.

### Output

```html
{{<youtube id="32gyFIWecuw" />}}
```

{{<youtube id="32gyFIWecuw" />}}
