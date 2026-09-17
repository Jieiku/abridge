+++
date = 2022-05-15T15:00:00Z
description = "Artigo de exemplo que demonstra a sintaxe básica de Markdown e a formatação de elementos HTML."
draft = false
title = "Markdown e Estilo"

[extra]
keywords = "Markdown, Estilo, Sintaxe, Realce de Sintaxe"
series = "Recursos"
toc = true

[taxonomies]
tags = [
    "Recursos",
    "Markdown",
]
+++
Este artigo apresenta uma amostra da sintaxe básica de Markdown que pode ser usada nos arquivos de conteúdo do Zola e também mostra como elementos HTML básicos são estilizados com CSS em um tema Zola.

<!-- more -->

# Títulos

Os elementos HTML `<h1>`—`<h6>` a seguir representam seis níveis de títulos de seção. `<h1>` é o nível mais alto e `<h6>` é o mais baixo.

# H1

## H2

### H3

#### H4

##### H5

###### H6

# Parágrafo

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

# Citações

O elemento blockquote representa conteúdo citado de outra fonte, opcionalmente com uma referência dentro de um elemento `footer` ou `cite`, e também pode conter alterações em linha, como anotações e abreviações.

## Citação sem atribuição

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Observação:** você pode usar *sintaxe Markdown* dentro de uma citação.

## Citação com atribuição

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

> All men by nature desire to know.<br>
> ― <cite>Aristotle[^2]</cite>

> Power comes in response to a need, not a desire.<br>
> — *Goku*

> Adapt what is useful, reject what is useless, and add what is specifically your own.<br>
> — *Bruce Lee*

# Tabelas

Tabelas não fazem parte da especificação principal do Markdown, mas o Zola oferece suporte a elas nativamente.

| Nome  | Idade |
| ----- | --- |
| Alice | 23  |
| Bob   | 27  |
| Cody  | 33  |
| John  | 59  |
| Kerry | 23  |

## Markdown em linha na tabela

| Itálico   | Negrito     | Código   | Tachado     |
| --------- | -------- | ------ | ----------------- |
| *itálico* | **negrito** | `código` | ~~tachado~~ |

## Tabela grande dentro de figure

Envolva tabelas muito grandes com `<figure></figure>` para que possam rolar horizontalmente.

<figure>

| **Fabricante** | Volkswagen | Toyota | Ford | Honda | Chevrolet | BMW | Hyundai | Audi | Nissan | Kia | Mercedes | Tesla | Mitsubishi | Suzuki | Volvo | Subaru | Mazda | Jaguar | Buick | Lexus | GMC | Porsche | Cadillac |
| ---------- | ---- | ---- | ---- | ---- | ---- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Receita US$ bi** | $254 | $249 | $127 | $124 | $123 | $113 | $88 | $83 | $74 | $61 | $55 | $54 | $38 | $31 | $30 | $28 | $27 | $22 | $21 | $19 | $17 | $16 | $12 |

</figure>

*valores de receita encontrados em mecanismo de busca e não verificados, usados apenas para demonstrar uma tabela rolável dentro de figure.*

# Texto Recolhível

<details>
    <summary>Título 1</summary>
    <p>É UM SEGREDO PARA TODO MUNDO.</p>
</details>

<details>
    <summary>Título 2</summary>
    <p>Fique um pouco e escute!</p>
</details>

# Blocos de Código

Blocos de código.. ❤️ com realce automático de sintaxe ✨‍

Consulte [a documentação](https://www.getzola.org/documentation/content/syntax-highlighting/) para ver as opções.

## Bloco de código com crases

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
```

## Números de Linha e Destaques

```html,linenos,hl_lines=5 7-9
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
```

## Código em linha

Também podemos `especificar código em linha`, o que é útil para `pequenos trechos`.

# Tipos de Lista

## Lista Ordenada

1. Primeiro item
2. Segundo item
3. Terceiro item

## Lista Não Ordenada

- Item da lista
- Outro item
- Mais um item

## Lista Aninhada

- Frutas
  - Maçã
  - Laranja
  - Banana
- Laticínios
  - Leite
  - Queijo

# Outros Elementos — abbr, sub, sup, kbd, mark, link

<abbr title="Graphics Interchange Format">GIF</abbr> é um formato de imagem bitmap.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Pressione <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> para encerrar a sessão.

A maioria das <mark>salamandras</mark> é noturna e caça insetos, vermes e outras pequenas criaturas.

-----
<!-- Note: There must be a blank line between every two lines of the footnote definition.  -->

[^1]: A citação acima foi extraída da [palestra] de Rob Pike(https://www.youtube.com/watch?v=PAAkCSZUG1c) durante a Gopherfest, em 18 de novembro de 2015.

[^2]: A citação é a primeira frase da [Metafísica] de Aristóteles(https://en.wikipedia.org/wiki/Metaphysics_(Aristotle)).

## Navegação

O menu principal do site é criado colocando o nav dentro de uma tag header. Veja o topo deste site como exemplo. A navegação é responsiva; reduza a largura da página para vê-la em ação.

## Formulários

<form name="contact" method="POST" >
    <p><label for="name">Nome</label>
        <input type="text" placeholder="Nome" id="name" required data-validation-required-message="Digite seu nome." />
    </p>
    <p><label for="email">Endereço de e-mail</label>
        <input type="email" placeholder="name@example.com" id="email" required data-validation-required-message="Digite seu endereço de e-mail." />
    </p>
    <p><label for="message">Mensagem</label>
        <textarea rows="5" placeholder="Mensagem" id="message" required data-validation-required-message="Digite uma mensagem."></textarea>
    </p>
    <div id="success"></div>
    <p><button type="submit" id="sendMessageButton">Enviar</button></p>
    <br>
    <!-- Select -->
    <label for="fruit">Fruta</label>
    <select id="fruit" required>
        <option value="" selected>Selecione uma fruta…</option>
        <option>Banana</option>
        <option>Melancia</option>
        <option>Maçã</option>
        <option>Laranja</option>
        <option>Mango</option>
    </select>
    <!-- Radios -->
    <fieldset>
        <legend>Tamanho</legend>
        <label for="small">
        <input type="radio" id="small" name="size" value="small" checked>
        Small
        </label>
        <label for="medium">
        <input type="radio" id="medium" name="size" value="medium">
        Medium
        </label>
        <label for="large">
        <input type="radio" id="large" name="size" value="large">
        Large
        </label>
        <label for="extralarge">
        <input type="radio" id="extralarge" name="size" value="extralarge" disabled>
        Extra Large
        </label>
    </fieldset>
    <!-- Checkboxes -->
    <fieldset>
        <label for="terms">
        <input type="checkbox" id="terms" name="terms">
        Concordo com os Termos e Condições
        </label>
        <label for="terms_sharing">
        <input type="checkbox" id="terms_sharing" name="terms_sharing" disabled checked>
        Concordo em compartilhar minhas informações com parceiros
        </label>
    </fieldset>
    <!-- Switches -->
    <fieldset>
        <label for="switch">
        <input type="checkbox" id="switch" name="switch" role="switch">
        Publicar no meu perfil
        </label>
        <label for="switch_disabled">
        <input type="checkbox" id="switch_disabled" name="switch_disabled" disabled checked>
        Publicar minhas conquistas no meu perfil
        </label>
    </fieldset>
    <br>
    <!-- Search -->
    <p><input type="search" id="search" name="search" placeholder="Pesquisar" title="Pesquisar" aria-label="Pesquisar"></p>
    <!-- Seletor de arquivo -->
    <label for="file">Seletor de arquivo
    <input type="file" id="file" name="file">
    </label>
    <!-- Controle deslizante -->
    <label for="range">Controle deslizante
    <input type="range" min="0" max="100" value="50" id="range" name="range">
    </label>
    <!-- Date -->
    <label for="date">Data
    <input type="date" id="date" name="date">
    </label>
    <!-- Time -->
    <label for="time">Hora
    <input type="time" id="time" name="time">
    </label>
    <!-- Color -->
    <label for="color">Cor
    <input type="color" id="color" name="color" value="#0eaaaa">
    </label>
</form>
