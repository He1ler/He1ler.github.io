# Dev log — He1ler.github.io

Retro log of genuine friction only: slipped bugs, misunderstandings, tasks that ran far too long.
Entry format: date · task · category (`bug` / `misunderstanding` / `took-too-long`) · what happened ·
likely root cause · what a better prompt/brief/process would have looked like.

## 2026-09-29 · Replace Tailwind Play CDN with precompiled CSS · took-too-long
- What happened: the brief said to wait for `brew install tailwindcss` ("a few minutes"); on this Intel
  Mac (macOS 26) Homebrew had no bottles for the node dependency chain and was compiling LLVM from
  source (hours). The install was cancelled mid-task and the plan switched from v4 to the official
  v3.4.17 standalone binary. The brief's "swap the CDN script for a `<link>` in place" would also have
  shipped regressions (Swiper slides uncentred, arrows blue, glow layers at full opacity) — caught by
  the parity harness before handoff: the CDN injected its `<style>` at the end of `<head>`.
- Root cause: tool-install cost and the CDN's runtime injection point were assumed, not checked.
- Better brief/process: check `brew info <formula>` / `ps` for a from-source build before waiting on
  Homebrew, prefer the official release binary; pin the Tailwind major to what the CDN actually serves
  (`curl -sI cdn.tailwindcss.com` redirects to the version); require the parity check to include
  element-level layout, not only the class list.
