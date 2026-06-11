#!/usr/bin/env bash
# Single verification gate. Agents must run this (and quote output)
# before claiming any task done.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== Install ==="
if [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
elif [ -f package-lock.json ]; then
  npm ci
else
  echo "WARNING: no lockfile committed yet (phase 0.2 pending) — falling back to npm install"
  npm install
fi

echo "=== Typecheck ==="
npx tsc --noEmit

echo "=== Lint ==="
npm run eslint

echo "=== Unit tests ==="
npm test

if [ -d e2e ] || [ -f playwright.config.ts ]; then
  echo "=== E2E (Playwright) ==="
  npx playwright test
fi

echo "=== VERIFY OK ==="
