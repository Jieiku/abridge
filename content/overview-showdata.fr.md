+++
title = "Code court Showdata"
description = "Une brève description d'un shortcode personnalisé pour Zola qui implémente le chargement et l'affichage de données externes."
date = 2021-05-04T15:00:00Z
draft = false

[taxonomies]
tags = ["Features","Data","Shortcodes"]
[extra]
keywords = "Data, Load, External, Shortcodes"
toc = true
series = "Features"
+++

Le shortcode `showdata` peut charger et afficher des données provenant d'une source externe via la fonction [load_data()](https://www.getzola.org/documentation/templates/overview/#load-data) de Zola.

<!-- more -->

Ce sont les paramètres, actuellement tous les 3 sont requis.

- `src` chemin ou URL du fichier (si URL, doit inclure le préfixe http(s)://).
- `type` le type de fichier à charger. ([supported types](https://www.getzola.org/documentation/templates/overview/#load-data))
- `key` le champ dans les données que vous souhaitez afficher.

## Usage

Ce thème nécessite une version &#123;&#123; showdata(src="../theme.toml" type="toml" key="min_version") &#125;&#125; ou plus tard de Zola.

## Sortir

Ce thème nécessite une version {{ showdata(src="../theme.toml" type="toml" key="min_version") }} ou plus tard de Zola.
