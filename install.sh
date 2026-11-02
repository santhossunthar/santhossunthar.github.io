#!/usr/bin/env bash
set -euo pipefail

BASE_DIR="${HOME}/.ctf-labs"
BIN_DIR="${BASE_DIR}/bin"
SCRIPT_URL="https://raw.githubusercontent.com/santhossunthar/santhossunthar.github.io/main/scripts/ctf-labs.sh"

mkdir -p "$BIN_DIR" "$BASE_DIR/labs" "$BASE_DIR/cache"
curl -fsSL "$SCRIPT_URL" -o "$BIN_DIR/ctf-labs"
chmod +x "$BIN_DIR/ctf-labs"

if [ ! -f "$BASE_DIR/state.json" ]; then
  printf '{\n  "installed": {}\n}\n' > "$BASE_DIR/state.json"
fi

PROFILE_FILE="${HOME}/.bashrc"
if [ -n "${ZSH_VERSION:-}" ]; then
  PROFILE_FILE="${HOME}/.zshrc"
fi

ALIAS_LINE="alias ctf-labs=\"${BIN_DIR}/ctf-labs\""
touch "$PROFILE_FILE"
if ! grep -Fq "$ALIAS_LINE" "$PROFILE_FILE"; then
  printf '\n%s\n' "$ALIAS_LINE" >> "$PROFILE_FILE"
fi

echo "[+] CTF Labs manager installed at ${BIN_DIR}/ctf-labs"
echo "[+] Restart your terminal or run: source ${PROFILE_FILE}"
echo "[+] Then run: ctf-labs list"
