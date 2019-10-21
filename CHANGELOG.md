# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2019-10-21
### Changed
- Simplify routing-history module, it doesn't require to plug it's saga into an app

###Added
- Add basic documentation of routing-history selectors

## [1.0.2] - 2019-09-04
### Added
- Fulfill missing TBD sections in readme

### Fixed
- Description of runSagas helper

## [1.0.1] - 2019-07-23
### Fixed
- Path in routingHistory index file to reference sources from lib, not src

## [1.0.0] - 2019-06-24
### Added
- Add configuration for the `es` build.

### Changed
- Upgrade Redux saga to `1.x` version.

## [0.6.1] - 2019-05-24

## [0.6.0] - 2019-05-17
### Changed
- Separate routing-history aside of main index file to accomplish better tree shaking

## [0.5.5] - 2019-04-29
### Fixed
- optimize `lodash` and `recompose` partial imports with `babel-plugin-transform-imports`

## [0.5.4] - 2019-01-30
### Changed
- Version of changelog-it

## [0.5.3] - 2019-01-30
### Added
- Replace local changelog script with changelog-it tool

## [0.5.2] - 2019-01-30
### Fixed
- Hirearchy of generated definitions

## [0.5.1] - 2019-01-30
### Added
- Ignoring of story for transpilation

### Changed
- Changelog script support change type prefixes

## [0.5.0] - 2019-01-30
### Added
- Script for generating changelog
- Changelog

## [0.4.1] - 2019-01-30
### Fixed
- `fetchDependencies` example in README [`d96a6c2`](https://github.com/AckeeCZ/chris/commit/d96a6c2d04add1755bb2e5959cc635537d0ed210)

## [0.4.0] - 2019-01-28
### Added
- `fetchDependencies` HOC, derived from `routeDependencies` [`#6`](https://github.com/AckeeCZ/chris/pull/6)

## [0.3.1] - 2019-01-22
### Added
- Add new logo and badges, remove unused and update out of date deps [`f55d766`](https://github.com/AckeeCZ/chris/commit/f55d766f8400e3f1bd4ffc020058960bb612542f)

### Changed
- Update out of date dependency path-to-regexp [`839e869`](https://github.com/AckeeCZ/chris/commit/839e8699bc0333d82108f31420bcaa9890fbcfaa)

### Removed
- Unused `utility-types` package [`7261b85`](https://github.com/AckeeCZ/chris/commit/7261b8517da6d230064a2366a45737efc6373dca)

## [0.3.0] - 2019-01-22
### Added
- Route dependencies HOC [`#4`](https://github.com/AckeeCZ/chris/pull/4)

## [0.2.1] - 2019-01-15
### Fixed
- Api key inside travis.yml [`c11b970`](https://github.com/AckeeCZ/chris/commit/c11b9708c9480e3c595af143e376e11a91a63b79)

## [0.2.0] - 2019-01-15
### Added
- combineDependenciesHandlers utility [`#3`](https://github.com/AckeeCZ/chris/pull/3)

### Fixed
- ADD_LOCATION action [`65b2db0`](https://github.com/AckeeCZ/chris/commit/65b2db06bd2216ff7366ac4ab340c4bc88ef6916)

## 0.1.0 - 2019-01-07
### Added
- Routing stuff from frontend toolkit [`8e9452a`](https://github.com/AckeeCZ/chris/commit/8e9452adef6994e4ed708ea18f951ad4cdcb1880)
- react-router@4 routing selector [`b490bc6`](https://github.com/AckeeCZ/chris/commit/b490bc6a61f506d8a9b5148ec152d6f12fad2dfa)

### Changed
- Upgrade storybook to v4 [`802c068`](https://github.com/AckeeCZ/chris/commit/802c0688bea38add24214313a334c7bc3e740463)

[#12]: https://github.com/AckeeCZ/chris/issues/12
[#14]: https://github.com/AckeeCZ/chris/issues/14

[2.0.0]: https://github.com/AckeeCZ/chris/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/AckeeCZ/chris/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/AckeeCZ/chris/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/AckeeCZ/chris/compare/v0.6.1...v1.0.0
[0.6.1]: https://github.com/AckeeCZ/chris/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/AckeeCZ/chris/compare/v0.5.5...v0.6.0
[0.5.5]: https://github.com/AckeeCZ/chris/compare/v0.5.4...v0.5.5
[0.5.4]: https://github.com/AckeeCZ/chris/compare/v0.5.3...v0.5.4
[0.5.3]: https://github.com/AckeeCZ/chris/compare/v0.5.2...v0.5.3
[0.5.2]: https://github.com/AckeeCZ/chris/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/AckeeCZ/chris/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/AckeeCZ/chris/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/AckeeCZ/chris/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/AckeeCZ/chris/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/AckeeCZ/chris/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/AckeeCZ/chris/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/AckeeCZ/chris/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/AckeeCZ/chris/compare/v0.1.0...v0.2.0
