---
title: TMUX, WSL, Copy & Paste with Mouse
date: 2018-01-02
slug: 20180102-env--tmux-copy-paste
---

I wanted to use `tmux` and still be able to highlight text with my mouse and have it copied to the system clipboard. `tmux` captures mouse commands though, so the copy/paste wasn’t making it out.

Turns out, using the default `WSL Bash on Windows` shell, you just hold the `shift key` along with your mouse actions.

There are some more complex options out there, but this was all I needed.

Details: https://github.com/Microsoft/WSL/issues/1586#issuecomment-272235493
