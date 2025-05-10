---
layout: post
title: "Debugging a Rust application interactively with different binaries in VSCode (or Cursor)."
date: 2024-11-13 -0500
tags: software rust
category: software
published: true
emoji: 👨‍💻
---

While I develop [Open Water](https://github.com/dfrojas/openwater){:target="_blank"} and the application is getting more complex, I often had the need to debug my application interactively and not only using `println!` statements.

In this article, I'm going to show you how to debug a Rust application interactively using [`Code-lldb` debugger](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb){:target="_blank"} having different binaries.

My Open Water application has the following binaries:

- `lib`: The core library.
- `cli`: The command line interface.
- `api`: The REST API server.
- `examples`: Examples of how to use the library.

Each of them has its own entrypoint and they are completely independent.

## Configuration

Create a new file in the `.vscode` directory called `launch.json`.

For now, your file is empty, but let's see first what will be the configuration for each of the binaries. This configuration varies depending on your application. So, just copy-pasting this configuration won't work, you need to change the `name` and `cargo` arguments. In my case, I added two debuggers, one for the CLI and one for the core Library. If want to run the library without a debugguer, I just have to do:

```bash
cargo run --example dev
```

Or if I want to run the CLI:

```bash
cargo run --bin cli -- -o json -i examples/uddf/log.uddf
```

So, the configuration file will contain the same information as if you were running the application from the command line but with the JSON info that VSCode will use to debug the application. The VSCode debugger is well documented here: [VSCode Debugger](https://code.visualstudio.com/docs/editor/debugging){:target="_blank"}, I'm not doing anything fancy, just the basic things to debug a Rust application.

My final configuration file looks like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug CLI",
            "cargo": {
                "args": [
                    "build",
                    "--bin=cli"
                ]
            },
            "args": [
                "-i",
                "examples/uddf/log.uddf",
                "-o",
                "json"
            ],
            "cwd": "${workspaceFolder}"
        },
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug Lib",
            "cargo": {
                "args": [
                    "build",
                    "--example=dev"
                ]
            },
            "args": [],
            "cwd": "${workspaceFolder}"
        }
    ]
}
```