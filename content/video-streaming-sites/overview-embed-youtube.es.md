+++
date = 2021-05-08T15:00:00Z
description = "Artículo de ejemplo que muestra un component personalizado de Zola para incrustar vídeos de YouTube en tus páginas."
draft = false
title = "Incrustar YouTube"

[extra]
keywords = "Video, Components, Embed, Embedded, YouTube"
series = "Características"
toc = true

[taxonomies]
tags = [
    "Características",
    "Componentes",
    "Vídeo",
]
+++
Zola tiene muchos components, y nuevos son facilmente añadidos, este ejemplo muestra youtube.

<!-- more -->

## YouTube

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
- `title` - establecer el título accesible del iframe (opcional, por defecto "YouTube")
- `cookie` - establecer a "true" si desea cookies de seguimiento, de lo contrario, por defecto a false.

### Salida

```html
{{<youtube id="32gyFIWecuw" />}}
```

{{<youtube id="32gyFIWecuw" />}}
