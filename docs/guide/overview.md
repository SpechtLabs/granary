---
title: Overview
permalink: /guide/overview
createTime: 2026/05/29 00:00:00
---

Granary is a [Raft](https://raft.github.io/) consensus implementation in [Zig](https://ziglang.org/), backing a replicated key-value store. It exists so I can learn Zig and have some fun implementing Raft from the paper.

::: warning Not production-ready
There's no real network transport or on-disk persistence yet. Treat Granary as a study of the Raft protocol rather than a database you'd run anything important on.
:::

## Why "Granary"?

An Acorn Woodpecker group works together to maintain and defend a shared store of acorns. The same tree, the _granary_, gets reused across generations to hold the winter food supply. No single bird owns it; the flock keeps it consistent and durable together.

That's what a Raft cluster does with its log:

| Acorn Woodpeckers         | Granary (Raft)                                       |
| ------------------------- | ---------------------------------------------------- |
| The flock                 | The cluster of nodes                                 |
| The granary tree          | The replicated log, shared across all nodes          |
| Each acorn in a hole      | A committed command (`set` / `delete` / `get`)       |
| Defending the collection  | Leader election and replication keeping the log safe |
| Reused across generations | The write-ahead log, replayed to rebuild state       |

Fittingly, _Specht_ is German for _woodpecker_.

## What's implemented today

- **Leader election**: `RequestVote` RPC with term and log up-to-dateness checks (§5.2, §5.4)
- **Log replication**: `AppendEntries` RPC with conflict truncation and idempotent re-appends (§5.3)
- **Heartbeats**: empty `AppendEntries` sent on a heartbeat interval
- **Tick-based event loop**: a logical clock with randomized election timeouts and jitter
- **Key-value state machine**: in-memory `set` / `delete` / `get`, applied in log order
- **WAL replay**: state gets rebuilt by replaying a log of commands
- **Binary wire format**: `serialize` / `deserialize` for commands, payloads, and RPCs
- **Type-erased transport**: a vtable interface in the style of `std.mem.Allocator`, with an in-memory test transport

## Not yet built

Contributions and experiments are welcome here.

- A real network transport. Only in-memory and no-op transports exist today.
- On-disk persistence. The WAL binary format is defined and serializable, but nothing flushes it to disk or loads it back yet.
- Separate `commitIndex` / `lastApplied` advancement with a dedicated apply loop.
- Snapshots and log compaction.
- Cluster membership changes.

Next, see how the pieces fit together in the [Architecture](/guide/architecture), or jump straight to [Getting Started](/guide/getting-started).
