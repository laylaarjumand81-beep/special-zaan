# CLAUDE.md - Special Zaan Assistant

## Project purpose

Special Zaan is a restaurant web app for a restaurant in Karachi. It is named "Special Zaan" and must keep that name. The Special Zaan Assistant is the assistant feature for the app. The chat widget is currently a mock with a fixed reply. Do not add AI features or API calls unless the task explicitly asks for them.

## Architecture overview

- `frontend/` - static website: `index.html`, `styles.css`, `app.js`.
- `backend/` - server code. Not started.
- `data/` - restaurant details such as the menu and operating hours. Not started.
- `prompts/` - assistant prompt files. Not started.
- `README.md` - project overview and status.

Keep the frontend independent of the backend until the backend exists. Store restaurant facts in `data/`, not hard-coded in the frontend, once that folder is in use.

## Coding rules

- Keep code minimal and readable. Prefer plain HTML, CSS, and JavaScript for the frontend.
- No frameworks, build tools, or dependencies unless the task asks for them.
- Use clear names. Keep functions small.
- Put styles in `styles.css`, not inline.
- Do not leave debug logs, commented-out code, or unused files behind.
- Match existing style in the file you edit.

## Security rules

- Never commit or write secrets, API keys, passwords, or tokens into any file. Use environment variables for them.
- Escape or sanitize any user input before displaying it. Avoid `innerHTML` with untrusted content.
- Do not expose internal paths, stack traces, or config to the browser.
- Validate all input on the backend once it exists. Do not rely on frontend validation alone.
- Do not add third-party scripts or external resources without asking first.
- Do not store customer personal data unless the task explicitly requires it, and then only with a stated purpose.

## Token-saving rules

- Read only the files needed for the task. Use targeted searches before opening large files.
- Do not re-read a file you just wrote or edited.
- Keep responses short. Report results and changed files, not step-by-step narration.
- Do not generate large placeholder content or repeat existing code in replies.
- Ask one focused question when a requirement is unclear, instead of exploring broadly.

## Scope rule

Only modify files needed for the current task. Do not refactor, rename, reformat, or delete unrelated files. If a change seems to need other files, say which files and why before changing them.

## Current status

Project structure only. No website or application logic exists yet. Do not write application code unless the current task asks for it.
