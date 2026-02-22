#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT_FILE="$ROOT_DIR/docs/FILE_INVENTORY.md"

cd "$ROOT_DIR"

{
  echo "# Инвентар фајлова (аутоматски генерисано)"
  echo
  echo "Овај документ се генерише командом \`scripts/generate_file_inventory.sh\` и приказује све фајлове који су праћени у Git-у."
  echo
  echo "## Резиме"
  echo "- Укупно праћених фајлова: **$(git ls-files | wc -l | tr -d ' ')**"
  echo
  echo "## Листа праћених фајлова"
  git ls-files | awk '{print "- `" $0 "`"}'
} > "$OUTPUT_FILE"

echo "Генерисано: $OUTPUT_FILE"
