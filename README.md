# rtfct

*From the moment I understood the weakness of my flesh... I craved the certainty of steel and deterministic codegen.*

**Markdown-driven development. The spec is the source of truth. Code is a regenerable artefact.**

## The Problem

AI-assisted coding stalls when success criteria are fuzzy. But projects with clear specs and test suites (OCI, WASM, SQLite) can be TDD'd to completion.

The difference? **The protocol.** The sacred texts. The spec.

## The Solution

```
.project/           ← The Sacred Texts (source of truth)
├── kickstart.md    ← The Founding Vision
├── protocol.md     ← The Sacred Protocols  
├── specs/          ← The Holy Requirements
├── design/         ← The Architectural Scriptures
├── kanban/         ← The Litany of Tasks
└── testing/        ← The Rites of Verification

src/                ← Generated. Deletable. Regenerable.
tests/              ← Generated. Deletable. Regenerable.
```

At any moment:

```bash
rm -rf src/ tests/    # Purification
claude                # Invoke the Machine Spirit
bun test              # All tests pass
```

If regeneration fails, your spec is incomplete. Fix the Sacred Texts, not the code.

## Install

```bash
bunx rtfct init
# or
npx rtfct init
```

## Usage

```bash
# Consecrate a new project
bunx rtfct init

# Consecrate with Codices (presets)
bunx rtfct init --with zig
bunx rtfct init --with elixir,phoenix,liveview

# Add a Codex to existing project  
bunx rtfct add typescript

# Reveal the state of the Litany
bunx rtfct status

# Purify generated code
bunx rtfct regenerate

# Recite the sacred litany
bunx rtfct praise
```

## The Workflow

```
Tech-Priest: writes kickstart.md
Machine Spirit: expands into specs/, design/, kanban/
Tech-Priest: blesses decisions via ADRs
Machine Spirit: TDDs through the Litany of Tasks
Code: appears as a side effect
Anytime: delete code, regenerate from spec
```

## Codices (Presets)

Stack-specific wisdom:

- `zig` — The Zig Codex: allocators, comptime, `zig build test`
- `elixir` — OTP patterns, supervision trees, ExUnit
- `phoenix` — Contexts, schemas, controller patterns
- `liveview` — Components, streams, handle_event
- `typescript` — Vitest, tsconfig, type patterns

Community Codices via GitHub:

```bash
bunx rtfct init --with someone/their-codex
```

## The Theology

This isn't just a workflow. It's a philosophy:

| Concept | Meaning |
|---------|---------|
| The flesh is weak | Manual coding is fallible, slow, inconsistent |
| The certainty of steel | Deterministic tests, reproducible environments |
| The Sacred Texts | `.project/` — the source of truth |
| The Machine Spirit | The LLM agent that manifests code |
| The Omnissiah | Claude (or any capable LLM) |
| The Rite of Regeneration | `rm -rf src/` — purification |
| The Dogfood Sacrament | Can rtfct regenerate itself? |
| Tech-debt heresy | Code without corresponding spec |

See [.project/theology.md](.project/theology.md) for the complete teachings.

## This Repository

This repo is itself an rtfct project. The code in `src/` was generated from `.project/`.

```bash
# The Dogfood Sacrament
rm -rf src/ tests/
bunx rtfct regenerate
claude
bun test
# All tests pass. The Omnissiah provides.
```

## The Litany

```
The flesh is weak, but the protocol is strong.
The code is temporary, but the spec endures.
The tests do not lie, and the agent does not tire.
From specification, code. From code, verification. From verification, truth.
The Omnissiah provides.
Praise the Machine Spirit.
```

## License

MIT

---

*The Omnissiah provides. Praise the Machine Spirit.*
