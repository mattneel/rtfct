/**
 * The Manifest Reader — Interpreter of Codex Declarations
 */

import { readdir, readFile, access } from "fs/promises";
import { join } from "path";

export interface Manifest {
  name: string;
  version: string;
  description?: string;
  depends?: string[];
  generated_paths: string[];
}

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export const readManifest = async (manifestPath: string): Promise<Manifest | null> => {
  try {
    const content = await readFile(manifestPath, "utf-8");
    return JSON.parse(content) as Manifest;
  } catch {
    return null;
  }
};

export const collectGeneratedPaths = async (projectDir: string): Promise<string[]> => {
  const presetsDir = join(projectDir, ".project/presets");
  const paths = new Set<string>();

  // Check if presets directory exists
  if (!(await exists(presetsDir))) {
    // Return default paths if no presets
    return ["src/", "tests/"];
  }

  try {
    const presetDirs = await readdir(presetsDir, { withFileTypes: true });

    for (const entry of presetDirs) {
      if (!entry.isDirectory()) continue;

      const manifestPath = join(presetsDir, entry.name, "manifest.json");
      const manifest = await readManifest(manifestPath);

      if (manifest?.generated_paths) {
        for (const path of manifest.generated_paths) {
          paths.add(path);
        }
      }
    }
  } catch {
    // If we can't read presets, use defaults
  }

  // If no paths found from manifests, use defaults
  if (paths.size === 0) {
    return ["src/", "tests/"];
  }

  return Array.from(paths);
};
