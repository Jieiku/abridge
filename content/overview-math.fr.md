+++
date = 2021-05-05T15:00:00Z
description = "Exemple d'article présentant l'affichage des notations mathématiques, rendu possible par la bibliothèque KaTeX."
draft = false
title = "Notation mathématiques"
updated = 2022-01-01T15:00:00Z

[extra]
keywords = "Math, Matematics, Notation, KaTeX, Mathematical Notation"
math_auto_render = true
series = "Fonctionnalités"
toc = true

[taxonomies]
tags = [
    "Fonctionnalités",
    "Composants",
    "Mathématiques",
]
+++
Vous pouvez utiliser [KaTeX](https://katex.org) pour afficher des notations mathématiques.

Abridge détecte automatiquement le component `katex` dans le contenu rendu d'une page ou d'une section et ne charge les fichiers KaTeX que lorsqu'ils sont nécessaires.

Si vous préférez les délimiteurs `$...$` et `$$...$$`, activez l'[extension auto-render](https://katex.org/docs/autorender.html) avec `math_auto_render = true`. Cette option active également les fichiers KaTeX nécessaires.

Il est préférable d’utiliser le composant plutôt que les délimiteurs bruts `$...$` et `$$...$$` en raison du traitement Markdown effectué par Zola. Si vous regardez les exemples vers le bas de la page, vous remarquerez que la version utilisant les délimiteurs bruts se retrouve avec des virgules supplémentaires qui n’apparaissent pas lorsque la même formule est rendue à l’aide du composant.

<!-- more -->

## Mathématiques avec component : automatique

L'utilisation du component `katex` suffit pour activer KaTeX sur cette page ou section. Les pages sans component KaTeX ne chargent ni son CSS ni son JavaScript.

## Auto Render

Les délimiteurs mathématiques bruts restent volontairement optionnels, car du texte ordinaire peut contenir des signes dollar. Activez auto-render globalement dans `zola.toml`, ou dans le front matter de la page/section concernée :

```toml
[extra]
math_auto_render = true
```

L'ancien réglage `math = true` reste reconnu pour compatibilité, mais n'est plus nécessaire pour les mathématiques utilisant le component.

## Usage

Enveloppez tout [valide](https://katex.org/docs/supported.html) $\KaTeX$ syntaxe avec `$...$` pour les mathématiques en ligne et `$$...$$` pour les mathématiques par blocs.

### Mathématiques en ligne

C'est la plus belle équation que j'ai jamais vue:

### Usage

{% raw %}
```rs
{% <katex block={false}> %}e^{i\pi}+1=0{% </katex> %}
```
{% endraw %}

### Sortir

```html
{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}
```

{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}

### Bloquer les mathématiques

Certaines mathématiques en mode affichage sont assez justes :

### Usage

{% raw %}
```rs
{% <katex block={true}> %}\int_0^1 x^2 dx{% </katex> %}
```
{% endraw %}

### Sortir

```html
{% <katex block={true}> %} \int_0^1 x^2 dx {% </katex> %}
```

{% <katex block={true}> %} \int_0^1 x^2 dx {% </katex> %}

### Usage

{% raw %}
```rs
{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}
```
{% endraw %}

### Sortir

```html
{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}
```

{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}

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
