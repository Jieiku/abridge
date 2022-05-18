+++
title = "Markdown Syntax Guide"
description = "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
date = 2022-05-15

[taxonomies]
categories = ["Features"]
tags = ["Markdown"]
[extra]
toc = true
+++

This article offers a sample of basic Markdown syntax that can be used in Zola content files, also it shows if basic HTML elements are decorated with CSS in a Zola theme.
<!-- more -->
## Headings

The following HTML `<h1>`—`<h6>` elements represent six levels of section
headings. `<h1>` is the highest section level while `<h6>` is the lowest.

# H1
## H2
### H3
#### H4
##### H5
###### H6

## Paragraph

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum,
voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma
dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as
cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin
porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur?
Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit
ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda
veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore
eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata
tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne
sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Blockquotes

The blockquote element represents content that is quoted from another source,
optionally with a citation which must be within a `footer` or `cite` element,
and optionally with in-line changes such as annotations and abbreviations.

#### Blockquote without attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use *Markdown syntax* within a blockquote.

#### Blockquote with attribution

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

> All men by nature desire to know.<br>
> ― <cite>Aristotle[^2]</cite>

## Tables

Tables aren't part of the core Markdown spec, but Zola supports them
out-of-the-box.

   Name | Age
--------|------
  Alice | 23
    Bob | 27
   Cody | 33
   John | 59
  Kerry | 23

#### Inline Markdown within tables

| Italics   | Bold     | Code   | StrikeThrough     |
| --------  | -------- | ------ | ----------------- |
| *italics* | **bold** | `code` | ~~strikethrough~~ |

## Foldable Text

<details>
    <summary>Title 1</summary>
    <p>IT'S A SECRET TO EVERYBODY.</p>
</details>

<details>
    <summary>Title 2</summary>
    <p>Stay awhile, and listen!</p>
</details>

## Code Blocks

Code blocks.. ❤️ with automatic syntax highlighting ✨‍

See [the docs](https://www.getzola.org/documentation/content/syntax-highlighting/) for options.

#### Code block with backticks

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

#### Inline Code block

If we want, we can also `specify inline code` which is useful for `the small stuff`.

## List Types

#### Ordered List

1. First item
2. Second item
3. Third item

#### Unordered List

- List item
- Another item
- And another item

#### Nested list

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Other Elements — abbr, sub, sup, kbd, mark, link

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the
session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and
other small creatures.

---
<!-- Note: There must be a blank line between every two lines of the footnote difinition.  -->
[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c)
during Gopherfest, November 18, 2015.

[^2]: The quote is the first sentence of Aristotle's [Metaphysics](https://en.wikipedia.org/wiki/Metaphysics_(Aristotle)).
