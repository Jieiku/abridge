+++
title = "Notation mathématiques"
description = "Exemple d'article présentant l'affichage des notations mathématiques, rendu possible par la bibliothèque KaTeX."
date = 2021-05-05T15:00:00Z
updated = 2022-01-01T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Shortcodes","Mathematics"]
[extra]
math = true
math_auto_render = true
keywords = "Math, Matematics, Notation, KaTeX, Mathematical Notation"
toc = true
series = "Features"
+++

Vous pouvez utiliser [KaTeX](https://katex.org) pour rendre des notations mathématiques.

Vous pouvez activer le $\KaTeX$ prise en charge globale, par section ou par page.
<!-- more -->

## Activer globalement

Pour activer le $\KaTeX$ prise en charge dans le monde entier, ajoutez `math = true` sous `[extra]` à la `config.toml`
racine de votre site. Maintenant, le shortcode katex sera rendu, vous pouvez également ajouter `math_auto_render = true`
et chaque section et page de votre site chargera l' [extension KaTeX autorender](https://katex.org/docs/autorender.html).

```toml
[extra]
math = true
math_auto_render = false
```

## Base par section

Pour activer le $\KaTeX$ support dans une section particulière, ajoutez `math = true` sous `[extra]` dans le fichier `[SECTION_NAME]/_index.md`.
Maintenant, le shortcode katex sera rendu, vous pouvez également ajouter `math_auto_render = true`
et la section de votre site chargera l' [extension KaTeX autorender](https://katex.org/docs/autorender.html).

```toml
+++
[extra]
math = true
+++
```

## Base par page

Pour activer le $\KaTeX$ support dans une page particulière, ajouter `math = true` sous `[extra]` dans le frontmatter de la page.
Maintenant, le shortcode katex sera rendu, vous pouvez également ajouter `math_auto_render = true`
et la page de votre site chargera l' [extension KaTeX autorender](https://katex.org/docs/autorender.html).

```toml
+++
[extra]
math = true
math_auto_render = true
+++
```

C'est une bonne pratique de permettre $\KaTeX$ prise en charge par page, car cela ne chargera que les fichiers requis sur cette page particulière, sans affecter la vitesse de chargement des autres pages. Si votre site n'est pas lourd en mathématiques, veuillez ne PAS activer cette fonctionnalité globalement ou par section.

## Usage

Enveloppez tout [valide](https://katex.org/docs/supported.html) $\KaTeX$ syntaxe avec `$...$` pour les mathématiques en ligne et `$$...$$` pour les mathématiques par blocs.

### Mathématiques en ligne

C'est la plus belle équation que j'ai jamais vue:

### Usage
```rs
{%/* katex(block=false) */%} e^{i\pi}+1=0 {%/* end */%}
```
### Sortir
```html
{% katex(block=false) %} e^{i\pi}+1=0 {% end %}
```
{% katex(block=false) %} e^{i\pi}+1=0 {% end %}

### Bloquer les mathématiques

Certaines mathématiques en mode affichage sont assez justes :

### Usage
```rs
{%/* katex(block=true) */%} \int_0^1 x^2 dx {%/* end */%}
```
### Sortir
```html
{% katex(block=true) %} \int_0^1 x^2 dx {% end %}
```
{% katex(block=true) %} \int_0^1 x^2 dx {% end %}

### Rendu automatique en ligne
```tex
$ e^{i\pi}+1=0 $
```

$ e^{i\pi}+1=0 $

### Bloc de rendu automatique
```tex
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
