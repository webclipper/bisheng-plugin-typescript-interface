# bisheng-plugin-typescript-interface

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]

[npm-image]: https://img.shields.io/npm/v/bisheng-plugin-typescript-interface.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bisheng-plugin-typescript-interface
[travis-image]: https://img.shields.io/travis/yuquewebclipper/bisheng-plugin-typescript-interface.svg?style=flat-square
[travis-url]: https://travis-ci.org/yuquewebclipper/bisheng-plugin-typescript-interface
[codecov-image]: https://codecov.io/gh/yuquewebclipper/bisheng-plugin-typescript-interface/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/yuquewebclipper/bisheng-plugin-typescript-interface

Generate Document from comment in typescript interface for Markdown files in [`bisheng`](https://github.com/benjycui/bisheng).

## Usage

Install:

```bash
npm i --save bisheng-plugin-typescript-interface
```

In Markdown:

<pre>
```typescriptInterface
{
    "filePath":"posts/fixtures.tsx",
    "interfaceName":"ITestInterface",
    "language":"zh-CN"
}
```
</pre>

## API

### lang: String

> default: 'typescriptInterface'

## License

MIT
