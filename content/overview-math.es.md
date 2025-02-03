+++
date = 2021-05-05T15:00:00Z
description = "Artículo de ejemplo que muestra la visualización de notaciones matemáticas, posible gracias a la biblioteca KaTeX."
draft = false
title = "Notación matemática"
updated = 2022-01-01T15:00:00Z

[extra]
keywords = "Math, Matematics, Notation, KaTeX, Mathematical Notation"
math = true
math_auto_render = true
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Shortcodes",
    "Mathematics",
]
+++
Puede utilizar [KaTeX](https://katex.org) para representar notaciones matemáticas.

Puede activar el soporte $\\KaTeX$ globalmente, por sección o por página.

<!-- more -->

## Habilitar globalmente

Para habilitar el soporte $\\KaTeX$ globalmente, añada `math = true` bajo `[extra]` del `config.toml`
en la raíz de su sitio. También puede añadir `math_auto_render = true`
y cada sección y página de su sitio cargará la [extensión](https://katex.org/docs/autorender.html) KaTeX [autorender](https://katex.org/docs/autorender.html).

```toml
[extra]
math = true
math_auto_render = false
```

## Base por sección

Para habilitar el soporte $\\KaTeX$ en una sección en particular, añada `math = true` bajo `[extra]` en el `[SECTION_NAME]/_index.md`.
Ahora el shortcode katex será renderizado, también puede añadir `math_auto_render = true`
y la sección de su sitio cargará la [extensión](https://katex.org/docs/autorender.html) KaTeX [autorender](https://katex.org/docs/autorender.html).

```toml
+++
[extra]
math = true
+++
```

## Por página

Para habilitar el soporte $\\KaTeX$ en una página en particular, añada `math = true` bajo `[extra]` en el frontmatter
de la página. Ahora el shortcode katex será renderizado, también puede añadir `math_auto_render = true`
y la página de su sitio cargará la [extensión](https://katex.org/docs/autorender.html) KaTeX [autorender](https://katex.org/docs/autorender.html).

```toml
+++
[extra]
math = true
math_auto_render = true
+++
```

Es una buena práctica habilitar el soporte $\\KaTeX$ por página, ya que esto sólo cargará los archivos requeridos en esa página en particular, sin afectar la velocidad de carga de otras páginas. Si su sitio no es muy matemático, por favor NO habilite esta característica globalmente o por sección.

## Uso

Envuelva cualquier sintaxis $\\KaTeX$ [válida](https://katex.org/docs/supported.html) con `$...$` para Matemáticas en línea y `$$...$$` para Matemáticas en bloque.

### Matemáticas en línea

Esta es la ecuación más bonita que he visto nunca:

### Uso

```rs
{%/* katex(block=false) */%} e^{i\pi}+1=0 {%/* end */%}
```

### Salida

```html
{% katex(block=false) %} e^{i\pi}+1=0 {% end %}
```

{% katex(block=false) %} e^{i\pi}+1=0 {% end %}

### Matemáticas en bloque

Un poco de Matemáticas en modo visualización es suficiente:

### Uso

```rs
{%/* katex(block=true) */%} \int_0^1 x^2 dx {%/* end */%}
```

### Salida

```html
{% katex(block=true) %} \int_0^1 x^2 dx {% end %}
```

{% katex(block=true) %} \int_0^1 x^2 dx {% end %}

### Auto Render Inline

```tex
$ e^{i\pi}+1=0 $
```

$ e^{i\pi}+1=0 $

### Auto Render Bloque

```tex
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
