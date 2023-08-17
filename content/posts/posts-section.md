+++
title = "Posts Transparent Section"
date = 2021-05-04
draft = false

[taxonomies]
categories = ["Features"]
tags = ["config"]
+++

You can place your content in content/posts/ instead of content/ this will make post urls example.com/posts/post-title
<!-- more -->
In the posts directory you will see the _index.md:

```md
+++
transparent = true
redirect_to = "/"
+++
```
