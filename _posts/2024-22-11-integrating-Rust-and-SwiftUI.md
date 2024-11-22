---
layout: post
title: "Integrating of Rust and SwiftUI (Inspired by Mitchell Hashimoto)"
date: 2024-11-22 -0500
tags: software rust swiftui
category: software
published: true
emoji: 👨‍💻
image: /assets/img/rust_swiftui.png
author: Diego Fernando Rojas
---

Inspired by [Mitchell Hashimoto](https://twitter.com/mitchellh){:target="_blank"} in his [flight plan library written in Zig](https://github.com/mitchellh/libflightplan){:target="_blank"}, I created a [diving plan library in Rust](https://github.com/dfrojas/openwater){:target="_blank"}. And again, following his work in [Ghostty](https://twitter.com/mitchellh/status/1662217955424493570){:target="_blank"} and his article about [how he created the native Mac App for Ghostty](https://mitchellh.com/writing/zig-and-swiftui){:target="_blank"}, I decided to explore the same approach in my diving plan library and create a native macOS app, having the Rust code library as its backend and SwiftUI. in this article, I'll explain how I did it:



The Mitchell's article has already a very good explanation of the approach, so I recommend reading it first. While his article is centered in Zig, the approach in this article is the same but for Rust. The high level idea is the same but the details are not, since the C-ABI and the build system are different.

In this post, I'll walk you through how I built a native macOS application that leverages the power of Swift for the GUI and Rust for the backend processing. This architecture combines Swift's excellent UI capabilities with Rust's performance and safety guarantees.

The project consists of two main components:
* A GUI layer written in Swift using SwiftUI
* A backend library written in Rust with FFI bindings

Most the articles that I found while investigating this, were not using Swift Package Manager but Xcode, which it is completely different, and to be honest... Xcode is not great. It adds a lot of complexity, it has not the best developer experience (talking for myself, I'm not familiarized with the Apple dev ecosystem) and is hard to track all the configuration through code. So, I did not want to depends on Xcode.

The approach posted in this article is the result of hours of Googling, Claude and trial and error. Before to start, a few notes:

<div class="alert alert-warning" role="alert" markdown="1">

I'm not using the Open Water library here. I'm just testing the connection between Swift and Rust.

<p>* I'm not an expert in Rust, Swift nor Apple ecosystem, the approach exposed here was the way that I found to have a functional app, for sure there are better ways to do it, if you have any idea, please let me know or feel free to open a pull request to Open Water.</p>
<p>* I'm using Swift Package Manager. I'm not creating the project using Xcode, which would change the structure a lot.</p>
<p>* For the article, I'm exposing a single function to keep it simple. In future articles, I'll add more complex data structures.</p>
<p>* I'm using Brew as its system library. This open a lot of questions that still I'm exploring.</p>
<p>* Is the pkg approach the best way to link the Rust library? I don't know, I'm exploring it.</p>
<p>* This is not a copy-pasting approach, I'm explaining the steps that I followed for Open Water, but for your project might be different. The intention is to give you a starting point.</p>
<p>* In the Mitchell's article he exposes a lot of details that I'm not covering here nor I did not for Open Water. For example the usage of Lipo for Universal (Multi-Arch) Library or advance window management.</p>
<p>* I'm still not sure if using an static or dynamic library is the best approach.</p>
</div>

Ok, let's work!

### Creating the project

```
swift package init
cargo new app
```

### Project structure

The above commands should create a boilerplate. My project structure in [Open Water](https://github.com/dfrojas/openwater){:target="_blank"} is the following. Ignore for now the `api` and `cli` folders, they are part of Open Water but not part of this article.

```
├── Cargo.toml
├── api
│   └── main.rs
├── cli
│   ├── actions.rs
│   ├── args.rs
│   └── main.rs
├── gui
│   ├── Package.swift
│   ├── Sources
│   │   ├── OpenWaterBridge
│   │   │   └── OpenWater.swift
│   │   ├── OpenWaterCore
│   │   │   ├── module.modulemap
│   │   │   └── openwater.h
│   │   └── OpenWaterGUI
│   │       └── main.swift
│   └── openwater.pc
└── lib
    ├── errors.rs
    ├── ffi.rs
    ├── lib.rs
    ├── models.rs
    └── parser.rs
```

### Cargo.toml
For this project, I'm using a dynamic library. I'm not pasting the entire Cargo file of Open Water because I have different binaries defined there that are not relevant for this article. 

<figure>
  <figcaption>File: lib/Cargo.toml</figcaption>
{% highlight toml %}
[lib]
name = "openwater"
path = "src/lib/lib.rs"
crate-type = ["staticlib", "rlib", "cdylib"]
{% endhighlight %}
</figure>

### Writing the C API

This is our Rust code exposed to Swift. The `#[no_mangle]` and `extern "C"` attributes make it callable from C (and thus Swift).

Rust has excellent support for creating C-compatible interfaces, which allows Rust code to be called from other languages like C and Swift. This is done through what's called the ["Foreign Function Interface" (FFI)](https://en.wikipedia.org/wiki/Foreign_function_interface){:target="_blank"}. You can learn more in the official documentation [here](https://doc.rust-lang.org/nomicon/ffi.html#calling-rust-code-from-c){:target="_blank"}.

<figure>
  <figcaption>File: lib/ffi.rs</figcaption>
{% highlight rust %}
use std::ffi::CString;
use std::os::raw::c_char;

#[no_mangle]
pub extern "C" fn openwater_init() -> *const c_char {
    let message = "Hello Diego from Rust!";
    let c_str = CString::new(message).unwrap();
    c_str.into_raw() as *const c_char
}
{% endhighlight %}
</figure>


### Writing the header file

This header file declares what Rust functions are available to Swift.

<figure>
  <figcaption>File: gui/OpenWaterCore/openwater.h</figcaption>
{% highlight c %}
#ifndef openwater_core_h
#define openwater_core_h

#include <stdint.h>

#if defined(WIN32)
    #define EXPORT __declspec(dllexport)
#else
    #define EXPORT
#endif

EXPORT const char* openwater_init(void);
{% endhighlight %}
</figure>

### Module map

A `module.modulemap` file says how and what to import and use our C interface.

<figure>
  <figcaption>File: gui/OpenWaterCore/module.modulemap</figcaption>
{% highlight swift %}
module OpenWaterCore {
    umbrella header "openwater.h"
    link "openwater"
    export *
}
{% endhighlight %}
</figure>

### The bridge

This is our safety layer between Swift and Rust. It converts Rust's C-style strings into Swift strings and provides a clean API for our UI to use.

<figure>
  <figcaption>File: gui/OpenWaterBridge/OpenWater.swift</figcaption>
{% highlight swift %}
import OpenWaterCore
import Foundation

public enum OpenWaterBridge {
    public static func openWaterInit() -> String {
        guard let cString = openwater_init() else {
            return "Failed to init OpenWater"
        }
        let result = String(cString: cString)
        return result
    }
}
{% endhighlight %}
</figure>


### The SwiftUI app

This is our application's entry point and UI definition. It imports our bridge (OpenWaterBridge). I'm creating a simple a window with a button that prints the string that I have set in the FFI code. It's what users will see and interact with. For now, I'm not using the Open Water library here. I'm just testing the connection between Swift and Rust.

<figure>
  <figcaption>File: gui/OpenWaterGUI/main.swift</figcaption>
{% highlight swift %}
import SwiftUI
import OpenWaterBridge
import AppKit


@main
struct OpenWaterApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .windowResizability(.contentSize)
        .defaultSize(width: 800, height: 600)
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        NSApp.activate(ignoringOtherApps: true)
    }
}

struct ContentView: View {
    @State private var isHovering = false
    
    var body: some View {
        VStack {
            Text("OpenWater Dive Log")
                .font(.title)
                .padding()
            
            Button("Parse UDDF") {
                print(OpenWaterBridge.openWaterInit())
            }
            .buttonStyle(.bordered)
            .onHover { hovering in
                isHovering = hovering
            }
        }
        .frame(minWidth: 400, minHeight: 300)
        .padding()
    }
}
{% endhighlight %}
</figure>

### Package configuration

This is our project's build configuration file. It defines three essential layers:

* The GUI executable that users will interact with
* A bridge layer to safely communicate with Rust
* A system library configuration to link our Rust code

<figure>
  <figcaption>File: gui/Package.swift</figcaption>
{% highlight swift %}
// swift-tools-version:5.8
import PackageDescription

let package = Package(
    name: "OpenWaterGUI",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "OpenWaterGUI", targets: ["OpenWaterGUI"])
    ],
    targets: [
        .executableTarget(
            name: "OpenWaterGUI",
            dependencies: ["OpenWaterBridge"],
            path: "Sources/OpenWaterGUI"
        ),
        .target(
            name: "OpenWaterBridge",
            dependencies: ["OpenWaterCore"],
            path: "Sources/OpenWaterBridge"
        ),
        .systemLibrary(
            name: "OpenWaterCore",
            path: "Sources/OpenWaterCore",
            pkgConfig: "openwater",
            providers: [
                .brew(["openwater"])
            ]
        )
    ]
)
{% endhighlight %}
</figure>

### pkg-config file: Linking Everything Together

The pkg-config configuration file plays a crucial role. It tells the build system how to find and link our Rust library. This file works in conjunction with our Package.swift configuration (specifically with the systemLibrary target), especificalle in this line: https://github.com/dfrojas/openwater/blob/7861ab81e2b947c34ca1ee2a9612c3b960cd4b0b/src/gui/Package.swift#L24
<figure>
  <figcaption>File: gui/openwater.pc</figcaption>
{% highlight bash %}
prefix=/usr/local
exec_prefix=${prefix}
libdir=${exec_prefix}/lib
includedir=${prefix}/include

Name: openwater
Description: OpenWater library
Version: 0.1.0
Libs: -L${libdir} -lopenwater
Cflags: -I${includedir}
{% endhighlight %}
</figure>

### Building the project
This was the part that took me the most time to figure out. I had to create a custom build system in order to be able to run the SwiftUI app.

We have to copy the dynamic library to the system path, the header file to the include path and the pkg-config file to the pkg-config path. I created a Makefile to automate this process:

<figure>
  <figcaption>File: Makefile</figcaption>
{% highlight bash %}
run-app: ## Compile and run the GUI
	@echo "Running GUI..."
	cd src && \
	cargo build --lib --release && \
	cd .. && \
	cp target/release/libopenwater.dylib /usr/local/lib/ && \
	cd src/gui && \
	cp Sources/OpenWaterCore/openwater.h /usr/local/include/ && \
	cp openwater.pc /usr/local/lib/pkgconfig/ && \
	swift build && \
	swift run
{% endhighlight %}
</figure>

### How It All Works Together

* `Package.swift` file tells Swift how to build everything
* `module.modulemap` tells Swift what to import and use our C interface
* `main.swift` creates our UI and calls functions through the bridge
* `OpenWater.swift` safely converts data between Swift and Rust
* `ffi.rs` contains our actual Rust functionality
* `openwater.h` ensures everything can communicate properly

### The result

<img src="/assets/img/rust-swift-integration.gif" alt="OpenWater GUI" width="850" class="img-fluid"/>

### Finally...

Open Water is not intended to be a full dive log, it's just my hobby project to learn Rust and systems performance. So, for now, I'm very happy with the results of integrating Rust with a native macOS app. Still I have a lot of questions about the best practices for this approach. In the future, I'd like to explore:

* Expose more complex data structures sending real [UDDF logs](https://wrobell.dcmod.org/uddf/){:target="_blank"} information from Rust to Swift and render graphics as air consumption and maps.
* Windows isolation using cgroups to learn how to share the CPU and memory between processes.

Thanks for reading. If you have any idea or thoughts about this article, please [let me know](https://twitter.com/dfrojas89){:target="_blank"} or feel free to open a pull request to [Open Water](https://github.com/dfrojas/openwater){:target="_blank"}.

🐋 🌊 🤿
