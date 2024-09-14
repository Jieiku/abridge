+++
title = "Youtube intégrées"
description = "Exemple d'article présentant un code court Zola personnalisé pour intégrer des vidéos Youtube dans vos pages."
date = 2021-05-08T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Shortcodes","Video"]
[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Youtube"
toc = true
series = "Features"
+++

Zola a de nombreux shortcodes, et de nouveaux sont facilement ajoutés, cet exemple montre youtube.
<!-- more -->

## Youtube

### Usage

```rs
{{/* youtube(id="32gyFIWecuw") */}}
```

- `id`: l'identifiant de la vidéo (obligatoire)
- `playlist`: l'identifiant de la playlist (optionnel)
- `class`: une classe à ajouter au &lt;div&gt; entourant l'iframe (optionnel)
- `autoplay`: lorsqu'il est défini sur "true", la vidéo se lance automatiquement au chargement (facultatif)
- `title` - définir le titre alt pour l'iframe (facultatif, par défaut sur "Youtube")
- `cookie` - défini sur "true" si vous voulez des cookies de suivi, sinon il est par défaut sur false.

### Output

```html
{{ youtube(id="32gyFIWecuw") }}
```
{{ youtube(id="32gyFIWecuw") }}
