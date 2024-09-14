+++
title = "Vimeo intégrées"
description = "Exemple d'article présentant un code abrégé Zola personnalisé pour intégrer des vidéos Vimeo dans vos pages."
date = 2021-05-07T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Shortcodes","Video"]
[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Vimeo"
toc = true
series = "Features"
+++

Zola a de nombreux shortcodes, et de nouveaux sont facilement ajoutés, cet exemple montre vimeo.
<!-- more -->

## Vimeo

### Usage

```rs
{{/* vimeo(id="514402648") */}}
```

- `id`: l'identifiant de la vidéo (obligatoire)
- `class`: une classe à ajouter au &lt;div&gt; entourant l'iframe (optionnel)
- `autoplay`: lorsqu'il est défini sur "true", la vidéo se lance automatiquement au chargement (facultatif)
- `loop`: lorsqu'il est défini sur "true", la vidéo est lue en boucle (optionnel)
- `noautopause`: lorsqu'il est défini sur "true", la vidéo ne s'arrêtera pas automatiquement (optionnel)
- `title` - définir le titre alt pour l'iframe (facultatif, par défaut sur "Vimeo")
- `cookie` - défini sur "true" si vous voulez des cookies de suivi, sinon il est par défaut sur false.

### Output

```html
{{ vimeo(id="514402648") }}
```
{{ vimeo(id="514402648") }}
