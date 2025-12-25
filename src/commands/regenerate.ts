/**
 * The regenerate Command — Purification of Generated Code
 */

import { rm, access } from "fs/promises";
import { join } from "path";
import type { ParsedFlags } from "../args";
import { collectGeneratedPaths } from "../manifest";

export interface RegenerateResult {
  success: boolean;
  error?: string;
  purifiedPaths?: string[];
}

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export const runRegenerate = async (
  cwd: string,
  flags: ParsedFlags
): Promise<RegenerateResult> => {
  const projectDir = join(cwd, ".project");

  // Check if .project/ exists
  if (!(await exists(projectDir))) {
    return {
      success: false,
      error: "No .project/ found. This directory has not been consecrated. Run 'rtfct init' first.",
    };
  }

  // Collect paths to purify from manifests
  const pathsToPurify = await collectGeneratedPaths(cwd);

  // Purify each path
  const purifiedPaths: string[] = [];
  for (const relativePath of pathsToPurify) {
    const fullPath = join(cwd, relativePath);
    if (await exists(fullPath)) {
      await rm(fullPath, { recursive: true, force: true });
      purifiedPaths.push(relativePath);
    }
  }

  return {
    success: true,
    purifiedPaths,
  };
};

export const formatRegenerate = (paths: string[]): string => {
  const lines: string[] = [];

  lines.push("The Rite of Purification begins...");
  lines.push("");

  if (paths.length === 0) {
    lines.push("No generated paths found to purify.");
  } else {
    lines.push("Purifying:");
    for (const path of paths) {
      lines.push(`  - ${path}`);
    }
    lines.push("");
    lines.push("Purification complete.");
  }

  lines.push("");
  lines.push("The codebase is cleansed. To regenerate:");
  lines.push("  1. Invoke the Machine Spirit (claude, cursor, etc.)");
  lines.push("  2. The agent shall read the Sacred Texts");
  lines.push("  3. Code shall be manifested anew");
  lines.push("");
  lines.push("The Omnissiah provides.");

  return lines.join("\n");
};
