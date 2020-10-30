# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.1](https://github.com/visible/visible/compare/v0.2.1...v0.3.1) (2020-10-30)


### Bug Fixes

* Add event handler for worker exception ([201f32f](https://github.com/visible/visible/commit/201f32f0a65f6443f8a62944c97a6f97c79bfb2f))
* Duplicate redis client on worker and queue ([c9aed65](https://github.com/visible/visible/commit/c9aed658d77c4e384be53f51f268e299b97269f7))
* Fix files paths ([572af46](https://github.com/visible/visible/commit/572af4602302ca95074dbc4ec654bed86e29ea1c))
* Make subscribeToMore a ref ([2cca52a](https://github.com/visible/visible/commit/2cca52aac55e37f451f0db2c534fb5830f00069c))
* Release visible instance in finally [#250](https://github.com/visible/visible/issues/250) ([aedf6b9](https://github.com/visible/visible/commit/aedf6b9cf4b52012b1ffabb557c5bfc27ccbb385))
* Remove stats API temporarily ([2442c47](https://github.com/visible/visible/commit/2442c4760719a68bdc7291319de7be49f6e29f4f))
* Revert "Merge pull request [#249](https://github.com/visible/visible/issues/249) from visible/hotfix/remove-stats" ([9dfb3af](https://github.com/visible/visible/commit/9dfb3af7be43a42a8b30d093f2a6d4597b2a7923))


### Features

* Add Cloud Storage Impl ([0a577e4](https://github.com/visible/visible/commit/0a577e4841a97dbc082312b362e4c13c7fe580e9))
* Add format option ([8a092e3](https://github.com/visible/visible/commit/8a092e366aefbe1c6be458b6cdce242c1e4e2328))
* Add queue count ([7e5b782](https://github.com/visible/visible/commit/7e5b782ae100b3981fcfaeb1a1b2c82de8e4d390))
* Add reference to W3C website ([072952c](https://github.com/visible/visible/commit/072952c5ce5b8a05d2381a1b49ffe1549b9e189b))





# [0.3.0](https://github.com/visible/visible/compare/v0.2.1...v0.3.0) (2020-10-17)


### Bug Fixes

* Add event handler for worker exception ([201f32f](https://github.com/visible/visible/commit/201f32f0a65f6443f8a62944c97a6f97c79bfb2f))
* Duplicate redis client on worker and queue ([c9aed65](https://github.com/visible/visible/commit/c9aed658d77c4e384be53f51f268e299b97269f7))
* Make subscribeToMore a ref ([2cca52a](https://github.com/visible/visible/commit/2cca52aac55e37f451f0db2c534fb5830f00069c))


### Features

* Add Cloud Storage Impl ([0a577e4](https://github.com/visible/visible/commit/0a577e4841a97dbc082312b362e4c13c7fe580e9))
* Add format option ([8a092e3](https://github.com/visible/visible/commit/8a092e366aefbe1c6be458b6cdce242c1e4e2328))
* Add queue count ([7e5b782](https://github.com/visible/visible/commit/7e5b782ae100b3981fcfaeb1a1b2c82de8e4d390))
* Add reference to W3C website ([072952c](https://github.com/visible/visible/commit/072952c5ce5b8a05d2381a1b49ffe1549b9e189b))





## [0.2.1](https://github.com/visible/visible/compare/v0.2.0...v0.2.1) (2020-09-26)


### Bug Fixes

* Fix report's streaming issues ([51459bb](https://github.com/visible/visible/commit/51459bb9c7389b0b8ef01ffb9a8143e34eb1d409))
* Revert changes on DiagnosisGateway ([eb641d3](https://github.com/visible/visible/commit/eb641d39fdcaf6a3275fb104efa58125dbe357f3))
* Use mergeMap instead of switchMap ([8a7bda8](https://github.com/visible/visible/commit/8a7bda8707bf728c2914a1500bce399b978bd2f2))
* **web-client:** Sort reports by outcome ([5c4f69a](https://github.com/visible/visible/commit/5c4f69adbe949a2569fb05ca5723dac099d55939))





# [0.2.0](https://github.com/visible/visible/compare/v0.1.0...v0.2.0) (2020-09-20)


### Bug Fixes

* Add mockFs.restore() ([5def2e4](https://github.com/visible/visible/commit/5def2e4b519f15b49fe61c60eb3521db5678e5cf))
* Add URL validation in Use-case ([3960d23](https://github.com/visible/visible/commit/3960d2376d9ca5ab5155947dec1e50ba7c335ffb))
* bubble errors from runRules ([78a731c](https://github.com/visible/visible/commit/78a731c2b47b2fa4f87faf0434acb77aa7330687))
* Change URL to text ([af7960b](https://github.com/visible/visible/commit/af7960b8907409fb0d4272322f03f2f46d94603e))
* Downgrade rxjs corresponding to rc5 ([5c473ea](https://github.com/visible/visible/commit/5c473ea071bf36fb5ac05d2b46c8888e7fbb665a))
* Fix ESLint errors ([58e0136](https://github.com/visible/visible/commit/58e01365cc9306445b1567750ae6f234c66ae61a))
* Handle error on TranslatorImpl ([1bc6b20](https://github.com/visible/visible/commit/1bc6b201388c153a3a33cbfe9a9278645f7b5d11))
* Improve diff hunk view ([8660149](https://github.com/visible/visible/commit/8660149e1a3325c863fe0bafb36f1f48bd299ec0))
* mkdir -p screenshotDir ([e026c86](https://github.com/visible/visible/commit/e026c86771f92b8dd9562a3bfadd3e56fa72af7e))
* Remove Plugin / Config implementation from the core ([61d2d10](https://github.com/visible/visible/commit/61d2d10a3e5fa6a182f0495666e620d56209982b))
* Use redis config ([52b7539](https://github.com/visible/visible/commit/52b7539eef53fcbaf2555477707adf9f00591a23))


### Features

* Add Diff view to the web client ([a8995d4](https://github.com/visible/visible/commit/a8995d4ecc06d91857ea687c5c94e6aa9242228e))
* Add difficulty field ([4632098](https://github.com/visible/visible/commit/463209854545546e579c1e2b1702fb93a2aa5a29))
* Add more WCAG rules ([cf531e8](https://github.com/visible/visible/commit/cf531e866f88dace49d921785f032c302705c4d8))
* Introduce Tailwind CSS ([4cd775c](https://github.com/visible/visible/commit/4cd775ca65407aa40e655808eca2cd79434417a5))





# [0.1.0](https://github.com/visible/visible/compare/v0.0.1...v0.1.0) (2020-08-04)


### Bug Fixes

* Clean dependencies up ([d292f9f](https://github.com/visible/visible/commit/d292f9f5aa01ef52385dcd9d963128afb11bcc01))
* Remove [@graphql-tools](https://github.com/graphql-tools) ([7aee5b2](https://github.com/visible/visible/commit/7aee5b2be55029ce55762c1444d1864d09e2ab5e))


### Features

* Use bullmq ([692ec2a](https://github.com/visible/visible/commit/692ec2a372ba3ac32294b20ca8bc4c4f701de3b7))
* Use immer ([9d5e096](https://github.com/visible/visible/commit/9d5e09655ccc11f65ff7f5ac49b982aac487e728))





## [0.0.1](https://github.com/visible/visible/compare/v0.0.1-rc5...v0.0.1) (2020-07-06)

**Note:** Version bump only for package @visi/web-server





## [0.0.1-rc5](https://github.com/visible/visible/compare/v0.0.1-rc4...v0.0.1-rc5) (2020-06-13)


### Bug Fixes

* Run prettier ([c841a2e](https://github.com/visible/visible/commit/c841a2ea7ebde2eab732dfd1cedb4ae0764b119e))


### Features

* Add node location to the report ([4cbc6ba](https://github.com/visible/visible/commit/4cbc6ba6f2c2e133085ee20a6f86df8fc2d1b835))
* Implement job queue ([f4cb684](https://github.com/visible/visible/commit/f4cb684c3a0a74394e4887461f0dd938c1256d39))
* Implement progress for front-end ([de5c14e](https://github.com/visible/visible/commit/de5c14e66cd72a7cce911ec6746af561c0a95fea))
* Separate GraphQL schemas ([bc10c6d](https://github.com/visible/visible/commit/bc10c6d32332ce0a13a1920e6f0eb9c1e8525e5b))
* Use environment variables for endpoints ([2ebb4ee](https://github.com/visible/visible/commit/2ebb4ee4369e4b07d384bc09e130740403425c5b))





## [0.0.1-rc4](https://github.com/visible/visible/compare/v0.0.1-rc3...v0.0.1-rc4) (2020-04-11)


### Features

* Add docker files ([#76](https://github.com/visible/visible/issues/76)) ([61b5849](https://github.com/visible/visible/commit/61b5849072b08265a3f4e91886ba5d34012e4e71))
* Use Next.js ([#58](https://github.com/visible/visible/issues/58)) ([8f29a6e](https://github.com/visible/visible/commit/8f29a6eaab06c3f3f25e6a28fcb6f89f30f9ca1f))





## [0.0.1-rc3](https://github.com/visible/visible/compare/v0.0.1-rc2...v0.0.1-rc3) (2020-02-23)

**Note:** Version bump only for package @visi/web-server





## [0.0.1-rc2](https://github.com/visible/visible/compare/v0.0.1-rc1...v0.0.1-rc2) (2020-02-23)

**Note:** Version bump only for package @visi/web-server





## 0.0.1-rc1 (2020-02-23)

**Note:** Version bump only for package @visi/web-server
