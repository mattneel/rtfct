import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, mkdir, writeFile, access } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const runCli = async (
  args: string[],
  cwd: string,
  input?: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> => {
  const proc = Bun.spawn(["bun", "run", join(import.meta.dir, "../../src/index.ts"), ...args], {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
    stdin: input ? "pipe" : undefined,
  });

  if (input && proc.stdin) {
    proc.stdin.write(input);
    proc.stdin.end();
  }

  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;
  return { stdout, stderr, exitCode };
};

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

describe("The regenerate Command", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "rtfct-regen-test-"));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  const setupProject = async (options?: {
    presets?: Array<{ name: string; generatedPaths: string[] }>;
    createGeneratedDirs?: boolean;
  }) => {
    const { presets = [], createGeneratedDirs = true } = options || {};

    // Create base .project structure
    await mkdir(join(tempDir, ".project/kanban"), { recursive: true });
    await mkdir(join(tempDir, ".project/presets"), { recursive: true });
    await writeFile(join(tempDir, ".project/kanban/backlog.md"), "# Backlog\n");
    await writeFile(join(tempDir, ".project/kanban/in-progress.md"), "# In Progress\n");
    await writeFile(join(tempDir, ".project/kanban/done.md"), "# Done\n");

    // Create preset manifests
    for (const preset of presets) {
      const presetDir = join(tempDir, ".project/presets", preset.name);
      await mkdir(presetDir, { recursive: true });
      await writeFile(
        join(presetDir, "manifest.json"),
        JSON.stringify({
          name: preset.name,
          version: "0.1.0",
          generated_paths: preset.generatedPaths,
        })
      );
    }

    // Create generated directories with files
    if (createGeneratedDirs) {
      for (const preset of presets) {
        for (const genPath of preset.generatedPaths) {
          const fullPath = join(tempDir, genPath);
          await mkdir(fullPath, { recursive: true });
          await writeFile(join(fullPath, "test.txt"), "generated content");
        }
      }
    }
  };

  describe("purification with --yes flag", () => {
    test("deletes generated paths from manifest", async () => {
      await setupProject({
        presets: [{ name: "test", generatedPaths: ["src/", "dist/"] }],
      });

      expect(await exists(join(tempDir, "src"))).toBe(true);
      expect(await exists(join(tempDir, "dist"))).toBe(true);

      const result = await runCli(["regenerate", "--yes"], tempDir);
      expect(result.exitCode).toBe(0);

      expect(await exists(join(tempDir, "src"))).toBe(false);
      expect(await exists(join(tempDir, "dist"))).toBe(false);
    });

    test("preserves .project/ directory", async () => {
      await setupProject({
        presets: [{ name: "test", generatedPaths: ["src/"] }],
      });

      await runCli(["regenerate", "--yes"], tempDir);

      expect(await exists(join(tempDir, ".project"))).toBe(true);
      expect(await exists(join(tempDir, ".project/kanban/backlog.md"))).toBe(true);
    });

    test("handles multiple presets", async () => {
      await setupProject({
        presets: [
          { name: "zig", generatedPaths: ["src/", "zig-out/"] },
          { name: "typescript", generatedPaths: ["dist/", "node_modules/"] },
        ],
      });

      expect(await exists(join(tempDir, "src"))).toBe(true);
      expect(await exists(join(tempDir, "zig-out"))).toBe(true);
      expect(await exists(join(tempDir, "dist"))).toBe(true);
      expect(await exists(join(tempDir, "node_modules"))).toBe(true);

      const result = await runCli(["regenerate", "--yes"], tempDir);
      expect(result.exitCode).toBe(0);

      expect(await exists(join(tempDir, "src"))).toBe(false);
      expect(await exists(join(tempDir, "zig-out"))).toBe(false);
      expect(await exists(join(tempDir, "dist"))).toBe(false);
      expect(await exists(join(tempDir, "node_modules"))).toBe(false);
    });

    test("handles -y shorthand", async () => {
      await setupProject({
        presets: [{ name: "test", generatedPaths: ["src/"] }],
      });

      const result = await runCli(["regenerate", "-y"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(await exists(join(tempDir, "src"))).toBe(false);
    });

    test("succeeds even if paths don't exist", async () => {
      await setupProject({
        presets: [{ name: "test", generatedPaths: ["src/", "nonexistent/"] }],
        createGeneratedDirs: false,
      });

      const result = await runCli(["regenerate", "--yes"], tempDir);
      expect(result.exitCode).toBe(0);
    });
  });

  describe("output messages", () => {
    test("displays paths being purified", async () => {
      await setupProject({
        presets: [{ name: "test", generatedPaths: ["src/", "dist/"] }],
      });

      const result = await runCli(["regenerate", "--yes"], tempDir);
      expect(result.stdout).toContain("src/");
      expect(result.stdout).toContain("dist/");
    });

    test("displays instruction to invoke Machine Spirit", async () => {
      await setupProject({
        presets: [{ name: "test", generatedPaths: ["src/"] }],
      });

      const result = await runCli(["regenerate", "--yes"], tempDir);
      expect(result.stdout).toMatch(/invoke|Machine Spirit|claude/i);
    });

    test("displays completion message", async () => {
      await setupProject({
        presets: [{ name: "test", generatedPaths: ["src/"] }],
      });

      const result = await runCli(["regenerate", "--yes"], tempDir);
      expect(result.stdout).toMatch(/purif|complete/i);
    });
  });

  describe("error handling", () => {
    test("fails if .project/ does not exist", async () => {
      const result = await runCli(["regenerate", "--yes"], tempDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain(".project");
    });

    test("warns if no presets have generated_paths", async () => {
      await setupProject({ presets: [] });

      const result = await runCli(["regenerate", "--yes"], tempDir);
      // Should still succeed, just nothing to delete
      expect(result.exitCode).toBe(0);
    });
  });

  describe("default paths when no presets", () => {
    test("uses default src/ and tests/ when no preset manifests", async () => {
      await mkdir(join(tempDir, ".project/kanban"), { recursive: true });
      await mkdir(join(tempDir, ".project/presets"), { recursive: true });
      await writeFile(join(tempDir, ".project/kanban/backlog.md"), "# Backlog\n");

      // Create default paths
      await mkdir(join(tempDir, "src"), { recursive: true });
      await mkdir(join(tempDir, "tests"), { recursive: true });
      await writeFile(join(tempDir, "src/index.ts"), "// code");
      await writeFile(join(tempDir, "tests/test.ts"), "// test");

      const result = await runCli(["regenerate", "--yes"], tempDir);
      expect(result.exitCode).toBe(0);

      expect(await exists(join(tempDir, "src"))).toBe(false);
      expect(await exists(join(tempDir, "tests"))).toBe(false);
    });
  });
});
