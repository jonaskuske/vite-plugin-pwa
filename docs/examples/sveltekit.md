---
title: SvelteKit | Examples
---

# SvelteKit

The `SvelteKit` example project can be found on `examples/sveltekit-pwa` package/directory and it is configured
with `@sveltejs/adapter-static` adapter.

The `SvelteKit` example has been created using `svelte@next` template with `PNPM`:
```shell
pnpm create svelte@next sveltekit-pwa
+ create-svelte 2.0.0-next.89

Progress: resolved 5, reused 5, downloaded 0, added 5, done

create-svelte version 2.0.0-next.89

Welcome to SvelteKit!

This is beta software; expect bugs and missing features.

Problems? Open an issue on https://github.com/sveltejs/kit/issues if none exists already.

√ Which Svelte app template? » Skeleton project
√ Use TypeScript? ... No / Yes
√ Add ESLint for code linting? ... No / Yes
√ Add Prettier for code formatting? ... No / Yes

Your project is ready!
✔ Typescript
  Inside Svelte components, use <script lang="ts">
✔ ESLint
  https://github.com/sveltejs/eslint-plugin-svelte3

Install community-maintained integrations:
  https://github.com/svelte-add/svelte-adders

Next steps:
  1: cd sveltekit-pwa
  2: npm install (or pnpm install, etc)
  3: git init && git add -A && git commit -m "Initial commit" (optional)
  4: npm run dev -- --open
```

To test `new content available`, you should rerun the corresponding script, and then refresh the page.

If you are running an example with `Periodic SW updates`, you will need to wait 1 minute:
<HeuristicWorkboxWindow />

## Executing the examples

<RunExamples />

## generateSW

`generateSW` has the following behaviors:
- `Prompt for update`:
    - Show `Ready to work offlline` on first visit and once the `service worker` ready.
    - Show `Prompt for update` when new `service worker` available.

- `Auto update`:
    - Show `Ready to work offlline` on first visit and once the `service worker` ready.
    - When new content available, the service worker will be updated automatically.

- `Prompt for update` with `Periodic service worker updates`:
    - Show `Ready to work offlline` on first visit and once the `service worker` ready.
    - Show `Prompt for update` when new `service worker` available.
    - The example project will register a `Periodic service worker updates`

- `Auto update` with `Periodic service worker updates`:
    - Show `Ready to work offlline` on first visit and once the `service worker` ready.
    - The example project will register a `Periodic service worker updates`
    - When new content available, the service worker will be updated automatically.

## injectManifest

`injectManifest` has the following behavior:
- Custom `TypeScript Service Worker` with offline support.
- Show `Ready to work offlline` on first visit and once the `service worker` ready.
- Show `Prompt for update` when new `service worker` available.