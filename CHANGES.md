# Changes

## 0.2.11

- Bundle the extension host (`src/extension.ts`) with webpack instead of shipping raw `tsc` output plus its full `node_modules` dependency tree
- Stop shipping `preview-src/**` raw source (already bundled into `media/*.js`, same as before)
- Packaged `.vsix` shrinks from 907 files / 1.74 MB to 19 files / 513 KB

## 0.2.10

- Fix a one-line-off error in scroll-sync, click-to-jump, and active-line highlighting: preview line markers were generated 1-indexed (`data-line`) while every consumer (VS Code's Position/Range/lineAt APIs) expects 0-indexed line numbers

## 0.2.9

- Replace tslint (archived by its maintainers in 2019) with ESLint + typescript-eslint, wired into CI
- Minor cleanup surfaced by the new linter: removed dead config reads, `var`/`let`→`const` where safe, unnecessary regex escapes, safer `hasOwnProperty` usage

## 0.2.8

- Bump cheerio from a 2018 pre-release (1.0.0-rc.2) to 1.2.0, closing the last high-severity npm audit finding in a shipped runtime dependency
- Drop the now-redundant `@types/cheerio` devDependency (cheerio ships its own types since 1.0)

## 0.2.7

- Migrate webviews from the legacy `vscode-resource:` URI scheme to `webview.asWebviewUri()` and `webview.cspSource`
- Bump minimum supported VS Code version to 1.38 (required by `asWebviewUri`/`cspSource`)

## 0.2.6

- Drop deprecated `vscode` devDependency in favor of @types/vscode and @vscode/test-electron
- Modernize build toolchain (TypeScript, webpack, ts-loader)
- Fix Windows npm script bug and a type error surfaced by the newer TypeScript

## 0.2.5

- Update version
- Fix issue #18 - Prevent duplication of preview text
- Remove redundant settings
- Fix line match index in preview

## 0.2.4

- Update version
- Clean up and reduce published package size

## 0.2.3

- Update version
- Fix publisher and icon

## 0.2.2

- Update version
- Update icon and readme

## 0.2.1

- Update package version
- Clean up and make tests run

## 0.2.0

- Upgrade package version
- Upgrade nls
- Clean up
- Remove old markdown files
- Fix auto scrolling
- Upgrade to vscode-markdown impl of preview
- Update extension
- Update general code and fix tsc errors
- Fix inline image regex error
- Disable custom css override
- Update configurations
- Upgrade packages
- Fix inline data:image/pnd;base64 images Closes #3
- Fix tslint issues
- Fix `when` state for commands. Avoid key cord issue on MacOS for terminal. (Hooky)

## 0.1.1

- Update readme for MacOS keybindings (Thomas Townsend)
- Bring command text inline with markdown (Thomas Townsend)

## 0.1.0

- Hide tests for now (Thomas Townsend)
- Update code to reflect how markdown is handled (Thomas Townsend)
- Update packages and scripts (Thomas Townsend)
- Update registered commands (Thomas Townsend)
- Add media icons (Thomas Townsend)
- Update config files (Thomas Haakon Townsend)
- Revert "Use registerTextEditorCommand" (Thomas Haakon Townsend)

  This reverts commit 45720cc060123ac96fd16fd25d898401a8dcc3c9.
- Fix preview to side command (Thomas Haakon Townsend)
- fix idMap key iteration bug (Thomas Haakon Townsend)
- dispose of events when deactivating (Thomas Haakon Townsend)
- Don't extend map just have property in IDMap (Thomas Haakon Townsend)
- Optimise HtmlDoc fetching and force toggle if active doc is html doc (Thomas Haakon Townsend)
- Implement idMap (Thomas Haakon Townsend)
- Add IDMap (Thomas Haakon Townsend)
- Add getter for html Uri (Thomas Haakon Townsend)
- Import fileUrl (Thomas Haakon Townsend)
- Install typings and node-uuid (Thomas Haakon Townsend)
- statically type registerCommand callback (Thomas Haakon Townsend)
- Fix vscode version (Thomas Haakon Townsend)
- Use registerTextEditorCommand (Thomas Haakon Townsend)
- Update packages (Thomas Haakon Townsend)
- Move activate function into a viewManager class (Thomas Haakon Townsend)
- Move document classes to separate file (Thomas Haakon Townsend)
- Add class to hold document previewer (Thomas Haakon Townsend)
- Version Bump (Thomas Townsend)
- Update README (Thomas Townsend)
- Enable previewing of Jade documents (Thomas Townsend)
- Version Bump (Thomas Haakon Townsend)
- Update README (Thomas Haakon Townsend)
- Update package manifest (Thomas Haakon Townsend)
- Run on content change rather than save (Thomas Haakon Townsend)
- Update README (Thomas Haakon Townsend)
- Working extension (Thomas Haakon Townsend)
- Initial commit (Thomas Townsend)
- Initial Commit (Thomas Haakon Townsend)
