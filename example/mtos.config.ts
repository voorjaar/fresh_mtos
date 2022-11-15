import { defineConfig } from "$fresh_mtos/mod.ts";

function updateProgress(n: number) {
  const bar = document.querySelector<HTMLElement>(".progress-bar");
  if (bar) bar.style.width = n + "%";
}

self.addEventListener("load", () => updateProgress(100));

export default defineConfig({
  selfURL: import.meta.url,
  onBeforeElUpdated(_, toEl) {
    if (
      toEl.tagName === "MAIN"
    ) {
      toEl.classList.add("animated", "fadeIn");
    }
    return true;
  },
  onElUpdated(el) {
    if (
      el.tagName === "MAIN"
    ) {
      setTimeout(() => {
        el.classList.remove("animated", "fadeIn");
      }, 250);
    }
  },
  onFetchStart() {
    updateProgress(0);
  },
  onFetchEnd() {
    updateProgress(30);
  },
  onPageRendered() {
    setTimeout(() => {
      updateProgress(100);
    }, 150);
  },
});
