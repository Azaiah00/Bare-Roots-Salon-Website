#!/usr/bin/env bash
# Bare Roots — Asset Downloader (Mac / Linux)
# Usage:  bash download-assets.sh
# Downloads every image in assets/assets-manifest.json into the assets/ folder.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASSETS="$ROOT/assets"
MANIFEST="$ASSETS/assets-manifest.json"
mkdir -p "$ASSETS"

echo "Bare Roots asset downloader"
ok=0; fail=0

# Parse JSON with python3 if available, else fall back to grep/sed
if command -v python3 >/dev/null 2>&1; then
  python3 - "$MANIFEST" <<'PY' | while IFS=$'\t' read -r name url; do
import json,sys
d=json.load(open(sys.argv[1]))
for k,v in d.items():
    if k=="_comment": continue
    print(f"{k}\t{v}")
PY
    if curl -fsSL "$url" -o "$ASSETS/$name"; then echo "  OK   $name"; else echo "  FAIL $name"; fi
  done
else
  grep -oE '"[^"]+"[[:space:]]*:[[:space:]]*"[^"]+"' "$MANIFEST" | grep -v '_comment' | while IFS= read -r line; do
    name=$(echo "$line" | sed -E 's/^"([^"]+)".*/\1/')
    url=$(echo "$line" | sed -E 's/.*:[[:space:]]*"([^"]+)"$/\1/')
    if curl -fsSL "$url" -o "$ASSETS/$name"; then echo "  OK   $name"; else echo "  FAIL $name"; fi
  done
fi

echo ""
echo "Done. Open index.html in your browser to view the site."
