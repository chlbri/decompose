# Changelog

All notable changes to this project will be documented in this file.

<br/>

<details>
<summary>

## **[2.1.0] - 26/03/2026** => _14:19_

</summary>

- Refactor: migrate bundler from `rollup` to `rolldown` (faster Rust-based
  bundler); add `rolldown.config.ts`, remove `rollup.config.mjs`
- Refactor: replace `eslint` + `prettier` with `oxlint` + `oxfmt`
  (Rust-based linter and formatter); add `oxlint.config.ts` and
  `oxfmt.config.ts`; remove `eslint.config.mjs` and `.prettierrc.yml`
- Add: `Prev` mapped type in `types.types.ts` — bounded recursion depth
  (max 10) for `__Decompose`, `_DecomposeTupleElement` and
  `_DecomposeTupleRec`, preventing infinite type instantiation
- Fix: `expectTypeOf` call syntax in `decompose.test-d.ts` — added missing
  call parentheses `()`
- Update: TypeScript from `5.x` to `6.x`
- Update: move `@bemedev/build-tests` from `dependencies` to
  `devDependencies`
- Update: add `@bemedev/rolldown-config`, `@bemedev/sequence`, `rxjs`,
  `tsx`, `tsc-alias`, `@vitest/ui`, `@types/clone-deep` as dev
  dependencies; remove `immer`, legacy rollup plugins and eslint packages
- Update: enhance CI script with elapsed-time reporting; reorganize and
  extend npm scripts (`lint:watch`, `build:watch`, `test:type`,
  `test:no-type`, `test:ui`, `rm:lib`, `fmt`)
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[2.0.3] - 02/03/2026** => _00:46_

</summary>

- Fix: `assignByKey` in `contexts/assign.ts` — clamp array index to
  `out.length` when it exceeds the array length, preventing sparse arrays
- Add: new test cases in `contexts/assign.test.ts` — assign to
  out-of-bounds (+number) index (`[2]`) and assign a property on the
  empty-slot element at index `[2]`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[2.0.2] - 28/02/2026** => _19:05_

</summary>

- Add: type `GetParents` dans `types.types.ts` — extrait les chemins
  parents d'un chemin séparé par un séparateur
- Add: type `ReduceParentsKeys` dans `types.types.ts` — propage `undefined`
  depuis les clés parentes optionnelles
- Refactor: type `Decompose` — renommage interne `_Decompose` →
  `__Decompose`, nouveau wrapper `_Decompose` + application de
  `ReduceParentsKeys` pour rendre les clés enfants correctement
  optionnelles quand le parent est optionnel
- Add: type `GetByKeyDefined_F` et méthode `getByKey.defined` dans
  `contexts/get.ts` — retourne la valeur sans `undefined` (non-nullable)
- Fix: type `Flat` dans `flatByKey.ts` — corrigé de `Flat_F` à `_Flat_F`
- Add: nouveaux fichiers de tests type-level `contexts/get.test-d.ts` et
  `types.types.test-d.ts`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[2.0.1] - 25/02/2026** => _23:53_

</summary>

- Fix: correct `DEFAULT_OPTIONS` import from type-only to value import in
  `getByKey`
- Fix: use `DEFAULT_OPTIONS` as base when merging options in
  `getByKey.options`
- Fix: `decompose.low` and `decompose.strict` now reference the public
  `decompose` function instead of the private `_decompose`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[2.0.0] - 25/02/2026** => _10:00_

</summary>

- Break: refactor decompose function to better handle nested arrays and
  tuples
- Feature: add support for optional properties in `Decompose` type
- Feature: enhance tuple decomposition logic with improved type safety
- Add comprehensive array test cases (`decompose.array.test.ts`)
- Add complex type tests (`decompose.complex.test-d.ts`)
- Update CI/CD: upgrade npm-publish action to version 4
- Update CI/CD: add OIDC permissions to publish-NPM workflow
- Update CI/CD: restrict publish-NPM workflow to main branch only
- Update dependencies
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[1.5.0] - 15/12/2025** => _14:30_

</summary>

- Refactor: improve type definitions and helper functions
- Enhance Decompose Type: add Partial support and refine key exclusion
- Enhance Type Definitions for FlatByKey
- Add comprehensive tests for decomposeKeys, decomposeSV, flatByKey, and
  recompose functions
- Rename flat.ts to flatByKey.ts for better clarity
- Add new helper functions for type manipulation
- Update dependencies
- <u>Test coverage **_100%_**</u>

</details>

<br/>

### [1.4.0] - 2025-11-23 14:20

- Add decomposeKeys
- Add decomposeSV
- Add sortMap
- Upgrade dependencies

<br/>

### [1.3.1] - 2025-08-13 14:20

- Fix type FlatByKey
- Coverage **_100%_**

<br/>

### [1.3.0] - 2025-08-09 15:30

- BRAKING IMPROVEMENTS
- Upgrade dependencies
- Fix/Improve flatByKey
- Export flatByKey

<br/>

### [1.2.0] - 2025-08-09 00:30

- BRAKING IMPROVEMENTS
- Upgrade dependencies
- Fix/Improve Decompose type

<br/>

### [1.1.4] - 2025-08-05 15:40

- Fix recompose function for empty object

<br/>

### [1.1.3] - 2025-08-05 08:25

- Fix decompose function typings
- Upgrade dependencies : @bemedev/types

<br/>

### [1.1.2] - 2025-08-05 08:00

- Fix Decompose typings
- Decompose type can perform simple array

<br/>

### [1.1.&] - 2025-08-05 07:35

- Fix Decompose typings

<br/>

### [1.1.0] - 2025-08-04 19:00

- Add mapping to array

<br/>

### [1.0.0] - 2025-07-07 21:32

- Upgrade dependencies : @bemedev/types
- Fix types errors
- Improve typings
- Improve decompose function
- Change decompose options
- Change decompose default behavior, now each key starts with a dot
- Add flat function
- test(coverage): 100%
- Ready for production
- For recompose, all remain the same. Values are not changed, only the keys
  are changed to start with a dot.

<br/>

### [0.9.0] - 2025-07-07 21:32

- Upgrade dependencies : @bemedev/types
- Fix types errors
- test(coverage): 100%

<br/>

### [0.8.1] - 2025-03-15 19:30

- Fix decompose array

<br/>

## [0.8.0] - 2024-05-18 19:30

### Added

- Initial public release
- Core decompose functionality
- recompose function
- TypeScript type definitions
- Unit test coverage
- Documentation

### Changed

- N/A

### Fixed

- N/A

## License

MIT

## Auteur

chlbri (bri_lvi@icloud.com)

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

<br/>

## Liens

- [Documentation](https://github.com/chlbri/types)
