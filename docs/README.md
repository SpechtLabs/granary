---
pageLayout: home
externalLinkIcon: false

config:
  - type: doc-hero
    hero:
      name: 🌰 Granary
      text: Raft consensus in Zig
      tagline: A replicated key-value store built by implementing Raft straight from the paper.
      image: /logo.png
      actions:
        - text: Get Started →
          link: /guide/getting-started
          theme: brand
          icon: mdi:rocket-launch
        - text: Read the Overview →
          link: /guide/overview
          theme: alt
          icon: mdi:book-open-page-variant
        - text: View on GitHub →
          link: https://github.com/spechtlabs/granary
          theme: alt
          icon: mdi:github

  - type: features
    title: What's in the box
    description: A working Raft core, not a finished database. Here's what runs today.
    features:
      - title: Raft, from the paper
        icon: mdi:vote
        details: Leader election and log replication implemented against the Raft paper, with term checks, log up-to-dateness, conflict truncation, and idempotent re-appends.

      - title: Key-value state machine
        icon: mdi:database
        details: An in-memory store with set, delete, and get. Reads route through the log just like writes, so they linearize against them for free.

      - title: Write-ahead log
        icon: mdi:file-code
        details: Commands serialize to a compact binary format with per-file headers and per-entry framing (length, CRC32, payload). Replay rebuilds state from the log.

      - title: Pluggable transport
        icon: mdi:swap-horizontal
        details: A type-erased transport interface in the style of std.mem.Allocator. The test suite drives the whole protocol over an in-memory transport.
---

## What Granary is

Granary is a [Raft](https://raft.github.io/) consensus implementation in [Zig](https://ziglang.org/), backing a replicated key-value store. It's a research project: a way to learn Zig and have some fun implementing Raft from the paper.

It is **not** production-ready. There's no real network transport or on-disk persistence yet. If you want to see exactly what works and what doesn't, the [Overview](/guide/overview) lays it out, and the [Architecture](/guide/architecture) page walks through how the pieces fit together.

## Why "Granary"?

An Acorn Woodpecker group works together to maintain and defend a shared store of acorns. The same tree, the _granary_, gets reused across generations to hold the winter food supply. No single bird owns it; the flock keeps it consistent and durable together. That's what a Raft cluster does with its log, and (fittingly) _Specht_ is German for _woodpecker_.

::: tip Found a rough edge or have an idea?
[Open an issue](https://github.com/spechtlabs/granary/issues/new/choose). Contributions and experiments are welcome, especially around the network transport and on-disk persistence.
:::
