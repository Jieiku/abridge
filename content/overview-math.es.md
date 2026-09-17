+++
date = 2021-05-05T15:00:00Z
description = "Artículo de ejemplo que muestra la visualización de notaciones matemáticas, posible gracias a la biblioteca KaTeX."
draft = false
title = "Notación matemática"
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
Puede utilizar [KaTeX](https://katex.org) para representar notación matemática.

Abridge detecta automáticamente el component `katex` en el contenido renderizado de una página o sección y carga los archivos de KaTeX sólo donde son necesarios.

Si prefiere los delimitadores `$...$` y `$$...$$`, active la [extensión auto-render](https://katex.org/docs/autorender.html) con `math_auto_render = true`. Esta opción también activa los archivos necesarios de KaTeX.

Es preferible utilizar el componente en lugar de los delimitadores sin procesar `$...$` y `$$...$$` debido al procesamiento de Markdown en Zola. Si observas los ejemplos hacia el final de la página, notarás que la versión que utiliza los delimitadores sin procesar termina con comas adicionales que no aparecen cuando se renderiza la misma fórmula utilizando el componente.

<!-- more -->

## Matemáticas con component: automático

Usar el component `katex` es suficiente para activar KaTeX en esa página o sección. Las páginas sin un component KaTeX no cargan su CSS ni JavaScript.

## Auto Render

Los delimitadores matemáticos sin component son opcionales de forma intencionada, ya que el texto normal puede contener signos de dólar. Active auto-render globalmente en `zola.toml` o en el front matter de la página/sección que lo necesite:

```toml
[extra]
math_auto_render = true
```

La opción antigua `math = true` sigue siendo reconocida por compatibilidad, pero ya no es necesaria para las matemáticas mediante component.

## Uso

Envuelva cualquier sintaxis $\\KaTeX$ [válida](https://katex.org/docs/supported.html) con `$...$` para Matemáticas en línea y `$$...$$` para Matemáticas en bloque.

### Matemáticas en línea

Esta es la ecuación más bonita que he visto nunca:

### Uso

{% raw %}
```rs
{% <katex block={false}> %}e^{i\pi}+1=0{% </katex> %}
```
{% endraw %}

### Salida

```html
{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}
```

{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}

### Matemáticas en bloque

Un poco de Matemáticas en modo visualización es suficiente:

### Uso

{% raw %}
```rs
{% <katex block={true}> %}\int_0^1 x^2 dx{% </katex> %}
```
{% endraw %}

### Salida

```html
{% <katex block={true}> %} \int_0^1 x^2 dx {% </katex> %}
```

{% <katex block={true}> %} \int_0^1 x^2 dx {% </katex> %}

### Uso

{% raw %}
```rs
{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}
```
{% endraw %}

### Salida

```html
{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}
```

{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}

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
