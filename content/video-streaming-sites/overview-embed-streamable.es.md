+++
date = 2021-05-06T15:00:00Z
description = "Artículo de ejemplo que muestra un component personalizado de Zola para incrustar vídeos Streamable en tus páginas."
draft = false
title = "Incrustar Streamable"

[extra]
keywords = "Video, Components, Embed, Embedded, Streamable"
series = "Características"
toc = true

[taxonomies]
tags = [
    "Características",
    "Componentes",
    "Vídeo",
]
+++
Zola tiene muchos components, y nuevos son facilmente añadidos, este ejemplo muestra streamable.

<!-- more -->

## Streamable

### Uso

{% raw %}
```rs
{{<streamable id="92ok4" />}}
```
{% endraw %}

El component utiliza una miniatura local y carga el reproductor de Streamable solamente al pulsar reproducir.

- `id` - el id del vídeo (obligatorio)
- `class` - una clase para añadir al &lt;div&gt; que rodea al iframe (opcional)
- `title` - establecer el título accesible del iframe (opcional, por defecto "Streamable")

### Salida

```html
{{<streamable id="92ok4" />}}
```

{{<streamable id="92ok4" />}}
