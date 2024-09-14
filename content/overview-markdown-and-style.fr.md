+++
title = "Markdown et Style"
description = "Exemple d'article présentant la syntaxe et le formatage de base de Markdown pour les éléments HTML."
date = 2022-05-15T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Markdown"]
[extra]
keywords = "Markdown, Style, Syntax, Syntax Highlighting"
toc = true
series = "Features"
+++

Cet article propose un exemple de syntaxe Markdown de base pouvant être utilisée dans les fichiers de contenu Zola. Il indique également si les éléments HTML de base sont décorés avec CSS dans un thème Zola.
<!-- more -->
# Rubriques

Les éléments HTML `<h1>`—`<h6>` suivants représentent six niveaux d'en-têtes de section.
`<h1>` est le niveau de section le plus élevé alors qu'il `<h6>` est le plus bas.

# H1
## H2
### H3
#### H4
##### H5
###### H6

# Paragraphe

Xerum, quo qui aut unt expliquéam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur ? Quianimin porecus evelectrur, cum que nis nust voloribus ratem aut omnimi, sitatur ? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur ? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia est sinveli squiatum, core et que aut hariosam ex eat.

# Citations en bloc

L'élément blockquote représente le contenu qui est cité à partir d'une autre source, éventuellement avec une citation qui doit être dans un élément `footer` ou `cite` et éventuellement avec des modifications en ligne telles que des annotations et des abréviations.

## Blockquote sans attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Notez** que vous pouvez utiliser *la syntaxe Markdown* dans un blockquote.

## Blockquote avec attribution

> Ne communiquez pas en partageant la mémoire, partagez la mémoire en communiquant.<br>
> — <cite>Rob Pike[^1]</cite>

> Tous les hommes, par nature, désirent savoir.<br>
> ― <cite>Aristotle[^2]</cite>

> Le pouvoir vient en réponse à un besoin, pas à un désir.<br>
> — *Goku*

# Les Tables

Les tables ne font pas partie de la spécification principale de Markdown, mais Zola les prend en charge prêtes à l'emploi.

    Nom | Âge
--------|------
  Alice | 23
    Bob | 27
   Cody | 33
   John | 59
  Kerry | 23

## Tableau avec Markdown en ligne

| Italique   | Gras     | Code   | Barré     |
| --------  | -------- | ------ | ----------------- |
| *italique* | **gras** | `code` | ~~barré~~ |


## Grand tableau dans l'étiquette de la figure

Entourez les très grandes tables `<figure></figure>` pour qu'elles puissent défiler horizontalement.
<figure>

| **Fabricant** | Volkswagen | Toyota | Ford | Honda | Chevrolet | BMW | Hyundai | Audi | Nissan | Kia | Mercedes | Tesla | Mitsubishi | Suzuki | Volvo | Subaru | Mazda | Jaguar | Buick | Lexus | GMC | Porsche | Cadillac |
| ---------- | ---- | ---- | ---- | ---- | ---- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Revenu $B** | $254 | $249 | $127 | $124 | $123 | $113 | $88 | $83 | $74 | $61 | $55 | $54 | $38 | $31 | $30 | $28 | $27 | $22 | $21 | $19 | $17 | $16 | $12 |

</figure>
*valeurs de revenus trouvées sur le moteur de recherche et non vérifiées, uniquement à des fins de démonstration du tableau de défilement des figures.*

# Texte pliable

<details>
    <summary>Titre 1</summary>
    <p>C'EST UN SECRET POUR TOUT LE MONDE.</p>
</details>

<details>
    <summary>Titre 2</summary>
    <p>Reste un moment et écoute!</p>
</details>

# Blocs de codes

Blocs de code.. ❤️ avec coloration syntaxique automatique ✨‍

Voir [les docs](https://www.getzola.org/documentation/content/syntax-highlighting/) pour les options.

## Bloc de code avec backticks

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

## Numéros de ligne, faits saillants

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

## Bloc de code en ligne

Si nous voulons, nous pouvons aussi `spécifier le code en ligne` ce qui est utile pour `les petites choses`.

# Types de liste

## Liste ordonnée

1. Premier élément
2. Deuxième élément
3. Troisième élément

## Liste non ordonnée

- Élément de liste
- Un autre article
- Et un autre article

## Liste imbriquée

- Fruit
  - Pomme
  - Orange
  - Banane
- Laitier
  - Lait
  - Fromage

# Autres éléments — abbr, sub, sup, kbd, mark, link

<abbr title="Graphics Interchange Format">GIF</abbr> est un format d'image bitmap.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Appuyez sur pour terminer la session. <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd>

La plupart <mark>salamanders</mark> sont nocturnes et chassent les insectes, les vers et autres petites créatures.

---
<!-- Note: There must be a blank line between every two lines of the footnote definition.  -->
[^1]: La citation ci-dessus est extraite du [discours](https://www.youtube.com/watch?v=PAAkCSZUG1c)
de Rob Pike lors du Gopherfest, le 18 novembre 2015.

[^2]: La citation est la première phrase de [la Métaphysique](https://en.wikipedia.org/wiki/Metaphysics_(Aristotle)) d'Aristotle.

## Navs

Le menu principal du site est créé en imbriquant la navigation sous une balise d'en-tête. Reportez-vous au haut de ce site pour un exemple. La navigation est réactive, réduisez la largeur de la page pour la voir en action.

## Formes

<form name="contact" method="POST" >
    <p><label for="name">Nom</label>
        <input type="text" placeholder="Name" id="name" required data-validation-required-message="Please enter your name." />
    </p>
    <p><label for="email">Adresse e-mail</label>
        <input type="email" placeholder="name@example.com" id="email" required data-validation-required-message="Please enter your email address." />
    </p>
    <p><label for="message">Message</label>
        <textarea rows="5" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
    </p>
    <div id="success"></div>
    <p><button type="submit" id="sendMessageButton">Envoyer</button></p>
    <br>
    <!-- Select -->
    <label for="fruit">Fruit</label>
    <select id="fruit" required>
        <option value="" selected>Choisissez un fruit…</option>
        <option>Banane</option>
        <option>Pastèque</option>
        <option>Pomme</option>
        <option>Orange</option>
        <option>mangue</option>
    </select>
    <!-- Radios -->
    <fieldset>
        <legend>Taille</legend>
        <label for="small">
        <input type="radio" id="small" name="size" value="small" checked>
        Petit
        </label>
        <label for="medium">
        <input type="radio" id="medium" name="size" value="medium">
        Moyen
        </label>
        <label for="large">
        <input type="radio" id="large" name="size" value="large">
        Grand
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
        J'accepte les termes et conditions
        </label>
        <label for="terms_sharing">
        <input type="checkbox" id="terms_sharing" name="terms_sharing" disabled checked>
        J'accepte de partager mes informations avec des partenaires
        </label>
    </fieldset>
    <!-- Switches -->
    <fieldset>
        <label for="switch">
        <input type="checkbox" id="switch" name="switch" role="switch">
        Publier sur mon profil
        </label>
        <label for="switch_disabled">
        <input type="checkbox" id="switch_disabled" name="switch_disabled" disabled checked>
        Publier sur mon profil mes réalisations
        </label>
    </fieldset>
    <br>
    <!-- Search -->
    <p><input type="search" id="search" name="search" placeholder="Search" title="Search"></p>
    <!-- File browser -->
    <label for="file">Navigateur de fichiers
    <input type="file" id="file" name="file">
    </label>
    <!-- Range slider -->
    <label for="range">Curseur de plage
    <input type="range" min="0" max="100" value="50" id="range" name="range">
    </label>
    <!-- Date -->
    <label for="date">Date
    <input type="date" id="date" name="date">
    </label>
    <!-- Time -->
    <label for="time">Temps
    <input type="time" id="time" name="time">
    </label>
    <!-- Color -->
    <label for="color">Couleur
    <input type="color" id="color" name="color" value="#0eaaaa">
    </label>
</form>
