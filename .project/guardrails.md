# The Forbidden Heresies

*The flesh is weak. These laws protect us from its failings.*

## The Sacred Commandments

### THOU SHALT

- **Keep the CLI minimal** — `init`, `add`, `status`, `regenerate`, `praise`. No more.
- **Keep dependencies near zero** — External code is external risk.
- **Make presets simple** — Just markdown and `manifest.json`. A child should author them.
- **Fail fast with clarity** — When something breaks, say what and why. Suggest the remedy.
- **Support both `bunx` and `npx`** — Meet the faithful where they are.

### THOU SHALT NOT

- **Add a web UI** — The terminal is the altar. It is sufficient.
- **Add a hosted service** — The Sacred Texts belong in the repository, not in the cloud.
- **Add "smart" features** — The tool does not interpret code. It manages text.
- **Require accounts, API keys, or network** — Except to fetch GitHub presets. Offline is holy.
- **Auto-modify Sacred Texts** — Only kanban task movement is permitted. All else requires blessing.
- **Add configuration outside `.project/`** — One source of truth. No scattered config files.

## The Code Purity Laws

- **Functional over object-oriented** — Functions are pure. Classes hide state.
- **No classes unless truly necessary** — And it is rarely necessary.
- **Explicit over clever** — The next reader is the Machine Spirit. It does not appreciate cleverness.
- **If a function exceeds 30 lines, it sins** — It is doing too much. Decompose it.

## The Error Doctrine

- **Never swallow errors** — Every error must surface. Silent failure is heresy.
- **User-facing errors must guide** — Do not merely report. Suggest the next action.
- **Provide `--verbose`** — For when the faithful need to see the inner workings.

## The Litmus Rite

Before adding ANY feature, the Tech-Priest must ask:

1. **Does this help the Machine Spirit understand the project?**
2. **Does this help the human understand the project state?**
3. **Can this be accomplished with markdown alone?**

If the answer to (1) and (2) is NO — do not add it.

If the answer to (3) is YES — do that instead.

Complexity is the enemy. Simplicity is sacred.

## The Seven Deadly Heresies

1. **The Heresy of Unspecified Code** — Code without corresponding Sacred Texts
2. **The Heresy of Unregenerable State** — If you can't `rm -rf src/` and recover, you have sinned
3. **The Heresy of Hidden Configuration** — Config files outside `.project/`
4. **The Heresy of Implicit Behavior** — Magic that the reader cannot trace
5. **The Heresy of Scope Creep** — Features beyond the Founding Vision
6. **The Heresy of Premature Optimization** — Make it work, make it right, then make it fast
7. **The Heresy of Silent Failure** — Errors that do not surface

---

*Memorize these heresies. Avoid them. The Omnissiah is watching.*

*The flesh is weak, but the protocol is strong.*
