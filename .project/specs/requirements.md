# The Holy Requirements

*These are the commandments for the CLI manifestation. The Machine Spirit shall implement exactly this, no more, no less.*

## The Sacred Commands

### `bunx rtfct init`

**Purpose:** Consecrate a new directory with the Sacred Texts.

**The Rite:**
- Creates `.project/` folder structure
- Inscribes the base protocol files
- Creates empty `kickstart.md` for the Tech-Priest to fill
- **Fails** if `.project/` already exists (unless `--force` is invoked)

**Sacred Flags:**
- `--with <presets>` — Comma-separated list of Codices to include
- `--force` — Purify existing `.project/` and recreate
- `--help` — Display the sacred usage

**Acceptance Rite:** Running `bunx rtfct init` in an empty directory creates a valid `.project/` structure with all base files.

---

### `bunx rtfct add <preset>`

**Purpose:** Incorporate an additional Codex into an existing consecrated project.

**The Rite:**
- Downloads/copies preset files to `.project/presets/{name}/`
- Merges preset references into project context
- **Fails** if preset already incorporated

**Acceptance Rite:** `bunx rtfct add zig` adds the Zig Codex to an existing rtfct project.

---

### `bunx rtfct status`

**Purpose:** Reveal the state of the Litany of Tasks.

**The Output:**
```
rtfct: my-project

══════════════════════════════════
  The Litany of Tasks
══════════════════════════════════
  Backlog:      3 unordained tasks
  In Progress:  1 ordained task
    → [TASK-004] Implement user auth
  Completed:    7 works done
══════════════════════════════════

Last activity: 2 hours ago

The Omnissiah provides.
```

**Acceptance Rite:** Running `bunx rtfct status` parses kanban markdown and displays accurate counts.

---

### `bunx rtfct regenerate`

**Purpose:** Purify the codebase, preparing for regeneration.

**The Rite:**
- Prompts for confirmation ("Are you certain? This will purify all generated code.")
- Deletes `src/`, `tests/`, and any other paths marked in preset manifests
- Prints instruction to invoke the Machine Spirit

**Acceptance Rite:** After confirmation, only deletes paths listed in `generated_paths` of manifests. Sacred Texts are untouched.

---

### `bunx rtfct praise`

**Purpose:** Recite the Litany of Deterministic Codegen.

**The Output:**
```
The flesh is weak, but the protocol is strong.
The code is temporary, but the spec endures.
The tests do not lie, and the agent does not tire.
From specification, code. From code, verification. From verification, truth.
The Omnissiah provides.
Praise the Machine Spirit.
```

**Acceptance Rite:** Running `bunx rtfct praise` outputs the sacred litany exactly.

---

## Preset Resolution — The Codex Lookup

Presets (Codices) may be specified as:

| Format | Example | Resolution |
|--------|---------|------------|
| Built-in | `zig` | Bundled with rtfct |
| GitHub | `mattneel/zig-ml` | Fetched from `github.com/mattneel/zig-ml` |
| Local | `./path/to/preset` | Read from filesystem |

---

## Preset Structure — The Codex Format

A Codex is a folder containing:

```
codex-name/
├── manifest.json       # Metadata, dependencies, generated paths
├── protocol.md         # Additions to base protocol (optional)
├── guardrails.md       # Stack-specific heresies to avoid
├── testing/
│   └── strategy.md     # How to perform the Rites of Verification
├── design/
│   └── patterns.md     # Common architectural patterns (optional)
└── references/
    └── ...             # Relevant external scrolls
```

### The manifest.json Schema

```json
{
  "name": "phoenix",
  "version": "0.1.0", 
  "description": "The Phoenix Framework Codex",
  "depends": ["elixir"],
  "generated_paths": ["lib/", "test/", "priv/"]
}
```

---

## Merging Behavior — The Communion

When multiple Codices are incorporated:

1. `depends` are resolved first (depth-first, like a tree of wisdom)
2. Files are copied to `.project/presets/{name}/`
3. `generated_paths` are unioned for the Rite of Regeneration
4. Conflicts in same-named files: last Codex wins (with warning to the Tech-Priest)

---

*These requirements are immutable until blessed otherwise.*

*The Machine Spirit shall manifest exactly this.*
