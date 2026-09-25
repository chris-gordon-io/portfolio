#!/usr/bin/env bash
# Point src/styles/tokens.css at the latest pushed Design-System commit.
#
#   npm run ds:bump             update tokens.css (review the diff yourself)
#   npm run ds:bump -- --commit also commit the change
#
# Never pushes. DS_REPO overrides the Design-System checkout location.
set -euo pipefail

cd "$(dirname "$0")/.."
DS_REPO="${DS_REPO:-../ChrisGordon-DS}"
TOKENS="src/styles/tokens.css"
FILES=(colors typography spacing radius buttons)

fail() { echo "✗ $1" >&2; exit 1; }

[ -d "$DS_REPO/.git" ] || fail "Design-System repo not found at $DS_REPO (set DS_REPO)"

# The hash must exist on GitHub, or the CDN can't serve it.
git -C "$DS_REPO" fetch --quiet origin main
if [ -n "$(git -C "$DS_REPO" status --porcelain css)" ]; then
  fail "Design-System has uncommitted changes in css/ — commit and push them first"
fi
HEAD_HASH="$(git -C "$DS_REPO" rev-parse HEAD)"
if ! git -C "$DS_REPO" merge-base --is-ancestor "$HEAD_HASH" origin/main; then
  fail "Design-System HEAD ($HEAD_HASH) isn't pushed — run 'git push' there first"
fi

CURRENT="$(grep -oE 'Design-System@[0-9a-f]{40}' "$TOKENS" | head -1 | cut -d@ -f2 || true)"
if [ "$CURRENT" = "$HEAD_HASH" ]; then
  echo "✓ tokens.css already points at the latest Design-System commit (${HEAD_HASH:0:7})"
  exit 0
fi

echo "Checking the CDN serves ${HEAD_HASH:0:7}…"
for f in "${FILES[@]}"; do
  code="$(curl -s -o /dev/null -w '%{http_code}' "https://cdn.jsdelivr.net/gh/chris-gordon-io/Design-System@${HEAD_HASH}/css/${f}.css")"
  [ "$code" = "200" ] || fail "CDN returned $code for ${f}.css at ${HEAD_HASH:0:7} — wait a minute and retry"
done

perl -pi -e "s/Design-System\@(?:[0-9a-f]{40}|main)/Design-System\@${HEAD_HASH}/g" "$TOKENS"
echo "✓ tokens.css: ${CURRENT:0:7} → ${HEAD_HASH:0:7}"
git --no-pager diff --stat -- "$TOKENS"

if [ "${1:-}" = "--commit" ]; then
  SUBJECT="$(git -C "$DS_REPO" log -1 --format=%s)"
  git add "$TOKENS"
  git commit -q -m "Bump Design System to ${HEAD_HASH:0:7}" \
    -m "Latest DS commit: ${SUBJECT}" \
    -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
  echo "✓ committed (not pushed)"
else
  echo "Next: review, commit, and push Portfolio."
fi
