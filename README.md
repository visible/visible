[![ci](https://github.com/visible/visible/workflows/CI/badge.svg)](https://github.com/visible/visible/actions)
[![codecov](https://codecov.io/gh/visible/visible/branch/develop/graph/badge.svg)](https://codecov.io/gh/visible/visible)
[![Maintainability](https://api.codeclimate.com/v1/badges/d884597fcb0463f492c1/maintainability)](https://codeclimate.com/github/visible/visible/maintainability)
![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/visiblehq/web)

# Visible

Visible is a tool-chain that helps developers to build better websites from the perspective of accessibility.

![Visible ― Web Accessibility, Validate & Fix](https://i.imgur.com/biUgesU.png)

> 🚧 This project is still working in progress and is not guaranteed to work properly.

**[Try out the web version!](https://visi.dev)**

## Features

- **🔎 Validate** ― You can diagnose your website just by typing the URL.
- **🤖 Suggestion** ― Visible is not just a linter, but also provide you a patches to fix the problem by partly using AI platforms.
- **🤓 Hackable** ― Visible supports [plugins](https://github.com/visible/visible/blob/develop/docs/plugin.md) so you can create your own rules or algorithms of suggestion.

## Installation (CLI)

```
npm i @visi/core @visi/cli
```

### Requirements
- Node.js (LTS)
- npm / yarn

By default, `@visi/cli` does not install any rules or drivers. So if you want to use `@visi/plugin-puppeteer` and `@visi/plugin-wcag`, you'd also need:

```
npm i @visi/plugin-puppeteer @visi/plugin-wcag
```

Then, create a `.visiblerc` file. See documentation of [config](https://github.com/visible/visible/blob/develop/docs/config.md) for the detail.

```json
{
  "plugins": [
    "@visi/plugin-puppeteer",
    "@visi/plugin-wcag",
  ],
  "driver": "@visi/plugin-puppeteer",
  "rules": ["@visi/plugin-wcag"],
}
```

Finally, you can run `visible` command. You can use `--help` to show helps.

```sh
visible --url https://example.com
```

## Contribution

See [CONTRIBUTING.md](https://github.com/visible/visible/blob/develop/CONTRIBUTING.md)

## Code of Conduct

See [CODE_OF_CONDUCT.md](https://github.com/visible/visible/blob/develop/CODE_OF_CONDUCT.md)

## License

See [LICENSE](https://github.com/visible/visible/blob/develop/LICENSE)
