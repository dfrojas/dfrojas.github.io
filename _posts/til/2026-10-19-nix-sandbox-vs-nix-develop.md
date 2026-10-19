---
layout: post
title: "Nix Sandbox vs Nix Develop"
date: 2026-10-19 00:00:00 -0500
category: til
tags: nix development reproducibility
published: true
---

**Nix build:** Builds the package sandboxed. It is hermetic and cannot even access the external network. For instance, if the application has integration tests that run during the build and make requests to an external service, the tests are going to fail. It cannot download packages. To enable the Nix Sandbox, it is necessary to add `sandbox = true` to `nix.conf` at the operating system level. The Nix Sandbox is useful when the application is intended to be distributed in Nix or when it needs to be reproduced without depending on the local system.

**Nix develop:** It is a shell. It prepares the environment for working on the project and shares resources with the host. For instance, the file system or the network.

**How I learned this:** When I decided to build the CI of [OpenWater](https://github.com/dfrojas/openwater) with Nix and faced some problems running the tests in the OS matrix and linking an external C library with my application.
