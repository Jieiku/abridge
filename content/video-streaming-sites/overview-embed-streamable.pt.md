+++
date = 2021-05-06T15:00:00Z
description = "Artigo de exemplo que demonstra um componente Zola personalizado para incorporar vídeos do Streamable às suas páginas."
draft = false
title = "Incorporar Streamable"

[extra]
keywords = "Vídeo, Componentes, Embed, Embedded, Streamable"
series = "Recursos"
toc = true

[taxonomies]
tags = [
    "Recursos",
    "Componentes",
    "Vídeo",
]
+++
O Zola oferece suporte a componentes personalizados fáceis de adicionar. Este exemplo demonstra uma incorporação do Streamable.

<!-- more -->

## Streamable

### Uso

{% raw %}
```rs
{{<streamable id="92ok4" />}}
```
{% endraw %}

O componente usa uma miniatura local e carrega o player do Streamable somente depois que o botão de reprodução é clicado.

- `id` - the video id (obrigatório)
- `class` - uma classe a adicionar ao &lt;div&gt; que envolve o iframe (opcional)
- `title` - define o título acessível do iframe (optional, defaults to "Streamable")

### Saída

```html
{{<streamable id="92ok4" />}}
```

{{<streamable id="92ok4" />}}
