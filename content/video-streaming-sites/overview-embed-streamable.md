+++
date = 2021-05-06T15:00:00Z
description = "Sample article showcasing a custom Zola component for embedding Streamable Videos into your pages."
draft = false
title = "Embed Streamable"

[extra]
keywords = "Video, Components, Embed, Embedded, Streamable"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Components",
    "Video",
]
+++
Zola supports custom components that are easy to add. This example demonstrates a Streamable embed.

<!-- more -->

## Streamable

### Usage

{% raw %}
```rs
{{<streamable id="92ok4" />}}
```
{% endraw %}

The component uses a local thumbnail and loads the Streamable player only after play is clicked.

- `id` - the video id (mandatory)
- `class` - a class to add to the &lt;div&gt; surrounding the iframe (optional)
- `title` - set the accessible title for the iframe (optional, defaults to "Streamable")

### Output

```html
{{<streamable id="92ok4" />}}
```

{{<streamable id="92ok4" />}}
