+++
title = "Markdown and Style"
description = "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
date = 2022-05-15T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Markdown"]
[extra]
keywords = "Markdown, Style, Syntax, Syntax Highlighting"
toc = true
series = "Features"
+++

This article offers a sample of basic Markdown syntax that can be used in Zola content files, also it shows if basic HTML elements are decorated with CSS in a Zola theme.
<!-- more -->
# Headings

The following HTML `<h1>`—`<h6>` elements represent six levels of section
headings. `<h1>` is the highest section level while `<h6>` is the lowest.

# H1
## H2
### H3
#### H4
##### H5
###### H6

# Paragraph

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

# Blockquotes

The blockquote element represents content that is quoted from another source,
optionally with a citation which must be within a `footer` or `cite` element,
and optionally with in-line changes such as annotations and abbreviations.

## Blockquote no attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use *Markdown syntax* within a blockquote.

## Blockquote attribution

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

> All men by nature desire to know.<br>
> ― <cite>Aristotle[^2]</cite>

> Power comes in response to a need, not a desire.<br>
> — *Goku*

# Tables

Tables aren't part of the core Markdown spec, but Zola supports them
out-of-the-box.

   Name | Age
--------|------
  Alice | 23
    Bob | 27
   Cody | 33
   John | 59
  Kerry | 23

## Table Inline Markdown

| Italics   | Bold     | Code   | StrikeThrough     |
| --------  | -------- | ------ | ----------------- |
| *italics* | **bold** | `code` | ~~strikethrough~~ |


## Large table within figure

Surround very Large tables with `<figure></figure>` so they can scroll horizontally.
<figure>

| **Manufacturer** | Volkswagen | Toyota | Ford | Honda | Chevrolet | BMW | Hyundai | Audi | Nissan | Kia | Mercedes | Tesla | Mitsubishi | Suzuki | Volvo | Subaru | Mazda | Jaguar | Buick | Lexus | GMC | Porsche | Cadillac |
| ---------- | ---- | ---- | ---- | ---- | ---- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Revenue $B** | $254 | $249 | $127 | $124 | $123 | $113 | $88 | $83 | $74 | $61 | $55 | $54 | $38 | $31 | $30 | $28 | $27 | $22 | $21 | $19 | $17 | $16 | $12 |

</figure>
*revenue values found on search engine and not verified, for figure scroller table demonstration purposes only.*

# Foldable Text

<details>
    <summary>Title 1</summary>
    <p>IT'S A SECRET TO EVERYBODY.</p>
</details>

<details>
    <summary>Title 2</summary>
    <p>Stay awhile, and listen!</p>
</details>

# Code Blocks

Code blocks.. ❤️ with automatic syntax highlighting ✨‍

See [the docs](https://www.getzola.org/documentation/content/syntax-highlighting/) for options.

## Code block with backticks

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

## Line Numbers, Highlights

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

## Inline Code block

If we want, we can also `specify inline code` which is useful for `the small stuff`.

# List Types

## Ordered List

1. First item
2. Second item
3. Third item

## Unordered List

- List item
- Another item
- And another item

## Nested list

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

# Other Elements — abbr, sub, sup, kbd, mark, link

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the
session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and
other small creatures.

---
<!-- Note: There must be a blank line between every two lines of the footnote definition.  -->
[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c)
during Gopherfest, November 18, 2015.

[^2]: The quote is the first sentence of Aristotle's [Metaphysics](https://en.wikipedia.org/wiki/Metaphysics_(Aristotle)).

## Navs

Site primary menu is created by nesting the nav under a header tag. Refer to the top of this site for an example. Navigation is responsive, shrink the page width to see it in action.

## Forms

<form name="contact" method="POST" >
    <p><label for="name">Name</label>
        <input type="text" placeholder="Name" id="name" required data-validation-required-message="Please enter your name." />
    </p>
    <p><label for="email">Email Address</label>
        <input type="email" placeholder="name@example.com" id="email" required data-validation-required-message="Please enter your email address." />
    </p>
    <p><label for="message">Message</label>
        <textarea rows="5" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
    </p>
    <div id="success"></div>
    <p><button type="submit" id="sendMessageButton">Send</button></p>
    <br>
    <!-- Select -->
    <label for="fruit">Fruit</label>
    <select id="fruit" required>
        <option value="" selected>Select a fruit…</option>
        <option>Banana</option>
        <option>Watermelon</option>
        <option>Apple</option>
        <option>Orange</option>
        <option>Mango</option>
    </select>
    <!-- Radios -->
    <fieldset>
        <legend>Size</legend>
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
        I agree to the Terms and Conditions
        </label>
        <label for="terms_sharing">
        <input type="checkbox" id="terms_sharing" name="terms_sharing" disabled checked>
        I agree to share my information with partners
        </label>
    </fieldset>
    <!-- Switches -->
    <fieldset>
        <label for="switch">
        <input type="checkbox" id="switch" name="switch" role="switch">
        Publish on my profile
        </label>
        <label for="switch_disabled">
        <input type="checkbox" id="switch_disabled" name="switch_disabled" disabled checked>
        Publish on my profile my accomplishments
        </label>
    </fieldset>
    <br>
    <!-- Search -->
    <p><input type="search" id="search" name="search" placeholder="Search" title="Search"></p>
    <!-- File browser -->
    <label for="file">File browser
    <input type="file" id="file" name="file">
    </label>
    <!-- Range slider -->
    <label for="range">Range slider
    <input type="range" min="0" max="100" value="50" id="range" name="range">
    </label>
    <!-- Date -->
    <label for="date">Date
    <input type="date" id="date" name="date">
    </label>
    <!-- Time -->
    <label for="time">Time
    <input type="time" id="time" name="time">
    </label>
    <!-- Color -->
    <label for="color">Color
    <input type="color" id="color" name="color" value="#0eaaaa">
    </label>
</form>
