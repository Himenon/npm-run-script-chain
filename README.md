# npm-run-script-chain

[![Build Status](https://travis-ci.org/Himenon/npm-run-script-chain.svg?branch=master)](https://travis-ci.org/Himenon/npm-run-script-chain)
[![codecov](https://codecov.io/gh/Himenon/npm-run-script-chain/branch/master/graph/badge.svg)](https://codecov.io/gh/Himenon/npm-run-script-chain)
[![dependencies Status](https://david-dm.org/Himenon/npm-run-script-chain/status.svg)](https://david-dm.org/Himenon/npm-run-script-chain)
[![devDependencies Status](https://david-dm.org/Himenon/npm-run-script-chain/dev-status.svg)](https://david-dm.org/Himenon/npm-run-script-chain?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Usage

```sh
npm i -g npm-run-script-chain
```

Command Line

```
nrsc -f ./example/sample-package1.json -p 8005
# Open locahost:8005
```

Set start key to query parameter.

Example: <http://localhost:8005?start=build>

- [x] npm
- [x] yarn
- [x] npm-run-all (run-p)

## Development

```sh
yarn install
yarn start
```

### Package Update

```sh
yarn outdated
yarn upgrade
```

## Publish

```
npm publish
```

# Options

## Linter

* [tslint-react](https://github.com/palantir/tslint-react)

## License

MIT
