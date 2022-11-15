# fresh_mtos

A plugin for [Deno Fresh](https://fresh.deno.dev) that turns your site into a
single page application.

> Checkout [this page](https://fresh-mtos.deno.dev/) for a live demo.

## What it does?

The plugin adds [mtos](https://github.com/voorjaar/mtos) to your website.

> You still serve the static HTML files, but the user experience is the same as
> SPA with incremental requests via fetch API on the client side. And you can
> also add transition animations, progress bar, etc.

## Installation

1. [Create a fresh project](https://fresh.deno.dev/docs/getting-started/create-a-project)
   if you haven't done so.

2. Add `fresh_mtos` to your `import_map.json`

   ```diff
   {
   "imports": {
       "$fresh/": "https://deno.land/x/fresh@1.1.1/",
   +   "$fresh_mtos/": "https://deno.land/x/fresh_mtos/",
       "$std/": "https://deno.land/std@0.145.0/",
       "$gfm": "https://deno.land/x/gfm@0.1.22/mod.ts",
       "preact": "https://esm.sh/preact@10.11.0",
       "preact/": "https://esm.sh/preact@10.11.0/",
       "preact-render-to-string": "https://esm.sh/*preact-render-to-string@5.2.4",
       "@preact/signals": "https://esm.sh/*@preact/signals@1.0.3",
       "@preact/signals-core": "https://esm.sh/*@preact/signals-core@1.0.1",
       "twind": "https://esm.sh/twind@0.16.17",
       "twind/": "https://esm.sh/twind@0.16.17/"
   }
   }
   ```

3. Create a configuration file called `mtos.config.ts`.

   ```ts
   import type { Options } from "$fresh_mtos/mod.ts";

   export default {
     selfURL: import.meta.url,
   } as Options;
   ```

   You can also use the `defineConfig` API.

   ```ts
   import { defineConfig } from "$fresh_mtos/mod.ts";

   export default defineConfig({
     selfURL: import.meta.url,
   });
   ```

4. Add the plugin to your `main.ts`

   ```ts
   /// <reference no-default-lib="true" />
   /// <reference lib="dom" />
   /// <reference lib="dom.iterable" />
   /// <reference lib="dom.asynciterable" />
   /// <reference lib="deno.ns" />

   import { start } from "$fresh/server.ts";
   import manifest from "./fresh.gen.ts";

   import twindPlugin from "$fresh/plugins/twind.ts";
   import twindConfig from "./twind.config.ts";
   import mtosConfig from "./mtos.config.ts";
   import mtosPlugin from "$fresh_mtos/mod.ts";

   await start(manifest, {
     plugins: [
       twindPlugin(twindConfig),
       mtosPlugin(mtosConfig),
     ],
   });
   ```

## Options

The below options can be used to setup [mtos](https://github.com/voorjaar/mtos).

```ts
interface Options {
  /** Eval Script Element When Update, Default is false */
  eval?: boolean;

  /** Fetch Options */
  fetch?: RequestInit;

  /** Auto Scroll Behavior */
  scroll?: {
    enable?: boolean;
    left?: number;
    top?: number;
    behavior?: "auto" | "smooth";
  };

  /** Fetch Hooks */
  onMatch: (a: HTMLAnchorElement) => boolean;
  onFetchStart?(href: string): boolean | undefined | void;
  onFetchEnd?: (html: string, href: string) => string | undefined | void;
  onFetchError?: (error: Error, href: string) => void;

  /** Render Hooks */
  onBeforePageRendered?: (href: string) => void;
  onPageRendered?: (href: string) => void;

  /** Dom Patch Hooks */
  getNodeKey?: (node: Node) => any;
  onBeforeNodeAdded?: (node: Node) => Node;
  onNodeAdded?: (node: Node) => Node;
  onBeforeElUpdated?: (fromEl: HTMLElement, toEl: HTMLElement) => boolean;
  onElUpdated?: (el: HTMLElement) => void;
  onBeforeNodeDiscarded?: (node: Node) => boolean;
  onNodeDiscarded?: (node: Node) => void;
  onBeforeElChildrenUpdated?: (
    fromEl: HTMLElement,
    toEl: HTMLElement,
  ) => boolean;
}
```

## License

[MIT](https://github.com/voorjaar/fresh_mtos/blob/main/LICENSE)

Copyright (c) 2022, Raven Satir
