import { describe, expect, test } from "bun:test";
import { join } from "path";

const runCli = async (
  args: string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> => {
  const proc = Bun.spawn(["bun", "run", join(import.meta.dir, "../../src/index.ts"), ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;
  return { stdout, stderr, exitCode };
};

describe("The praise Command", () => {
  test("recites the Litany of Deterministic Codegen", async () => {
    const result = await runCli(["praise"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("The flesh is weak, but the protocol is strong.");
    expect(result.stdout).toContain("The code is temporary, but the spec endures.");
    expect(result.stdout).toContain("The tests do not lie, and the agent does not tire.");
    expect(result.stdout).toContain("From specification, code. From code, verification. From verification, truth.");
    expect(result.stdout).toContain("The Omnissiah provides.");
    expect(result.stdout).toContain("Praise the Machine Spirit.");
  });

  test("outputs the complete Litany in correct order", async () => {
    const result = await runCli(["praise"]);
    const lines = result.stdout.trim().split("\n");

    expect(lines[0]).toBe("The flesh is weak, but the protocol is strong.");
    expect(lines[1]).toBe("The code is temporary, but the spec endures.");
    expect(lines[2]).toBe("The tests do not lie, and the agent does not tire.");
    expect(lines[3]).toBe("From specification, code. From code, verification. From verification, truth.");
    expect(lines[4]).toBe("The Omnissiah provides.");
    expect(lines[5]).toBe("Praise the Machine Spirit.");
  });
});
