+++
date = 2021-05-08T15:00:00Z
description = "Artículo de ejemplo que muestra un component personalizado de Zola para incrustar vídeos de Youtube en tus páginas."
draft = false
title = "Incrustar Youtube"

[extra]
keywords = "Video, Components, Embed, Embedded, Youtube"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Components",
    "Video",
]
+++
Zola tiene muchos components, y nuevos son facilmente añadidos, este ejemplo muestra youtube.

<!-- more -->

## Youtube

### Uso

{% raw %}
```rs
{{<youtube id="32gyFIWecuw" />}}
```
{% endraw %}

- `id` - el id del video (obligatorio)
- `playlist` - el id de la lista de reproducción (opcional)
- `class` - una clase para añadir al \<div\> que rodea el iframe (opcional)
- `autoplay` - cuando se establece en "true", el vídeo se muestra automáticamente al cargarse (opcional)
- `title` - establecer el título alt para el iframe (opcional, por defecto "Youtube")
- `cookie` - establecer a "true" si desea cookies de seguimiento, de lo contrario, por defecto a false.

### Salida

```html
{{<youtube id="32gyFIWecuw" />}}
```

{{<youtube id="32gyFIWecuw" />}}
