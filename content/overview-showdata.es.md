+++
date = 2021-05-09T15:00:00Z
description = "Una breve descripción de un Shortcode personalizado para Zola que implementa la carga y visualización de datos externos."
draft = false
title = "Código corto Showdata"

[extra]
keywords = "Data, Load, External, Shortcodes"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Data",
    "Shortcodes",
]
+++
El shortcode `showdata` puede cargar y mostrar datos de una fuente externa a través de la función [load_data()](https://www.getzola.org/documentation/templates/overview/#load-data) de Zola.

<!-- more -->

Estos son los parámetros, actualmente se requieren los 3.

- `src` ruta o url al archivo (si es url, debe incluir el prefijo http(s)://).
- `type` el tipo de archivo a cargar. [tipos soportados](https://www.getzola.org/documentation/templates/overview/#load-data)
- `key` el campo de los datos que desea mostrar.

## Uso

Este tema requiere la versión &#123;&#123; showdata(src="../theme.toml" type="toml" key="min_version") &#125;&#125; o posterior de Zola.

## Salida

Este tema requiere la versión {{ showdata(src="../theme.toml" type="toml" key="min_version") }} o posterior de Zola.
