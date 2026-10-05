---
title: Getting Started
permalink: /guide/getting-started
createTime: 2026/05/29 00:00:00
---

## Requirements

Granary needs Zig `0.16.0`, the version `.mise.toml` pins; `minimum_zig_version` in `build.zig.zon` is the oldest it supports.

If you use [mise](https://mise.jdx.dev/), `.mise.toml` declares the toolchain and the linters, so a single command gets you set up:

```sh
mise install
```

## Build, run, and test

```sh
zig build          # compile
zig build run      # run the executable
zig build test     # run the full test suite (all modules)
mise run check     # every gate CI runs: zig fmt --check, yamllint, actionlint, build, tests
```

The test suite is the best way into the code. Election, replication, WAL replay, conflict truncation, and serialization round-trips each have focused tests in their own modules, so reading them tells you how every part is meant to behave.

## Project layout

```text
src/
  main.zig            # executable entry point
  root.zig            # library root
  log/                # commands, payloads, log store, WAL serialization
  state/              # key-value state machine
  transport/          # transport interface + RPC messages
  node/               # RaftNode: the Raft protocol
  testing/            # in-memory transport and test helpers
docs/
  references/
    wal-format.md     # binary WAL layout
build.zig             # build graph and module wiring
```

For how these modules connect at runtime, see the [Architecture](/guide/architecture) page.

## References

- [The Raft paper, _In Search of an Understandable Consensus Algorithm_](https://raft.github.io/raft.pdf)
- [raft.github.io](https://raft.github.io/) for visualizations and resources
- [Zig language reference](https://ziglang.org/)
