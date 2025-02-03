+++
date = 2021-05-07T15:00:00Z
description = "Artículo de ejemplo que muestra un shortcode personalizado de Zola para incrustar vídeos de Vimeo en tus páginas."
draft = false
title = "Incrustar Vimeo"

[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Vimeo"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Shortcodes",
    "Video",
]
+++
Zola tiene muchos shortcodes, y los nuevos se añaden fácilmente, este ejemplo muestra vimeo.

<!-- more -->

## Vimeo

### Uso

```rs
{{/* vimeo(id="514402648") */}}
```

- `id` - el id del video (obligatorio)
- `class` - una clase para añadir al \<div\> que rodea el iframe (opcional)
- `autoplay` - cuando se establece en "true", el vídeo se muestra automáticamente al cargarse (opcional)
- `loop` - cuando se establece en "true", el vídeo se reproduce en bucle (opcional)
- `noautopause` - cuando se establece en "true", el vídeo no se autopausa (opcional)
- `title` - establecer título alternativo para el iframe (opcional, por defecto "Vimeo")
- `cookie` - establece "true" si quieres cookies de seguimiento, de lo contrario, por defecto es false.

### Salida

```html
{{ vimeo(id="514402648") }}
```

{{ vimeo(id="514402648") }}
