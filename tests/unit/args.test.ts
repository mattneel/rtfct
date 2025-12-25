import { describe, expect, test } from "bun:test";
import { parseArgs, type ParsedArgs } from "../../src/args";

describe("The Argument Parser", () => {
  describe("sacred commands", () => {
    test("parses 'init' command", () => {
      const result = parseArgs(["init"]);
      expect(result.command).toBe("init");
    });

    test("parses 'add' command with preset argument", () => {
      const result = parseArgs(["add", "zig"]);
      expect(result.command).toBe("add");
      expect(result.args).toEqual(["zig"]);
    });

    test("parses 'status' command", () => {
      const result = parseArgs(["status"]);
      expect(result.command).toBe("status");
    });

    test("parses 'regenerate' command", () => {
      const result = parseArgs(["regenerate"]);
      expect(result.command).toBe("regenerate");
    });

    test("parses 'praise' command", () => {
      const result = parseArgs(["praise"]);
      expect(result.command).toBe("praise");
    });
  });

  describe("init command flags", () => {
    test("parses --with flag with single preset", () => {
      const result = parseArgs(["init", "--with", "zig"]);
      expect(result.command).toBe("init");
      expect(result.flags.with).toEqual(["zig"]);
    });

    test("parses --with flag with comma-separated presets", () => {
      const result = parseArgs(["init", "--with", "elixir,phoenix,liveview"]);
      expect(result.command).toBe("init");
      expect(result.flags.with).toEqual(["elixir", "phoenix", "liveview"]);
    });

    test("parses --force flag", () => {
      const result = parseArgs(["init", "--force"]);
      expect(result.command).toBe("init");
      expect(result.flags.force).toBe(true);
    });

    test("parses combined flags", () => {
      const result = parseArgs(["init", "--with", "zig", "--force"]);
      expect(result.command).toBe("init");
      expect(result.flags.with).toEqual(["zig"]);
      expect(result.flags.force).toBe(true);
    });
  });

  describe("regenerate command flags", () => {
    test("parses --yes flag to skip confirmation", () => {
      const result = parseArgs(["regenerate", "--yes"]);
      expect(result.command).toBe("regenerate");
      expect(result.flags.yes).toBe(true);
    });

    test("parses -y shorthand", () => {
      const result = parseArgs(["regenerate", "-y"]);
      expect(result.command).toBe("regenerate");
      expect(result.flags.yes).toBe(true);
    });
  });

  describe("global flags", () => {
    test("parses --help flag", () => {
      const result = parseArgs(["--help"]);
      expect(result.flags.help).toBe(true);
    });

    test("parses -h shorthand", () => {
      const result = parseArgs(["-h"]);
      expect(result.flags.help).toBe(true);
    });

    test("parses --version flag", () => {
      const result = parseArgs(["--version"]);
      expect(result.flags.version).toBe(true);
    });

    test("parses -v shorthand", () => {
      const result = parseArgs(["-v"]);
      expect(result.flags.version).toBe(true);
    });

    test("parses command-specific --help", () => {
      const result = parseArgs(["init", "--help"]);
      expect(result.command).toBe("init");
      expect(result.flags.help).toBe(true);
    });
  });

  describe("error handling", () => {
    test("returns error for unknown command", () => {
      const result = parseArgs(["heresy"]);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("heresy");
    });

    test("returns error when add command lacks preset argument", () => {
      const result = parseArgs(["add"]);
      expect(result.error).toBeDefined();
    });

    test("returns error when --with lacks value", () => {
      const result = parseArgs(["init", "--with"]);
      expect(result.error).toBeDefined();
    });
  });

  describe("no arguments", () => {
    test("returns help flag when no arguments provided", () => {
      const result = parseArgs([]);
      expect(result.flags.help).toBe(true);
    });
  });
});
