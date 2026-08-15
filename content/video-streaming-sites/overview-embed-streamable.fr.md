+++
date = 2021-05-06T15:00:00Z
description = "Exemple d'article présentant un code abrégé Zola personnalisé pour intégrer des vidéos Streamable dans vos pages."
draft = false
title = "Streamable intégrées"

[extra]
keywords = "Video, Components, Embed, Embedded, Streamable"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Components",
    "Video",
]
+++
Zola a de nombreux components, et de nouveaux sont facilement ajoutés, cet exemple montre streamable.

<!-- more -->

## Streamable

### Usage

{% raw %}
```rs
{{<streamable id="92ok4" />}}
```
{% endraw %}

- `id` - l'identifiant de la vidéo (obligatoire)
- `class` - une classe à ajouter au &lt;div&gt; entourant l'iframe (optionnel)
- `title` - définir le titre alt pour l'iframe (facultatif, par défaut sur "Streamable")

### Output

```html
{{<streamable id="92ok4" />}}
```

{{<streamable id="92ok4" />}}
