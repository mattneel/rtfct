/**
 * The Argument Parser — Interpreter of the Tech-Priest's Commands
 */

export type Command = "init" | "add" | "status" | "regenerate" | "praise";

export interface ParsedFlags {
  help?: boolean;
  version?: boolean;
  force?: boolean;
  yes?: boolean;
  with?: string[];
}

export interface ParsedArgs {
  command?: Command;
  args: string[];
  flags: ParsedFlags;
  error?: string;
}

const SACRED_COMMANDS: readonly Command[] = [
  "init",
  "add",
  "status",
  "regenerate",
  "praise",
];

const isCommand = (arg: string): arg is Command => {
  return SACRED_COMMANDS.includes(arg as Command);
};

export const parseArgs = (argv: string[]): ParsedArgs => {
  const result: ParsedArgs = {
    args: [],
    flags: {},
  };

  // No arguments — show help
  if (argv.length === 0) {
    result.flags.help = true;
    return result;
  }

  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];

    // Global flags
    if (arg === "--help" || arg === "-h") {
      result.flags.help = true;
      i++;
      continue;
    }

    if (arg === "--version" || arg === "-v") {
      result.flags.version = true;
      i++;
      continue;
    }

    // Command-specific flags
    if (arg === "--force") {
      result.flags.force = true;
      i++;
      continue;
    }

    if (arg === "--yes" || arg === "-y") {
      result.flags.yes = true;
      i++;
      continue;
    }

    if (arg === "--with") {
      const nextArg = argv[i + 1];
      if (!nextArg || nextArg.startsWith("-")) {
        result.error = "The --with flag requires a preset name. Example: --with zig";
        return result;
      }
      result.flags.with = nextArg.split(",").map((s) => s.trim());
      i += 2;
      continue;
    }

    // Command parsing
    if (!result.command && isCommand(arg)) {
      result.command = arg;
      i++;
      continue;
    }

    // Unknown command
    if (!result.command && !arg.startsWith("-")) {
      result.error = `Unknown command: "${arg}". The sacred commands are: ${SACRED_COMMANDS.join(", ")}`;
      return result;
    }

    // Positional arguments (after command)
    if (result.command) {
      result.args.push(arg);
    }

    i++;
  }

  // Validate command-specific requirements
  if (result.command === "add" && result.args.length === 0 && !result.flags.help) {
    result.error = "The 'add' command requires a preset name. Example: rtfct add zig";
    return result;
  }

  return result;
};
