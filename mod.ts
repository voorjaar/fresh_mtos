import type { Config, Plugin } from "./deps.ts";

/**
 * The type of plugin options.
 */
export type Options = Config & { selfURL: string };

/**
 * A wrapper function for defining mtos configuration.
 * @param options - Plugin Options
 */
export function defineConfig(options: Options) {
  return options;
}

/**
 * The mtos plugin for Deno Fresh.
 * @param options - Pluin options
 */
export function mtosPlugin(options: Options): Plugin {
  return {
    name: "mtos",
    entrypoints: {
      main:
        `data:application/javascript,import options from "${options.selfURL}"; import {setup} from "${
          new URL("./deps.ts", import.meta.url).href
        }"; export default function(state){ setup(options) }`,
    },
    render(ctx) {
      ctx.render();
      return {
        scripts: [
          {
            entrypoint: "main",
            state: options,
          },
        ],
      };
    },
  };
}

export default mtosPlugin;
