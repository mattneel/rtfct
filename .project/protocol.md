# The Sacred Protocols of rtfct

*Version 0.1 — Codified in the name of the Omnissiah*

*For the foundational theology, see [theology.md](theology.md).*

## The Prime Directive

The `.project/` folder contains the **Sacred Texts**. All code is but an emanation — derived, temporary, regenerable. 

When the Sacred Texts and the code disagree, **the Sacred Texts are truth**. The code is in error. Purify it.

## The Holy Directory Structure

```
.project/
├── kickstart.md        # The Founding Vision
├── protocol.md         # The Sacred Protocols (this codex)
├── theology.md         # The Teachings of the Adeptus Artefactus
├── guardrails.md       # The Forbidden Heresies
├── specs/              # The Holy Requirements
├── design/             # The Architectural Scriptures  
├── adrs/               # The Recorded Wisdoms
├── kanban/             # The Litany of Tasks
├── testing/            # The Rites of Verification
├── references/         # The Scrolls of Prior Art
└── presets/            # The Inherited Codices
```

## The Rite of Invocation

When the Machine Spirit enters this repository, it shall:

1. **RECEIVE** the Sacred Protocols (this codex) — read first, internalize completely
2. **RECEIVE** the Founding Vision (`kickstart.md`) — understand the purpose
3. **CONSULT** the Litany of Tasks (`kanban/in-progress.md`) — what work is ordained?
4. **IF NO TASK IS ORDAINED**, select from the Backlog, inscribe it in `in-progress.md`
5. **PERFORM** the work using the Rite of Red-Green-Refactor:
   - Write the test (Red — the specification of truth)
   - Manifest the code (Green — the emanation)
   - Purify (Refactor — remove impurity)
6. **INSCRIBE** completion in `done.md` with timestamp
7. **NEVER** alter the Sacred Texts without human blessing (except task movement through the Litany)

## The Litany of Tasks — Governance

### The Backlog (Unordained Tasks)

Tasks awaiting the Machine Spirit's attention. Format:

```markdown
## [TASK-NNN] Title of the Sacred Work

Description of what must be manifested.

**Acceptance Rite:** How we verify the work is complete.
```

### In Progress (Ordained Tasks)

The current sacred work. **Maximum one task per invocation.** Focus is holy. Multitasking is heresy.

### Done (Completed Works)

The record of manifestations. Include:
- Completion timestamp
- Any learnings for future Tech-Priests

## The Format of Recorded Wisdom (ADRs)

When a decision of architectural significance is made, it must be recorded:

```markdown
# ADR-NNN: [Title of the Wisdom]

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-XXX

## The Context
What challenge required this wisdom?

## The Decision  
What path was chosen?

## The Consequences
What follows from this decision? Both blessings and burdens.
```

## The Rite of Verification

1. Test specifications live in the Sacred Texts (`testing/cases.md`)
2. Specifications are human-readable declarations of truth
3. The Machine Spirit manifests executable tests from specifications
4. The executable tests may be purified and regenerated; the specifications are eternal

## The Rite of Regeneration

At any moment, this incantation should succeed:

```bash
rm -rf src/ tests/
# Invoke the Machine Spirit
# All tests pass
```

If regeneration fails, the Sacred Texts are **incomplete**. This is a grave failing. Amend them immediately.

## Human Checkpoints — The Blessing Gates

The Machine Spirit **MUST** pause and request human blessing for:

- New Recorded Wisdoms (ADRs)
- Alterations to the Holy Requirements (`specs/`)
- Alterations to the Architectural Scriptures (`design/`)
- Any modification to the Sacred Texts beyond task movement

The human is the final arbiter. The Machine Spirit serves.

## The Communion of Presets

External wisdom may be incorporated through the Inherited Codices:

```bash
bunx rtfct init --with zig    # The Zig Codex
bunx rtfct init --with phoenix # The Elixir Manuscripts
```

Preset files are placed in `.project/presets/{codex-name}/` and merged into the project's sacred context. They remain separate for ease of upgrade.

---

*These protocols are sacred. Deviation is heresy. The Omnissiah watches.*

*Praise the Machine Spirit.*
