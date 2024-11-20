---
layout: home
---

<div align="center" markdown="1">

# Hey there! I'm Diego Fernando Rojas.
&nbsp;
#### I'm a software engineer, diver, and (soon) an electronic producer music from Colombia 🇨🇴
&nbsp;
#### Currently living between Berlin 🇩🇪, Barcelona 🇪🇸 and Cali 🇨🇴
&nbsp;

</div>

<div class="home-paragraph"  markdown="1">

In this site I share my interests in:

1. 👨‍💻 **Software:** Mainly focused in eBPF and performance engineering. Also one or another experiment with different tools like Rust, containers, AI, etc. You can read my blog posts [<u>here</u>](/software/).

2. 🐋 **Diving and ocean conservation:** Documenting my journey in ocean protection through storytelling.

3. 💡 **Misc:** Short-format notes about software and humanity, mainly in Spanish.

4. 🎶 **Techno Music:** A curated list of my favorite tracks.

<hr>

<h1 class="index-section-title">Technical blog posts</h1>

Articles I've written as results of my work, research, or random experiments. Mainly in format as "capsules" for my self-reference that I might need in the future and want to share with the community, do not expect fancy advanced tech writing, but lots of raw ideas.

<ul class="post-list">
  {%- for post in site.posts -%}
  {% if post.category == "software" %}
  <li>
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    <span class="post-meta">{{ post.date | date: date_format }}</span>
    <a class="post-link" href="{{ post.url | relative_url }}">
      {{ post.title | escape }}
    </a>
  </li>
  {% endif %}
  {%- endfor -%}
</ul>

<hr>

<h1 class="index-section-title">My Open Source contributions</h1>

- **Python 3.8:** [bpo-34160: Update news entry for XML order attributes.](https://github.com/python/cpython/pull/12335){:target="_blank"}
- **Python 3.8:** [bpo-34160: Preserves order of minidom of Element attributes.](https://github.com/python/cpython/pull/10219){:target="_blank"}
- **Kubernetes test infra:** [Closed] [Automate the bug-triage](https://github.com/dfrojas/test-infra/pull/1){:target="_blank"}

<hr>

<h1 class="index-section-title">My hobby projects</h1>

Projects that I work from time to time for fun.

<div class="container-fluid">
  <div class="row">
    <!-- First Column -->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="row g-0">
          <div class="col-3">
            <img src="/assets/img/openwater-logo.jpeg" class="img-fluid h-100 project-card-img" alt="Open Water">
          </div>
          <div class="col-9">
            <div class="card-body">
              <a href="https://github.com/dfrojas/openwater" target="_blank"><strong><u>Open Water</u></strong></a>
              <p class="mb-0">Rust library to read and write dive logs in UDDF format.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Second Column -->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="row g-0">
          <div class="col-3">
            <img src="/assets/img/yubarta_whale_logo.png" class="img-fluid h-100 project-card-img" alt="Yubarta">
          </div>
          <div class="col-9">
            <div class="card-body">
              <a href="https://github.com/dfrojas/yubarta" target="_blank"><strong><u>Yubarta</u></strong></a>
              <p class="mb-0">An application to deploy eBPF programs at scale using declarative configuration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- New Row -->
  <div class="row">
    <!-- First Column -->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="row g-0">
          <div class="col-3">
            <img src="/assets/img/mobula.png" class="img-fluid h-100 project-card-img" alt="Mobula">
          </div>
          <div class="col-9">
            <div class="card-body">
              <a href="https://github.com/dfrojas/mobula_csv" target="_blank"><strong><u>Mobula</u></strong></a>
              <p class="mb-0">A simple Version Control System written in different languages.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>