```md
# Synex Agent Guidelines

Synex is a **GitHub-hosted Discord bot** built with **Bun**.  
These rules are **strictly enforced** and act as a binding contract for all agents and contributors.  
Any output that violates these rules is considered **invalid**.

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

## Repository & Version Control

- This project is a **GitHub repository**.
- All changes must be tracked using **Git**.
- Work must begin from a clean working tree.

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

---

## Commit Message Standard (Strict)

All commits must follow the established repository convention.

### Format

<type>: <short, imperative description>

### Allowed Types

- `feat` — new features
- `build` — build system or script changes
- `chore` — maintenance or cleanup
- `docs` — documentation changes
- `style` — formatting only (no logic changes)
- `refactor` — internal restructuring without behavior change
- `lint` — linting configuration or rule changes
- `git` — gitignore or repository configuration

### Rules

- Lowercase type
- Concise, imperative description
- One logical change per commit
- No punctuation or emojis

### Examples

- feat: add example config
- build: add production flag to build script
- style: run prettier
- refactor: use camelCase for command names
- docs: update README
- git: update ignore file

---

## Mandatory Project Analysis (Required Before Any Code)

Before writing, modifying, or generating **any** code, the agent **must**:

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

## Development Workflow (Required)

After **every** change:

- Run `bun run build`

This command must pass fully and includes:

- Linting
- Type checking
- Build verification

Any output produced without a successful build is invalid.

---

## Code Quality Requirements (Strict)

All generated or modified code **must** be:

- Production-ready
- Professional in structure and naming
- Optimized for clarity, safety, and performance
- Consistent with existing architecture
- Free of dead code, redundancy, and unnecessary abstraction

Trial-and-error, placeholder logic, or “good enough” solutions are forbidden.

---

## Writing & Code Style (Enforced)

- Follow all rules defined in the **OxLint configuration**
- **No comments** unless explicitly requested
- Explicit, correct TypeScript types are required everywhere
- `any`, unsafe casts, ignored errors, or lint bypasses are forbidden
- Naming conventions must exactly match existing code
- Use the custom log function inside utils folder.
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
```
