+++
date = 2021-05-15T15:00:00Z
description = "Une brève description des shortcodes personnalisés pour Zola qui mettent en œuvre des éléments html modernes : vidéo, image, gif, audio."
draft = false
title = "Un contenu riche"

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
Plusieurs shortcodes personnalisés sont inclus pour améliorer CommonMark. `video` les shortcodes `image`, `gif` et `audio` ont été créés pour vous aider à tirer parti des éléments HTML modernes dans vos écrits.

<!-- more -->

## Vidéo

- `sources` est un tableau de chemins d'accès aux fichiers vidéo. (obligatoire)
- `class` définit une classe pour la vidéo.
- `caption` définit le texte de la légende sous la vidéo.
- `w` définit la largeur de la vidéo.
- `h` définit la hauteur de la vidéo.
- `autoplay` lorsque cette option est activée, la vidéo s'affiche automatiquement au chargement.
- `loop` lorsque cette option est activée, la vidéo est lue en boucle.
- `muted` lorsque cette option est activée, le son est initialement coupé.
- `playsinline` lorsque cette option est activée, la vidéo est lue en mode intégré plutôt qu'en mode plein écran sur les navigateurs mobiles.

*les sources peuvent être le même chemin, le chemin relatif ou le chemin racine, comme le [shortcode img](https://abridge.pages.dev/overview-images/#img-shortcode)*

**Classes optionnelles :**

- `ci` peut être utilisé pour centrer l'image.
- `fr` peut être utilisé pour faire flotter l'image à droite.
- `fl` peut être utilisé pour faire flotter l'image à gauche.
- `b1` peut être utilisé pour ajouter une bordure de 1px.

### Utilisation

```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```

### Sortie

```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```

{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

### Utilisation

```rs
{{/* video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") */}}
```

### Sortie

```html
{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") }}
```

{{ video(sources=["over9000_av1.mp4", "over9000_vp9.webm"] muted="true" class="ci b1" caption="It's Over 9000!!") }}

## Image

Le shortcode `image` renvoie une balise `<picture>` avec plusieurs sources.

Chaque chaîne du tableau `sources` doit être un chemin vers un fichier image d'un type différent (`avif`, `webp`, `png`, `jpg`, etc).
La dernière image du tableau `sources` est utilisée pour créer une balise `<img>` sur laquelle le navigateur peut se rabattre si les autres formats ne sont pas encore pris en charge.

- `sources` est un tableau de chemins d'accès aux fichiers d'images. (obligatoire)
- `class` définit une classe pour l'image.
- `caption` définit le texte de la légende sous l'image.
- `w` définit la largeur de l'image.
- `h` définit la hauteur de l'image.

*les sources peuvent être le même chemin, le chemin relatif ou le chemin racine, comme le [shortcode img](https://abridge.pages.dev/overview-images/#img-shortcode)*

**Classes optionnelles :**

- `ci` peut être utilisé pour centrer l'image.
- `fr` peut être utilisé pour faire flotter l'image à droite.
- `fl` peut être utilisé pour faire flotter l'image à gauche.
- `b1` peut être utilisé pour ajouter une bordure de 1px.

### Utilisation

```rs
{{/* image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="ITS OVER 9000!") */}}
```

### Sortie

```html
{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="ITS OVER 9000!") }}
```

{{ image(sources=["over9000-960.avif", "over9000-640.avif", "over9000-400.avif", "over9000-640.webp"] w=640 h=480 alt="ITS OVER 9000!") }}

## GIF

Le shortcode `gif` est exactement le même que le [shortcode vidéo](#video).
La seule différence est qu'il possède automatiquement les propriétés supplémentaires : `autoplay`, `loop`, `muted`, `playsinline`.

L'utilisation de la balise `<video>` à la place des gifs permet de réduire la taille des fichiers,
, ce qui est particulièrement important dans les régions où l'internet est plus lent ou
moins fiable.

### Utilisation

```rs
{{/* gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) */}}
```

### Sortie

```html
{{ gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}
```

{{ gif(sources=["over9000_av1.mp4", "over9000_vp9.webm"]) }}

## Audio

Le shortcode `audio` prend un tableau de chaînes `sources` et renvoie une balise
`<audio>`. Chaque chaîne du tableau `sources` doit être un chemin vers un fichier audio
d'un type différent (`ogg`, `mp3`, `flac`, `wav`, etc).
Le navigateur lira le premier type qu'il prend en charge, donc les placer dans l'ordre de la taille la plus petite à la plus grande utilisera le moins de bande passante si c'est votre objectif.

- `sources` est un tableau de chemins d'accès aux fichiers. (obligatoire)
- `class` définit une classe pour l'audio.
- `caption` définit le texte de la légende sous l'audio.
- `autoplay` lorsque cette option est activée, l'audio s'affiche automatiquement au chargement.
- `loop` lorsque cette option est activée, l'audio est lu en boucle.
- `muted` lorsqu'il est défini, met l'audio en sourdine au départ.

*les sources peuvent être le même chemin, un chemin relatif ou le chemin de la racine, comme le [shortcode img](https://abridge.pages.dev/overview-images/#img-shortcode)*

**Classes optionnelles :**

- `ci` peut être utilisé pour centrer l'image.
- `fr` peut être utilisé pour faire flotter l'image à droite.
- `fl` peut être utilisé pour faire flotter l'image à gauche.
- `b1` peut être utilisé pour ajouter une bordure de 1px.

### Utilisation

```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) */}}
```

### Sortie

```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"]) }}
```

{{ audio(sources=["over9000.ogg", "over9000.mp3"]) }}

### Utilisation

```rs
{{/* audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"] class="ci b1" caption="It's Over 9000!!") */}}
```

### Sortie

```html
{{ audio(sources=["over9000.ogg", "over9000.mp3", "over9000.flac", "over9000.wav"] class="ci b1" caption="It's Over 9000!!") }}
```

{{ audio(sources=["over9000.ogg", "over9000.mp3"] class="ci b1" caption="It's Over 9000!!") }}
