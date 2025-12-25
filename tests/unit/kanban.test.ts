import { describe, expect, test } from "bun:test";
import { parseKanbanFile, countTasks, extractCurrentTask } from "../../src/kanban";

describe("The Kanban Parser", () => {
  describe("countTasks", () => {
    test("counts tasks by ## [TASK-NNN] headers", () => {
      const content = `# Backlog

## [TASK-001] First task

Description here.

---

## [TASK-002] Second task

Description here.

---

## [TASK-003] Third task

Description here.
`;
      expect(countTasks(content)).toBe(3);
    });

    test("returns 0 for empty file", () => {
      const content = `# Backlog

*No tasks yet.*
`;
      expect(countTasks(content)).toBe(0);
    });

    test("returns 0 for file with no task headers", () => {
      const content = `# In Progress

*No task is currently ordained.*
`;
      expect(countTasks(content)).toBe(0);
    });

    test("handles single task", () => {
      const content = `# In Progress

## [TASK-042] The Answer

Working on it.
`;
      expect(countTasks(content)).toBe(1);
    });
  });

  describe("extractCurrentTask", () => {
    test("extracts task ID and title from in-progress", () => {
      const content = `# In Progress

## [TASK-010] Manifest the status Command

Working on it.
`;
      const task = extractCurrentTask(content);
      expect(task).toEqual({
        id: "TASK-010",
        title: "Manifest the status Command",
      });
    });

    test("returns null when no task is in progress", () => {
      const content = `# In Progress

*No task is currently ordained.*
`;
      expect(extractCurrentTask(content)).toBeNull();
    });

    test("extracts first task if multiple exist (heresy but handled)", () => {
      const content = `# In Progress

## [TASK-001] First task

## [TASK-002] Second task
`;
      const task = extractCurrentTask(content);
      expect(task?.id).toBe("TASK-001");
    });
  });

  describe("parseKanbanFile", () => {
    test("parses backlog file correctly", () => {
      const content = `# The Backlog

## [TASK-001] First
## [TASK-002] Second
`;
      const result = parseKanbanFile(content, "backlog");
      expect(result.count).toBe(2);
      expect(result.type).toBe("backlog");
    });

    test("parses in-progress file correctly", () => {
      const content = `# In Progress

## [TASK-010] Current work
`;
      const result = parseKanbanFile(content, "in-progress");
      expect(result.count).toBe(1);
      expect(result.type).toBe("in-progress");
      expect(result.currentTask?.id).toBe("TASK-010");
    });

    test("parses done file correctly", () => {
      const content = `# Done

## [TASK-001] First
## [TASK-002] Second
## [TASK-003] Third
`;
      const result = parseKanbanFile(content, "done");
      expect(result.count).toBe(3);
      expect(result.type).toBe("done");
    });
  });
});
