/**
 * The Sacred Usage — Guidance for the Tech-Priest
 */

import type { Command } from "./args";

const VERSION = "0.1.0";

export const printVersion = (): void => {
  console.log(`rtfct v${VERSION}`);
};

export const printHelp = (command?: Command): void => {
  if (command) {
    printCommandHelp(command);
    return;
  }

  console.log(`
rtfct v${VERSION} — Markdown-driven development

The spec is the source of truth. Code is a regenerable artefact.

USAGE
  rtfct <command> [options]

COMMANDS
  init          Consecrate a new project with the Sacred Texts
  add <preset>  Incorporate a Codex into an existing project
  status        Reveal the state of the Litany of Tasks
  regenerate    Purify generated code for regeneration
  praise        Recite the Litany of Deterministic Codegen

OPTIONS
  -h, --help     Display this guidance
  -v, --version  Display version

EXAMPLES
  rtfct init                        Create a new rtfct project
  rtfct init --with zig             Create with the Zig Codex
  rtfct init --with elixir,phoenix  Create with multiple Codices
  rtfct add typescript              Add a Codex to existing project
  rtfct status                      View kanban state
  rtfct regenerate                  Prepare for code regeneration

The Omnissiah provides. Praise the Machine Spirit.
`.trim());
};

const printCommandHelp = (command: Command): void => {
  const helpTexts: Record<Command, string> = {
    init: `
rtfct init — Consecrate a new project

USAGE
  rtfct init [options]

OPTIONS
  --with <presets>  Comma-separated Codices to include
  --force           Purify existing .project/ and recreate
  -h, --help        Display this guidance

EXAMPLES
  rtfct init
  rtfct init --with zig
  rtfct init --with elixir,phoenix,liveview
  rtfct init --force
`.trim(),

    add: `
rtfct add — Incorporate a Codex

USAGE
  rtfct add <preset>

ARGUMENTS
  preset  The Codex to incorporate (e.g., zig, typescript, user/repo)

EXAMPLES
  rtfct add zig
  rtfct add mattneel/custom-codex
`.trim(),

    status: `
rtfct status — Reveal the Litany

USAGE
  rtfct status

Displays the current state of the kanban:
  - Backlog count
  - In-progress task
  - Completed count
`.trim(),

    regenerate: `
rtfct regenerate — Purify for Regeneration

USAGE
  rtfct regenerate [options]

OPTIONS
  -y, --yes  Skip confirmation prompt

Deletes all generated paths (src/, tests/, etc.) as defined
in preset manifests, preparing for regeneration by the Machine Spirit.
`.trim(),

    praise: `
rtfct praise — Recite the Litany

USAGE
  rtfct praise

Outputs the Litany of Deterministic Codegen.
For inspiration and spiritual guidance.
`.trim(),
  };

  console.log(helpTexts[command]);
};

export const printError = (message: string): void => {
  console.error(`Error: ${message}`);
  console.error("\nRun 'rtfct --help' for usage guidance.");
};
