import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const runCli = async (
  args: string[],
  cwd: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> => {
  const proc = Bun.spawn(["bun", "run", join(import.meta.dir, "../../src/index.ts"), ...args], {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;
  return { stdout, stderr, exitCode };
};

describe("The status Command", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "rtfct-status-test-"));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  const setupProject = async (options: {
    backlogTasks?: number;
    inProgressTask?: { id: string; title: string } | null;
    doneTasks?: number;
  }) => {
    const { backlogTasks = 0, inProgressTask = null, doneTasks = 0 } = options;

    await mkdir(join(tempDir, ".project/kanban"), { recursive: true });

    // Create backlog
    let backlogContent = "# The Backlog\n\n";
    for (let i = 1; i <= backlogTasks; i++) {
      backlogContent += `## [TASK-${String(i).padStart(3, "0")}] Task ${i}\n\nDescription.\n\n---\n\n`;
    }
    await writeFile(join(tempDir, ".project/kanban/backlog.md"), backlogContent);

    // Create in-progress
    let inProgressContent = "# In Progress\n\n";
    if (inProgressTask) {
      inProgressContent += `## [${inProgressTask.id}] ${inProgressTask.title}\n\nWorking on it.\n`;
    } else {
      inProgressContent += "*No task is currently ordained.*\n";
    }
    await writeFile(join(tempDir, ".project/kanban/in-progress.md"), inProgressContent);

    // Create done
    let doneContent = "# Done\n\n";
    for (let i = 1; i <= doneTasks; i++) {
      doneContent += `## [TASK-${String(100 + i).padStart(3, "0")}] Completed ${i}\n\n**Completed:** 2025-12-25\n\n---\n\n`;
    }
    await writeFile(join(tempDir, ".project/kanban/done.md"), doneContent);
  };

  describe("display of the Litany", () => {
    test("shows backlog count", async () => {
      await setupProject({ backlogTasks: 5 });
      const result = await runCli(["status"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("5");
      expect(result.stdout).toMatch(/backlog/i);
    });

    test("shows in-progress task", async () => {
      await setupProject({
        inProgressTask: { id: "TASK-042", title: "Answer the question" },
      });
      const result = await runCli(["status"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("TASK-042");
      expect(result.stdout).toContain("Answer the question");
    });

    test("shows completed count", async () => {
      await setupProject({ doneTasks: 7 });
      const result = await runCli(["status"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("7");
      expect(result.stdout).toMatch(/completed|done/i);
    });

    test("shows all counts together", async () => {
      await setupProject({
        backlogTasks: 3,
        inProgressTask: { id: "TASK-010", title: "Current work" },
        doneTasks: 5,
      });
      const result = await runCli(["status"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("3");
      expect(result.stdout).toContain("TASK-010");
      expect(result.stdout).toContain("5");
    });

    test("handles no tasks gracefully", async () => {
      await setupProject({});
      const result = await runCli(["status"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("0");
    });
  });

  describe("error handling", () => {
    test("fails if .project/ does not exist", async () => {
      const result = await runCli(["status"], tempDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain(".project");
    });

    test("fails if kanban/ does not exist", async () => {
      await mkdir(join(tempDir, ".project"), { recursive: true });
      const result = await runCli(["status"], tempDir);
      expect(result.exitCode).toBe(1);
    });
  });

  describe("sacred formatting", () => {
    test("includes The Litany of Tasks header", async () => {
      await setupProject({ backlogTasks: 1 });
      const result = await runCli(["status"], tempDir);
      expect(result.stdout).toContain("Litany");
    });

    test("ends with sacred blessing", async () => {
      await setupProject({ backlogTasks: 1 });
      const result = await runCli(["status"], tempDir);
      expect(result.stdout).toContain("Omnissiah");
    });
  });
});
