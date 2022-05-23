+++
title = "Mathematical Notations"
date = 2021-05-05
updated = 2022-01-01
[taxonomies]
categories = ["Features"]
tags = ["shortcodes","Mathematics"]
[extra]
math = true
math_auto_render = true
+++

You can use [KaTeX](https://katex.org) to render mathematical notations.

You can enable the $\KaTeX$ support globally, per-section or per-page basis.
<!-- more -->
## Enable Globally

To enable the $\KaTeX$ support globally, add `math = true` under `[extra]` of the `config.toml`
at your site root. Now the katex shortcode will be rendered, you can also add `math_auto_render = true`
and every section and page of your site will load the KaTeX [autorender extension](https://katex.org/docs/autorender.html).

```toml
[extra]
math = true
math_auto_render = true
```

## Per-section Basis

To enable the $\KaTeX$ support in a particular section, add `math = true` under `[extra]` in the `[SECTION_NAME]/_index.md`.
Now the katex shortcode will be rendered, you can also add `math_auto_render = true`
and the section of your site will load the KaTeX [autorender extension](https://katex.org/docs/autorender.html).

```toml
+++
[extra]
math = true
+++
```

## Per-page Basis

To enable the $\KaTeX$ support in a particular page, add `math = true` under `[extra]` in the page's
frontmatter. Now the katex shortcode will be rendered, you can also add `math_auto_render = true`
and the page of your site will load the KaTeX [autorender extension](https://katex.org/docs/autorender.html).

```toml
+++
[extra]
math = true
math_auto_render = true
+++
```

It is a good practice to enable $\KaTeX$ support on a per-page basis, since this will only load the
required files on that particular page, without affecting the page load speed of other pages.
If your site is not math-heavy, please do NOT enable this feature globally or per-section basis.

## Usage

Wrap any [valid](https://katex.org/docs/supported.html) $\KaTeX$ syntax with `$...$` for inline
Mathematics and `$$...$$` for block Mathematics.

### Inline Mathematics

This is the most beautiful equation I've ever seen:

### Usage
```rs
{%/* katex(block=false) */%} e^{i\pi}+1=0 {%/* end */%}
```
### Output
```html
{% katex(block=false) %} e^{i\pi}+1=0 {% end %}
```
{% katex(block=false) %} e^{i\pi}+1=0 {% end %}

### Block Mathematics

Some Mathematics in display mode is fair enough:

### Usage
```rs
{%/* katex(block=true) */%} \int_0^1 x^2 dx {%/* end */%}
```
### Output
```html
{% katex(block=true) %} \int_0^1 x^2 dx {% end %}
```
{% katex(block=true) %} \int_0^1 x^2 dx {% end %}

### Auto Render Inline Example
```
$ e^{i\pi}+1=0 $
```

$ e^{i\pi}+1=0 $

### Auto Render Block Example
```
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
