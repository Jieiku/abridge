+++
date = 2021-05-15T15:00:00Z
description = "Uma breve descrição dos componentes personalizados para Zola que implementam elementos HTML modernos: vídeo, imagem, GIF e áudio."
draft = false
title = "Conteúdo Rico"

[extra]
keywords = "Imagens, Vídeos, Áudio, Gif, Conteúdo Rico, Componentes"
series = "Recursos"
toc = true

[taxonomies]
tags = [
    "Recursos",
    "Vídeo",
    "Áudio",
    "Imagens",
    "Componentes",
]
+++
Vários componentes personalizados estão incluídos para ampliar o CommonMark. `video`, `image`, `gif` e `audio` foram criados para ajudar você a aproveitar elementos HTML modernos em seu conteúdo.

<!-- more -->

## Vídeo

- `sources` é um array de caminhos de arquivos de vídeo. (obrigatório)
- `class` define uma classe para o vídeo.
- `caption` define o texto da legenda abaixo do vídeo.
- `w` define a largura do vídeo.
- `h` define a altura do vídeo.
- `autoplay` quando definido, reproduz o vídeo automaticamente ao carregar.
- `loop` quando definido, reproduz o vídeo em loop.
- `muted` quando definido, inicia o áudio silenciado.
- `playsinline`, quando definido, reproduz o vídeo incorporado em vez de tela cheia em navegadores móveis.

*`sources` pode usar o mesmo caminho, um caminho relativo ou um caminho raiz, como o [componente img](https://abridge.pages.dev/overview-images/#img-component)*

**Classes opcionais:**

- `ci` pode ser usado para centralizar a imagem.
- `fr` pode ser usado para alinhar a imagem à direita.
- `fl` pode ser usado para alinhar a imagem à esquerda.
- `b1` pode ser usado para adicionar uma borda de 1px.

### Uso

{% raw %}
```rs
{{<video sources={["over9000_av1.mp4", "over9000_vp9.webm"]}  page={page} config={config} />}}
```
{% endraw %}

### Saída

```html
{{<video sources={["over9000_av1.mp4", "over9000_vp9.webm"]}  page={page} config={config} />}}
```

{{<video sources={["over9000_av1.mp4", "over9000_vp9.webm"]}  page={page} config={config} />}}

### Uso

{% raw %}
```rs
{{<video sources={["over9000_av1.mp4", "over9000_vp9.webm"]} muted={true} class="ci b1" caption="It's Over 9000!!"  page={page} config={config} />}}
```
{% endraw %}

### Saída

```html
{{<video sources={["over9000_av1.mp4", "over9000_vp9.webm"]} muted={true} class="ci b1" caption="It's Over 9000!!"  page={page} config={config} />}}
```

{{<video sources={["over9000_av1.mp4", "over9000_vp9.webm"]} muted={true} class="ci b1" caption="It's Over 9000!!"  page={page} config={config} />}}

## Imagem

O componente `image` retorna uma tag `<picture>` com várias fontes.

Cada string no array `sources` deve ser o caminho para um arquivo de imagem de um tipo diferente (`avif`, `webp`, `png`, `jpg` etc.).
 A última imagem no array `sources` é usada para criar uma tag `<img>` como alternativa caso o navegador ainda não ofereça suporte aos outros formatos.

- `sources` é um array de caminhos de arquivos de imagem. (obrigatório)
- `class` define uma classe para a imagem.
- `caption` define o texto da legenda abaixo da imagem.
- `w` define a largura da imagem.
- `h` define a altura da imagem.

*`sources` pode usar o mesmo caminho, um caminho relativo ou um caminho raiz, como o [componente img](https://abridge.pages.dev/overview-images/#img-component)*

**Classes opcionais:**

- `ci` pode ser usado para centralizar a imagem.
- `fr` pode ser usado para alinhar a imagem à direita.
- `fl` pode ser usado para alinhar a imagem à esquerda.
- `b1` pode ser usado para adicionar uma borda de 1px.

### Uso

{% raw %}
```rs
{{<image sources={["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"]} w={640} h={480} alt="ITS OVER 9000!"  page={page} config={config} />}}
```
{% endraw %}

### Saída

```html
{{<image sources={["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"]} w={640} h={480} alt="ITS OVER 9000!"  page={page} config={config} />}}
```

{{<image sources={["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"]} w={640} h={480} alt="ITS OVER 9000!"  page={page} config={config} />}}

## GIF

O componente `gif` é exatamente igual ao [componente de vídeo](#video).
 A única diferença é que ele recebe automaticamente as propriedades adicionais `autoplay`, `loop`, `muted` e `playsinline`.

Usar a tag `<video>` no lugar de GIFs permite reduzir o tamanho dos arquivos,
o que é especialmente importante em regiões onde a internet é mais lenta ou
menos confiável.

### Uso

{% raw %}
```rs
{{<gif sources={["over9000_av1.mp4", "over9000_vp9.webm"]}  page={page} config={config} />}}
```
{% endraw %}

### Saída

```html
{{<gif sources={["over9000_av1.mp4", "over9000_vp9.webm"]}  page={page} config={config} />}}
```

{{<gif sources={["over9000_av1.mp4", "over9000_vp9.webm"]}  page={page} config={config} />}}

## Áudio

O componente `audio` recebe um array `sources` de strings e retorna uma
tag `<audio>`. Cada string no array `sources` deve ser o caminho para um
arquivo de áudio de um tipo diferente (`ogg`, `mp3`, `flac`, `wav` etc.).
O navegador reproduzirá o primeiro tipo compatível; portanto, ordená-los do menor para o maior usará menos largura de banda, se esse for o objetivo.

- `sources` é um array de caminhos de arquivos. (obrigatório)
- `class` define uma classe para o áudio.
- `caption` define o texto da legenda abaixo do áudio.
- `autoplay`, quando definido, reproduz o áudio automaticamente ao carregar.
- `loop`, quando definido, reproduz o áudio em loop.
- `muted` quando definido, inicia o áudio silenciado.

*`sources` pode usar o mesmo caminho, um caminho relativo ou um caminho raiz, como o [componente img](https://abridge.pages.dev/overview-images/#img-component)*

**Classes opcionais:**

- `ci` pode ser usado para centralizar a imagem.
- `fr` pode ser usado para alinhar a imagem à direita.
- `fl` pode ser usado para alinhar a imagem à esquerda.
- `b1` pode ser usado para adicionar uma borda de 1px.

### Uso

{% raw %}
```rs
{{<audio sources={["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]}  page={page} config={config} />}}
```
{% endraw %}

### Saída

```html
{{<audio sources={["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]}  page={page} config={config} />}}
```

{{<audio sources={["over9000.ogg", "over9000.mp3"]}  page={page} config={config} />}}

### Uso

{% raw %}
```rs
{{<audio sources={["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]} class="ci b1" caption="It's Over 9000!!"  page={page} config={config} />}}
```
{% endraw %}

### Saída

```html
{{<audio sources={["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]} class="ci b1" caption="It's Over 9000!!"  page={page} config={config} />}}
```

{{<audio sources={["over9000.ogg", "over9000.mp3"]} class="ci b1" caption="It's Over 9000!!"  page={page} config={config} />}}
