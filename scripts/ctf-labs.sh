#!/usr/bin/env bash
set -euo pipefail

BASE_DIR="${CTF_LABS_HOME:-$HOME/.ctf-labs}"
LABS_DIR="$BASE_DIR/labs"
CACHE_DIR="$BASE_DIR/cache"
STATE_FILE="$BASE_DIR/state.json"
INDEX_URL="https://raw.githubusercontent.com/santhossunthar/santhossunthar.github.io/main/labs.json"
ZIP_URL="https://github.com/santhossunthar/santhossunthar.github.io/archive/refs/heads/main.zip"

mkdir -p "$LABS_DIR" "$CACHE_DIR"
[ -f "$STATE_FILE" ] || printf '{\n  "installed": {}\n}\n' > "$STATE_FILE"

usage() {
  cat <<'EOF'
Usage:
  ctf-labs list
  ctf-labs pull <lab|all>
  ctf-labs up <lab>
  ctf-labs stop <lab>
  ctf-labs status <lab>
  ctf-labs destroy <lab>
  ctf-labs update
  ctf-labs version
EOF
}

need_lab() {
  if [ -z "${1:-}" ]; then
    echo "[-] Lab name is required."
    usage
    exit 1
  fi
}

list_labs() {
  python3 - "$INDEX_URL" <<'PY'
import json
import sys
import urllib.request

with urllib.request.urlopen(sys.argv[1]) as response:
    data = json.load(response)

for lab in data.get("labs", []):
    print(f"{lab['slug']}\t{lab['name']}\t{lab['provider']}\t{lab['version']}")
PY
}

pull_lab() {
  local target="$1"
  local tmp="$CACHE_DIR/source.zip"
  local extract="$CACHE_DIR/source"

  rm -rf "$extract" "$tmp"
  mkdir -p "$extract"
  curl -fsSL "$ZIP_URL" -o "$tmp"

  python3 - "$tmp" "$extract" "$target" "$LABS_DIR" "$STATE_FILE" <<'PY'
import json
import shutil
import sys
import zipfile
from pathlib import Path

zip_path, extract_dir, target, labs_dir, state_file = map(Path, sys.argv[1:6])
with zipfile.ZipFile(zip_path) as archive:
    archive.extractall(extract_dir)

root = next(extract_dir.iterdir())
index = json.loads((root / "labs.json").read_text())
state_path = Path(state_file)
state = json.loads(state_path.read_text())
installed = state.setdefault("installed", {})

selected = index["labs"] if str(target) == "all" else [lab for lab in index["labs"] if lab["slug"] == str(target)]
if not selected:
    raise SystemExit(f"[-] Lab not found: {target}")

for lab in selected:
    slug = lab["slug"]
    source = root / lab["path"]
    destination = Path(labs_dir) / slug
    current = installed.get(slug, {})
    if destination.exists() and current.get("version") == lab["version"]:
        print(f"[=] {slug} already installed at version {lab['version']}")
        continue

    if destination.exists():
        shutil.rmtree(destination)
    shutil.copytree(source, destination, ignore=shutil.ignore_patterns(".vagrant", "__pycache__", "*.pyc"))
    installed[slug] = {
        "version": lab["version"],
        "provider": lab["provider"],
        "path": str(destination),
        "entrypoint": lab["entrypoint"],
    }
    print(f"[+] Installed {slug} {lab['version']}")

state_path.write_text(json.dumps(state, indent=2) + "\n")
PY
}

lab_dir() {
  need_lab "${1:-}"
  local dir="$LABS_DIR/$1"
  if [ ! -d "$dir" ]; then
    echo "[-] Lab is not installed: $1"
    echo "    Run: ctf-labs pull $1"
    exit 1
  fi
  printf '%s\n' "$dir"
}

run_vagrant() {
  local lab="$1"
  shift
  local dir
  dir="$(lab_dir "$lab")"
  (cd "$dir" && vagrant "$@")
}

case "${1:-}" in
  list) list_labs ;;
  pull) need_lab "${2:-}"; pull_lab "$2" ;;
  up) need_lab "${2:-}"; run_vagrant "$2" up ;;
  stop) need_lab "${2:-}"; run_vagrant "$2" halt ;;
  status) need_lab "${2:-}"; run_vagrant "$2" status ;;
  destroy) need_lab "${2:-}"; run_vagrant "$2" destroy -f ;;
  update) curl -fsSL "https://raw.githubusercontent.com/santhossunthar/santhossunthar.github.io/main/scripts/ctf-labs.sh" -o "$BASE_DIR/bin/ctf-labs"; chmod +x "$BASE_DIR/bin/ctf-labs"; echo "[+] Updated ctf-labs" ;;
  version) echo "ctf-labs 1.0.0" ;;
  *) usage; exit 1 ;;
esac
