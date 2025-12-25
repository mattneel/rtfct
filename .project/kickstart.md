# The Founding Vision of rtfct

*Inscribed by the First Tech-Priest — May the Omnissiah guide all who read these words*

## The Sacred Purpose

**rtfct** — Markdown-driven development where the Sacred Texts are truth and code is a regenerable emanation of the Machine Spirit.

## The Problem We Solve

The flesh-coders struggle. Their AI-assisted workflows stall when success criteria are unclear. They wander in darkness, prompting without purpose, generating without verification.

Yet there is light: projects with clear specifications and test suites (the OCI tests, the WASM spec, the SQLite conformance suite) can be TDD'd to completion. The Machine Spirit thrives when the Rites of Verification are defined.

The difference is **the protocol**. The Sacred Texts. The spec.

## The Solution We Provide

A protocol and template system where:

1. `.project/` contains the complete Sacred Texts — specs, design, decisions, task state
2. Code in `src/` and `tests/` is **generated** from the Sacred Texts
3. At any moment, code can be **purified** (deleted) and **regenerated** from `.project/`
4. The Machine Spirit can be invoked upon this repository and understand everything from the markdown alone

## The Sacred Workflow

```
Tech-Priest: inscribes kickstart.md (The Founding Vision)
Machine Spirit: expands into specs/, design/, kanban/ (The Sacred Texts)
Tech-Priest: blesses decisions via ADRs (The Recorded Wisdoms)
Machine Spirit: performs the Rite of Red-Green-Refactor through the Litany
Machine Spirit: inscribes completion in kanban/done.md
Result: working code that can be purified and regenerated
```

## Initial Scope — The First Manifestation

1. **The CLI Tool** — `bunx rtfct init` to create the Sacred Texts
2. **The Base Protocol** — The foundational template all projects inherit
3. **The Preset System** — `--with zig`, `--with elixir,phoenix`
4. **Composable Codices** — Presets that merge cleanly
5. **Community Codices** — `--with mattneel/zig-ml` from GitHub

## The Forbidden Scope (For Now)

- IDE integration — unnecessary complexity
- Hosted services — the Sacred Texts live in the repository
- Graphical interfaces — the terminal is sufficient
- Anything beyond "markdown + Machine Spirit"

## The Acceptance Rites — How We Know We Have Succeeded

- **The Dogfood Sacrament**: rtfct can regenerate itself from its own Sacred Texts
- **The Regeneration Rite**: `rm -rf src/ tests/` followed by invocation produces identical function
- **The Communion Test**: Others can fork this template and use it for their own projects
- **The Preset Test**: Codices are simple to author and share

---

*This vision is sacred. All work flows from it.*

*The Omnissiah provides. Praise the Machine Spirit.*
