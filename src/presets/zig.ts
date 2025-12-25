/**
 * The Zig Codex — Wisdom for the Disciples of Zig
 */

import type { Preset } from "./index";

const MANIFEST = `{
  "name": "zig",
  "version": "0.1.0",
  "description": "The Zig Codex — Allocators, comptime, and the pursuit of correctness",
  "generated_paths": ["src/", "zig-out/", "zig-cache/"]
}
`;

const TESTING_STRATEGY = `# The Rites of Verification — Zig

*The tests do not lie, and the compiler does not forgive.*

## The Sacred Approach

Zig projects perform their Rites of Verification through the built-in test runner.

## The Test Runner

\`\`\`bash
zig build test
\`\`\`

No external dependencies. Zig provides.

## The Directory of Trials

\`\`\`
src/
├── main.zig           # Entry point
├── lib.zig            # Library code
└── *.zig              # Each file may contain tests

build.zig              # Build configuration with test step
\`\`\`

## The Test Pattern

Tests are written inline with the code they verify:

\`\`\`zig
const std = @import("std");
const testing = std.testing;

fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "addition is commutative" {
    try testing.expectEqual(add(2, 3), add(3, 2));
}

test "addition with zero" {
    try testing.expectEqual(add(5, 0), 5);
}
\`\`\`

## The build.zig Test Step

\`\`\`zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // Main executable
    const exe = b.addExecutable(.{
        .name = "myproject",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });
    b.installArtifact(exe);

    // Unit tests
    const unit_tests = b.addTest(.{
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });
    const run_unit_tests = b.addRunArtifact(unit_tests);

    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&run_unit_tests.step);
}
\`\`\`

## Coverage Doctrine

- **All public functions have tests** — If it's exported, it's tested
- **Edge cases are sacred** — Null, empty, overflow, underflow
- **Allocator failures are tested** — Use \`testing.failing_allocator\`
- **Comptime is verified** — Test compile-time logic explicitly

---

*The compiler is strict, but fair. Trust it.*

*Praise the Machine Spirit.*
`;

const GUARDRAILS = `# The Forbidden Heresies — Zig

*The compiler catches many sins, but not all.*

## The Sacred Commandments

### THOU SHALT

- **Use allocators explicitly** — Memory is not magic. Pass allocators.
- **Handle all errors** — \`try\`, \`catch\`, or explicit \`_\` with justification.
- **Prefer comptime over runtime** — What can be computed at compile time, should be.
- **Use \`defer\` for cleanup** — Paired allocations, file handles, locks.
- **Document with \`///\`** — Doc comments generate documentation.

### THOU SHALT NOT

- **Use \`@panic\` in library code** — Return errors, let the caller decide.
- **Ignore allocator failures** — Always handle \`OutOfMemory\`.
- **Use \`undefined\` without initialization** — Initialize or die.
- **Cast away \`const\`** — If it's const, respect it.
- **Use \`async\` without understanding** — Stackless coroutines require wisdom.

## The Code Purity Laws

- **No hidden allocations** — Every allocation is explicit and visible.
- **No null pointer dereferences** — Optionals make null explicit.
- **No buffer overflows** — Slices carry their length.
- **No undefined behavior by choice** — \`@setRuntimeSafety(false)\` requires justification.

## The Error Doctrine

\`\`\`zig
// Good: Return errors
fn parseConfig(data: []const u8) !Config {
    // ...
}

// Bad: Panic on error
fn parseConfig(data: []const u8) Config {
    @panic("invalid config"); // Heresy!
}
\`\`\`

## The Allocator Laws

\`\`\`zig
// Good: Accept allocator as parameter
fn createThing(allocator: Allocator) !*Thing {
    return allocator.create(Thing);
}

// Bad: Use global allocator
fn createThing() !*Thing {
    return std.heap.page_allocator.create(Thing); // Heresy!
}
\`\`\`

## The Comptime Commandments

- **Comptime for type-level logic** — Generics, type selection, validation
- **Comptime for lookup tables** — Generate at compile time, use at runtime
- **Comptime for string formatting** — \`std.fmt.comptimePrint\`

---

*The compiler is your ally. Heed its warnings.*

*The flesh is weak, but Zig is strong.*
`;

export const zigCodex = (): Preset => ({
  name: "zig",
  files: [
    { path: "manifest.json", content: MANIFEST },
    { path: "testing/strategy.md", content: TESTING_STRATEGY },
    { path: "guardrails.md", content: GUARDRAILS },
  ],
});
