#!/usr/bin/env bash
set -euo pipefail

ZOLA_VERSION="$(
    node -e "
        const fs = require('fs');
        const TOML = require('fast-toml');
        const theme = TOML.parse(fs.readFileSync('theme.toml', 'utf8'));
        process.stdout.write(theme.min_version);
    "
)"

echo "Using Zola ${ZOLA_VERSION} from theme.toml"

ZOLA_DIR="$(mktemp -d)"
trap 'rm -rf "$ZOLA_DIR"' EXIT

curl -fsSL \
    "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz" \
    | tar -xz -C "$ZOLA_DIR"

export PATH="$ZOLA_DIR:$PATH"

zola --version

exec "$@"
