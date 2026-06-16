<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Read Before Anything Else

Read in this exact order before any implementation:

1. context/project-overview.md
2. context/architecture.md
3. context/ui-tokens.md
4. context/ui-rules.md
5. context/ui-registry.md
6. context/code-standards.md
7. context/library-docs.md
8. context/build-plan.md
9. context/progress-tracker.md

## Rules That Never Change

- Never use hardcoded hex values or raw Tailwind color classes
- Update `progress-tracker.md` and `ui-registry.md` after every feature
- Before any third party library — load its installed skill first,
  then read `context/library-docs.md` for project-specific rules
- If the same problem persists after one corrective prompt —
  stop immediately and run /recover

## Backend: Insforge

This project uses **Insforge** as its BaaS backend.

- **API base URL**: `https://zz2f58ia.ap-southeast.insforge.app`
- **SDK**: `@insforge/sdk@latest` — always import via `createClient` from `@insforge/sdk`
- **Tailwind**: Stay on **3.4** — do not upgrade to v4

### Mandatory workflow before any backend code

1. Call `mcp__insforge__fetch-docs` with `"instructions"` first (always)
2. Then fetch the specific doc type needed (`"db-sdk"`, `"auth-sdk"`, `"storage-sdk"`, etc.)
3. Never write Insforge integration code from memory — always fetch docs first

### SDK vs MCP tool split

| Use SDK for | Use MCP tools for |
|---|---|
| Auth (login, register, logout) | Schema changes (`run-raw-sql`, `get-table-schema`) |
| DB CRUD (select, insert, update, delete) | Bucket management (`create-bucket`, `list-buckets`) |
| Storage (upload, download) | Function deployment (`create-function`, `update-function`) |
| AI calls (via OpenRouter + OpenAI SDK) | Frontend deployment (`create-deployment`) |
| Payments (checkout, billing portal) | Project scaffolding (`download-template`) |

### Hard rules

- All DB inserts use **array format**: `[{ ... }]`
- AI integrations call OpenRouter directly: `baseURL: "https://openrouter.ai/api/v1"` with a server-side `OPENROUTER_API_KEY` — never expose keys client-side
- Serverless functions have **one endpoint** — no nested route paths
- SDK always returns `{ data, error }` — always destructure and handle `error`

## Available Skills

- `/architect` — before any complex feature. Think before building.
- `/imprint` — after any new UI component. Capture patterns.
- `/review` — before demo or when something feels off.
- `/recover` — when something breaks after one failed correction.
- `/remember save` — when a feature spans multiple sessions.
- `/remember restore` — when returning after a multi-session feature.
