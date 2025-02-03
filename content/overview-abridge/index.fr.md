+++
date = 2022-05-17T15:00:00Z
description = "Abridge est un thème Zola rapide et léger utilisant le html sémantique, abridge.css class-light CSS, et No Mandatory JS."
draft = false
title = "Thème Zola Abridge"
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
Un thème rapide, léger et moderne [Zola](https://getzola.org) utilisant [abridge.css](https://github.com/Jieiku/abridge.css) (un cadre HTML CSS sémantique de classe légère). Les scores de [Lighthouse](https://pagespeed.web.dev/report?url=abridge.netlify.app), [YellowLabTools](https://yellowlab.tools/) et [Observatory](https://developer.mozilla.org/en-US/observatory/analyze?host=abridge.netlify.app) sont parfaits. Voici une page [Zola Themes Benchmarks](https://github.com/Jieiku/zola-themes-benchmarks/blob/main/README.md).

<!-- more -->

![lighthouse](lighthouse.png)

## Caractéristiques

- Scores parfaits pour [Lighthouse](https://pagespeed.web.dev/report?url=abridge.netlify.app), [YellowLabTools](https://yellowlab.tools/), et [Observatory](https://developer.mozilla.org/en-US/observatory/analyze?host=abridge.netlify.app).
- [Prise en charge des PWA](#pwa) (Progressive Web Application).
- Tout le JavaScript peut être [entièrement désactivé](https://abridge.netlify.app/overview-abridge/#javascript-files).
- Thèmes Dark, Light, Auto et Switcher. (les couleurs peuvent être personnalisées, variables css)
- Code [coloration syntaxique](https://abridge.netlify.app/overview-code-blocks/). (couleurs personnalisables, variables css)
- Blocs de code numérotés avec [mise en évidence des lignes](https://abridge.netlify.app/overview-code-blocks/#toml).
- Site entièrement hors ligne en utilisant le PWA **ou** en mettant `search_library = "offline"` dans `config.toml`.
- Support multi-langues.
- Support de la recherche. ([elasticlunr](https://abridge.pages.dev/), [pagefind](https://abridge-pagefind.pages.dev/), [tinysearch](https://abridge-tinysearch.pages.dev/))
- Touches de navigation pour les suggestions de recherche, `/` focus, `arrow` move, `enter` select, `escape` close.
- Page des résultats de recherche, tapez la requête puis appuyez sur la touche Entrée ou cliquez sur l'icône du bouton de recherche.
- Support [SEO](#seo). (Optimisation des moteurs de recherche)
- [Pagination](#pagination) avec pagination numérotée sur l'index.
- Liens vers les articles précédents et suivants, basés sur le titre, au bas de l'article.
- Table des matières dans l'index de la page (optionnel, liens cliquables)
- Bloc des articles récents. (Facultatif)
- Bouton de retour en haut de page. (utilise css uniquement)
- Bouton de copie des blocs de code.
- Lien e-mail dans le pied de page. (anti-spam)
- Support [KaTeX](https://katex.org/).
- Page d'archive](https://abridge.netlify.app/archive/).
- Tags](https://abridge.netlify.app/tags/).
- Catégories. (similaire aux Tags, désactivé/commenté par défaut)
- Liens vers les icônes sociales dans le pied de page.
- Conception réactive. (mobile first)
- Shortcodes vidéo : [Youtube](https://abridge.netlify.app/video-streaming-sites/overview-embed-youtube/), [Vimeo](https://abridge.netlify.app/video-streaming-sites/overview-embed-vimeo/), [Streamable](https://abridge.netlify.app/video-streaming-sites/overview-embed-streamable/).
- Raccourcis pour les médias : [video](https://abridge.netlify.app/overview-rich-content/#video), [img](https://abridge.netlify.app/overview-images/#img-shortcode), [imgswap](https://abridge.netlify.app/overview-images/#imgswap-shortcode), [image](https://abridge.netlify.app/overview-rich-content/#image), [gif](https://abridge.netlify.app/overview-rich-content/#gif), [audio](https://abridge.netlify.app/overview-rich-content/#audio).
- Autres codes courts : [showdata](https://abridge.netlify.app/overview-showdata/), [katex](https://abridge.netlify.app/overview-math/#usage-1).

## Démarrage rapide

Ce thème nécessite la version {{ showdata(src="https://raw.githubusercontent.com/Jieiku/abridge/master/theme.toml" key="min_version" type="toml") }} ou ultérieure de [Zola](https://www.getzola.org/documentation/getting-started/installation/)

```bash
git clone https://github.com/jieiku/abridge.git
cd abridge
zola serve
# ouvrir http://127.0.0.1:1111/ dans le navigateur
```

## Installation

Le Quick Start montre comment lancer le thème directement. Ensuite, nous allons utiliser abridge comme thème pour un NOUVEAU site.

### 1 : Créer un nouveau site zola

```bash
yes "" | zola init mysite
cd mysite
```

### 2 : Installer Abridge

Ajouter le thème en tant que sous-module git :

```bash
git init # si votre projet est déjà un dépôt git, ignorez cette commande
git submodule add https://github.com/jieiku/abridge.git themes/abridge
git submodule update --init --recursive
git submodule update --remote --merge
```

Ou clonez le thème dans votre répertoire themes :

```bash
git clone https://github.com/jieiku/abridge.git themes/abridge
```

### 3 : Configuration

Copiez quelques fichiers du répertoire theme vers le répertoire racine de votre projet :

```bash
rsync themes/abridge/.gitignore .gitignore
rsync themes/abridge/config.toml config.toml
rsync themes/abridge/content/_index.md content/
rsync -r themes/abridge/COPY-TO-ROOT-SASS/* sass/
rsync themes/abridge/netlify.toml netlify.toml
rsync themes/abridge/package_abridge.js package_abridge.js
rsync themes/abridge/package.json package.json
```

- `config.toml` configuration de base avec toutes les valeurs de configuration.
- `content/_index.md` nécessaire pour définir la pagination.
- `COPY-TO-ROOT-SASS/abridge.scss` pour personnaliser les variables d'Abridge.
- `netlify.toml` pour déployer votre repo avec netlfiy.
- `package_abridge.js` script node pour : mettre à jour la liste des fichiers cache dans PWA, minify js, bundle js
- `package.json` utilisé par node, définit les scripts et les dépendances.

Décommentez la ligne theme dans le fichier config.toml de la racine de votre projet :

```bash
sed -i 's/^#theme = "abridge"/theme = "abridge"/' config.toml
```

### 4 : Ajouter un nouveau contenu

Copiez le contenu du répertoire du thème dans votre projet ou créez un nouveau message :

```bash
rsync -r themes/abridge/contenu .
```

### 5 : Exécuter le projet

Lancez simplement `zola serve` dans le chemin racine du projet :

```bash
zola serve
```

Zola va démarrer le serveur web dev, accessible par défaut à `http://127.0.0.1:1111`.

Les changements sauvegardés seront rechargés en direct dans le navigateur. (appuyez sur `ctrl+f5`, ou pendant le développement mettez `pwa=false` dans `config.toml`)

## Pagination {#pagination}

Vous pouvez définir le nombre d'éléments de la page d'accueil en éditant le fichier `content_index.md` et en ajustant `paginate_by`

## Remplacements Sass

Les variables SASS d'Abridge peuvent être surchargées en éditant le fichier `sass\abridge.scss` dans le dossier racine sass de votre projet.

### Largeur de la page

```scss
$mw:75%,// max-width
```

### Modes du thème Abridge

```scss
$abridgeMode : "switcher",//valeurs valides : switcher, auto, dark, light
```

- switcher : affiche automatiquement une version sombre ou claire en fonction des paramètres du navigateur/OS, et dispose d'un sélecteur de thème cliquable par l'utilisateur en javascript.
- auto : affiche automatiquement une version sombre ou claire en fonction des paramètres du navigateur/système d'exploitation.
- dark : affiche toujours le thème sombre.
- light : affiche toujours le thème clair.

### Couleurs et styles

Vous pouvez spécifier le modèle de couleur que vous souhaitez utiliser comme base :

```scss
$color : "orange",// modèle de couleur à utiliser : orange, bleu, blueshade
```

Ensuite, vous pouvez surcharger des couleurs individuelles si nécessaire :

```scss
/// Couleurs sombres
$f1d : #ccc,// Couleur de police primaire
$f2d : #ddd,// Couleur de la police Headers
$c1d : #111,// Couleur d'arrière-plan primaire
$c2d : #222,// Couleur d'arrière-plan secondaire
...
```

### Icônes sociales en bas de page

Vous devez configurer les icônes sociales que vous souhaitez utiliser. (réduit la taille du fichier css)

Pour les désactiver, vous pouvez définir `$enable-icons : false` (désactive TOUTES les icônes, la navigation, la recherche, etc.)

Sinon, n'activez que les icônes dont vous avez besoin, par exemple pour le courrier, vous pouvez mettre `$icon-mail : true`

Vous devriez alors désactiver toutes les autres icônes que vous n'utilisez pas.

### Thème pour les visites noscript

Si vous avez configuré abridge pour utiliser le mode switcher au lieu de auto/dark/light, alors votre site aura un bouton qui permettra au visiteur de basculer le thème.

Si votre visiteur utilise noscript ou un autre module complémentaire de navigateur bloquant le javascript, il sera bloqué avec le thème par défaut configuré pour le mode de commutation.

Pour ajuster ce mode, vous devez définir les deux valeurs de configuration suivantes dans `abridge.scss` **ET** `config.toml` :

```scss
$switcherDefault: "dark",// mode de commutation nojs par défaut : dark, light (assurez-vous de définir également js_switcher_default dans config.toml)
```

```toml
js_switcher_default = "dark" # mode de commutation nojs par défaut : sombre, clair (assurez-vous de définir également $switcherDefault dans abridge.scss)
```

Par défaut, abridge utilise le mode sombre pour le sélecteur, donc à moins que vous ne souhaitiez mettre le mode par défaut à clair pour les visiteurs nojs/noscript, vous n'avez pas besoin de vous préoccuper de ces paramètres.

## Config.toml Configuration

La plupart des options de `config.toml` sont auto-documentées. (évident entre le nom de la valeur de configuration et les commentaires)

Abridge fonctionnera avec un `config.toml` dépouillé parce que les valeurs par défaut sont fournies dans les fichiers modèles.

Je recommande de copier l'intégralité du fichier config.toml comme indiqué à l'étape 3, car il contient toutes les valeurs configurables.

### Menus du haut et du bas de page

Définissez un champ dans `extra` avec une clé de `menu` et `menu_footer`.
Si vous voulez que le lien s'ouvre dans un nouvel onglet/nouveau navigateur, mettez `blank = true`.
taille : s150, s140, s130, s120, s110, s95, s90, s85, s80, s75, s70, false(full size)
Si un lien doit avoir une barre oblique à la fin de l'url, mettre `slash = true`.
(en général, tous les liens doivent avoir un slash à la fin, sauf s'il s'agit d'un lien vers un fichier comme `sitemap.xml`).

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

### SEO et balises d'en-tête {#seo}

Vous pouvez revoir les balises SEO dans la macro seo située dans `templates/macros/seo.html`, toutes les valeurs configurables doivent être dans `config.toml` sous `config.extra` ou dans les fichiers markdown du contenu.

Dans votre fichier markdown, vous devez définir un titre de moins de 60 caractères et une description de 80 à 160 caractères. La description est ce qui est affiché dans les résultats de recherche sous le titre de la page. Partout où vous ne définissez pas de description de page, le fichier config.description du site principal sera utilisé à la place.

Vous devez également définir des mots-clés spécifiques à la page, à moins que les mots-clés définis dans config.toml ne suffisent. Tous les mots-clés que vous ajoutez à la page s'ajoutent à ceux définis dans config.toml ; n'ajoutez donc pas ces mêmes mots-clés aux mots-clés de votre page.

Vous pouvez également définir une image spécifique à la page pour les résultats de recherche en utilisant page.extra.thumbnail. Les cartes Facebook, Twitter et OpenGraph sont prises en charge (image et description automatiques pour les liens affichés). OpenGraph recommande une taille de 1200 x 630 (1,9:1). Twitter recommande 2:1 pour les grandes images et 1:1 pour les petites. Si vous ne définissez pas de vignette spécifique à une page, la bannière définie dans config.toml sera utilisée à la place.

Référez-vous à [overview-images](https://raw.githubusercontent.com/Jieiku/abridge/master/content/overview-images/index.md) pour un exemple :

```md
+++
[extra]
thumbnail = "ferris-gesture.png"
+++
```

### Notation mathématique KaTeX

KaTeX peut être utilisé pour afficher des mathématiques complexes. Il s'agit d'une "composition mathématique rapide pour le web".

Vous pouvez voir une démo sur [cette page] (https://abridge.netlify.app/overview-math/).

Pour de meilleures performances, je recommande de n'activer les mathématiques que [par base de page dans vos fichiers post.md](https://github.com/Jieiku/abridge/blob/master/content/overview-math.md?plain=1#L11-L13), plutôt que dans votre fichier config.toml principal.

### PWA, Progressive Web App {#pwa}

Le thème Abridge supporte les PWA. Vous pouvez installer le site entier en tant qu'application et le faire fonctionner hors ligne. Pour l'essayer, il suffit d'utiliser Google Chrome ou votre téléphone et d'aller ici : [abridge.netlify.app](https://abridge.netlify.app/)

Si vous utilisez Chrome sur un ordinateur de bureau, cherchez le bouton d'installation à la fin de la barre d'adresse. Sur Android, vous devriez obtenir un popup pour installer, vous pouvez également installer à partir du menu à 3 points dans le coin supérieur droit. Une fois la PWA installée, vous pouvez vous déconnecter complètement et continuer à naviguer ou à faire des recherches sur le site !

Il y a un script npm pour générer la liste de cache des fichiers et la minification `npm run abridge`. Mon fichier [netlify.toml](https://github.com/Jieiku/abridge/blob/master/netlify.toml) exécute automatiquement ce script npm lors du déploiement du site, donc tout est automatique. Si Zola était capable de modéliser un fichier js, alors il serait possible de générer la liste des fichiers cache dynamiquement lors de la construction au lieu de s'appuyer sur node/npm.

Pour utiliser une liste spécifique de fichiers au lieu de tous les fichiers, éditez l'entrée `pwa_BASE_CACHE_FILES` dans `config.toml`. Si un seul fichier de la liste de cache est manquant, alors la liste ne sera pas pré-cachée, et le cache ne se fera qu'au fur et à mesure que vous naviguerez. (Si vous vous installez pour la première fois, testez avec seulement quelques pages).

La fonctionnalité PWA est également facile à désactiver en mettant simplement `pwa = false` dans `config.toml`

## Optimisation des performances

### Fichiers Javascript

Tout le javascript peut être désactivé dans `config.toml` :

```toml
build_search_index = false

js_bundle = false
js_copycode = false
js_email_encode = false
js_prestyle = false
js_switcher = false

pwa = false
```

Voici les fichiers javascript utilisés par Abridge :

- search_index.en.js : index de recherche généré par zola à chaque compilation d'elasticlunr.
- elasticlunr.min.js : bibliothèque de recherche pour la recherche côté client.
- search.js : pour utiliser elasticlunr à partir de la boîte de recherche de notre site, à la fois pour les suggestions et pour la page de résultats.
- email.js : utilise le javascript pour obscurcir votre adresse e-mail réelle pour l'icône de messagerie en bas de la page.
- codecopy.js : ajoute un bouton Copier aux blocs de code, pour copier le contenu du bloc de code dans le presse-papiers.
- theme.js : petit script pour faciliter le stockage local du sélecteur de thème. (jamais groupé, toujours séparé)
- theme_button.js : petit script pour la fonction de changement de thème lorsque vous cliquez sur le bouton de changement de thème.
- prestyle.js : Utilisé pour précharger les fichiers css `<link rel="preload"` - ce script les change en `<link rel="stylesheet"` une fois que la page a fini de se charger, ce qui nous permet de charger les feuilles de style pour les polices externes, fontawesome, ou katex d'une manière non bloquante.
- sw.js : c'est le fichier du Service Worker pour la PWA.
- sw_load.js : ce fichier gère le chargement du Service Worker pour la PWA.

#### option js_bundle

`js_bundle`, lorsqu'il est fixé à true, sert un fichier bundle au lieu de tous les fichiers js individuels.

Tous les bundles nécessaires sont générés dynamiquement par le script node [package_abridge.js](https://github.com/Jieiku/abridge/blob/master/package_abridge.js)

Le script node va analyser votre config.toml pour trouver les valeurs de configuration pertinentes, et ensuite, en se basant sur votre config.tomnl, générer les bundles nécessaires.

Tout ce qui est nécessaire est `zola build && npm run abridge`.

#### Bibliothèque de recherche de commutateurs

En plus d'elasticlunr, abridge supporte également pagefind et tinysearch.

Démonstration de pagefind : https://abridge-pagefind.pages.dev/

démo tinysearch : https://abridge-tinysearch.pages.dev/

Pour utiliser tinysearch, des étapes supplémentaires sont nécessaires.

**Passer à pagefind:**

```bash
npm install
sed -i 's/^search_library =.*/search_library = "pagefind"/' config.toml
npm run abridge
# zola serve
```

**Switch to elasticlunr:**

```bash
sed -i 's/^search_library =.*/search_library = "elasticlunr"/' config.toml
npm run abridge
```

**Switch to nosearch:**

```bash
sed -i 's/^search_library =.*/search_library = "false"/' config.toml
npm run abridge
```

**Switch to tinysearch:**

Il faut d'abord installer tinysearch pour pouvoir construire l'index :

```bash
git clone https://github.com/tinysearch/tinysearch
cd tinysearch
cargo build --release
sudo cp ./target/release/tinysearch /usr/local/bin/tinysearch
exit # reload shell environment
```

Passer Abridge à tinysearch :

```bash
sed -i 's/^search_library =.*/search_library = "tinysearch"/' config.toml
npm run abridge
tinysearch --optimize --path static public/data_tinysearch/index.html
# zola serve
```

#### Theme-Switcher

Le commutateur de thème s'appuie sur le javascript pour fonctionner, il applique la classe .light à l'élément documentElement de la racine. Le fichier qui gère cela (`theme.js`) est minuscule et optimisé et c'est le premier fichier chargé dans l'en-tête, donc l'impact sur les performances est minime. Sans le sélecteur de thème, vous pouvez toujours utiliser le thème automatique qui utilise les préférences du navigateur/système d'exploitation. Vous pouvez même installer un [plugin Firefox] (https://addons.mozilla.org/en-US/firefox/addon/theme-switcher-for-firefox/) pour passer rapidement d'un thème à l'autre.

### Optimiser les fichiers PNG/ICO

Un bon outil pour générer des icônes masquables pour `manifest.json` : [maskable.app](https://maskable.app/editor)

Tous les fichiers PNG peuvent être optimisés en utilisant [oxipng](https://github.com/shssoichiro/oxipng) :

```bash
cd static
oxipng -o max --strip all -a -Z *.png
```

Avec des écrans plus grands et une plus grande densité de pixels, c'est probablement une bonne idée d'utiliser au moins un peu de compression avec perte. Par exemple, vous pouvez utiliser pngquant avec une qualité de 93% et vous obtiendrez souvent des images d'environ la moitié de la taille. Comprenez que pngquant est cumulatif, vous devriez donc garder vos images originales quelque part, et n'utilisez pngquant qu'une seule fois par image, si vous l'utilisez encore et encore sur la même image, vous diminuerez la qualité de l'image à chaque fois. Utilisez toujours oxipng par la suite, oxipng est sans perte.

```bash
pngquant --skip-if-larger --strip --quality=93-93 --speed 1 *.png
oxipng -o max --strip all -a -Z *.png
```

leanify peut compresser plus loin les fichiers png et ico :

```bash
git clone https://github.com/JayXon/Leanify
cd Leanify
make
sudo cp leanify /usr/local/bin/leanify
exit #lancer un nouveau terminal
leanify -i 7777 *.png
leanify -i 7777 *.ico
```

### Contenu gzip/brotli préalable

Si vous servez votre site avec nginx, vous pouvez pré-gzip votre contenu.

(Netlify gzippe vos fichiers automatiquement, sans travail supplémentaire).

Configurez d'abord nginx :

```bash
sudo nano /etc/nginx/nginx.conf

gzip on ;
gzip_vary on ;
gzip_proxied expired no-cache no-store private auth ;
#gzip_proxied any ;
gzip_comp_level 9 ;
gzip_buffers 64 16k ;
#gzip_buffers 16 8k ;
gzip_http_version 1.1 ;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml application/xhtml+xml application/x-javascript application/x-font-ttf application/vnd.ms-fontobject font/opentype font/ttf font/eot font/otf ;
#gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript ;
```

Ensuite, vous pouvez gzip/brotli vos fichiers :

```bash
Construction de zola
find ~/.dev/abridge/public -type f -regextype posix-extended -regex '.*\.(htm|html|css|js|xml|xsl|txt|woff|woff2|svg|otf|eot|ttf)' -exec gzip --best -k -f {} \+ -exec brotli --best -f {} \ ;
rsync -zvrh ~/.dev/abridge/public/ web:/var/www/abridge
```

Nginx n'est pas livré par défaut avec le support de brotli, mais l'ajouter n'a pas été difficile.
