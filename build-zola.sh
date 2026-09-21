#!/usr/bin/env bash
##
## Cloudflare Workers & Pages build commands (Build system Version 3):
## ./build-zola.sh npm run abridge -- --base-url https://abridge.pages.dev
## ./build-zola.sh npm run abridge -- --mode tinysearch --base-url https://abridge-tinysearch.pages.dev
## ./build-zola.sh npm run abridge -- --mode pagefind --base-url https://abridge-pagefind.pages.dev
##

set -euo pipefail
umask 077

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
THEME_TOML="$SCRIPT_DIR/theme.toml"

[[ -f "$THEME_TOML" ]] || { echo "ERROR: Abridge theme.toml was not found at $THEME_TOML" >&2; exit 1; }

ZOLA_VERSION="$(sed -nE 's/^[[:space:]]*min_version[[:space:]]*=[[:space:]]*"([^"]+)".*/\1/p' "$THEME_TOML" | head -n 1)"
[[ -n "$ZOLA_VERSION" ]] || { echo "ERROR: min_version was not found in $THEME_TOML" >&2; exit 1; }
[[ "$ZOLA_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "ERROR: invalid Zola min_version in $THEME_TOML" >&2; exit 1; }
[[ "$#" -gt 0 ]] || { echo "ERROR: no build command was supplied." >&2; exit 1; }

# Zola release checksums are read automatically from GitHub's public
# expanded-assets page for the selected release. No API token or manually
# maintained Zola checksum is required.

# Pinned Tinysearch build dependencies.
TINYSEARCH_VERSION="0.11.1"
TINYSEARCH_SHA256="d91c5470afc2d05bf72f3259ffdc178ca19f96ce30847717a1cc64b2d0a6640c"
BINARYEN_VERSION="132"
BINARYEN_NODE_SHA256="f2f49e583f5eafbe2af5da8470177d4d10aedf149752f5dd97736f54eba6f6a2"
RUSTUP_VERSION="1.29.0"
RUSTUP_SHA256="4acc9acc76d5079515b46346a485974457b5a79893cfb01112423c89aeb5aa10"
RUST_VERSION="1.98.1"
RUST_HOST="x86_64-unknown-linux-gnu"
RUST_WASM_TARGET="wasm32-unknown-unknown"

needs_tinysearch=false
for arg in "$@"; do
    if [[ "$arg" == "tinysearch" || "$arg" == "--mode=tinysearch" ]]; then
        needs_tinysearch=true
        break
    fi
done

TOOLS_DIR="$(mktemp -d)"
[[ -d "$TOOLS_DIR" && ! -L "$TOOLS_DIR" ]] || { echo "ERROR: failed to create a private tools directory." >&2; exit 1; }
trap 'rm -rf -- "$TOOLS_DIR"' EXIT

# Resolve a path and require it to be a regular, non-symlink file directly
# inside TOOLS_DIR. This is used before handing downloaded files to parsers.
require_tools_file() {
    local file="$1" resolved_tools resolved_file
    [[ -f "$file" && ! -L "$file" ]] || { echo "ERROR: expected a regular build file: $file" >&2; exit 1; }
    resolved_tools="$(realpath -e -- "$TOOLS_DIR")"
    resolved_file="$(realpath -e -- "$file")"
    [[ "$(dirname -- "$resolved_file")" == "$resolved_tools" ]] || {
        echo "ERROR: refusing to use a file outside the private tools directory: $file" >&2
        exit 1
    }
}

secure_curl() {
    curl --fail --silent --show-error --location \
        --proto '=https' --proto-redir '=https' --tlsv1.2 \
        --retry 3 --retry-delay 1 --connect-timeout 20 --max-time 180 \
        "$@"
}

# Reject absolute paths and parent-directory traversal before extracting an
# archive. Extraction also refuses archive ownership/permission metadata.
safe_extract_tar_gz() {
    local archive="$1" destination="$2" member
    require_tools_file "$archive"
    [[ -d "$destination" && ! -L "$destination" ]] || { echo "ERROR: invalid archive destination." >&2; exit 1; }
    while IFS= read -r member; do
        [[ -n "$member" ]] || continue
        if [[ "$member" == /* || "$member" == ".." || "$member" == ../* || "$member" == */../* || "$member" == */.. ]]; then
            echo "ERROR: unsafe path in downloaded archive: $member" >&2
            exit 1
        fi
    done < <(tar --list --gzip --file "$archive")
    tar --extract --gzip --file "$archive" --directory "$destination" \
        --no-same-owner --no-same-permissions
}

verify_sha256() {
    local file="$1" sha256="$2"
    require_tools_file "$file"
    [[ "$sha256" =~ ^[0-9a-fA-F]{64}$ ]] || { echo "ERROR: invalid SHA-256 value." >&2; exit 1; }
    printf '%s  %s\n' "$sha256" "$file" | sha256sum -c -
}

download_verified() {
    local url="$1" output="$2" sha256="$3" tmp
    [[ "$output" == "$TOOLS_DIR/"* && "$(dirname -- "$output")" == "$TOOLS_DIR" ]] || {
        echo "ERROR: download destination must be directly inside the private tools directory." >&2
        exit 1
    }
    tmp="$(mktemp "$TOOLS_DIR/download.XXXXXX")"
    secure_curl "$url" -o "$tmp"
    verify_sha256 "$tmp" "$sha256"
    mv -f -- "$tmp" "$output"
    require_tools_file "$output"
}

download_and_verify_zola() {
    local archive asset_name url assets_url assets_html assets_tmp expected_sha256 zola_extract_dir

    asset_name="zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
    archive="$TOOLS_DIR/$asset_name"
    url="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/${asset_name}"
    assets_url="https://github.com/getzola/zola/releases/expanded_assets/v${ZOLA_VERSION}"
    assets_html="$TOOLS_DIR/zola-release-assets.html"

    echo "Using Zola ${ZOLA_VERSION} from theme.toml"

    # GitHub publishes a SHA-256 digest alongside every release asset on the
    # public expanded-assets page. Fetch that independently of the asset itself
    # so Cloudflare Pages builds do not need a GitHub token or GitHub CLI.
    echo "Fetching published SHA-256 for Zola ${ZOLA_VERSION}"
    assets_tmp="$(mktemp "$TOOLS_DIR/zola-assets.XXXXXX")"
    secure_curl \
        -H "User-Agent: abridge-build-zola" \
        "$assets_url" -o "$assets_tmp"
    mv -f -- "$assets_tmp" "$assets_html"
    require_tools_file "$assets_html"

    expected_sha256="$(node - "$assets_html" "$asset_name" "$TOOLS_DIR" <<'NODE'
'use strict';
const fs = require('fs');
const path = require('path');

const input = process.argv[2];
const asset = process.argv[3];
const allowedDir = fs.realpathSync(process.argv[4]);
const resolved = fs.realpathSync(input);
if (path.dirname(resolved) !== allowedDir || path.basename(resolved) !== path.basename(input)) {
  console.error('ERROR: refusing to read Zola release metadata outside the private tools directory.');
  process.exit(1);
}
const stat = fs.lstatSync(resolved);
if (!stat.isFile() || stat.isSymbolicLink()) {
  console.error('ERROR: Zola release metadata is not a regular file.');
  process.exit(1);
}
const fd = fs.openSync(resolved, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
let html;
try {
  html = fs.readFileSync(fd, 'utf8');
} finally {
  fs.closeSync(fd);
}

const pos = html.indexOf(asset);
if (pos < 0) {
  console.error(`ERROR: ${asset} was not found on the Zola release assets page.`);
  process.exit(1);
}

// The digest is rendered immediately after the matching asset entry. Limit the
// search window so a checksum belonging to a later asset cannot be accepted.
const tail = html.slice(pos, pos + 4096);
const match = tail.match(/sha256:([0-9a-fA-F]{64})/);
if (!match) {
  console.error(`ERROR: No SHA-256 digest was found for ${asset}.`);
  process.exit(1);
}

process.stdout.write(match[1].toLowerCase());
NODE
)"

    [[ "$expected_sha256" =~ ^[0-9a-f]{64}$ ]] || {
        echo "ERROR: Invalid SHA-256 digest published for $asset_name" >&2
        exit 1
    }

    echo "Downloading and verifying Zola ${ZOLA_VERSION}"
    download_verified "$url" "$archive" "$expected_sha256"

    zola_extract_dir="$TOOLS_DIR/zola-release"
    mkdir -m 700 -- "$zola_extract_dir"
    safe_extract_tar_gz "$archive" "$zola_extract_dir"
    [[ -f "$zola_extract_dir/zola" && ! -L "$zola_extract_dir/zola" && -x "$zola_extract_dir/zola" ]] || {
        echo "ERROR: verified Zola archive did not contain the expected executable." >&2
        exit 1
    }
    ln -s -- "$zola_extract_dir/zola" "$TOOLS_DIR/zola"
}

install_tinysearch_tools() {
    local archive extract_dir tinysearch_bin rustup_init binaryen_archive wasm_opt_js binaryen_extract_dir
    local -a tinysearch_bins

    echo "Using Tinysearch ${TINYSEARCH_VERSION}"
    archive="$TOOLS_DIR/tinysearch.tar.gz"
    extract_dir="$TOOLS_DIR/tinysearch-release"
    mkdir -p "$extract_dir"

    download_verified \
        "https://github.com/tinysearch/tinysearch/releases/download/v${TINYSEARCH_VERSION}/tinysearch-v${TINYSEARCH_VERSION}-x86_64-unknown-linux-musl.tar.gz" \
        "$archive" "$TINYSEARCH_SHA256"
    safe_extract_tar_gz "$archive" "$extract_dir"

    mapfile -t tinysearch_bins < <(find "$extract_dir" -type f -name tinysearch -perm -u+x -print)
    [[ "${#tinysearch_bins[@]}" -eq 1 ]] || { echo "ERROR: expected exactly one tinysearch executable after extraction." >&2; exit 1; }
    tinysearch_bin="${tinysearch_bins[0]}"
    ln -s -- "$tinysearch_bin" "$TOOLS_DIR/tinysearch"

    echo "Using Rust ${RUST_VERSION} for Tinysearch WebAssembly compilation"
    rustup_init="$TOOLS_DIR/rustup-init"
    download_verified \
        "https://static.rust-lang.org/rustup/archive/${RUSTUP_VERSION}/${RUST_HOST}/rustup-init" \
        "$rustup_init" "$RUSTUP_SHA256"
    chmod +x "$rustup_init"

    export RUSTUP_HOME="$TOOLS_DIR/rustup"
    export CARGO_HOME="$TOOLS_DIR/cargo"
    "$rustup_init" -y --no-modify-path --profile minimal --default-host "$RUST_HOST" --default-toolchain "$RUST_VERSION"
    "$CARGO_HOME/bin/rustup" target add "$RUST_WASM_TARGET" --toolchain "$RUST_VERSION"

    echo "Using Binaryen ${BINARYEN_VERSION} wasm-opt"
    binaryen_archive="$TOOLS_DIR/binaryen-node.tar.gz"
    download_verified \
        "https://github.com/WebAssembly/binaryen/releases/download/version_${BINARYEN_VERSION}/binaryen-version_${BINARYEN_VERSION}-node.tar.gz" \
        "$binaryen_archive" "$BINARYEN_NODE_SHA256"
    binaryen_extract_dir="$TOOLS_DIR/binaryen-release"
    mkdir -m 700 -- "$binaryen_extract_dir"
    safe_extract_tar_gz "$binaryen_archive" "$binaryen_extract_dir"

    wasm_opt_js="$binaryen_extract_dir/binaryen-version_${BINARYEN_VERSION}/wasm-opt.js"
    [[ -f "$wasm_opt_js" ]] || { echo "ERROR: Binaryen wasm-opt.js was not found after extraction." >&2; exit 1; }

    cat > "$TOOLS_DIR/wasm-opt" <<WRAPPER
#!/usr/bin/env bash
exec node "$wasm_opt_js" "\$@"
WRAPPER
    chmod +x "$TOOLS_DIR/wasm-opt"

    export PATH="$TOOLS_DIR:$CARGO_HOME/bin:$PATH"
}

download_and_verify_zola

if [[ "$needs_tinysearch" == true ]]; then
    install_tinysearch_tools
else
    export PATH="$TOOLS_DIR:$PATH"
fi

zola --version
if [[ "$needs_tinysearch" == true ]]; then
    tinysearch --version
fi

exec "$@"
