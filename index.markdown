---
layout: home
---

<div align="center" markdown="1">

# Hey there! I'm Diego Fernando Rojas 👋.

### A software developer, diver and (soon) an electronic producer music from Colombia 🇨🇴
### currently living between Barcelona 🇪🇸 and Berlin 🇩🇪
<br>

</div>

<div class="home-paragraph"  markdown="1">

In this site shares my interests in:

1. 👨‍💻 **Software:** Mainly focused in eBPF and observability. Also one or another experiment with different technologies like Rust, Ruby, Python, containers, AI, etc.

2. 🐋 **Diving and ocean conservation:** Documenting my journey in ocean protection through storytelling.

3. 💡 **Misc:** Short-format notes about software and humanity, mainly in Spanish.

4. 🎶 **Techno Music:** A curated list of my favorite tracks.

<div align="center" markdown="1">
<br>
<hr>
<br>

# Latest Software posts 👨‍💻
<br>
</div>

{% assign latest_posts = site.posts | where_exp: "post", "post.category == 'software'" %}
<div class="container"  markdown="1">
{%- for post in latest_posts limit:5 -%}
  <div class="row">
    <div class="col-md-12">
      <h2 class="post-title-list">
      <a href="{{post.url | absolute_url }}">
        {{ post.title }}
        </a>
      </h2>
      <br>
    </div>
{%- endfor -%}
</div>

<div align="center" markdown="1">
<br>
<hr>
<br>

# Latest Oceans conservation posts 🐋
<br>

</div>

{% assign latest_posts = site.posts | where_exp: "post", "post.category == 'oceans'" %}
<div class="container"  markdown="1">
{%- for post in latest_posts limit:5 -%}
  <div class="row">
    <div class="col-md-12">
      <h2 class="post-title-list">
      <a href="{{post.url | absolute_url }}">
        {{ post.title }}
        </a>
      </h2>
      <br>
    </div>
{%- endfor -%}
</div>

<div align="center" markdown="1">
<br>
<hr>
<br>

# Latest random notes 💡
<br>
</div>

{% assign latest_posts = site.posts | where_exp: "post", "post.category == 'misc'" %}
<div class="container"  markdown="1">
{%- for post in latest_posts limit:5 -%}
  <div class="row">
    <div class="col-md-12">
      <h2 class="post-title-list">
      <a href="{{post.url | absolute_url }}">
        {{ post.title }}
        </a>
      </h2>
      <br>
    </div>
{%- endfor -%}
</div>