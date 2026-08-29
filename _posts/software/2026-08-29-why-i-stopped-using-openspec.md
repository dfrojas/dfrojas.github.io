---
layout: post
title:  "Why I Stopped Using Spec-Driven Development"
date:   2026-08-29 -0500
category: software
published: true
---

I used OpenSpec in [Yubarta](https://dfrojas.com/software/yubarta-devlog-001.html){:target="_blank"} to give coding agents persistent context about the project. It worked well at first: before implementing a change, I could review the requirements, design, and tasks.

The problem came later. A manual edit, a direct prompt, or a revised decision could change the code without changing the specs. When I returned to OpenSpec, the agent found contradictions and I had to explain what still applied. Keeping those documents synchronized eventually cost more than the persisten context they provided.

## A Second Representation of the System

OpenSpec distributed each change across a proposal, specs, a design, and a task list. That structure helped prepare an implementation, but it also created several related representations. Changing one decision meant finding which other documents still depended on it.

[Yubarta's commit history](https://github.com/dfrojas/yubarta/commits/main/){:target="_blank"} makes this cost visible. For a single change, I had to record the [exploration and design](https://github.com/dfrojas/yubarta/commit/775ed4834dcfcb80bb767aad219492f50c9975ef){:target="_blank"}, create another commit for the [implementation](https://github.com/dfrojas/yubarta/commit/759c6f393e2154ac25cb7cc720f57cc020cc5608){:target="_blank"}, and then one more to [complete and archive the spec](https://github.com/dfrojas/yubarta/commit/72f9ac965ff758a3113a00fa00e7860de782bfa6){:target="_blank"}. As a result, a substantial share of the latest commits did not change the system's behavior: they maintained the documented representation of changes already present in the code. That documentation was supposed to provide persistent context, but it became a second workflow that I also had to complete and review.

## When the Concurrency Model Changed

The problem became clear while I was designing [Yubarta's concurrency model](https://github.com/dfrojas/yubarta/commit/ed198456e86609ece63e2e1c1871f210f9519917){:target="_blank"}. I first considered `SELECT FOR UPDATE`. After exploring its limits, I chose three separate mechanisms: `version` to detect concurrent writes, `lease_generation` as a fencing token, and `idempotency_key` to prevent repeated external operations.

This was more than a query change. The new design affected the models, database mappings, migrations, and tasks that already described the earlier approach. The code could move forward with the new decision while OpenSpec still retained parts of the old one.

Implementation also produces knowledge. [Birgitta Böckeler](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html){:target="_blank"} distinguishes between *spec-first*: writing a spec to guide a change, and *spec-anchored*: retaining it as the feature evolves. I still see value in the first. My problem appeared when I tried to maintain the second. Iteration is part of software development; the cost was carrying every new insight back into every representation of the system.

## Attempts to Keep the Specs Current

I tried CI to detect discrepancies, skills to make agents update documentation, and OpenSpec's [`/opsx:update` and `/opsx:sync`](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md){:target="_blank"} functions. Each automated part of the process, but none resolved the central decision: whether the code was wrong or the spec had fallen behind. OpenSpec's [discussion about manual changes](https://github.com/Fission-AI/OpenSpec/discussions/169){:target="_blank"} describes the same problem and proposes manual reconciliation, hooks, skills, and CI checks.

These tools could find or edit documents. I still had to reconstruct the intent and review the result. In my workflow, reconciliation became an additional task whenever I worked outside OpenSpec.

## Preserving Decisions, Not a Second Implementation

I replaced that workflow with ADRs. An ADR preserves a decision, the alternatives considered, and its consequences. It does not try to describe the entire current state of the code.

For the concurrency model, the ADR explains why `version`, `lease_generation`, and `idempotency_key` solve different problems. If the decision changes, a new ADR can supersede it without rewriting the project's history. The code and tests preserve the executable details; the ADR preserves why they exist.

I lose the structure OpenSpec provided when starting and resuming a change. In return, I maintain fewer documents that can become outdated and mislead the next agent.

This does not establish that spec-driven development fails for every project. In Yubarta, I simply could not make the value of keeping specs current justify their cost. I still write before implementing when I need to clarify a change. I no longer treat that planning as another permanent representation of the system.
