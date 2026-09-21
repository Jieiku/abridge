+++
date = 2021-05-07T15:00:00Z
description = "Artigo de exemplo que demonstra um componente Zola personalizado para incorporar vídeos do Vimeo às suas páginas."
draft = false
title = "Incorporar Vimeo"

[extra]
keywords = "Vídeo, Componentes, Embed, Embedded, Vimeo"
series = "Recursos"
toc = true

[taxonomies]
tags = [
    "Recursos",
    "Componentes",
    "Vídeo",
]
+++
O Zola oferece suporte a componentes personalizados fáceis de adicionar. Este exemplo demonstra uma incorporação do Vimeo.

<!-- more -->

## Vimeo

### Uso

{% raw %}
```rs
{{<vimeo id="514402648" />}}
```
{% endraw %}

- `id` - the video id (obrigatório)
- `class` - uma classe a adicionar ao &lt;div&gt; que envolve o iframe (opcional)
- `autoplay` - quando definido como "true", o vídeo é reproduzido automaticamente ao carregar (opcional)
- `loop` - quando definido como "true", o vídeo é reproduzido em loop (opcional)
- `noautopause` - quando definido como "true", o vídeo não será pausado automaticamente (opcional)
- `title` - define o título acessível do iframe (optional, defaults to "Vimeo")
- `cookie` - defina como "true" se quiser cookies de rastreamento; caso contrário, o padrão é false.

### Saída

```html
{{<vimeo id="514402648" />}}
```

{{<vimeo id="514402648" />}}
