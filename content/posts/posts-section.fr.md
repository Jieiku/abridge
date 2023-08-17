+++
title = "Posts Transparent Section"
date = 2021-05-04
draft = false

[taxonomies]
categories = ["Features"]
tags = ["config"]
+++

Vous pouvez placer votre contenu dans content/posts/ au lieu de content/ cela fera des URL de publication example.com/posts/post-title
<!-- more -->
Dans le répertoire des articles, vous verrez le _index.md :

```md
+++
transparent = true
redirect_to = "/"
+++
```
