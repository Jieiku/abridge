+++
title = "Abridge Zola Thème"
date = 2022-05-17
updated = 2023-07-21
draft = false

[taxonomies]
categories = ["Features"]
tags = ["config"]
+++

Abridge est un thème Zola rapide et léger utilisant du HTML sémantique, seulement ~6kb css avant les icônes svg et la coloration syntaxique, pas de JS obligatoire, et des scores parfaits [Lighthouse](https://pagespeed.web.dev/report?url=abridge.netlify.app), [YellowLabTools](https://yellowlab.tools/), et [Observatory](https://observatory.mozilla.org/analyze/abridge.netlify.app) scores. Voici une page [de références des thèmes Zola](https://github.com/Jieiku/zola-themes-benchmarks/blob/main/README.md).
<!-- more -->
Pour une configuration rapide, copiez le fichier config.toml du thème abrégé à la racine de votre site zola, cela vous donnera une configuration de base avec toutes les valeurs de configuration utilisées.

Vous pouvez ensuite modifier ou commenter les valeurs de ce fichier si nécessaire.

Vous devez également décommenter la ligne #theme = "abridge" dans votre fichier racine zola config.toml. Cela indique à votre site racine zola d'utiliser le thème abrégé dans le dossier des thèmes.

## Pagination

Vous pouvez définir le nombre d'éléments qui apparaissent sur la page d'accueil en modifiant `content\_index.md` le fichier et en ajustant `paginate_by = 3`

## Sass Overrides

Les variables SCSS abrégées peuvent être remplacées en modifiant `sass\abridge.scss` fichier dans le dossier sass racine de votre projet.

### Page Width

```scss
$mw:75%,// largeur maximale
```

### Abridge Theme Modes

```scss
$abridgeMode: "switcher",//valeurs valides : switcher, auto, dark, light
```

### Colors and Styles

Vous pouvez spécifier le modèle de couleur que vous souhaitez utiliser comme base:
```scss
$color: "orange",// modèle de couleur à utiliser/remplacer: orange, blue, blueshade
```

Remplacez ensuite les couleurs individuelles si nécessaire:
```scss
/// Dark Colors
$f1d: #ccc,// Font Color Primary
$f2d: #ddd,// Font Color Headers
$c1d: #111,// Background Color Primary
$c2d: #222,// Background Color Secondary
...
```

### Footer Social Icons

Vous devez configurer les icônes sociales que vous prévoyez d'utiliser. (rend la taille du fichier css plus petite)

Pour les désactiver tous simplement, vous pouvez définir `$enable-icons: false`

Sinon, activez uniquement les icônes dont vous avez besoin, par exemple pour le courrier que vous définiriez `$icon-mail: true`

Vous devez ensuite désactiver toutes les icônes que vous n'utilisez pas.
