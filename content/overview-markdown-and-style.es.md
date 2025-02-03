+++
date = 2022-05-15T15:00:00Z
description = "Artículo de ejemplo que muestra la sintaxis básica de Markdown y el formato de los elementos HTML."
draft = false
title = "Markdown y estilo"

[extra]
keywords = "Markdown, Style, Syntax, Syntax Highlighting"
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Markdown",
]
+++
Este artículo ofrece una muestra de la sintaxis básica de Markdown que puede utilizarse en los archivos de contenido de Zola, también muestra si los elementos HTML básicos se decoran con CSS en un tema de Zola.

<!-- more -->

# Encabezados

Los siguientes elementos HTML `<h1>`-`<h6>` representan seis niveles de encabezados de sección. `<h1>` es el nivel de sección más alto, mientras que `<h6>` es el más bajo.

# H1

## H2

### H3

#### H4

##### H5

###### H6

# Párrafo

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

¿Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

# Blockquotes

El elemento blockquote representa contenido citado de otra fuente, opcionalmente con una cita que debe estar dentro de un elemento `footer` o `cite`, y opcionalmente con cambios en línea como anotaciones y abreviaturas.

## Blockquote sin atribución

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Tenga en cuenta** que puede utilizar *la sintaxis Markdown* dentro de un blockquote.

## Blockquote atribución

> No comuniques compartiendo memoria, comparte memoria comunicando.<br>
> — <cite>Rob Pike[^1]</cite>

> Todos los hombres desean saber por naturaleza.<br>
> ― <cite>Aristotle[^2]</cite>

> El poder surge como respuesta a una necesidad, no a un deseo.<br>
> — *Goku*

> Adapta lo que es útil, rechaza lo que es inútil y añade lo que es específicamente tuyo.<br>
> — *Bruce Lee*

# Tablas

Las tablas no forman parte de las especificaciones básicas de Markdown, pero Zola las soporta desde el principio.

| Nombre | Edad |
| ------ | ---- |
| Alice  | 23   |
| Bob    | 27   |
| Cody   | 33   |
| John   | 59   |
| Kerry  | 23   |

## Tabla Inline Markdown

| Cursiva   | Negrita     | Código | Tachado   |
| --------- | ----------- | ------ | --------- |
| *cursiva* | **negrita** | `code` | ~tachado~ |

## Tabla grande dentro de una figura

Rodee las tablas muy grandes con `<figure></figure>` para que puedan desplazarse horizontalmente.

<figure>

| **Fabricante** | Volkswagen | Toyota | Ford | Honda | Chevrolet | BMW | Hyundai | Audi | Nissan | Kia | Mercedes | Tesla | Mitsubishi | Suzuki | Volvo | Subaru | Mazda | Jaguar | Buick | Lexus | GMC | Porsche | Cadillac |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Ingresos $B** | $254 | $249 | $127 | $124 | $123 | $113 | $88 | $83 | $74 | $61 | $55 | $54 | $38 | $31 | $30 | $28 | $27 | $22 | $21 | $19 | $17 | $16 | $12 |

</figure>

*valores de ingresos encontrados en el motor de búsqueda y no verificados, sólo para fines de demostración de la tabla de desplazamiento de figuras.*

# Texto plegable

<details>
    <summary>Title 1</summary>
    <p>IT'S A SECRET TO EVERYBODY.</p>
</details>

<details>
    <summary>Title 2</summary>
    <p>Stay awhile, and listen!</p>
</details>

# Bloques de código

Bloques de código.. ❤️ con resaltado automático de sintaxis ✨‍

Consulte las opciones en [la documentación](https://www.getzola.org/documentation/content/syntax-highlighting/).

## Bloque de código con backticks

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejemplo de documento HTML5</title>
</head>
<body>
  <p>Prueba</p>
</body>
</html>
```

## Números de línea, destacados

```html,linenos,hl_lines=5 7-9
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejemplo de documento HTML5</title>
</head>
<body>
  <p>Prueba</p>
</body>
</html>
```

## Bloque de código en línea

Si queremos, también podemos `specify inline code` que es útil para `the small stuff`.

# Tipos de lista

## Lista ordenada

1. Primer elemento
2. Segundo elemento
3. Tercer elemento

## Lista desordenada

- Elemento de lista
- Otro elemento
- Y otro elemento

## Lista anidada

- Fruta
  - Manzana
  - Naranja
  - Plátano
- Lácteos
  - Leche
  - Queso

# Otros elementos - abbr, sub, sup, kbd, mark, link

<abbr title="Graphics Interchange Format">GIF</abbr> es un formato de imagen de mapa de bits.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Pulse <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Supr</kbd></kbd> para finalizar la sesión.

La mayoría de las <mark>salamandras</mark> son nocturnas y cazan insectos, gusanos y otras criaturas pequeñas.

-----
<!-- Note: There must be a blank line between every two lines of the footnote definition.  -->

\[^1\]: La cita anterior es un extracto de la [charla](https://www.youtube.com/watch?v=PAAkCSZUG1c) de Rob Pike durante el Gopherfest, el 18 de noviembre de 2015.

\[^2\]: La cita es la primera frase de la [Metafísica](https://en.wikipedia.org/wiki/Metaphysics_\(Aristotle\)) de Aristóteles.

## Navegadores

Menú principal del sitio se crea mediante la anidación de la nav bajo una etiqueta de encabezado. Consulte la parte superior de este sitio para ver un ejemplo. La navegación es adaptativa, reduzca el ancho de la página para verla en acción.

## Formularios

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
