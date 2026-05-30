# CI dependency caching

This note documents the expected dependency caching strategy for XConfess CI and local contributors.

## Current workflow reference

The active GitHub Actions workflow is [.github/workflows/ci.yml](../.github/workflows/ci.yml). It uses `actions/setup-node` with npm caching for Node workspaces and `swatinem/rust-cache` for the Soroban contract workspace.

## npm install and cache behavior

- CI should install JavaScript dependencies with `npm ci` from the repository root so backend and frontend workspaces are resolved from the checked-in lockfile.
- The npm cache should be keyed from `package-lock.json`, not from generated `node_modules` directories.
- `node_modules` should not be committed and should not be treated as a durable cache artifact.
- Local contributors should run `npm ci` when they need a clean install that exactly matches CI, and `npm install` only when intentionally updating dependencies.

## Cargo registry and target cache behavior

- Contract CI should run from `xconfess-contracts` and cache Cargo registry, git index, and `target` build output.
- The registry and git caches reduce dependency download time; the `target` cache reduces repeated `cargo fmt`, `cargo clippy`, `cargo test`, and wasm build time.
- The cache must not replace correctness checks. CI should still execute formatting, clippy, and tests on every pull request.
- Local contributors can safely keep `~/.cargo/registry`, `~/.cargo/git`, and `xconfess-contracts/target` between runs for faster feedback.

## When to clear caches

Clear npm cache or reinstall dependencies when:

- `package-lock.json` changes unexpectedly or install output looks inconsistent.
- CI reports dependency resolution errors after a package or Node version change.
- A local workspace behaves differently from CI after switching branches.

Clear Cargo caches or remove `xconfess-contracts/target` when:

- Rust toolchain, target, or Soroban SDK versions change.
- Clippy or build errors continue after switching branches.
- A cached build artifact appears to hide a reproducible failure.

Prefer clearing only the affected cache first. Full cache invalidation should be a last resort because it increases CI runtime for everyone.
