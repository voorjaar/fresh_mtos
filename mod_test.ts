import { defineConfig } from "./mod.ts";
import { assertEquals } from "$std/testing/asserts.ts";

Deno.test("test define config", (): void => {
  const onMatch = (a: HTMLAnchorElement) => {
    return a.hostname !== "/";
  };

  assertEquals(
    defineConfig({
      eval: true,
      fetch: {
        headers: {
          Cookie: "xxx=yyy",
        },
        credentials: "same-origin",
      },
      scroll: {
        enable: true,
        behavior: "smooth",
        top: 0,
        left: 0,
      },
      selfURL: "./",
      onMatch,
    }),
    {
      eval: true,
      selfURL: "./",
      scroll: {
        enable: true,
        behavior: "smooth",
        top: 0,
        left: 0,
      },
      fetch: {
        headers: {
          Cookie: "xxx=yyy",
        },
        credentials: "same-origin",
      },
      onMatch,
    },
  );
});
