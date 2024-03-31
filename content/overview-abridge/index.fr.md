+++
title = "Abridge Zola Thème"
description = "Abridge est un thème Zola rapide et léger utilisant du HTML sémantique, du CSS léger de classe abridge.css et No Mandatory JS."
date = 2022-05-17
updated = 2023-07-21
draft = false

[taxonomies]
tags = ["Features","Config"]
[extra]
toc = true
series = "Features"
+++

Un thème [Zola](https://getzola.org) rapide, léger et moderne utilisant [abridge.css](https://github.com/Jieiku/abridge.css) (un framework HTML CSS sémantique léger en classe ). Scores parfait [Lighthouse](https://pagespeed.web.dev/report?url=abridge.netlify.app), [YellowLabTools](https://yellowlab.tools/) et [Observatory](https://observatory.mozilla.org/analyze/abridge.netlify.app). Voici une page [Zola Themes Benchmarks](https://github.com/Jieiku/zola-themes-benchmarks/blob/main/README.md).
<!-- more -->

![lighthouse](lighthouse.png)

## Features

- [X] Scores parfait [Lighthouse](https://pagespeed.web.dev/report?url=abridge.netlify.app), [YellowLabTools](https://yellowlab.tools/) et [Observatory](https://observatory.mozilla.org/analyze/abridge.netlify.app)
- [X] [Prise en charge des PWA](#pwa-application-web-progressive) (Application Web progressive).
- [X] Tout JavaScript peut être [entièrement désactivé](https://abridge.netlify.app/overview-abridge/#javascript-files).
- [X] Thèmes sombre, clair, automatique et Switcher. (les couleurs peuvent être personnalisées, variables CSS)
- [X] Code [surlignage de la syntaxe](https://abridge.netlify.app/overview-code-blocks/). (les couleurs peuvent être personnalisées, variables CSS)
- [X] Blocs de code numérotés avec [mise en évidence des lignes](https://abridge.netlify.app/overview-code-blocks/#toml).
- [X] Site entièrement hors ligne en utilisant la PWA **ou** en définissant `offline = true` dans `config.toml` (prise en charge complète de la recherche).
- [X] Prise en charge multilingue.
- [X] Aide à la recherche. (elasticlunr, tinysearch, cigogne)
- [X] Suggestions de recherche touches de navigation, focus `/`, déplacement `flèche`, sélection `entrée`, fermeture `évasion`.
- [X] Page des résultats de recherche, tapez la requête de recherche, puis appuyez sur `Entrée` ou `cliquez` sur l'icône du bouton de recherche.
- [X] [SEO](#seo-et-balises-d-en-tete) soutien. (Optimisation du moteur de recherche)
- [X] [Pagination](#pagination) avec paginateur numéroté sur index.
- [X] Liens vers les articles précédents et suivants basés sur le titre au bas de l'article.
- [X] Table des matières dans la page Index (liens facultatifs cliquables)
- [X] Blocage des messages récents. (Facultatif)
- [X] Bouton Retour en haut. (utilise uniquement CSS)
- [X] Bouton de copie des blocs de code.
- [X] Lien d’e-mail dans l’obscurcissement du pied de page. (anti-spam)
- [X] [KaTeX](https://katex.org/) soutien.
- [X] [Page d'archives](https://abridge.netlify.app/archive/).
- [x] [Mots clés](https://abridge.netlify.app/tags/).
- [x] Catégories. (similaire aux Tags, désactivés/commentés par défaut)
- [x] Liens vers les icônes sociales dans le pied de page.
- [X] Conception réactive. (mobile d'abord)
- [X] Vidéo Shortcodes: [Youtube](https://abridge.netlify.app/video-streaming-sites/overview-embed-youtube/), [Vimeo](https://abridge.netlify.app/video-streaming-sites/overview-embed-vimeo/), [Streamable](https://abridge.netlify.app/video-streaming-sites/overview-embed-streamable/).
- [X] Médias Shortcodes: [video](https://abridge.netlify.app/overview-rich-content/#video), [img](https://abridge.netlify.app/overview-images/#img-shortcode), [imgswap](https://abridge.netlify.app/overview-images/#imgswap-shortcode), [image](https://abridge.netlify.app/overview-rich-content/#image), [gif](https://abridge.netlify.app/overview-rich-content/#gif), [audio](https://abridge.netlify.app/overview-rich-content/#audio).
- [X] Autre Shortcodes: [showdata](https://abridge.netlify.app/overview-showdata/), [katex](https://abridge.netlify.app/overview-math/#usage-1).

## Démarrage rapide

Ce thème nécessite une version {{ showdata(src="https://raw.githubusercontent.com/Jieiku/abridge/master/theme.toml" key="min_version" type="toml") }} ou plus tard de [Zola](https://www.getzola.org/documentation/getting-started/installation/)

```bash
git clone https://github.com/jieiku/abridge.git
cd abridge
zola serve
# open http://127.0.0.1:1111/ in the browser
```

## Installation

Le démarrage rapide montre comment exécuter le thème directement. Ensuite, nous utiliserons abridge comme thème pour un NOUVEAU site.

### 1: Créer un nouveau site zola

```bash
zola init mysite
cd mysite
```

### 2: Installer abridge

Ajoutez le thème en tant que sous-module git :

```bash
git init  # si votre projet est déjà un dépôt git, ignorez cette commande
git submodule add https://github.com/jieiku/abridge.git themes/abridge
```

Ou clonez le thème dans votre répertoire de thèmes:

```bash
git clone https://github.com/jieiku/abridge.git themes/abridge
```

### 3: Configuration

Copiez certains fichiers du répertoire du thème vers le répertoire racine de votre projet:

```bash
touch templates/.gitkeep
rsync themes/abridge/config.toml config.toml
rsync themes/abridge/content/_index.md content/
rsync themes/abridge/COPY-TO-ROOT-SASS/* sass/
rsync themes/abridge/netlify.toml netlify.toml
rsync themes/abridge/package_abridge.js package_abridge.js
rsync themes/abridge/package.json package.json
```

- `templates/.gitkeep` le répertoire des modèles est requis dans votre site de base. [#2150](https://github.com/getzola/zola/issues/2150)
- `config.toml` configuration de base avec toutes les valeurs de configuration.
- `content/_index.md` requis pour définir la pagination.
- `COPY-TO-ROOT-SASS/abridge.scss` remplace pour personnaliser les variables Abridge.
- `netlify.toml` paramètres pour déployer votre dépôt avec netlify
- `package_abridge.js` script de nœud pour: mettre à jour la liste des fichiers de cache dans PWA, réduire js, regrouper js
- `package.json` pour basculer entre nosearch, elasticlunr, tinysearch, stork.

Décommentez la ligne de thème dans le fichier racine config.toml de votre projet:
```bash
sed -i 's/^#theme = "abridge"/theme = "abridge"/' config.toml
```

### 4: Ajouter du nouveau contenu

Copiez le contenu du répertoire du thème dans votre projet ou créez un nouveau message:

```bash
rsync -r themes/abridge/content .
```

### 5: Exécuter le projet

Exécutez simplement `zola serve` dans le chemin racine du projet:

```bash
zola serve
```

Zola démarrera le serveur web de développement, accessible par défaut à `http://127.0.0.1:1111`.

Les modifications enregistrées seront rechargées en direct dans le navigateur. (appuyez sur `ctrl+f5`, ou pendant le développement, définissez `pwa=false` dans `config.toml`)

## Pagination

Vous pouvez définir le nombre d'éléments de la page d'accueil en éditant le fichier `content\_index.md` et en ajustant `paginate_by`

## Remplacements Sass

Les variables Abridge SASS peuvent être remplacées en éditant le fichier `sass\abridge.scss` dans le dossier sass racine de votre projet.

### Largeur de page

```scss
$mw:75%,// largeur maximale
```

### Modes thématiques abrégés

```scss
$abridgeMode: "switcher",//valeurs valides: switcher, auto, dark, light
```

- switcher: affiche automatiquement une version sombre ou claire en fonction des paramètres du navigateur/système d'exploitation et dispose d'un sélecteur de thème javascript cliquable par l'utilisateur.
- auto: affiche automatiquement une version sombre ou claire en fonction des paramètres du navigateur/système d'exploitation.
- dark: est toujours le thème sombre.
- light: est toujours le thème de la lumière.

### Couleurs et styles

Vous pouvez spécifier le modèle de couleur que vous souhaitez utiliser comme base:
```scss
$color: "orange",// modèle de couleur à utiliser/remplacer: orange, blue, blueshade
```

Remplacez ensuite les couleurs individuelles si nécessaire:
```scss
/// Couleurs sombres
$f1d: #ccc,// Couleur de police principale
$f2d: #ddd,// En-têtes de couleur de police
$c1d: #111,// Couleur d'arrière-plan primaire
$c2d: #222,// Couleur d'arrière-plan secondaire
...
```

### Icônes sociales de pied de page

Vous devez configurer les icônes sociales que vous envisagez d'utiliser. (rend la taille du fichier CSS plus petite)

Pour simplement les désactiver tous, vous pouvez définir `$enable-icons: false` (désactive TOUTES les icônes, la navigation, la recherche, etc.)

Sinon, activez uniquement les icônes dont vous avez besoin, par exemple pour le courrier que vous définiriez `$icon-mail: true`

Vous devez ensuite désactiver toutes les autres icônes que vous n'utilisez pas.

### Thème des visites noscript

Si vous avez configuré Abridge pour utiliser le mode de commutation au lieu de auto/dark/light, alors votre site aura un bouton qui permettra au visiteur de basculer le thème.

Si votre visiteur utilise noscript ou un autre module complémentaire de navigateur bloquant Javascript, il sera alors bloqué avec le thème par défaut configuré pour le mode de commutation.

Pour ajuster ce mode, vous devez définir les deux valeurs de configuration suivantes dans `abridge.scss` **ET** `config.toml`:

```scss
$switcherDefault: "dark",// mode de commutation nojs par défaut: dark, light (assurez-vous de définir également js_switcher_default dans config.toml)
```

```toml
js_switcher_default = "dark" # mode de commutation nojs par défaut: dark, light (assurez-vous de définir également $switcherDefault dans abridge.scss)
```

Par défaut, abridge utilise le mode sombre pour le sélecteur, donc à moins que vous ne souhaitiez définir le mode par défaut sur clair pour les visiteurs nojs/noscript, vous n'avez pas à vous soucier de ces paramètres.

## Config.toml Configuration

La plupart des options de `config.toml` sont auto-documentées. (évident entre le nom de la valeur de configuration et les commentaires)

Abridge fonctionnera avec un `config.toml` barebones car les valeurs par défaut sont fournies dans les fichiers modèles.

Je recommande de copier l'intégralité du fichier config.toml comme indiqué à l'étape 3 car il fournit toutes les valeurs configurables.

### Menus du haut et du pied de page

Définissez un champ dans `extra` avec une clé de `menu` et `menu_footer`.
Si vous souhaitez que le lien s'ouvre dans un nouvel onglet/navigateur, définissez `blank = true`.
taille : s150, s140, s130, s120, s110, s95, s90, s85, s80, s75, s70, faux (pleine taille)
Si un lien doit avoir une barre oblique à la fin de l'URL définie `slash = true`.
(généralement, tous les liens doivent avoir une barre oblique finale, sauf s'il s'agit d'un lien de fichier tel que `sitemap.xml`)

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

### SEO et balises d’en-tête

Vous pouvez consulter les balises SEO dans la macro SEO située dans `templates/macros/seo.html`, toutes les valeurs configurables doivent être dans `config.toml` sous `config.extra` ou dans les fichiers de démarque de contenu.

Dans votre fichier de démarque, vous devez définir un titre de moins de 60 caractères et une description entre 80 et 160 caractères. La description est ce qui est affiché dans les résultats de recherche sous le titre de la page. Partout où vous ne définissez pas de description de page, le fichier config.description du site principal sera utilisé à la place.

Vous devez également définir des mots-clés spécifiques à la page, à moins que vos mots-clés définis dans config.toml suffisent, tous les mots-clés que vous ajoutez à la page s'ajoutent à ceux définis dans config.toml, n'ajoutez donc pas ces mêmes mots-clés aux mots-clés de votre page.

Vous pouvez éventuellement également définir une image spécifique à la page pour les résultats de recherche en utilisant page.extra.thumbnail. Les cartes Facebook, Twitter et OpenGraph sont prises en charge (image et description automatiques pour les liens publiés). OpenGraph recommande 1200 x 630 (1,9:1). Twitter recommande 2:1 pour les grands et 1:1 pour les petits. Si vous ne définissez pas de miniature spécifique à la page, la bannière définie dans config.toml sera utilisée à la place.

Faire référence à [overview-images](https://raw.githubusercontent.com/Jieiku/abridge/master/content/overview-images/index.md) à titre d'exemple:
```md
+++
title = "Codes courts d'image"
description = "Les images peuvent être intégrées directement à l'aide de markdown `![Ferris](ferris.svg)`, mais l'utilisation d'un shortcode empêche CLS en définissant explicitement la largeur et la hauteur."
date = 2021-05-19
draft = false

[taxonomies]
tags = ["Features","Shortcodes","Images"]
[extra]
toc = true
keywords = "Image, Markdown, Shortcodes, Swap"
thumbnail = "ferris-gesture.png"
+++
```

### Notation mathématique KaTeX

KaTeX peut être utilisé pour afficher des mathématiques complexes, il s'agit d'une « composition mathématique rapide pour le Web ».

Vous pouvez voir une démo sur [cette page](https://abridge.netlify.app/overview-math/).

Pour de meilleures performances, je recommande d'activer uniquement les mathématiques sur une [base par page dans vos fichiers post.md](https://github.com/Jieiku/abridge/blob/master/content/overview-math.md?plain=1#L11-L13), au lieu de dans votre fichier config.toml principal.

### PWA, application Web progressive

Le thème Abridge prend en charge PWA. Vous pouvez installer l’intégralité du site en tant qu’application et le faire fonctionner hors ligne. Pour l'essayer, utilisez simplement Google Chrome ou votre téléphone et allez ici: [abridge.netlify.app](https://abridge.netlify.app/)

Si vous utilisez Chrome sur un ordinateur de bureau, regardez à la fin de la barre d'adresse le bouton d'installation. Sur Android, vous devriez obtenir une fenêtre contextuelle à installer, vous pouvez également installer à partir du menu à 3 points dans le coin supérieur droit. Une fois la PWA installée, vous pouvez vous déconnecter complètement et vous pourrez toujours parcourir ou rechercher sur le site!

Pour l'utiliser dans votre propre instance, vous devrez éditer `static/sw.js` pour la liste des fichiers à mettre en cache. Techniquement, vous n'avez pas besoin de modifier `sw.js`, mais si même un seul fichier est manquant dans la liste de cache, la liste ne sera pas pré-mise en cache, elle ne sera donc mise en cache que pendant votre navigation.

Il existe un script npm pour générer la liste de cache de fichiers et la minification `npm run abridge`. Mon fichier `netlify.toml` exécute automatiquement ce script npm lors du déploiement du site, donc tout est automatique. Si Zola était capable de modéliser un fichier js, il serait peut-être possible de générer dynamiquement la liste des fichiers cache lors de la construction.

La fonctionnalité PWA est également facile à désactiver en définissant simplement `pwa = false` dans `config.toml`

## Optimisation des performances

### Fichiers Javascript

Tout javascript peut être désactivé dans `config.toml`:

```toml
build_search_index = false

js_bundle = false
js_copycode = false
js_email_encode = false
js_prestyle = false
js_switcher = false

pwa = false
```

Voici les fichiers javascript utilisés par Abridge :

- search_index.en.js: index de recherche généré par zola à chaque build pour elasticlunr.
- elasticlunr.min.js: bibliothèque de recherche pour la recherche côté client.
- search.js: pour utiliser elasticlunr depuis le champ de recherche de nos sites pour les suggestions et la page de résultats.
- email.js: utilise javascript pour masquer votre véritable adresse e-mail grâce à l'icône de courrier en bas de la page.
- codecopy.js: ajoutez un bouton Copier aux blocs de code, pour copier le contenu du bloc de code dans le presse-papiers.
- theme.js: petit script pour faciliter le stockage local du sélecteur de thème. (jamais groupé, toujours séparé)
- theme_button.js: petit script pour la fonction de changement de thème lorsque vous cliquez sur le bouton de changement de thème.
- prestyle.js: Utilisé pour précharger les fichiers CSS `<link rel="preload"` - ce script les change en `<link rel="stylesheet"` une fois le chargement de la page terminé, cela nous permet de charger des feuilles de style pour les polices externes , fontawesome ou katex de manière non bloquante.
- sw.js: il s'agit du fichier Service Worker pour la PWA.
- sw_load.js: ce fichier gère le chargement du Service Worker pour la PWA.

#### option js_bundle

`js_bundle` lorsqu'il est défini sur true sert un fichier bundle au lieu de tous les fichiers js individuels.

Tous les bundles nécessaires sont générés dynamiquement par le script de nœud [package_abridge.js](https://github.com/Jieiku/abridge/blob/master/package_abridge.js)

Le script de nœud analysera votre config.toml pour rechercher les valeurs de configuration pertinentes, puis, en fonction de votre config.tomnl, générera les bundles requis.

Tout ce qui est nécessaire est `zola build && npm run abridge`.

#### Changer de bibliothèque de recherche

En plus d'elasticlunr, abridge prend également en charge tinysearch et stork.

tinysearch démo: https://jieiku.github.io/abridge-tinysearch/

stork démo: https://jieiku.github.io/abridge-stork/

Pour utiliser tinysearch/stork, des étapes supplémentaires sont nécessaires.

**Basculer vers tinysearch:**

Vous devez d’abord installer tinysearch pour pouvoir créer l’index:

```bash
git clone https://github.com/tinysearch/tinysearch
cd tinysearch
cargo build --release
sudo cp ./target/release/tinysearch /usr/local/bin/tinysearch
exit # recharger l'environnement shell
```

Basculer Abridge vers tinysearch:
```bash
npm run tinysearch
zola build
tinysearch --optimize --path static public/data_tinysearch/index.html
# zola serve
```

**Basculer vers stork:**

Vous devez d’abord installer stork pour pouvoir construire l’index:

```bash
git clone https://github.com/jameslittle230/stork
cd stork
cargo build --release
sudo cp ./target/release/stork /usr/local/bin/stork
exit # recharger l'environnement shell
```

Remplacer Abréger par Cigogne:

```bash
npm run stork
zola build
stork build --input public/data_stork/index.html --output static/stork.st
# zola serve
```

**Basculer vers elasticlunr:**

```bash
npm run elasticlunr
```

**Basculer vers nosearch:**

```bash
npm run nosearch
```

#### Changeur de thème

Le sélecteur de thème s'appuie sur javascript pour fonctionner, il applique la classe .light au documentElement racine. Le fichier qui gère cela (`theme.js`) est petit et optimisé et c'est le premier fichier chargé dans la tête, donc l'impact sur les performances est minime. Sans le sélecteur de thème, vous pouvez toujours utiliser le thème automatique qui utilise les paramètres de préférence du navigateur/système d'exploitation. Vous pouvez même installer un [plugin Firefox](https://addons.mozilla.org/en-US/firefox/addon/theme-switcher-for-firefox/) pour basculer rapidement entre les deux.

### Optimiser les fichiers PNG/ICO

Bon outil pour générer des icônes masquables pour `manifest.json`: [maskable.app](https://maskable.app/editor)

Tous les fichiers png peuvent être optimisés à l'aide de [oxipng](https://github.com/shssoichiro/oxipng):

```bash
cd static
oxipng -o max --strip all -a -Z *.png
```

Avec des écrans plus grands et une plus grande densité de pixels devenant monnaie courante, c'est probablement une bonne idée d'utiliser au moins un peu de compression avec perte. Par exemple, vous pouvez utiliser pngquant avec une qualité de 93% et vous obtiendrez souvent des images environ la moitié de la taille. Comprenez que pngquant est cumulatif, vous devez donc conserver vos images originales quelque part et n'utiliser pngquant qu'une seule fois par image, si vous l'utilisez encore et encore sur la même image, vous réduirez la qualité de l'image à chaque fois. Utilisez toujours oxipng par la suite, l'oxipng est sans perte.

```bash
pngquant --skip-if-larger --strip --quality=93-93 --speed 1 *.png
oxipng -o max --strip all -a -Z *.png
```

leanify peut compresser davantage pour les fichiers png et ico:

```bash
git clone https://github.com/JayXon/Leanify
cd Leanify
make
sudo cp leanify /usr/local/bin/leanify
exit  #lancer un nouveau terminal
leanify -i 7777 *.png
leanify -i 7777 *.ico
```

### Contenu pré-gzip/brotli

Si vous diffusez votre site avec nginx, vous pouvez pré-gzipper votre contenu.

(Netlify brotli compresse automatiquement vos fichiers, aucun travail supplémentaire n'est requis.)

Configurez d’abord nginx:

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

Ensuite, vous pouvez gzip/brotli vos fichiers:

```bash
zola build
find ~/.dev/abridge/public -type f -regextype posix-extended -regex '.*\.(htm|html|css|js|xml|xsl|txt|woff|woff2|svg|otf|eot|ttf)' -exec gzip --best -k -f {} \+ -exec brotli --best -f {} \;
rsync -zvrh ~/.dev/abridge/public/ web:/var/www/abridge
```

Nginx n'est pas livré par défaut avec le support brotli, mais l'ajouter n'a pas été difficile.
