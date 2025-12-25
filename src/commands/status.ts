/**
 * The status Command — Revelation of the Litany
 */

import { readFile, stat, access } from "fs/promises";
import { join, basename } from "path";
import { parseKanbanFile, type Task } from "../kanban";

export interface StatusResult {
  success: boolean;
  error?: string;
  data?: {
    projectName: string;
    backlogCount: number;
    inProgressCount: number;
    currentTask: Task | null;
    doneCount: number;
    lastActivity: Date | null;
  };
}

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const getLastModified = async (path: string): Promise<Date | null> => {
  try {
    const stats = await stat(path);
    return stats.mtime;
  } catch {
    return null;
  }
};

const isNewer = (a: Date, b: Date | null): boolean => {
  if (!b) return true;
  return a.getTime() > b.getTime();
};

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  }
  if (diffHours > 0) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  }
  if (diffMinutes > 0) {
    return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
  }
  return "just now";
};

export const runStatus = async (cwd: string): Promise<StatusResult> => {
  const projectDir = join(cwd, ".project");
  const kanbanDir = join(projectDir, "kanban");

  // Check if .project/ exists
  if (!(await exists(projectDir))) {
    return {
      success: false,
      error: "No .project/ found. This directory has not been consecrated. Run 'rtfct init' first.",
    };
  }

  // Check if kanban/ exists
  if (!(await exists(kanbanDir))) {
    return {
      success: false,
      error: "No .project/kanban/ found. The Litany of Tasks is missing.",
    };
  }

  // Read and parse kanban files
  const backlogPath = join(kanbanDir, "backlog.md");
  const inProgressPath = join(kanbanDir, "in-progress.md");
  const donePath = join(kanbanDir, "done.md");

  let backlogCount = 0;
  let inProgressCount = 0;
  let doneCount = 0;
  let currentTask: Task | null = null;
  let lastActivity: Date | null = null;

  try {
    if (await exists(backlogPath)) {
      const content = await readFile(backlogPath, "utf-8");
      const result = parseKanbanFile(content, "backlog");
      backlogCount = result.count;
      const mtime = await getLastModified(backlogPath);
      if (mtime && isNewer(mtime, lastActivity)) {
        lastActivity = mtime;
      }
    }

    if (await exists(inProgressPath)) {
      const content = await readFile(inProgressPath, "utf-8");
      const result = parseKanbanFile(content, "in-progress");
      inProgressCount = result.count;
      currentTask = result.currentTask ?? null;
      const mtime = await getLastModified(inProgressPath);
      if (mtime && isNewer(mtime, lastActivity)) {
        lastActivity = mtime;
      }
    }

    if (await exists(donePath)) {
      const content = await readFile(donePath, "utf-8");
      const result = parseKanbanFile(content, "done");
      doneCount = result.count;
      const mtime = await getLastModified(donePath);
      if (mtime && isNewer(mtime, lastActivity)) {
        lastActivity = mtime;
      }
    }
  } catch (err) {
    return {
      success: false,
      error: `Failed to read kanban files: ${err}`,
    };
  }

  return {
    success: true,
    data: {
      projectName: basename(cwd),
      backlogCount,
      inProgressCount,
      currentTask,
      doneCount,
      lastActivity,
    },
  };
};

export const formatStatus = (data: NonNullable<StatusResult["data"]>): string => {
  const lines: string[] = [];

  lines.push(`rtfct: ${data.projectName}`);
  lines.push("");
  lines.push("══════════════════════════════════");
  lines.push("  The Litany of Tasks");
  lines.push("══════════════════════════════════");
  lines.push(`  Backlog:      ${data.backlogCount} unordained task${data.backlogCount !== 1 ? "s" : ""}`);

  if (data.currentTask) {
    lines.push(`  In Progress:  ${data.inProgressCount} ordained task`);
    lines.push(`    → [${data.currentTask.id}] ${data.currentTask.title}`);
  } else {
    lines.push("  In Progress:  No task ordained");
  }

  lines.push(`  Completed:    ${data.doneCount} work${data.doneCount !== 1 ? "s" : ""} done`);
  lines.push("══════════════════════════════════");
  lines.push("");

  if (data.lastActivity) {
    lines.push(`Last activity: ${formatRelativeTime(data.lastActivity)}`);
    lines.push("");
  }

  lines.push("The Omnissiah provides.");

  return lines.join("\n");
};
