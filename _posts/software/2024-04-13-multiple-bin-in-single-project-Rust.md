---
layout: post
title: "Multiple entrypoints in Rust."
date: 2024-04-13 -0500
tags: software rust
category: software
published: true
emoji: 👨‍💻
---

In [Open Water](https://github.com/dfrojas/openwater){:target="_blank"}, I needed to keep my project organized while having multiple entrypoints: CLI, API and the Library. To do that, I found that I need to specify them in Cargo.toml. Take a look from line 22 to line 33 in the folliwing snippet. I have a CLI application with its own **main** entrypoint, also API with its own **main** and a library type that also needs to be addressed. If you need to keep your Rust project organized while having multiple **main**, do this approach:

{% highlight toml linenos %}
[package]
name = "openwater"
version = "0.1.0"
edition = "2021"

[dependencies]
clap = { version = "4.0", features = ["derive"] }
rprompt = "1.0.5"
colored = "2"
serde = {version = "1.0.145", features = ["derive"]}
serde_json = "1.0"
csv = "1.3.0"
plotly = "0.6.0"
axum = {version = "0.6.20", features = ["headers"]}
tokio = { version = "1.0", features = ["full"] }

[dev-dependencies]
assert_cmd = "2.0"
predicates = "2.1"
assert_fs = "1.0"

[[bin]]
name = "cli"
path = "src/cli/main.rs"

[[bin]]
name = "api"
path = "src/api/main.rs"

[lib]
name = "rust_library"
path = "src/lib/app.rs"
crate-type = ["staticlib"]
{% endhighlight %}
