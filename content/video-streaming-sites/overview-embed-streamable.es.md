+++
date = 2021-05-06T15:00:00Z
description = "Artículo de ejemplo que muestra un shortcode personalizado de Zola para incrustar vídeos Streamable en tus páginas."
draft = false
title = "Incrustar Streamable"

[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Streamable"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Shortcodes",
    "Video",
]
+++
Zola tiene muchos shortcodes, y nuevos son facilmente añadidos, este ejemplo muestra streamable.

<!-- more -->

## Streamable

### Uso

```rs
{{/* streamable(id="92ok4") */}}
```

- `id` - el id del vídeo (obligatorio)
- `class` - una clase para añadir al &lt;div&gt; que rodea al iframe (opcional)
- `title` - establecer el título alt para el iframe (opcional, por defecto "Streamable")

### Salida

```html
{{ streamable(id="92ok4") }}
```

{{ streamable(id="92ok4") }}
