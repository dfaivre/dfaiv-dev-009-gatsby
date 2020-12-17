---
title: git - Rewrite authors
date: 2018-03-17
description: ""
slug: 20180317-git--rewrite-author
tags: ["git", "devops"]
---

On my computer, my default git user is for my work account. I was working on a personal project, pushed it to GitHub, and didn't realize until after that I had been commiting with my work username/email. Some Googling [turned up](https://stackoverflow.com/questions/750172/how-to-change-the-author-and-committer-name-and-e-mail-of-multiple-commits-in-gi) that you can rewrite history from one email/username to another:

```bash
git filter-branch --env-filter '
OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
``` 

I got a nasty warning, but after a few seconds it proceeded with the rewrite and the world didn't seem to end. I guess I could have tried the [suggested alternative](https://github.com/newren/git-filter-repo/), but I only had a few commits and the rewrite seemed mostly innocuous.

```
WARNING: git-filter-branch has a glut of gotchas generating mangled history
         rewrites.  Hit Ctrl-C before proceeding to abort, then use an
         alternative filtering tool such as 'git filter-repo'
         (https://github.com/newren/git-filter-repo/) instead.  See the
         filter-branch manual page for more details; to squelch this warning,
         set FILTER_BRANCH_SQUELCH_WARNING=1.
```

A `git push --force` and my repo commits were updated with my personal email.
