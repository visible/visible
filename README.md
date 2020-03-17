# <img alt="Visible" src="https://i.imgur.com/0CfRzj5.png" width="280px" />

> 🚧 This project is still working in progress and is not guaranteed to work properly.

Visible makes the web better in a perspective of accessibility

[![ci](https://github.com/visible/visible/workflows/CI/badge.svg)](https://github.com/visible/visible/actions)
[![codecov](https://codecov.io/gh/visible/visible/branch/develop/graph/badge.svg)](https://codecov.io/gh/visible/visible)
[![Maintainability](https://api.codeclimate.com/v1/badges/d884597fcb0463f492c1/maintainability)](https://codeclimate.com/github/visible/visible/maintainability)

## Installation

Make sure you have installed npm and Node.js then run this on your terminal

```
$ npm i -g @visi/cli@next @visi/plugin-standard@next
```

You may need to create `.visiblerc.json` when you try this for the first time. You can use `init` to generated the default config.

```
$ visible init
```

Now you can diagnose your website on your CLI. See the [documentation](https://github.com/visible/visible/tree/develop/docs) for more detail.

```
$ visible --url https://example.com
```

## Related Projects

- **[Axe](https://github.com/dequelabs/axe-core)** - A11y testing engine for web
- **[Lighthouse](https://github.com/GoogleChrome/lighthouse)** - A11y and performance alanyzation tool maintained by Google
- **[Webhint](https://github.com/webhintio/hint)** - A11y testing library which also has a integration for VSCode
