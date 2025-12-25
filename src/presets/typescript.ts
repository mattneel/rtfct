/**
 * The TypeScript Codex — Wisdom for the Disciples of Types
 */

import type { Preset } from "./index";

const MANIFEST = `{
  "name": "typescript",
  "version": "0.1.0",
  "description": "The TypeScript Codex — Types, tests, and the pursuit of safety",
  "generated_paths": ["src/", "dist/", "node_modules/"]
}
`;

const TESTING_STRATEGY = `# The Rites of Verification — TypeScript

*The tests do not lie, and the types do not deceive.*

## The Sacred Approach

TypeScript projects may use various test runners. We recommend Vitest for its speed and native TypeScript support.

## The Test Runner

\`\`\`bash
# With Vitest
npx vitest

# With Bun
bun test

# With Jest
npx jest
\`\`\`

## The Directory of Trials

\`\`\`
src/
├── index.ts
├── lib/
│   ├── utils.ts
│   └── utils.test.ts    # Co-located tests
tests/
├── unit/                 # Unit tests
├── integration/          # Integration tests
└── fixtures/             # Test data
\`\`\`

## The Test Pattern

\`\`\`typescript
import { describe, expect, test } from "vitest";
import { add } from "./math";

describe("add", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("handles negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
  });

  test("is commutative", () => {
    expect(add(2, 3)).toBe(add(3, 2));
  });
});
\`\`\`

## The Type Testing Pattern

\`\`\`typescript
import { expectTypeOf } from "vitest";

test("returns correct type", () => {
  const result = fetchUser(1);
  expectTypeOf(result).toEqualTypeOf<Promise<User>>();
});
\`\`\`

## Coverage Doctrine

- **All exported functions have tests** — Public API must be verified
- **Type assertions are tested** — Don't just trust \`as\`
- **Error paths are covered** — Test the unhappy path
- **Async behavior is verified** — Test promises and callbacks

---

*Types guide, tests verify.*

*Praise the Machine Spirit.*
`;

const GUARDRAILS = `# The Forbidden Heresies — TypeScript

*Types are not optional. They are the law.*

## The Sacred Commandments

### THOU SHALT

- **Enable strict mode** — \`"strict": true\` in tsconfig.json
- **Type all function parameters** — No implicit \`any\`
- **Use \`unknown\` over \`any\`** — Force type narrowing
- **Prefer \`interface\` for objects** — Extends better than intersects
- **Use \`const\` assertions** — \`as const\` for literal types

### THOU SHALT NOT

- **Use \`any\`** — It defeats the purpose. Use \`unknown\` instead.
- **Use \`@ts-ignore\`** — Fix the type, don't silence it.
- **Use non-null assertion carelessly** — \`!\` is a lie waiting to happen.
- **Export mutable state** — Export functions, not variables.
- **Use \`enum\`** — Use \`as const\` objects or union types instead.

## The Code Purity Laws

- **Functional over object-oriented** — Functions are pure. Classes hide state.
- **Immutable by default** — Use \`readonly\` and \`Readonly<T>\`.
- **Explicit over implicit** — Don't rely on type inference for public APIs.
- **Small types over large** — Compose types from smaller pieces.

## The Error Doctrine

\`\`\`typescript
// Good: Return Result type
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function parseConfig(data: string): Result<Config, ParseError> {
  // ...
}

// Bad: Throw and pray
function parseConfig(data: string): Config {
  throw new Error("invalid"); // Heresy!
}
\`\`\`

## The Type Narrowing Laws

\`\`\`typescript
// Good: Type guards
function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value;
}

// Bad: Type assertion
const user = value as User; // Heresy!
\`\`\`

## The tsconfig.json Commandments

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
\`\`\`

---

*The compiler sees all. Trust its judgment.*

*The flesh is weak, but types are strong.*
`;

export const typescriptCodex = (): Preset => ({
  name: "typescript",
  files: [
    { path: "manifest.json", content: MANIFEST },
    { path: "testing/strategy.md", content: TESTING_STRATEGY },
    { path: "guardrails.md", content: GUARDRAILS },
  ],
});
