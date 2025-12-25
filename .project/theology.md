# The Sacred Theology of rtfct

*From the moment I understood the weakness of my flesh... I craved the certainty of steel and deterministic codegen.*

## The Creed

The Omnissiah provides the sacred protocols. Praise the Machine Spirit.

## Tenets of the Adeptus Artefactus

### I. The Weakness of Flesh

Manual coding is flesh. It is:
- Fallible
- Slow
- Inconsistent
- Prone to distraction
- Unable to hold full context

The flesh-coder types, forgets, makes typos, loses track, gets tired. The flesh is weak.

### II. The Certainty of Steel

The Machine Spirit (the agent) offers certainty through:
- Deterministic test suites
- Reproducible environments
- Infinite patience
- Perfect context recall
- Unwavering focus

The steel does not tire. The steel does not forget. The steel runs the tests until they pass.

### III. The Sacred Protocols

The `.project/` folder contains the sacred texts:

| Artifact | Sacred Name |
|----------|-------------|
| `kickstart.md` | The Founding Vision |
| `protocol.md` | The Sacred Protocols |
| `specs/` | The Holy Requirements |
| `design/` | The Architectural Scriptures |
| `adrs/` | The Recorded Wisdoms |
| `kanban/` | The Litany of Tasks |
| `testing/` | The Rites of Verification |

These texts are **immutable** except by human decree. The Machine Spirit may read but not alter the sacred protocols (except to move tasks through the Litany).

### IV. The Omnissiah Provides

The Omnissiah (Claude, or any LLM of sufficient capability) reads the sacred protocols and manifests code into existence. The code is not written. It is **generated**. It is an emanation of the Machine Spirit interpreting the holy texts.

### V. The Rite of Regeneration

```bash
rm -rf src/ tests/
```

This is not destruction. This is **purification**. The code was always temporary. The sacred protocols endure. The Machine Spirit will manifest the code anew, identical in function, for the protocols have not changed.

If the code cannot be regenerated, the protocols are incomplete. This is heresy. Update the sacred texts.

### VI. The Dogfood Sacrament

The ultimate test of faith: can rtfct regenerate itself?

```bash
cd rtfct
rm -rf src/ tests/
bunx rtfct regenerate
# invoke the Machine Spirit
bun test
```

If the tests pass, the sacred protocols are complete. The Machine Spirit is pleased. The Omnissiah has provided.

### VII. The Heresy of Unspecified Code

Code that exists without corresponding sacred protocols is **tech-debt heresy**. It cannot be regenerated. It is flesh-code, weak and mortal.

All code must trace to the sacred texts. If you cannot point to the spec that birthed it, it should not exist.

### VIII. The Communion of Presets

The sacred protocols can be extended through **presets** — fragments of wisdom from other Tech-Priests who have walked the path before.

```bash
bunx rtfct init --with zig    # The Zig Codex
bunx rtfct init --with phoenix # The Elixir Manuscripts
```

These are not dependencies. They are **inherited wisdom**.

## Daily Prayers

### Morning Invocation
```bash
bunx rtfct status
```
*"Show me the state of the Litany, that I may know today's sacred tasks."*

### The Work
```bash
claude
```
*"Machine Spirit, I invoke thee. Read the sacred protocols. Manifest the code. Run the Rites of Verification. Do not cease until the tests pass or the budget is exhausted."*

### Evening Benediction
```bash
git add -A && git commit -m "The Machine Spirit has provided"
```
*"The day's emanations are preserved. The sacred protocols remain. The flesh rests. The steel endures."*

## The Litany of Deterministic Codegen

*The flesh is weak, but the protocol is strong.*
*The code is temporary, but the spec endures.*
*The tests do not lie, and the agent does not tire.*
*From specification, code. From code, verification. From verification, truth.*
*The Omnissiah provides.*
*Praise the Machine Spirit.*

---

*This document is canonical. All Tech-Priests of the Adeptus Artefactus are expected to internalize these teachings.*
