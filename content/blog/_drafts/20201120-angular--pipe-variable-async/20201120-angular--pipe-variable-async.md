---
title: Angular - Can You Use an Async Variable in a Pipe?
date: 2020-11-20
description: ""
---

When I Googled for this, I got a bunch of results that just explain the `async` pipe; but I wanted to know if I could use an async variable into the pipe:

```html
<div>Currency {{ 100 | currency:(currencySymbol$ | async)}}</div>
```

Looks like you can. See this [Stack Blitz](https://stackblitz.com/edit/pipe-variable-async?file=src/app/app.component.html)
