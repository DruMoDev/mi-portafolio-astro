#!/usr/bin/env bash
# Prepara un clon o worktree: instala dependencias (el "prepare" de npm instala los hooks de Husky).
set -euo pipefail
cd "$(dirname "$0")/.."
npm ci --no-audit --no-fund
