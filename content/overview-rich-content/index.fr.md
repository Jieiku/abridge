+++
title = "Contenu riche"
description = "Une brève description des Shortcodes personnalisés pour Zola qui implémentent des éléments html modernes : vidéo, image, gif, audio."
date = 2021-05-15
draft = false

[taxonomies]
tags = ["Features","Video","Audio","Images","Shortcodes"]
[extra]
keywords = "Images, Videos, Audio, Gif, Rich Content, Shortcodes"
toc = true
series = "Features"
+++

Plusieurs codes abrégés personnalisés sont inclus pour augmenter CommonMark (avec l'aimable autorisation du [theme d3c3nt](https://d3c3nt.figbert.com/posts/rich-content/)). `video`, `image`, `gif`, et `audio` ont été créés pour vous aider à tirer parti des éléments HTML modernes dans votre écriture.

<!-- more -->

## Vidéo

Le `video` shortcode prend un `sources` paramètre (un tableau de chaînes) et renvoie une `<video>` balise. Chaque chaîne du `sources` tableau doit être un chemin vers un fichier vidéo d'un type différent (`webm`, `mp4`, etc). Chaque source individuelle est ensuite convertie en `<source>` balise et l'élément est renvoyé.

### Usage
```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```
### Sortir
```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

## Image

Le `image` shortcode renvoie une `<picture>` balise et accepte trois paramètres : `sources` (un tableau de chaînes), `fallback_path`, et `fallback_alt` (les deux chaînes).

Chaque chaîne du `sources` tableau doit être un chemin vers un fichier image d'un type différent (`avif`, `webp`, `png`, `jpg`, etc). `fpath` et
`falt` sont utilisés pour créer une `<img>` balise sur laquelle le navigateur peut se replier si les autres formats ne sont pas encore pris en charge, fw et fh définissent la largeur et la hauteur de la solution de repli

### Usage
```rs
{{/* image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif"], fpath="over9000-640.webp", fw=640, fh=480, falt="ITS OVER 9000!") */}}
```
### Sortir
```html
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif"], fpath="over9000-640.webp", fw=640, fh=480, falt="ITS OVER 9000!") }}
```
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif"], fpath="over9000-640.webp", fw=640, fh=480, falt="ITS OVER 9000!") }}

## GIF

Le `gif` shortcode est exactement le même que le [shortcode vidéo][#video]
– il prend un tableau de chaînes appelées `sources` et renvoie une `<video>` balise. La seule différence réside dans la balise la plus à l'extérieur, qui a quatre propriétés supplémentaires : `autoplay`, `loop`, `muted`, `playsinline`.

L'utilisation de la `<video>` balise à la place des gifs permet de réduire la taille des fichiers, ce qui est particulièrement important dans les régions où Internet est plus lent ou moins fiable.

### Usage
```rs
{{/* gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```
### Sortir
```html
{{ gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```
{{ gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

## l'audio

Le `audio` shortcode prend un `sources` tableau de chaînes et renvoie une `<audio>` balise. Chaque chaîne du `sources` tableau doit être un chemin vers un fichier audio d'un type différent (`ogg`, `mp3`, `flac`, `wav`, etc). Le navigateur jouera le premier type qu'il prend en charge, donc les placer dans l'ordre de la taille la plus petite à la plus grande utilisera le moins de bande passante si tel est votre objectif.

### Usage
```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) */}}
```
### Sortir
```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) }}
```
{{ audio(sources=["over9000.ogg", "over9000.mp3"]) }}
