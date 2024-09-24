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

1. 👨‍💻 **Software:** Mainly focused in eBPF and observability. Also one or another experiment with different tools like Rust, containers, AI, etc.

2. 🐋 **Diving and ocean conservation:** Documenting my journey in ocean protection through storytelling.

3. 💡 **Misc:** Short-format notes about software and humanity, mainly in Spanish.

4. 🎶 **Techno Music:** A curated list of my favorite tracks.

<hr>

## My Open Source contributions

- **Python 3.8:** [bpo-34160: Update news entry for XML order attributes.](https://github.com/python/cpython/pull/12335){:target="_blank"}
- **Python 3.8:** [bpo-34160: Preserves order of minidom of Element attributes.](https://github.com/python/cpython/pull/10219){:target="_blank"}
- **Kubernetes test infra:** [Closed] [Automate the bug-triage](https://github.com/dfrojas/test-infra/pull/1){:target="_blank"}

<hr>

<div markdown="1">
## Latest blog posts
{% assign latest_posts = site.posts | where_exp: "post", "post.category == 'software'" %}
<ul>
{%- for post in latest_posts limit:5 -%}
  <li>
    <a href="{{ post.url | relative_url }}">
      {{ post.title | escape }}
    </a>
  </li>
{% endfor %}
</ul>
</div>

<hr>

## My hobby projects

<div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="d-flex align-items-start">
      <img src="/assets/img/openwater-logo.jpeg" alt="Project 1 Thumbnail" class="img-fluid me-3" style="max-width: 100px;">
      <div>
        <a href="https://github.com/dfrojas/openwater" target="_blank">Open Water</a>
        <p>A desktop application to process dive logs, written in Rust.</p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="d-flex align-items-start">
      <img src="/assets/img/mobula.png" alt="Mobula Thumbnail" class="img-fluid me-3" style="max-width: 100px;">
      <div>
        <a href="https://github.com/dfrojas/yubarta" target="_blank">Mobula</a>
        <p>A simple Version Control System written in different languages.</p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="d-flex align-items-start">
      <img src="/assets/img/yubarta_whale_logo.png" alt="Project 2 Thumbnail" class="img-fluid me-3" style="max-width: 100px;">
      <div>
        <a href="https://github.com/dfrojas/yubarta" target="_blank">Yubarta</a>
        <p>An application for deploying eBPF programs at scale using declarative configuration.</p>
      </div>
    </div>
  </div>
</div>