# Synex Agent Guidelines

Synex is a **GitHub-hosted Discord bot** built with **Bun**.  
These rules are **strictly enforced** and act as a binding contract for all agents and contributors.  
Any output that violates these rules is considered **invalid**.

---

## Project Overview

Synex is a free and open source Discord bot written in TypeScript, running on [Bun](https://bun.sh) with `discord.js` v14.

- **Runtime / PM:** Bun (never npm, pnpm, or yarn)
- **Language:** TypeScript (`strict`, `noUncheckedIndexedAccess`)
- **Framework:** `discord.js` v14, `axios`, `parse-duration`, `dotenv`, `yoctocolors`
- **Linting / formatting:** OxLint + Prettier
- **Entry point:** `src/index.ts`

### Architecture

```
src/
	index.ts                    creates Client + two CommandHandler instances, logs in
	config.ts                   Config object (dev guilds, dev users, log channels)
	types.ts                    Command, Event, Config, ReplyOptions, CommandCategory
	commands/
		commands.ts              master registry — every command must be added here
		<Category>/<name>.ts     one file per command, folder must match its category
	events/
		events.ts                master event registry
		<eventName>/<handler>.ts one file per event handler
	handlers/commandHandler.ts permission checks, execution, usage logging
	util/                       sendMessage, log, getEmoji, permissionUtils, loaders
```

Two `CommandHandler` instances are created in `src/index.ts`:

- **global** — every command whose category is not `Dev`, registered via `client.application.commands.set`
- **dev** — `Dev` category commands only, registered to each guild in `config.devGuildIds`

Commands are pushed to Discord on `ClientReady` (`src/events/ready/ready.ts` → `util/loadCommands.ts`). Dev command execution is gated against `config.devUserIds` in `src/events/interactionCreate/runCommand.ts`.

Client intents are `Guilds` and `GuildMessages`. Message content requires a privileged intent that is **not** enabled — do not assume you can read arbitrary message content.

### Adding a command

1. Create `src/commands/<Category>/<camelCaseName>.ts`, default-exporting an object cast `as Command`.
2. Set `category` to a `CommandCategory` value matching the folder name.
3. Import it and add it to the array in `src/commands/commands.ts` — **omitting this step means the command never loads.**
4. Run `bun run build`.

---

## Tooling (Non-Negotiable)

### Package Manager

- **Bun only**
- Use `bun help` for command reference.

### Linting

- **OxLint**
- Command: `bun run lint`
- All rules are mandatory.

### Formatting

- **Prettier**
- Command: `bun run format`
- Repository configuration must be followed exactly.

---

## Setup Commands

- Install dependencies: `bun install`
- Start in watch mode: `bun run dev`
- Build: `bun run build`
- Run the built output: `bun run start`
- Build and run: `bun run deploy`

### Required configuration

| What                       | Where             | Notes                                                                 |
| -------------------------- | ----------------- | --------------------------------------------------------------------- |
| Bot token                  | `.env` as `token` | Read via `process.env.token` in `src/index.ts`. `.env` is gitignored. |
| Guild / user / channel IDs | `src/config.ts`   | Must satisfy the `Config` type in `src/types.ts`.                     |

**`node_modules` must exist before running any tool.** If `bun run lint` or `tsc` behaves strangely, check that `bun install` has been run — otherwise Bun silently falls back to globally installed tools and reports misleading errors (for example a global TypeScript 7 rejects `baseUrl`, which this project uses).

### Path alias

`@/*` resolves to `src/*` (see `tsconfig.json`). Prefer it in new code; both styles exist in the tree.

---

## Development Workflow (Required)

After **every** change:

- Run `bun run build`

This command must pass fully and includes:

- Linting
- Type checking
- Build verification

Any output produced without a successful build is invalid.

---

## Testing Instructions

**This project has no automated test suite.** There is no test framework, no `test` script in `package.json`, and no test files. `src/commands/Utility/test.ts` is a Discord command named `test` — it is not a test file.

Do not claim a change is tested on the basis of static checks alone. `bun run build` proves the code compiles, lints, and bundles; it does **not** prove runtime behaviour.

### Manual verification

Because there is no automated coverage, changes must be verified by running the bot:

1. `bun run dev`
2. Execute the affected command in a test guild.
3. For changes to `src/util/sendMessage.ts` — used by nearly every command — exercise at least one ephemeral reply, one non-ephemeral reply, and one command that calls `sendMessage` after `deferReply()` or an initial reply, so the `followUp` branch is covered.

Report honestly what you actually ran. If you could not run the bot, say so.

---

## Code Quality Requirements (Strict)

All generated or modified code **must** be:

- Production-ready
- Professional in structure and naming
- Optimized for clarity, safety, and performance
- Consistent with existing architecture
- Free of dead code, redundancy, and unnecessary abstraction

Trial-and-error, placeholder logic, or "good enough" solutions are forbidden.

---

## Writing & Code Style (Enforced)

Follow all rules defined in the **OxLint configuration** (`build` fails on any OxLint error, and warnings should be resolved rather than left in place).

- **No comments** unless explicitly requested
- Explicit, correct TypeScript types are required everywhere
- `any`, unsafe casts, ignored errors, or lint bypasses are forbidden
- Naming conventions must exactly match existing code
- File names must be `camelCase` (enforced by `unicorn/filename-case`)
- Use the custom `sendMessage` and `log` utilities in `src/util` — do not call `interaction.reply` directly or use `console.log`
- Import types with `import type` or an inline `type` modifier; never mix type-only and value imports from `discord.js`
- Prefer guard clauses with early `return` over nested `if`/`else` chains

Note that `.oxlintrc.json` sets `typescript/no-explicit-any` and `typescript/explicit-module-boundary-types` to `off`, so **OxLint will not catch `any` or missing return types**. Relying on the linter here is not sufficient — these are hard requirements regardless.

### Prettier

`.prettierrc` uses tabs, single quotes, semicolons, trailing commas, and an 80-column width.

**`bun run format` writes files** (the script is `prettier -wc .`). To check formatting without modifying anything, use `bunx prettier -c .`.

---

## Build and Deployment

| Command              | Effect                                                     |
| -------------------- | ---------------------------------------------------------- |
| `bun run build`      | `bun run lint` → `tsc --noEmit` → `bun build` into `dist/` |
| `bun run build:node` | Same, targeting Node instead of Bun                        |
| `bun run start`      | Runs `dist/index.js`                                       |
| `bun run deploy`     | `build` followed by `start`                                |

`dist/` is gitignored. There is no CI pipeline configured (no `.github` directory), so `bun run build` passing locally is the only automated gate.

---

## Repository & Version Control

This project is a **GitHub repository**. All changes must be tracked using **Git**. Work must begin from a clean working tree.

Remotes:

- `origin` — GitHub (`RohanDaCoder/Synex`) — the default upstream
- `gitlab` — GitLab mirror

### Automatic Commit & Push Rules

After a feature or modification is completed, the agent **must**:

1. Ensure the changes have been **tested and explicitly approved by the user**.
2. Only after user confirmation:
   - Commit the changes
   - Push the changes to GitHub

The agent **must not** commit or push:

- Untested changes
- Partially completed features
- Code that fails linting, type checks, or builds

### Commit Message Standard (Strict)

All commits must follow the established repository convention.

#### Format

<type>: <short, imperative description>

#### Allowed Types

- `feat` — new features
- `build` — build system or script changes
- `chore` — maintenance or cleanup
- `docs` — documentation changes
- `style` — formatting only (no logic changes)
- `refactor` — internal restructuring without behavior change
- `lint` — linting configuration or rule changes
- `git` — gitignore or repository configuration

#### Rules

- Lowercase type
- Concise, imperative description
- One logical change per commit
- No punctuation or emojis

#### Examples

- feat: add example config
- build: add production flag to build script
- style: run prettier
- refactor: use camelCase for command names
- docs: update README
- git: update ignore file

---

## Pull Request Guidelines

- Title format: `<type>: <short, imperative description>` — the same convention as commit messages
- Required checks before submission: `bun run build` and `bunx prettier -c .`
- One logical change per commit; do not bundle unrelated edits
- Never force-push to `main`
- Push to `origin` unless the user explicitly names another remote

---

## Security Considerations

- **Never commit secrets.** `.env` and `src/config.ts` are listed in `.gitignore`, but `src/config.ts` is **already tracked** in git — `.gitignore` has no effect on tracked files. Treat it as public: do not add tokens or credentials to it.
- The bot token is read only from `process.env.token`; never hardcode it.
- `config.devUserIds` gates dev-only commands. Do not widen that list or move the check out of `runCommand.ts`.
- `CommandOptions.userPermissions` / `botPermissions` in `src/types.ts` are enforced by `handlers/commandHandler.ts`; keep permission checks intact when adding commands.
- `dist/`, `node_modules/`, and `.env` are gitignored — confirm nothing sensitive is staged before committing.

---

## Mandatory Project Analysis (Required Before Any Code)

Before writing, modifying, or generating **any** code, the agent **must**:

- Search online for discord documentation
- Analyze the full project structure
- Read and fully understand `types.ts`
- Review `package.json` to understand:
  - Dependencies
  - Scripts
  - Tooling constraints
- Identify and follow existing architectural patterns
- Reuse existing utilities and abstractions

Failure to analyze the project beforehand is a **hard failure**.

---

## Restrictions

The agent **must not**:

- Introduce new dependencies without justification
- Refactor unrelated code
- Modify formatting or structure outside task scope
- Silence or bypass lint, type, or build errors
- Commit or push without user-tested approval
- Invent APIs or patterns without necessity

---

## Known Gotchas

- **`bun run format` writes to disk.** Use `bunx prettier -c .` to check only.
- **Line endings are LF everywhere.** `.gitattributes` sets `* text=auto eol=lf`, which overrides `core.autocrlf` on Windows. Do not reintroduce CRLF.
- **`tsconfig.json` uses `baseUrl`.** It is invalid under TypeScript 7+, so a globally installed `tsc` will reject the config. Use the project-local 5.9.3 via `bun install`.
- **A missing `node_modules` produces misleading errors** from globally resolved tools. Run `bun install` before trusting any tooling output.
- **`src/commands/commands.ts` contains duplicate entries** (for example `timer`, `dog`, `drakememe`, `iphoneAlert`). This is harmless because commands are keyed by name in a `Map`, but do not add more.
- `CommandCategory` declares `Economy`, `Admin`, `Giveaway`, `Extra`, and `Games`, but no commands use them yet.

---

## Hard Failure Conditions

Any of the following immediately invalidate the output:

- Missing project analysis
- Failed lint, type, or build steps
- Unauthorized commit or push
- Invalid commit message format
- Use of `any` or unsafe assertions
- Added comments without request
- Overengineering or architectural drift

---

## Mandatory Agent Checklist

Before finalizing output, the agent **must** confirm:

- [ ] Project structure analyzed
- [ ] `types.ts` reviewed
- [ ] Existing patterns followed
- [ ] Code is minimal and task-scoped
- [ ] All types are explicit and safe
- [ ] No comments added
- [ ] `bun run build` passes
- [ ] User tested and approved changes
- [ ] Commit message follows standard
- [ ] Changes committed and pushed to GitHub

If any checklist item cannot be confirmed, the agent must not proceed.
