# AGENTS.md

This file explains the streamlined GitHub workflow for this site.

## When The User Asks To Push

Use this workflow when the user asks to commit, push, publish, or send changes to GitHub.

1. Check the working tree with `git status -sb`.
2. Review the diff for changed text files with `git diff`.
3. Make sure the pending files match the user's request.
4. Run the lightweight site check:

```bash
node scripts/validate-site.js
```

5. Stage only the intended files.
6. Commit with a short message that describes the user-facing change.
7. Push the current branch to `origin`.
8. Report the commit hash and branch back to the user.

## Repository Notes

- Main GitHub remote: `https://github.com/ethanranalli/ethansbirdblog.git`
- Default branch: `main`
- This project normally pushes directly to `main` unless the user asks for a branch or pull request.
- Do not stage unrelated local changes.
- If the working tree has unexpected files, ask before including them.

## Commit Message Style

Use short, plain commit messages:

- `Add Prothonotary Warbler post`
- `Update Prothonotary Warbler location`
- `Organize site files`

## Final Response

After a successful push, include:

- commit hash
- branch name
- a short validation note
