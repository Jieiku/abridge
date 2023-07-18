+++
title = "Blog Section"
date = 2021-05-04
draft = false

[taxonomies]
categories = ["Features"]
tags = ["config"]
+++

Vous pouvez placer votre contenu dans content/blog/ au lieu de content/ cela fera des URL de publication example.com/blog/post-title
<!-- more -->
Dans le répertoire du blog, vous verrez le _index.md:

```md
+++
template = "index.html"
paginate_by = 3
sort_by = "date"
+++
```

Au lieu de index.html, vous pouvez également spécifier archive.html, les deux modèles prennent en charge les sections:

```md
+++
template = "archive.html"
+++
```
