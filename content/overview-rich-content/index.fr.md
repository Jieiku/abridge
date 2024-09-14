+++
title = "Contenu riche"
description = "Une brève description des Shortcodes personnalisés pour Zola qui implémentent des éléments html modernes : vidéo, image, gif, audio."
date = 2021-05-15T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Video","Audio","Images","Shortcodes"]
[extra]
keywords = "Images, Videos, Audio, Gif, Rich Content, Shortcodes"
toc = true
series = "Features"
+++

Plusieurs codes abrégés personnalisés sont inclus pour augmenter CommonMark. `video`, `image`, `gif`, et `audio` ont été créés pour vous aider à tirer parti des éléments HTML modernes dans votre écriture.

<!-- more -->

## Vidéo

- `sources` sont un tableau de chemins de fichiers vidéo. (obligatoire)
- `class` définit une classe pour la vidéo.
- `caption` définit le texte de la légende sous la vidéo.
- `w` définit la largeur de la vidéo.
- `h` définit la hauteur de la vidéo.
- `autoplay` lorsqu'il est défini sur "true", lit automatiquement la vidéo au chargement.
- `loop` lorsqu'il est défini sur "true", lit la vidéo en boucle.
- `muted` lorsqu'il est défini sur "true", règle le son initialement coupé.

** les sources peuvent être le même chemin, un chemin relatif ou un chemin racine, comme le [img shortcode](https://abridge.pages.dev/overview-images/#img-shortcode) **

**Cours optionnels:**

- `ci` peut être utilisé pour centrer l'image.
- `fr` peut être utilisé pour faire flotter l'image à droite.
- `fl` peut être utilisé pour faire flotter l'image vers la gauche.
- `b1` peut être utilisé pour ajouter une bordure de 1px.

### Usage
```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```
### Sortir
```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

### Usage
```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") */}}
```
### Sortir
```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") }}
```
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") }}

## Image

Le shortcode `image` renvoie une balise `<picture>` avec plusieurs sources.

Chaque chaîne du tableau `sources` doit être un chemin vers un fichier image d'un type différent (`avif`, `webp`, `png`, `jpg`, etc.).
 La dernière image du tableau `sources` est utilisée pour créer une balise `<img>` sur laquelle le navigateur pourra s'appuyer si les autres formats ne sont pas encore pris en charge.

- `sources` sont un tableau de chemins de fichiers image. (obligatoire)
- `class` définit une classe pour l'image.
- `caption` définit le texte de la légende sous l'image.
- `w` définit la largeur de l'image.
- `h` définit la hauteur de l'image.

** les sources peuvent être le même chemin, un chemin relatif ou un chemin racine, comme le [img shortcode](https://abridge.pages.dev/overview-images/#img-shortcode) **

**Cours optionnels:**

- `ci` peut être utilisé pour centrer l'image.
- `fr` peut être utilisé pour faire flotter l'image à droite.
- `fl` peut être utilisé pour faire flotter l'image vers la gauche.
- `b1` peut être utilisé pour ajouter une bordure de 1px.

### Usage
```rs
{{/* image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"], w=640, h=480, alt="ITS OVER 9000!") */}}
```
### Sortir
```html
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"], w=640, h=480, alt="ITS OVER 9000!") }}
```
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"], w=640, h=480, alt="ITS OVER 9000!") }}

## GIF

Le `gif` shortcode est exactement le même que le [shortcode vidéo][#video].
 La seule différence est qu'il possède automatiquement les propriétés supplémentaires: `autoplay`, `loop`, `muted`, `playsinline`.

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

- `sources` est un tableau de chemins de fichiers. (obligatoire)
- `class` définit une classe pour l'audio.
- `caption` définit le texte de la légende sous l'audio.
- `autoplay` lorsqu'il est défini, lit automatiquement l'audio au chargement.
- `loop` lorsqu'il est défini, lit l'audio en boucle.
- `muted` lorsqu'il est défini, définit le son initialement coupé.

** les sources peuvent être le même chemin, un chemin relatif ou un chemin racine, comme le [img shortcode](https://abridge.pages.dev/overview-images/#img-shortcode) **

**Cours optionnels:**

- `ci` peut être utilisé pour centrer l'image.
- `fr` peut être utilisé pour faire flotter l'image à droite.
- `fl` peut être utilisé pour faire flotter l'image vers la gauche.
- `b1` peut être utilisé pour ajouter une bordure de 1px.

### Usage
```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) */}}
```
### Sortir
```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) }}
```
{{ audio(sources=["over9000.ogg", "over9000.mp3"]) }}

### Usage
```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"] class="ci b1" caption="It's Over 9000!!") */}}
```
### Sortir
```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"] class="ci b1" caption="It's Over 9000!!") }}
```
{{ audio(sources=["over9000.ogg", "over9000.mp3"] class="ci b1" caption="It's Over 9000!!") }}
