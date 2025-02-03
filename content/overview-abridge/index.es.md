+++
date = 2022-05-17T15:00:00Z
description = "Abridge es un tema Zola rápido y ligero que utiliza html semántico, abridge.css class-light CSS, y No Mandatory JS."
draft = false
title = "Abridge Tema Zola"
updated = 2023-07-21T15:00:00Z

[extra]
series = "Features"
toc = true

[taxonomies]
tags = [
    "Features",
    "Config",
]
+++
Un tema [Zola](https://getzola.org) rápido, ligero y moderno que utiliza [abridge.css](https://github.com/Jieiku/abridge.css) (un framework CSS HTML semántico de clase ligera). Puntuaciones perfectas de [Lighthouse](https://pagespeed.web.dev/report?url=abridge.netlify.app), [YellowLabTools](https://yellowlab.tools/) y [Observatory](https://developer.mozilla.org/en-US/observatory/analyze?host=abridge.netlify.app). Aquí hay una página de [Benchmarks de Zola Themes](https://github.com/Jieiku/zola-themes-benchmarks/blob/main/README.md).

<!-- more -->

![lighthouse](lighthouse.png)

## Características

- Puntuaciones perfectas de [Lighthouse](https://pagespeed.web.dev/report?url=abridge.netlify.app), [YellowLabTools](https://yellowlab.tools/) y [Observatory](https://developer.mozilla.org/en-US/observatory/analyze?host=abridge.netlify.app).
- [Soporte PWA](#pwa) (Aplicación Web Progresiva).
- Todo JavaScript puede ser [totalmente desactivado](https://abridge.netlify.app/overview-abridge/#javascript-files).
- Temas Dark, Light, Auto y Switcher. (colores personalizables, variables css)
- [Resaltado de sintaxis de](https://abridge.netlify.app/overview-code-blocks/) código. (colores personalizables, variables css)
- Bloques de código numerados con [resaltado de línea](https://abridge.netlify.app/overview-code-blocks/#toml).
- Sitio completamente Offline usando el PWA **o** configurando `search_library = "offline"` en `config.toml`.
- Soporte multi-idioma.
- Soporte para búsquedas.[(elasticlunr](https://abridge.pages.dev/), [pagefind](https://abridge-pagefind.pages.dev/), [tinysearch](https://abridge-tinysearch.pages.dev/))
- Sugerencias de búsqueda teclas de navegación, `/` focus, `arrow` move, `enter` select, `escape` close.
- Página de resultados de búsqueda, escriba la consulta de búsqueda y luego pulse `Enter Key` o `click` el icono del botón de búsqueda.
- Soporte[SEO](#seo). (Optimización para motores de búsqueda)
- [Paginación](#pagination) con paginador numerado en el índice.
- Enlaces al artículo anterior y siguiente en la parte inferior del artículo.
- Tabla de Contenidos en el Índice de la página (Opcional, enlaces clicables)
- Bloque de Entradas Recientes. (Opcional)
- Botón Volver al principio. (sólo usa css)
- Botón para copiar bloques de código.
- Enlace de correo electrónico en la ofuscación de pie de página. (antispam)
- Soporte[KaTeX](https://katex.org/).
- [Página de archivo](https://abridge.netlify.app/archive/).
- [Etiquetas](https://abridge.netlify.app/tags/).
- Categorías. (similar a Etiquetas, desactivado/comentado por defecto)
- Enlaces a iconos sociales en el pie de página.
- Diseño responsivo. (mobile first)
- Códigos cortos de vídeo: [Youtube](https://abridge.netlify.app/video-streaming-sites/overview-embed-youtube/), [Vimeo](https://abridge.netlify.app/video-streaming-sites/overview-embed-vimeo/), [Streamable](https://abridge.netlify.app/video-streaming-sites/overview-embed-streamable/).
- Media Shortcodes: [video](https://abridge.netlify.app/overview-rich-content/#video), [img](https://abridge.netlify.app/overview-images/#img-shortcode), [imgswap](https://abridge.netlify.app/overview-images/#imgswap-shortcode), [image](https://abridge.netlify.app/overview-rich-content/#image), [gif](https://abridge.netlify.app/overview-rich-content/#gif), [audio](https://abridge.netlify.app/overview-rich-content/#audio).
- Otros Shortcodes: [showdata](https://abridge.netlify.app/overview-showdata/), [katex](https://abridge.netlify.app/overview-math/#usage-1).

## Inicio rápido

Este tema requiere la versión {{ showdata(src="https://raw.githubusercontent.com/Jieiku/abridge/master/theme.toml" key="min_version" type="toml") }} o posterior de [Zola](https://www.getzola.org/documentation/getting-started/installation/)

```bash
git clone https://github.com/jieiku/abridge.git
cd abridge
zola serve
# open http://127.0.0.1:1111/ in the browser
```

## Instalación

El inicio rápido muestra cómo ejecutar el tema directamente. A continuación usaremos abridge como tema para un NUEVO sitio.

### 1: Crear un nuevo sitio zola

```bash
yes "" | zola init mysite
cd mysite
```

### 2: Instalar Abridge

Añade el tema como un submódulo git:

```bash
git init  # if your project is a git repository already, ignore this command
git submodule add https://github.com/jieiku/abridge.git themes/abridge
git submodule update --init --recursive
git submodule update --remote --merge
```

O clona el tema en tu directorio de temas:

```bash
git clone https://github.com/jieiku/abridge.git themes/abridge
```

### 3: Configuración

Copia algunos archivos del directorio del tema al directorio raíz de tu proyecto:

```bash
rsync themes/abridge/.gitignore .gitignore
rsync themes/abridge/config.toml config.toml
rsync themes/abridge/content/_index.md content/
rsync -r themes/abridge/COPY-TO-ROOT-SASS/* sass/
rsync themes/abridge/netlify.toml netlify.toml
rsync themes/abridge/package_abridge.js package_abridge.js
rsync themes/abridge/package.json package.json
```

- `config.toml` configuración base con todos los valores de configuración.
- `content/_index.md` requerido para establecer la paginación.
- `COPY-TO-ROOT-SASS/abridge.scss` overrides para personalizar las variables de Abridge.
- `netlify.toml` configuración para desplegar su repo con netlfiy.
- `package_abridge.js` node script para: actualizar la lista de archivos de caché en PWA, minify js, bundle js
- `package.json` utilizado por node, define scripts y dependencias.

Descomenta la línea theme en el config.toml raíz de tu proyecto:

```bash
sed -i 's/^#theme = "abridge"/theme = "abridge"/' config.toml
```

### 4: Añadir nuevo contenido

Copia el contenido del directorio de temas a tu proyecto o haz un nuevo post:

```bash
rsync -r themes/abridge/content .
```

### 5: Ejecuta el proyecto

Simplemente ejecute `zola serve` en la ruta raíz del proyecto:

```bash
zola serve
```

Zola iniciará el servidor web dev, accesible por defecto en `http://127.0.0.1:1111`.

Los cambios guardados se recargarán en vivo en el navegador. (pulse `ctrl+f5`, o mientras desarrolla configure `pwa=false` en `config.toml`)

## Paginación {#pagination}

Puede establecer el número de elementos de la página de inicio editando el archivo `content\_index.md` y ajustando `paginate_by`

## Variables Sass

Las variables de Abridge SASS pueden ser anuladas editando el archivo `sass\abridge.scss` en la carpeta raíz sass de su proyecto.

### Ancho de página

```scss
$mw:75%,// max-width
```

### Modos de Abridge

```scss
$abridgeMode: "switcher",//valid values: switcher, auto, dark, light
```

- switcher: muestra automáticamente una versión oscura o clara dependiendo de la configuración del navegador/OS, y tiene un conmutador de temas javascript en el que el usuario puede hacer clic.
- auto: muestra automáticamente una versión oscura o clara dependiendo de la configuración del navegador/OS.
- dark: es el tema oscuro siempre.
- light: es el tema claro siempre.

### Colores y estilos

Puedes especificar qué plantilla de color quieres usar como base:

```scss
$color: "orange",// color template to use/override: orange, blue, blueshade
```

A continuación, anule los colores individuales según sea necesario:

```scss
/// Dark Colors
$f1d: #ccc,// Font Color Primary
$f2d: #ddd,// Font Color Headers
$c1d: #111,// Background Color Primary
$c2d: #222,// Background Color Secondary
...
```

### Iconos sociales a pie de página

Debe configurar qué iconos sociales planea utilizar. (hace que el tamaño del archivo css sea menor)

Para simplemente desactivarlos todos puedes configurar `$enable-icons: false` (desactiva TODOS los iconos, navegación, búsqueda, etc.)

De lo contrario, active sólo los iconos que necesita, por ejemplo, para el correo se establecería `$icon-mail: true`

A continuación, debe desactivar todos los demás iconos que no utilice.

### Tema para visitas noscript

Si tiene abridge configurado para utilizar el modo conmutador en lugar de auto/oscuro/luz, su sitio tendrá un botón que permitirá al visitante conmutar el tema.

Si su visitante utiliza noscript o algún otro complemento de navegador que bloquee javascript, entonces estará atascado con cualquiera que sea el tema configurado por defecto para el modo conmutador.

Para ajustar este modo, debe establecer los siguientes dos valores de configuración en `abridge.scss` **Y** `config.toml`:

```scss
$switcherDefault: "dark",// default nojs switcher mode: dark, light (make sure to also set js_switcher_default in config.toml)
```

```toml
js_switcher_default = "dark" # default nojs switcher mode: dark, light (make sure to also set $switcherDefault in abridge.scss)
```

Por defecto abridge utiliza el modo oscuro para el conmutador, así que a menos que desee establecer el modo por defecto a la luz para los visitantes nojs/noscript, entonces usted no necesita preocuparse acerca de estos ajustes.

## Config.toml Configuración

La mayoría de las opciones en `config.toml` se documentan por sí mismas. (obvio entre el nombre del valor config y los comentarios)

Abridge trabajará con un `config.toml` barebones porque los valores por defecto se proporcionan en los archivos de plantilla.

Recomiendo copiar todo el archivo config.toml como se indica en el paso 3, ya que proporciona todos los valores configurables.

### Menús superior y pie de página

Establezca un campo en `extra` con una clave de `menu` y `menu_footer`.
Si desea que el enlace se abra en una nueva pestaña/navegador entonces establezca `blank = true`.
tamaño: s150, s140, s130, s120, s110, s95, s90, s85, s80, s75, s70, false(tamaño completo)
Si un enlace debe tener una barra al final de la url configure `slash = true`.
(generalmente todos los enlaces deben tener una barra al final a menos que sea un enlace de archivo como `sitemap.xml`)

```toml
menu = [
  {url = "about", name = "About", slash = true, blank = false, size="s110"},
  {url = "posts", name = "Posts", slash = true, blank = false, size="s110"},
  {url = "categories", name = "Categories", slash = true, blank = false, size="s110"},
  {url = "tags", name = "Tags", slash = true, blank = false, size="s110"},
]
menu_footer = [
  {url = "about", name = "About", slash = true, blank = false},
  {url = "contact", name = "Contact", slash = true, blank = false},
  {url = "privacy", name = "Privacy", slash = true, blank = false},
  {url = "sitemap.xml", name = "Sitemap", slash = false, blank = true},
]
```

### Etiquetas SEO y de cabecera {#seo}

Puede revisar las etiquetas SEO en la macro seo ubicada en `templates/macros/seo.html`, todos los valores configurables deben estar en `config.toml` bajo `config.extra` o en los archivos markdown de contenido.

En el archivo markdown de su post debe establecer un título de menos de 60 caracteres y una descripción de entre 80 y 160 caracteres de longitud. La descripción es lo que se muestra en los resultados de búsqueda debajo del título de la página. Si no especifica una descripción de página, se utilizará en su lugar el archivo config.description del sitio principal.

También debe establecer palabras clave específicas de la página a menos que sus palabras clave definidas en config.toml sean suficientes, cualquier palabra clave que añada a la página es adicional a las definidas en config.toml, así que no añada esas mismas palabras clave a sus palabras clave de la página.

Opcionalmente, también puede establecer una imagen específica de la página para los resultados de búsqueda utilizando page.extra.thumbnail. Facebook, Twitter y OpenGraph Cards son compatibles (imagen y descripción automáticas para los enlaces publicados). OpenGraph recomienda 1200 x 630 (1,9:1). Twitter recomienda 2:1 para las grandes y 1:1 para las pequeñas. Si no establece una miniatura específica para la página, se utilizará en su lugar el banner definido en config.toml.

Consulta [overview-images](https://raw.githubusercontent.com/Jieiku/abridge/master/content/overview-images/index.md) para ver un ejemplo:

```md
+++
[extra]
thumbnail = "ferris-gesture.png"
+++
```

### Notación matemática KaTeX

KaTeX se puede utilizar para mostrar matemáticas complejas, es una "Rápida composición matemática para la web"

Puedes ver una demo en [esta página](https://abridge.netlify.app/overview-math/).

Para un mejor rendimiento, recomiendo sólo habilitar las matemáticas en una [base por página en sus archivos post.md](https://github.com/Jieiku/abridge/blob/master/content/overview-math.md?plain=1#L11-L13), en lugar de en su archivo config.toml principal.

### PWA, Aplicación Web Progresiva {#pwa}

Abridge tema tiene soporte PWA. Puede instalar todo el sitio como una aplicación y hacer que funcione sin conexión. Para probarlo simplemente usa google chrome o tu teléfono y ve aquí: [abridge.netlify.app](https://abridge.netlify.app/)

Si utilizas Chrome en tu ordenador, busca el botón de instalación al final de la barra de direcciones. En Android debe aparecer una ventana emergente para instalar, también puede instalar desde el menú de 3 puntos en la esquina superior derecha. Una vez instalada la PWA, puedes desconectarte completamente y seguirás pudiendo navegar o buscar en el sitio

Hay un script npm para generar la lista de caché de archivos y la minificación `npm run abridge`. Mi archivo [netlify.toml](https://github.com/Jieiku/abridge/blob/master/netlify.toml) ejecuta automáticamente este script npm durante el despliegue del sitio, por lo que todo es automático. Si Zola fuera capaz de crear un archivo js, entonces sería posible generar la lista de archivos de caché dinámicamente durante la compilación en lugar de depender de node/npm.

Para utilizar una lista específica de archivos en lugar de todos los archivos de editar la entrada `pwa_BASE_CACHE_FILES` en `config.toml`. Si incluso un solo archivo en la lista de caché no se encuentra entonces no pre caché de la lista, por lo que sólo la caché a medida que navega. (Si está configurando por primera vez, pruebe sólo con un par de páginas)

La función PWA también es fácil de desactivar simplemente configurando `pwa = false` en `config.toml`

## Optimización del rendimiento

### Archivos Javascript

Todo javascript puede ser desactivado en `config.toml`:

```toml
build_search_index = false

js_bundle = false
js_copycode = false
js_email_encode = false
js_prestyle = false
js_switcher = false

pwa = false
```

Estos son los archivos javascript utilizados por Abridge:

- search\_index.en.js: índice de búsqueda generado por zola en cada compilación para elasticlunr.
- elasticlunr.min.js: biblioteca de búsqueda para la búsqueda del lado del cliente.
- search.js: para hacer uso de elasticlunr desde la caja de búsqueda de nuestros sitios tanto para las sugerencias como para la página de resultados.
- email.js: utiliza javascript para ofuscar su dirección de correo electrónico real para el icono de correo en la parte inferior de la página.
- codecopy.js: añade un botón de copia a los bloques de código, para copiar el contenido del bloque de código al portapapeles.
- theme.js: pequeño script para facilitar el almacenamiento local del cambiador de temas. (nunca agrupado, siempre separado)
- theme\_button.js: pequeño script para la función de cambio de tema cuando se pulsa el botón de cambio de tema.
- prestyle.js: Usado para precargar archivos css `<link rel="preload"` - este script los cambia a `<link rel="stylesheet"` una vez que la página ha terminado de cargar, esto nos permite cargar hojas de estilo para fuentes externas, fontawesome, o katex de forma no bloqueante.
- sw.js: este es el archivo Service Worker para la PWA.
- sw\_load.js: este archivo se encarga de cargar el Service Worker para la PWA.

#### opción js\_bundle

`js_bundle` cuando se establece en true sirve un archivo bundle en lugar de todos los archivos js individuales.

Todos los bundles necesarios son generados dinámicamente por el script node [package\_abridge.js](https://github.com/Jieiku/abridge/blob/master/package_abridge.js)

El script node escaneará su config.toml en busca de los valores de configuración relevantes y, basándose en su config.tomnl, generará los paquetes necesarios.

Todo lo que se necesita es `zola build && npm run abridge`.

#### Biblioteca de búsqueda de switch

Además de elasticlunr abridge también soporta pagefind y tinysearch.

pagefind demo: https://abridge-pagefind.pages.dev/

tinysearch demo: https://abridge-tinysearch.pages.dev/

Para utilizar tinysearch se requieren pasos adicionales.

**Cambia a pagefind:**

```bash
npm install
sed -i 's/^search_library =.*/search_library = "pagefind"/' config.toml
npm run abridge
# zola serve
```

**Cambiar a elasticlunr:**

```bash
sed -i 's/^search_library =.*/search_library = "elasticlunr"/' config.toml
npm run abridge
```

**Cambiar a nosearch:**

```bash
sed -i 's/^search_library =.*/search_library = "false"/' config.toml
npm run abridge
```

**Cambia a tinysearch:**

Primero hay que instalar tinysearch para poder construir el índice:

```bash
git clone https://github.com/tinysearch/tinysearch
cd tinysearch
cargo build --release
sudo cp ./target/release/tinysearch /usr/local/bin/tinysearch
exit # reload shell environment
```

Cambiar Abridge a tinysearch

```bash
sed -i 's/^search_library =.*/search_library = "tinysearch"/' config.toml
npm run abridge
tinysearch --optimize --path static public/data_tinysearch/index.html
# zola serve
```

#### Cambiador de temas

El cambiador de tema depende de javascript para funcionar, aplica la clase .light al documentElement raíz. El archivo que maneja esto (`theme.js`) es pequeño y optimizado y es el primer archivo cargado en la cabeza, por lo que el impacto en el rendimiento es mínimo. Sin el conmutador de temas puede seguir utilizando el tema automático que utiliza la configuración de preferencias del navegador/OS. Incluso puede instalar un [plugin de Firefox](https://addons.mozilla.org/en-US/firefox/addon/theme-switcher-for-firefox/) para cambiar rápidamente entre los dos.

### Optimizar archivos PNG/ICO

Buena herramienta para generar iconos enmascarables para `manifest.json`: [maskable.app](https://maskable.app/editor)

Todos los archivos png pueden ser optimizados usando [oxipng](https://github.com/shssoichiro/oxipng):

```bash
cd static
oxipng -o max --strip all -a -Z *.png
```

Con pantallas más grandes y una mayor densidad de píxeles cada vez más común es probablemente una buena idea utilizar al menos un poco de compresión con pérdida. Por ejemplo, puede utilizar pngquant con una calidad del 93% y a menudo obtendrá imágenes de alrededor de la mitad del tamaño. Tenga en cuenta que pngquant es acumulativo, por lo que debe mantener sus imágenes originales en algún lugar, y sólo utilizar pngquant una vez por imagen, si lo usa una y otra vez en la misma imagen, entonces bajará la calidad de la imagen cada vez. Utilice siempre oxipng después, oxipng es sin pérdidas.

```bash
pngquant --skip-if-larger --strip --quality=93-93 --speed 1 *.png
oxipng -o max --strip all -a -Z *.png
```

leanify puede comprimir más lejos tanto para archivos png como ico:

```bash
git clone https://github.com/JayXon/Leanify
cd Leanify
make
sudo cp leanify /usr/local/bin/leanify
exit  #launch new terminal
leanify -i 7777 *.png
leanify -i 7777 *.ico
```

### Pre gzip/brotli contenido

Si usted está sirviendo su sitio con nginx, puede pre gzip su contenido.

(Netlify brotli gzips sus archivos automáticamente, no exta trabajo requerido)

Primero configura nginx:

```bash
sudo nano /etc/nginx/nginx.conf

gzip on;
gzip_vary on;
gzip_proxied expired no-cache no-store private auth;
#gzip_proxied any;
gzip_comp_level 9;
gzip_buffers 64 16k;
#gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml application/xhtml+xml application/x-javascript application/x-font-ttf application/vnd.ms-fontobject font/opentype font/ttf font/eot font/otf;
#gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

Entonces usted puede gzip/brotli sus archivos:

```bash
zola build
find ~/.dev/abridge/public -type f -regextype posix-extended -regex '.*\.(htm|html|css|js|xml|xsl|txt|woff|woff2|svg|otf|eot|ttf)' -exec gzip --best -k -f {} \+ -exec brotli --best -f {} \;
rsync -zvrh ~/.dev/abridge/public/ web:/var/www/abridge
```

Nginx no viene por defecto con soporte para brotli, pero añadirlo no fue difícil.
