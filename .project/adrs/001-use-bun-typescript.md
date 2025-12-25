# ADR-001: The Bun and TypeScript Covenant

*Recorded Wisdom of the First Tech-Priest*

## Status

**Accepted** — Blessed and sealed

## The Context

The rtfct CLI must be distributed to the faithful without friction. The incantation `bunx rtfct` or `npx rtfct` must simply work.

The paths considered:

| Path | Blessing | Burden |
|------|----------|--------|
| **Zig** | Fast, single binary, holy | npm distribution awkward |
| **Go** | Fast, single binary | npm distribution awkward |
| **Node/TypeScript** | Native npm | Slower startup, build step required |
| **Bun/TypeScript** | Native npm via bunx, fast startup, TypeScript native | Newer, less battle-tested |

## The Decision

We covenant with **Bun** as the runtime and **TypeScript** as the language.

## The Consequences

### Blessings

- `bunx rtfct` simply works — no installation ritual required
- Fast startup (~20ms) — the faithful need not wait
- TypeScript without build step — Bun executes `.ts` directly
- Built-in test runner — `bun test` for the Rites of Verification
- Familiar to many — JavaScript/TypeScript knowledge is widespread

### Burdens

- Bun is younger, less proven in battle
- Some faithful may not have Bun installed (mitigated by `npx` fallback)
- Not a single binary — requires Bun or Node runtime

### Mitigations

- Also publish to npm for `npx rtfct` as fallback path
- Keep dependencies minimal — reduce surface area for failure
- Test on both Bun and Node to ensure compatibility

---

*This wisdom is recorded. Future Tech-Priests may learn from it.*

*The Omnissiah guided this decision.*
