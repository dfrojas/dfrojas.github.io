---
layout: post
title: "How I work with coding agents in 2026"
date: 2026-10-28 00:00:00 -0500
category: software
published: true
---

This blog post shows my adaptation journey with AI, where I am today (October 2026) and what I’m planning to introduce. What I mention here is what works for me and what I found the most value in. Hopefully it can help others.

## A brief history from 2023 until the present.
I started like everyone else: prompting ChatGPT, getting a response and copying and pasting it into my codebase. Like in the StackOverflow era but getting the code from GEN-AI. Then Cursor IDE and Claude Code arrived and it was possible to interact with the agent directly in the local code. But up to this point, I was still just chatting, with no workflows or proper direction; [the amount of AI Slop was massive](https://x.com/dfrojas89/status/2102474678069850129){:target="_blank"}. The supervision and review became another bottleneck.

## Today

### Verification is the base of everything.
Here is where I spend most of my time. Giving the agent the capability to test its own work was a game changer. I'm not talking only about integration tests; I mean giving it a set of reproducible bash commands to let the agent validate its own work. For instance, in OpenWater, my Zig application to parse dive logs, I gave the agent access to a LIMA VM to be able to test on Linux and reproduce the behavior of the CI locally. If I'm debugging the performance of an app, I give my agent the capability to use Hyperfine. In other words, allow it to use what you use as if you were developing by hand.

### Potato Skills
The [pstack](https://github.com/cursor/plugins/tree/main/pstack){:target="_blank"} of [Poteto](https://x.com/poteto/){:target="_blank"} was one of the gems that I found in 2026. It is a set of agent skills that turns familiar engineering practices into procedures the agent can follow across different tasks.

### My harness
I mainly use Opencode with the Go plan because it allows me to test different models for a more than fair price. I also switched back to Cursor (this time CLI) because pstack was mainly developed for Cursor.

I dropped Claude Code entirely because they did not add support for `AGENTS.md`. I did not want to maintain different `.md` files for different providers. I know that I can link `@AGENTS.md` from `@CLAUDE.md` but that's not the point.
I know that they reverted this decision recentely but I was already changed to other harnesses. I still use the Anthropic models but not from their harness.

### Local AI Observability
I have a local instance of Langfuse connected to my harness. Even if I use my harnesses in subscription mode, it helps me to study and understand the traces. Being a user of Langfuse led me to [find and report a bug](https://github.com/langfuse/langfuse-docs/issues/2718){:target="_blank"} in its integration with Claude Code where it was reporting the wrong token count because it ignored provider-reported usage, including cached tokens. I wrote in more detail [here]({% post_url software/2026-09-12-langfuse-claude-code-token-bug %}){:target="_blank"}.

### I have to understand what is happening
I do not buy the idea of not reading or reviewing the code at all. I have, of course, reduced the supervision a lot, but I still need (and want) to understand the architecture and the workflow of the application at a high level. One of the most tangible examples is when I gave the agent the instruction to implement the CI with Nix and I did not even know the basic concepts of Nix. It became a back-and-forth of trial and error until I took a pause to understand the basic concepts of Nix. I realized that the agent decided to use the Nix Sandbox when all I needed was the `Nix develop` approach: [https://x.com/dfrojas89/status/2112521437248458976](https://x.com/dfrojas89/status/2112521437248458976){:target="_blank"}.

### AI Memory
Since I use several harnesses, I found this project: [https://github.com/akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory){:target="_blank"}. It allows me to have cross-shared memory and context across harnesses.

## What comes next

### Cloud Agents
I'm still not at this point, but one of my plans is to try Orbs of AMP or Cursor Cloud Agents.

### Local AI
I want to go deeper with vLLM and Ollama. I have tried some things but nothing demonstrable.

## What I'm not using anymore after trying it.

### Spec-Driven Development and Plans
SDD looked promising; I tried it but then realized it became another system to maintain. Changes made outside the SDD workflow left the specs outdated, and I had to reconcile them with the code. I replaced that workflow with ADRs to preserve decisions and their reasoning. I wrote about this experience [here]({% post_url software/2026-08-29-why-i-stopped-using-openspec %}){:target="_blank"}

The agent makes plans based on assumptions rather than evidence. I found that most of the time, it generates a lot of AI slop to account for scenarios that will never occur. I replaced this with clear instructions for the agent to provide evidence for every decision or change.

## What I never plan to change

I do not plan to delegate the writing to an AI. I do for very limited things like commit messages or english grammar correction. But my articles, technical proposals, etc I do it by myself, but because the AI does not good well enough, is because I do not want to lose my capacity of express my ideas by myself, writing is one of the most poweful tool that we human have.
