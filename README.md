# sokol-design-system

The shared design system for Sóköl: the Blue Book token contract, a Tailwind 3 preset,
token-driven UI primitives, the runtime theme engine, the i18n runtime, the sidebar app shell,
loading skeletons and the anonymous published-content reader.

Used by the three frontends of the workspace (`Sokol-CR/fe/*`):

| Consumer | Repo | Host |
|---|---|---|
| landing | `sokol` | `sokol.jcampos.dev` |
| app | `sokol-app` | `app.sokol.jcampos.dev` |
| admin | `sokol-admin` (private) | `admin.sokol.jcampos.dev` |

## Install (TypeScript source from a git tag)

There is no build step and no registry. Consumers install a tag and compile the source with
their own Vite:

```jsonc
{ "dependencies": { "@pacific-code-labs/sokol-design-system": "github:Pacific-Code-Labs/sokol-design-system#v0.3.1" } }
```

```ts
// main.tsx: tokens first, so the app's own index.css can override values
import "@pacific-code-labs/sokol-design-system/styles";
```

```ts
// tailwind.config.ts: the preset + scan the package source
import preset from "@pacific-code-labs/sokol-design-system/tailwind-preset";
export default { presets: [preset], content: ["./index.html", "./src/**/*.{ts,tsx}", ...preset.dsContent] };
```

Local work on the DS and an app together: `pnpm link ../design-system` in the app.

## Exports

| Export | Contents |
|---|---|
| `.` | tokens contract, theme engine (`ThemeProvider`, `applyTheme`), `cn`, primitives (`Button`, `Card`, `Drawer`, `Modal`, …, the shadcn set), `Hint`, `ActivityBar`, skeleton layouts (`ShellSkeleton`, `TableSkeleton`, `ListSkeleton`, `StatGridSkeleton`, `DetailSkeleton`, `FormSkeleton`), i18n (`LanguageProvider`, `useLanguage`, `Localized`, `useLocalized`, `parseRichText`), `AppShell`, published content (`loadPublishedContent`, `cachedPublishedContent`, `signedPublicGet`) |
| `./styles` (`./tokens.css`) | `:root` + `.dark` token values, typography utilities, activity-bar and language-swap motion |
| `./tailwind-preset` | Tailwind 3 preset mapping the tokens to colors, plus `dsContent` globs |

## Release

1. `pnpm typecheck`
2. bump `version` in `package.json`, commit
3. `git tag vX.Y.Z && git push origin main vX.Y.Z`
4. bump the tag in each consumer's `package.json`

## Approved brand assets

`SOKOL_BRAND_ASSETS` exposes bundler-resolved light/dark wordmarks, the standalone symbol,
SVG favicon, Apple touch icon and Spanish/English social cards. Pass the logo fields to
`BrandLogo`; use `variant="mark"` for collapsed sidebars and assistant avatars. Keep CMS
URLs as overrides. The wordmark already contains the shield; do not add another mark beside it.

Raw masters are also exported at `@pacific-code-labs/sokol-design-system/brand/assets/*`.
For crawler metadata and manifests, copy assets to the host's public directory so their URLs
are stable. The workspace's `brand/sync-assets.mjs` refreshes public assets in all three apps
and the packaged masters here. This package has no HTML shell or favicon of its own.

## Reusable drawers

Use `Drawer` for create/edit forms, settings and detail panels. It portals to the document body, traps and restores focus, locks background scrolling and supports Escape or backdrop dismissal. Its header and optional footer remain fixed while the body scrolls; width is clamped to the viewport.

```tsx
<Drawer open={open} onClose={() => setOpen(false)} title={copy.title}
  subtitle={copy.description} closeLabel={copy.close} width={640}
  bodyClassName="p-6" footer={<Actions />}>
  <Form />
</Drawer>
```

`side` supports `right` (default) and `left`. Pass translated `title`, `subtitle` and `closeLabel`; keep task-specific forms and saving behavior in the consuming app.
