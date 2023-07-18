+++
title = "Blog Section"
date = 2021-05-04
draft = false

[taxonomies]
categories = ["Features"]
tags = ["config"]
+++

You can place your content in content/blog/ instead of content/ this will make post urls example.com/blog/post-title
<!-- more -->
In the blog directory you will see the _index.md:

```md
+++
template = "index.html"
paginate_by = 3
sort_by = "date"
+++
```

Instead of index.html you can also specify archive.html, both templates support sections:

```md
+++
template = "archive.html"
+++
```
