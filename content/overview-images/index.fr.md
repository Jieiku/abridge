+++
title = "Codes courts d'image"
description = "Les images peuvent être intégrées directement à l'aide de markdown `![Ferris](ferris.svg)`, mais l'utilisation d'un shortcode empêche CLS en définissant explicitement la largeur et la hauteur."
date = 2021-05-19
draft = false

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","images"]
[extra]
toc = true
keywords = "Image, Markdown, Shortcodes, Hover"
thumbnail = "ferris-gesture.png"
+++

Cet article couvre les **shortcodes imghover et img**. Les images peuvent également être intégrées directement à l'aide de markdown `![Ferris](ferris.svg)`, mais il est préférable d'utiliser un shortcode afin de pouvoir définir explicitement la largeur et la hauteur, cela aidera à empêcher le changement de mise en page du contenu, ce qui améliore l'expérience utilisateur et le score Google Lighthouse.
<!-- more -->

# img Shortcode

- src est le chemin et le nom de fichier de l'image. (obligatoire)
- class définit une classe pour l'image. (facultatif)
- alt définit la note alt pour l'image. (recommandé pour google phare)
- w est la largeur de l'image. (recommandé pour google phare)
- h est la hauteur de l'image. (recommandé pour google phare)

## Utilisation (même chemin)
```rs
{{/* img(src="ferris-happy.svg" alt="Ferris est heureux" w=600 h=400) */}}
```
**Sortir**
```html
{{ img(src="ferris-happy.svg" alt="Ferris est heureux" w=600 h=400) }}
```
{{ img(src="ferris-happy.svg" alt="Ferris est heureux" w=600 h=400) }}

## Utilisation (chemin relatif ./)
```rs
{{/* img(src="./img/ferris-gesture.svg" alt="Ferris dit bonjour" w=600 h=400) */}}
```
**Sortir**
```html
{{ img(src="./img/ferris-gesture.svg" alt="Ferris dit bonjour" w=600 h=400) }}
```
{{ img(src="./img/ferris-gesture.svg" alt="Ferris dit bonjour" w=600 h=400) }}

## Utilisation (chemin racine /)
```rs
{{/* img(src="/overview-rich-content/ferris.svg" alt="Ferris le Rustacé" w=600 h=400) */}}
```
**Sortir**
```html
{{ img(src="/overview-rich-content/ferris.svg" alt="Ferris le Rustacé" w=600 h=400) }}
```
{{ img(src="/overview-rich-content/ferris.svg" alt="Ferris le Rustacé" w=600 h=400) }}

# Image SVG directement dans le code :
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 489" width="600" height="489"><g fill="#8f1f1d"><path d="M70 324c1 3 3 4 6 4l24 4 2 5-10 20v5l7 4 24-1 4 4-7 21c0 2 0 4 3 6 1 2 4 2 7 2l24-5 4 4-1 22c-1 2 0 4 3 5h6l23-8 6 3 4 22c0 2 1 3 3 4h7l21-13 6 2 8 20 5 5c3 0 5 0 7-2l18-15h5l13 18c1 2 3 4 6 4l5-3 14-18h6l17 16c1 1 4 2 6 1 3 0 5-1 6-3l9-21 6-1 19 14h7c3 0 5-3 5-5l4-21 6-2 22 9 7-1c2-1 3-2 3-5v-21l5-4 24 6c3 0 5 0 6-2 2-2 3-4 2-6l-4-21 3-5 24 2c4 0 6 0 7-3v-5l-9-21 3-5 25-2 5-5-1-5-14-18c0-1-1-19-12-33v-1c-26-36-106-64-201-65-100-2-184 26-206 64-10 10-12 26-11 26l-15 17c-1 3-2 5-1 7z"/><path d="M565 247c-1-3-12-2-14-3l-38 1-4-7 26-38c1-2 7-7 6-9-3-3-12 1-14 1l-39 7-4-6 22-49c0-3 7-15 5-18-2-2-11 6-13 6l-43 28-4-5 11-43c0-3 7-18 5-19-2-2-9 5-12 6l-38 30-5-4 9-51c0-3 3-18 1-19s-15 13-17 14l-30 38-6-3-3-56c0-3 0-14-3-14-3-1-5 8-8 11l-25 50-7-1-13-57c-1-3-2-12-4-12-4 0-5 10-7 13l-15 56-7 1-22-52c-1-2-4-12-7-12-3 1-2 9-3 12l-7 61-6 3-19-27c-3-1-15-19-18-18-2 1 0 21-1 23l1 40-6 4-36-35c-3-1-7-7-10-5-2 2 0 10 0 13l13 53-4 5-41-26c-2-1-10-7-12-4-2 2 3 4 3 7l22 56-5 6-65-22c-3-1-10-5-12-1-1 2 5 6 6 9l49 53-3 7-47-6c-3 0-9-1-11 1-1 4 6 7 7 9l36 40a116 116 0 0 0 14 46c27 50 110 87 209 87 105 0 193-41 214-95 11-15 13-37 12-38l29-31c2-4 9-9 8-11z"/><path d="m99 289-67 10c-13 3-5 5 0 6 14 2 84 3 85 4zm402 3 67 10c13 4 5 6 0 6-14 2-84 5-86 5z"/></g><path d="M227 293s-24-26-47 0c0 0-18 35 0 52 0 0 30 24 47 0 0 0 21-20 0-52z"/><path fill="#fff" d="M200 302c0 11 6 19 14 19 7 0 12-8 12-19 0-10-5-18-12-18-8 0-14 8-14 18z"/><path d="M360 283s-40-17-52 22c0 0-11 47 33 49 0 0 58-10 19-71z"/><path fill="#fff" d="M339 299c0 10 7 20 14 20 8 0 14-10 14-20s-6-18-14-18c-7 0-14 8-14 18z"/></svg>
```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 489" width="600" height="489"><g fill="#8f1f1d"><path d="M70 324c1 3 3 4 6 4l24 4 2 5-10 20v5l7 4 24-1 4 4-7 21c0 2 0 4 3 6 1 2 4 2 7 2l24-5 4 4-1 22c-1 2 0 4 3 5h6l23-8 6 3 4 22c0 2 1 3 3 4h7l21-13 6 2 8 20 5 5c3 0 5 0 7-2l18-15h5l13 18c1 2 3 4 6 4l5-3 14-18h6l17 16c1 1 4 2 6 1 3 0 5-1 6-3l9-21 6-1 19 14h7c3 0 5-3 5-5l4-21 6-2 22 9 7-1c2-1 3-2 3-5v-21l5-4 24 6c3 0 5 0 6-2 2-2 3-4 2-6l-4-21 3-5 24 2c4 0 6 0 7-3v-5l-9-21 3-5 25-2 5-5-1-5-14-18c0-1-1-19-12-33v-1c-26-36-106-64-201-65-100-2-184 26-206 64-10 10-12 26-11 26l-15 17c-1 3-2 5-1 7z"/><path d="M565 247c-1-3-12-2-14-3l-38 1-4-7 26-38c1-2 7-7 6-9-3-3-12 1-14 1l-39 7-4-6 22-49c0-3 7-15 5-18-2-2-11 6-13 6l-43 28-4-5 11-43c0-3 7-18 5-19-2-2-9 5-12 6l-38 30-5-4 9-51c0-3 3-18 1-19s-15 13-17 14l-30 38-6-3-3-56c0-3 0-14-3-14-3-1-5 8-8 11l-25 50-7-1-13-57c-1-3-2-12-4-12-4 0-5 10-7 13l-15 56-7 1-22-52c-1-2-4-12-7-12-3 1-2 9-3 12l-7 61-6 3-19-27c-3-1-15-19-18-18-2 1 0 21-1 23l1 40-6 4-36-35c-3-1-7-7-10-5-2 2 0 10 0 13l13 53-4 5-41-26c-2-1-10-7-12-4-2 2 3 4 3 7l22 56-5 6-65-22c-3-1-10-5-12-1-1 2 5 6 6 9l49 53-3 7-47-6c-3 0-9-1-11 1-1 4 6 7 7 9l36 40a116 116 0 0 0 14 46c27 50 110 87 209 87 105 0 193-41 214-95 11-15 13-37 12-38l29-31c2-4 9-9 8-11z"/><path d="m99 289-67 10c-13 3-5 5 0 6 14 2 84 3 85 4zm402 3 67 10c13 4 5 6 0 6-14 2-84 5-86 5z"/></g><path d="M227 293s-24-26-47 0c0 0-18 35 0 52 0 0 30 24 47 0 0 0 21-20 0-52z"/><path fill="#fff" d="M200 302c0 11 6 19 14 19 7 0 12-8 12-19 0-10-5-18-12-18-8 0-14 8-14 18z"/><path d="M360 283s-40-17-52 22c0 0-11 47 33 49 0 0 58-10 19-71z"/><path fill="#fff" d="M339 299c0 10 7 20 14 20 8 0 14-10 14-20s-6-18-14-18c-7 0-14 8-14 18z"/></svg>


# imghover Shortcode

La première image du tableau src est celle comparée à toutes les autres.

Lorsque vous passez votre souris sur une image, celle-ci affiche l'image à comparer.

Cela peut être utilisé pour comparer une seule image avec une autre en passant seulement deux src dans le tableau.

- src est un tableau de chemins et de noms de fichiers pour les images. (obligatoire)
- w est la largeur de l'image.
- h est la hauteur de l'image.
- p est la taille en pourcentage que vous souhaitez que l'image utilise sur la page. (50 est la valeur par défaut)

*w et h ne sont utilisés que pour calculer le rapport d'aspect, la taille globale est définie par p*

## Utilisation (même chemin)
```rs
{{/* imghover(src=["ferris.svg", "ferris-gesture.svg", "ferris-happy.svg"] w=600 h=400 p=45) */}}
```
**Sortir**
```html
{{ imghover(src=["ferris.svg", "ferris-gesture.svg", "ferris-happy.svg"] w=600 h=400 p=45) }}
```
{{ imghover(src=["ferris.svg", "ferris-gesture.svg", "ferris-happy.svg"] w=600 h=400 p=45) }}

## Utilisation (chemin relatif ./)
```rs
{{/* imghover(src=["./img/ferris.svg", "./img/ferris-gesture.svg"] w=600 h=400 p=45) */}}
```
**Sortir**
```html
{{ imghover(src=["./img/ferris.svg", "./img/ferris-gesture.svg"] w=600 h=400 p=45) }}
```
{{ imghover(src=["./img/ferris.svg", "./img/ferris-gesture.svg"] w=600 h=400 p=45) }}

## Utilisation (chemin racine /)
```rs
{{/* imghover(src=["/overview-rich-content/ferris.svg", "/overview-rich-content/ferris-gesture.svg"] w=600 h=400 p=45) */}}
```
**Sortir**
```html
{{ imghover(src=["/overview-rich-content/ferris.svg", "/overview-rich-content/ferris-gesture.svg"] w=600 h=400 p=45) }}
```
{{ imghover(src=["/overview-rich-content/ferris.svg", "/overview-rich-content/ferris-gesture.svg"] w=600 h=400 p=45) }}
