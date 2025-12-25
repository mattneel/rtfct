/**
 * GitHub Preset Resolution — Fetching Codices from the Cloud
 *
 * Enables downloading presets from GitHub repositories.
 */

import type { Preset, PresetFile } from "./index";

export interface GitHubPresetRef {
  owner: string;
  repo: string;
  ref: string; // branch, tag, or commit (default: main)
}

/**
 * Parse a GitHub preset reference string.
 * Formats:
 *   - "owner/repo" -> uses "main" branch
 *   - "owner/repo@branch" -> uses specified branch/tag/commit
 */
export const parseGitHubRef = (name: string): GitHubPresetRef | null => {
  // Check for @ symbol for branch specification
  const atIndex = name.indexOf("@");

  let ownerRepo: string;
  let ref = "main";

  if (atIndex !== -1) {
    ownerRepo = name.slice(0, atIndex);
    ref = name.slice(atIndex + 1);
    if (!ref) {
      return null; // Invalid: "owner/repo@" with no branch
    }
  } else {
    ownerRepo = name;
  }

  const parts = ownerRepo.split("/");
  if (parts.length !== 2) {
    return null;
  }

  const [owner, repo] = parts;
  if (!owner || !repo) {
    return null;
  }

  return { owner, repo, ref };
};

/**
 * Fetch a file from GitHub raw content.
 */
const fetchGitHubFile = async (
  ref: GitHubPresetRef,
  path: string
): Promise<string | null> => {
  const url = `https://raw.githubusercontent.com/${ref.owner}/${ref.repo}/${ref.ref}/${path}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    return await response.text();
  } catch {
    return null;
  }
};

/**
 * Fetch the directory listing from GitHub API.
 */
const fetchGitHubDirectory = async (
  ref: GitHubPresetRef,
  path: string = ""
): Promise<string[]> => {
  const url = `https://api.github.com/repos/${ref.owner}/${ref.repo}/contents/${path}?ref=${ref.ref}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "rtfct-cli",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as Array<{
      type: string;
      path: string;
      name: string;
    }>;

    const files: string[] = [];

    for (const item of data) {
      if (item.type === "file") {
        files.push(item.path);
      } else if (item.type === "dir") {
        // Recursively fetch directory contents
        const subFiles = await fetchGitHubDirectory(ref, item.path);
        files.push(...subFiles);
      }
    }

    return files;
  } catch {
    return [];
  }
};

/**
 * Resolve a GitHub preset reference to a Preset object.
 */
export const resolveGitHubPreset = async (
  name: string
): Promise<{ success: true; preset: Preset } | { success: false; error: string }> => {
  const ref = parseGitHubRef(name);

  if (!ref) {
    return {
      success: false,
      error: `Invalid GitHub preset format: ${name}. Use "owner/repo" or "owner/repo@branch".`,
    };
  }

  // First, fetch the manifest.json
  const manifestContent = await fetchGitHubFile(ref, "manifest.json");

  if (!manifestContent) {
    return {
      success: false,
      error: `Could not fetch manifest.json from ${name}. Ensure the repository exists and contains a valid preset.`,
    };
  }

  let manifest: Preset["manifest"];
  try {
    manifest = JSON.parse(manifestContent);
  } catch {
    return {
      success: false,
      error: `Invalid manifest.json in ${name}. The file must be valid JSON.`,
    };
  }

  // Validate manifest has required fields
  if (!manifest.name || !manifest.version || !manifest.generated_paths) {
    return {
      success: false,
      error: `Invalid manifest.json in ${name}. Missing required fields (name, version, generated_paths).`,
    };
  }

  // Fetch all files in the repository (excluding manifest.json)
  const allFiles = await fetchGitHubDirectory(ref);

  if (allFiles.length === 0) {
    return {
      success: false,
      error: `Could not fetch file list from ${name}. Check if the repository is accessible.`,
    };
  }

  // Filter out manifest.json and fetch content for each file
  const presetFiles: PresetFile[] = [];

  for (const filePath of allFiles) {
    // Skip manifest.json and hidden files
    if (filePath === "manifest.json" || filePath.startsWith(".")) {
      continue;
    }

    const content = await fetchGitHubFile(ref, filePath);
    if (content !== null) {
      presetFiles.push({
        path: filePath,
        content,
      });
    }
  }

  const preset: Preset = {
    name: manifest.name,
    manifest,
    files: presetFiles,
  };

  return { success: true, preset };
};
