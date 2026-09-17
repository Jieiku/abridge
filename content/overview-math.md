+++
date = 2021-05-05T15:00:00Z
description = "Sample article showcasing the display of Mathematical Notations, made possible by the KaTeX library."
draft = false
title = "Mathematical Notation"
updated = 2022-01-01T15:00:00Z

[extra]
keywords = "Math, Matematics, Notation, KaTeX, Mathematical Notation"
math_auto_render = true
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Components",
    "Mathematics",
]
+++
You can use [KaTeX](https://katex.org) to render mathematical notation.

Abridge automatically detects the `katex` component in rendered page or section content and loads the KaTeX files only where they are needed.

If you prefer raw `$...$` and `$$...$$` delimiters, enable the KaTeX [auto-render extension](https://katex.org/docs/autorender.html) with `math_auto_render = true`. This setting also enables the required KaTeX files.

You are better off using the component rather than the raw `$...$` and `$$...$$` delimiters because of Markdown processing in Zola. If you look at the examples toward the bottom of the page, notice that the raw-delimiter version ends up with extra commas that do not appear when the same formula is rendered using the component.

<!-- more -->

## Component Math: Automatic

Using the `katex` component is enough to enable KaTeX for that page or section. Pages without a KaTeX component do not load the KaTeX CSS or JavaScript.

## Auto Render

Raw math delimiters are intentionally opt-in because ordinary prose can contain dollar signs. Enable auto-render globally in `zola.toml`, or in the front matter of a page/section where raw delimiters are used:

```toml
[extra]
math_auto_render = true
```

The legacy `math = true` setting is still recognized for compatibility, but is no longer required for component-based math.

## Usage

Wrap any [valid](https://katex.org/docs/supported.html) $\KaTeX$ syntax with `$...$` for inline Mathematics and `$$...$$` for block Mathematics.

### Inline Mathematics

This is the most beautiful equation I've ever seen:

### Usage

{% raw %}
```rs
{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}
```
{% endraw %}

### Output

```html
{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}
```

{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}

### Block Mathematics

Some Mathematics in display mode is fair enough:

### Usage

{% raw %}
```rs
{% <katex block={true}> %} \int_0^1 x^2 dx {% </katex> %}
```
{% endraw %}

### Output

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

### Output

```html
{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}
```

{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}

### Auto Render Inline

```tex
$ e^{i\pi}+1=0 $
```

$ e^{i\pi}+1=0 $

### Auto Render Block

```tex
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
