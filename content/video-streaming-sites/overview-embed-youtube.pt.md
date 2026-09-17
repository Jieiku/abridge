+++
date = 2021-05-08T15:00:00Z
description = "Artigo de exemplo que demonstra um componente Zola personalizado para incorporar vídeos do YouTube às suas páginas."
draft = false
title = "Incorporar YouTube"

[extra]
keywords = "Vídeo, Componentes, Embed, Embedded, YouTube"
series = "Recursos"
toc = true

[taxonomies]
tags = [
    "Recursos",
    "Componentes",
    "Vídeo",
]
+++
O Zola oferece suporte a componentes personalizados fáceis de adicionar. Este exemplo demonstra uma incorporação do YouTube.

<!-- more -->

## YouTube

### Uso

{% raw %}
```rs
{{<youtube id="32gyFIWecuw" />}}
```
{% endraw %}

- `id` - the video id (obrigatório)
- `playlist` - o ID da playlist (opcional)
- `class` - uma classe a adicionar ao &lt;div&gt; que envolve o iframe (opcional)
- `autoplay` - quando definido como "true", o vídeo é reproduzido automaticamente ao carregar (opcional)
- `title` - define o título acessível do iframe (optional, defaults to "YouTube")
- `cookie` - defina como "true" se quiser cookies de rastreamento; caso contrário, o padrão é false.

### Saída

```html
{{<youtube id="32gyFIWecuw" />}}
```

{{<youtube id="32gyFIWecuw" />}}
