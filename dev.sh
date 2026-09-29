#!/bin/sh
# Lanza el dev server con Node local (~/.local/node) en el PATH.
export PATH="/Users/jorgecigarroa/.local/node/bin:$PATH"
cd /Users/jorgecigarroa/Claude/corma-app
exec node node_modules/next/dist/bin/next dev -p "${1:-3210}"
