+++
title = "Streamable intégrées"
description = "Exemple d'article présentant un code abrégé Zola personnalisé pour intégrer des vidéos Streamable dans vos pages."
date = 2021-05-06T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Shortcodes","Video"]
[extra]
keywords = "Video, Shortcodes, Embed, Embedded, Streamable"
toc = true
series = "Features"
+++

Zola a de nombreux shortcodes, et de nouveaux sont facilement ajoutés, cet exemple montre streamable.
<!-- more -->

## Streamable

### Usage

```rs
{{/* streamable(id="92ok4") */}}
```

- `id`: l'identifiant de la vidéo (obligatoire)
- `class`: une classe à ajouter au &lt;div&gt; entourant l'iframe (optionnel)
- `title` - définir le titre alt pour l'iframe (facultatif, par défaut sur "Streamable")

### Output

```html
{{ streamable(id="92ok4") }}
```
{{ streamable(id="92ok4") }}
