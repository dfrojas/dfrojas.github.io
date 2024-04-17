---
layout: page
title: Oceans
permalink: /oceans/
order: 2
---

<div markdown="1">
  <div class="container-fluid">
  <div class="row">
    {%- for post in site.posts -%}
    {% if post.category == "oceans" %}
      <div class="col-lg-4">
        <a href="{{ post.url }}">
          <img src="{{ post.image }}">
          <div align="center">
            <h2 class="post-title-list">{{ post.title }}</h2>
            {{ post.place }}
          </div>
        </a>
      </div>
    {% endif %}
    <br><br>
    {%- endfor -%}
  </div>
  </div>
</div>
