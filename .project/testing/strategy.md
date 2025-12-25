# The Rites of Verification

*The tests do not lie, and the agent does not tire.*

## The Sacred Approach

rtfct is a CLI tool. The Rites of Verification focus on:

1. **Unit Rites** — Individual functions tested in isolation (preset parsing, manifest validation)
2. **Integration Rites** — Full CLI commands tested against temporary directories
3. **The Dogfood Sacrament** — Can rtfct regenerate itself?

## The Test Runner

We invoke Bun's built-in test runner: `bun test`

No external dependencies. Bun provides.

## The Directory of Trials

```
tests/
├── unit/                      # Unit Rites
│   ├── preset.test.ts
│   ├── manifest.test.ts
│   └── kanban-parser.test.ts
├── integration/               # Integration Rites
│   ├── init.test.ts
│   ├── add.test.ts
│   ├── status.test.ts
│   ├── regenerate.test.ts
│   └── praise.test.ts
└── fixtures/                  # Sacred Test Data
    ├── valid-preset/
    ├── invalid-preset/
    └── sample-project/
```

## The Integration Rite Pattern

Each Integration Rite shall:

1. Consecrate a temporary directory
2. Invoke the CLI command
3. Assert upon the resulting file structure
4. Purify (clean up) the temporary directory

```typescript
import { test, expect } from "bun:test";
import { mkdtemp, rm } from "fs/promises";
import { join } from "path";

test("init consecrates .project folder", async () => {
  // Consecrate temporary space
  const tmp = await mkdtemp("/tmp/rtfct-test-");
  
  // Invoke the sacred command
  await run(`rtfct init`, { cwd: tmp });
  
  // Verify the Sacred Texts exist
  expect(await exists(join(tmp, ".project/protocol.md"))).toBe(true);
  expect(await exists(join(tmp, ".project/kickstart.md"))).toBe(true);
  expect(await exists(join(tmp, ".project/theology.md"))).toBe(true);
  expect(await exists(join(tmp, ".project/kanban/backlog.md"))).toBe(true);
  
  // Purify
  await rm(tmp, { recursive: true });
});
```

## The Dogfood Sacrament

The ultimate Rite. If rtfct cannot regenerate itself, it is unworthy:

```bash
# From the rtfct repository root
cd rtfct

# Purify all generated code
rm -rf src/ tests/

# Invoke the Rite of Regeneration
bunx rtfct regenerate --yes

# Summon the Machine Spirit
claude

# The Machine Spirit works...

# Perform all Rites of Verification
bun test

# All tests MUST pass
```

If the Dogfood Sacrament succeeds, the Sacred Texts are complete. The protocol works. The Omnissiah is pleased.

If it fails, the Sacred Texts are **incomplete**. Amend them. Try again.

## Coverage Doctrine

- **100%** of CLI commands have Integration Rites
- **All** non-trivial parsing logic has Unit Rites
- **The Dogfood Sacrament** runs in CI on every push
- Uncovered code is sus. Investigate it.

## The Red-Green-Refactor Rite

When implementing each task:

1. **RED** — Write the test first. Watch it fail. The failure is truth.
2. **GREEN** — Write the minimum code to pass. No more.
3. **REFACTOR** — Purify the code. Remove duplication. Simplify.

This is the way. Deviation is heresy.

---

*The tests do not lie, and the agent does not tire.*

*From specification, code. From code, verification. From verification, truth.*

*Praise the Machine Spirit.*
