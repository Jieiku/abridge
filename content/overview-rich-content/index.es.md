+++
date = 2021-05-15T15:00:00Z
description = "Una breve descripción de Shortcodes personalizados para Zola que implementan elementos html modernos: video, imagen, gif, audio."
draft = false
title = "Contenido enriquecido"

[extra]
keywords = "Images, Videos, Audio, Gif, Rich Content, Shortcodes"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Video",
    "Audio",
    "Images",
    "Shortcodes",
]
+++
Se incluyen varios shortcodes personalizados para aumentar CommonMark. `video` los shortcodes `image`, `gif` y `audio` se crearon para ayudarle a aprovechar los elementos HTML modernos en sus escritos.

<!-- more -->

## Vídeo

- `sources` es una matriz de rutas de archivos de vídeo. (obligatorio)
- `class` establece una clase para el vídeo.
- `caption` establece el texto del pie de foto debajo del vídeo.
- `w` define la anchura del vídeo.
- `h` define la altura del vídeo.
- `autoplay` si está activado, el vídeo se reproduce automáticamente al cargarse.
- `loop` si está activado, reproduce el vídeo en bucle.
- `muted` cuando está activado, silencia el audio inicialmente.
- `playsinline` si está configurado, reproduce el vídeo incrustado en lugar de a pantalla completa en navegadores móviles.

*Las fuentes pueden ser la misma ruta, la ruta relativa o la ruta raíz, como el [shortcode img](https://abridge.pages.dev/overview-images/#img-shortcode)*

**Clases opcionales:**

- `ci` se puede utilizar para centrar la imagen.
- `fr` se puede utilizar para flotar la imagen a la derecha.
- `fl` se puede utilizar para flotar la imagen a la izquierda.
- `b1` se puede utilizar para añadir un borde de 1px.

### Uso

```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```

### Salida

```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```

{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

### Uso

```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="¡Son más de 9000!") */}}
```

### Salida

```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="¡Son más de 9000!") }}
```

{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") }}

## Imagen

El shortcode `image` devuelve una etiqueta `<picture>` con múltiples fuentes.

Cada cadena en la matriz `sources` debe ser una ruta a un archivo de imagen de un tipo diferente (`avif`, `webp`, `png`, `jpg`, etc).
La última imagen en la matriz `sources` se utiliza para crear una etiqueta `<img>` para que el navegador recurra a ella si los otros formatos aún no son compatibles.

- `sources` es una matriz de rutas de archivos de imagen. (obligatorio)
- `class` establece una clase para la imagen.
- `caption` establece el texto del pie de foto debajo de la imagen.
- `w` establece el ancho de la imagen.
- `h` establece la altura de la imagen.

*Las fuentes pueden ser la misma ruta, la ruta relativa o la ruta raíz, como el [shortcode img](https://abridge.pages.dev/overview-images/#img-shortcode)*

**Clases opcionales:**

- `ci` se puede utilizar para centrar la imagen.
- `fr` se puede utilizar para flotar la imagen a la derecha.
- `fl` se puede utilizar para flotar la imagen a la izquierda.
- `b1` se puede utilizar para añadir un borde de 1px.

### Uso

```rs
{{/* image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="¡ES MÁS DE 9000!") */}}
```

### Salida

```html
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="¡ES MÁS DE 9000!") }}
```

{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="ITS OVER 9000!") }}

## GIF

El shortcode `gif` es exactamente igual que el [shortcode video](#video).
La única diferencia es que automáticamente tiene las propiedades adicionales: `autoplay`, `loop`, `muted`, `playsinline`.

El uso de la etiqueta `<video>` en lugar de gifs permite reducir el tamaño de los archivos,
lo cual es especialmente importante en regiones donde Internet es más lento o
menos fiable.

### Utilización

```rs
{{/* gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```

### Salida

```html
{{ gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```

{{ gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

## Audio

El shortcode `audio` toma una matriz `sources` de cadenas y devuelve una etiqueta
`<audio>`. Cada cadena de la matriz `sources` debe ser una ruta a un archivo de audio
de un tipo diferente (`ogg`, `mp3`, `flac`, `wav`, etc).
El navegador reproducirá el primer tipo que admita, por lo que colocarlos en orden de menor a mayor tamaño utilizará el menor ancho de banda si ese es su objetivo.

- `sources` es un array de rutas de archivos. (obligatorio)
- `class` establece una clase para el audio.
- `caption` establece el texto del título debajo del audio.
- `autoplay` cuando se establece, reproduce automáticamente el audio al cargar.
- `loop` cuando se establece, reproduce el audio en bucle.
- `muted` cuando se establece, establece el audio silenciado inicialmente.

*Las fuentes pueden ser la misma ruta, la ruta relativa o la ruta raíz, como el [shortcode img](https://abridge.pages.dev/overview-images/#img-shortcode)*

**Clases opcionales:**

- `ci` se puede utilizar para centrar la imagen.
- `fr` se puede utilizar para flotar la imagen a la derecha.
- `fl` se puede utilizar para flotar la imagen a la izquierda.
- `b1` se puede utilizar para añadir un borde de 1px.

### Uso

```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) */}}
```

### Salida

```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) }}
```

{{ audio(sources=["over9000.ogg", "over9000.mp3"]) }}

### Uso

```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"] class="ci b1" caption="¡Son más de 9000!!") */}}
```

### Salida

```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"] class="ci b1" caption="¡Son más de 9000!") }}
```

{{ audio(sources=["over9000.ogg", "over9000.mp3"] class="ci b1" caption="It's Over 9000!!") }}
