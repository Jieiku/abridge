+++
date = 2021-05-05T15:00:00Z
description = "Artigo de exemplo que demonstra a exibição de notações matemáticas, possibilitada pela biblioteca KaTeX."
draft = false
title = "Notação Matemática"
updated = 2022-01-01T15:00:00Z

[extra]
keywords = "Math, Matematics, Notation, KaTeX, Notação Matemática"
math_auto_render = true
series = "Recursos"
toc = true

[taxonomies]
tags = [
    "Recursos",
    "Componentes",
    "Matemática",
]
+++
Você pode usar [KaTeX](https://katex.org) para renderizar notação matemática.

O Abridge detecta automaticamente o componente `katex` no conteúdo renderizado de páginas ou seções e carrega os arquivos do KaTeX somente onde são necessários.

Se preferir os delimitadores brutos `$...$` e `$$...$$`, ative a [extensão de renderização automática](https://katex.org/docs/autorender.html) do KaTeX com `math_auto_render = true`. Essa configuração também ativa os arquivos necessários do KaTeX.

É preferível usar o componente em vez dos delimitadores brutos `$...$` e `$$...$$` por causa do processamento de Markdown no Zola. Nos exemplos no final da página, observe que a versão com delimitadores brutos acaba com vírgulas extras que não aparecem quando a mesma fórmula é renderizada pelo componente.

<!-- more -->

## Matemática por Componente: Automática

Usar o componente `katex` é suficiente para ativar o KaTeX nessa página ou seção. Páginas sem um componente KaTeX não carregam o CSS nem o JavaScript do KaTeX.

## Renderização Automática

Os delimitadores matemáticos brutos são opcionais de propósito, pois textos comuns podem conter sinais de dólar. Ative a renderização automática globalmente em `zola.toml` ou no front matter de uma página/seção que use delimitadores brutos:

```toml
[extra]
math_auto_render = true
```

A configuração legada `math = true` ainda é reconhecida por compatibilidade, mas não é mais necessária para matemática baseada em componentes.

## Uso

Wrap any [valid](https://katex.org/docs/supported.html) $\KaTeX$ syntax with `$...$` for inline Matemática and `$$...$$` for block Matemática.

### Inline Matemática

Esta é a equação mais bonita que já vi:

### Uso

{% raw %}
```rs
{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}
```
{% endraw %}

### Saída

```html
{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}
```

{% <katex block={false}> %} e^{i\pi}+1=0 {% </katex> %}

### Block Matemática

Some Matemática in display mode is fair enough:

### Uso

{% raw %}
```rs
{% <katex block={true}> %} \int_0^1 x^2 dx {% </katex> %}
```
{% endraw %}

### Saída

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

### Saída

```html
{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}
```

{% <katex block={true}> %} f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi {% </katex> %}

### Renderização Automática Inline

```tex
$ e^{i\pi}+1=0 $
```

$ e^{i\pi}+1=0 $

### Renderização Automática Block

```tex
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
