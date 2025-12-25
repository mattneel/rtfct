/**
 * The Kanban Parser — Reader of the Litany of Tasks
 */

export interface Task {
  id: string;
  title: string;
}

export interface KanbanFileResult {
  type: "backlog" | "in-progress" | "done";
  count: number;
  currentTask?: Task | null;
}

const TASK_HEADER_PATTERN = /^## \[([A-Z]+-\d+)\] (.+)$/gm;

export const countTasks = (content: string): number => {
  const matches = content.match(TASK_HEADER_PATTERN);
  return matches ? matches.length : 0;
};

export const extractCurrentTask = (content: string): Task | null => {
  const match = content.match(/^## \[([A-Z]+-\d+)\] (.+)$/m);
  if (!match) {
    return null;
  }
  return {
    id: match[1],
    title: match[2],
  };
};

export const parseKanbanFile = (
  content: string,
  type: "backlog" | "in-progress" | "done"
): KanbanFileResult => {
  const count = countTasks(content);
  const result: KanbanFileResult = { type, count };

  if (type === "in-progress") {
    result.currentTask = extractCurrentTask(content);
  }

  return result;
};
