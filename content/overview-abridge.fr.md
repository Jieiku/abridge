+++
title = "Abridge Zola Thème"
date = 2022-05-17
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

Vous pouvez définir le nombre d'éléments qui apparaissent sur la page d'accueil en modifiant `themes\abridge\content\_index.md` le fichier et en ajustant `paginate_by = 5`

Vous pouvez définir la largeur globale de la page en éditant `themes\abridge\sass\_variables.scss` le fichier et en ajustant ces deux lignes:

```scss
$mw:50% !default;// largeur maximale
$mb:1200px !default;// valeur à laquelle passer de la disposition fluide à l'utilisation de la largeur maximale
```
