[![ci](https://github.com/visible/visible/workflows/CI/badge.svg)](https://github.com/visible/visible/actions)
[![codecov](https://codecov.io/gh/visible/visible/branch/develop/graph/badge.svg)](https://codecov.io/gh/visible/visible)
[![Maintainability](https://api.codeclimate.com/v1/badges/d884597fcb0463f492c1/maintainability)](https://codeclimate.com/github/visible/visible/maintainability)
[![NPM](https://img.shields.io/npm/v/@visi/core)](https://npm.im/@visi/core)

> 🚧 This project is still working in progress and is not guaranteed to work properly.

# Visible

Visible is a framework that helps developers to build better websites from the perspective of accessibility.

![Visible ― Web Accessibility, Validate & Fix](https://i.imgur.com/biUgesU.png)

**[Try out the web version!](https://visi.dev)**

## Features

[ESLint]: http://eslint.org/
[CDP]: https://chromedevtools.github.io/devtools-protocol/
[plugins]: https://github.com/visible/visible/blob/develop/docs/plugin.md
[ACT]: https://www.w3.org/WAI/standards-guidelines/act/
[npm]: https://www.npmjs.com/
[Vision plugin]: http://npm.im/@visi/plugin-gcp-vision-api

- **🔎 Validation** ― Visible can run  fully automated validation based on the web standard [ACT (Accessibility Conformance Testing)][ACT] just by putting the URL. The result always comes out with highlighted codes and detailed messages so you can immediately start fixing the problem.
- **🤖 Suggestion** ― Unlike other test tools, we also provide suggestions that may help you to understand the a11y more. Suggestions are so flexible that you can create your own algorithm such as [generating caption with an AI][Vision plugin].
- **🤓 Extensible** ― Visible supports [plugins][plugins] which has been inspired by [ESLint] so you can create your own configs, rules, suggestions or even browsers! Plugins can be published via [npm] so you can share your own tips to other developers.
- **👗 First-class CSS support** ― Thanks to the [CDP (Chrome Devtools Protocol)][CDP], Visible can also report CSS issues with a highlight indicating which CSS declaration has caused the problem. This can be combined with a suggestion of course!
- **💻 GUI and CLI** ― Visible is also available on both an online demo and a command line. You can check the issue instantly by the GUI, or customize CLI and built into the pipeline.

## Goals

[WCAG]: https://www.w3.org/TR/WCAG21/

Visible is designed to be an alternative to existing tools to help beginners who are not familiar with accessibility issues, effects, and ways to fix to understand it correctly.

Accessibility standards such as [WCAG] is defined in behavioral aspects, while programmers code the procedures. Many of the existing tools are not able to close the gap between behaviors and procedures, and it is the biggest difficulty for understanding the accessibility problems.

By combining the [CDP] and existing linter technologies, Visible can discover the location of code that is actually causing the problem. This design not only helps knowing line numbers but also used for suggestions and enhancing CSS supports.

Additionally, while most of the existing tools are scripts running on the browsers, Visible is a Node.js package consists of extensible modules like ESLint so you can share configurations and plugins and contribute to the web accessibility.

## Installation (CLI)
[Node.js (LTS)]: https://nodejs.org/en/
[Puppeteer]: https://pptr.dev/

Make sure that you have installed [Node.js (LTS)] and [npm] and then run the following command.

```
npm i @visi/core @visi/cli
```

By default, `@visi/cli` does not install any additional rules or drivers. So if you want to use [Puppeteer] as a driver and [WCAG] as a rule, you'd also need to run the command below.

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

## Similar Projects
[Axe]: https://github.com/dequelabs/axe-core
[Wave]: https://wave.webaim.org/
[Alfa]: https://github.com/Siteimprove/alfa
[Acot]: https://github.com/acot-a11y/acot
[Lighthouse]: https://developers.google.com/web/tools/lighthouse
[Webhint]: https://webhint.io/
[WebAIM]: https://webaim.org/
[Horizon 2020]: https://ec.europa.eu/programmes/horizon2020/en
[Storybook]: http://storybook.js.org/
[AOM]: https://wicg.github.io/aom/spec/
[Siteimprove]: https://siteimprove.com/

- [Axe] ― Accessibility testing tool maintained by Deque. Although they only work with DOM, It is highly accurate and a lot of users and has also adopted by [Lighthouse] and [Webhint]. Axe has contributed to the web accessibility a lot through projects like [ACT], and has inspired many web developers (including me!)
- [Wave] ― Accessibility testing service developed by [WebAIM]. Wave comes with rich web interface so you can immediately comprehend the issues. Wave is not open sourced, but has a web API.
- [Alfa] ― Accessibility testing framework maintained by [Siteimprove]. Alfa is built on top of [ACT] like Visible, and has compatibility to [EARL](https://www.w3.org/WAI/standards-guidelines/earl/). Alfa is a one of [Horizon 2020](horizon2020) project and funded by the European Union.
- [Acot] ─ Accessibility testing framework. Acot uses the latest web standard [AOM (Accessibility Object Model)][AOM] provided by [Puppeteer] to detect problems. Acot has a plugin for working on [Storybook].

## Contribution

See [CONTRIBUTING.md](https://github.com/visible/visible/blob/develop/CONTRIBUTING.md)

## Code of Conduct

See [CODE_OF_CONDUCT.md](https://github.com/visible/visible/blob/develop/CODE_OF_CONDUCT.md)

## License

See [LICENSE](https://github.com/visible/visible/blob/develop/LICENSE)
