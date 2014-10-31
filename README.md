# spdx-license-identifiers

A list of [SPDX license](http://spdx.org/licenses/) identifiers

[**Download JSON**](https://raw.githubusercontent.com/shinnn/spdx-license-identifiers/master/spdx-license-identifiers.json)

## Use as a JavaScript Library

[![Build Status](https://travis-ci.org/shinnn/spdx-license-identifiers.svg?branch=master)](https://travis-ci.org/shinnn/spdx-license-identifiers)
[![NPM version](https://badge.fury.io/js/spdx-license-identifiers.svg)](https://www.npmjs.org/package/spdx-license-identifiers)
[![Bower version](https://badge.fury.io/bo/spdx-license-identifiers.svg)](https://github.com/shinnn/spdx-license-identifiers/releases)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/spdx-license-identifiers.svg)](https://coveralls.io/r/shinnn/spdx-license-identifiers)
[![devDependency Status](https://david-dm.org/shinnn/spdx-license-identifiers/dev-status.svg)](https://david-dm.org/shinnn/spdx-license-identifiers#info=devDependencies)

### Installation

#### Package managers

##### [npm](https://www.npmjs.org/)

```sh
npm install spdx-license-identifiers
```

##### [bower](http://bower.io/)

```sh
bower install spdx-license-identifiers
```

##### [Duo](http://duojs.org/)

```javascript
var spdxLicenseIdentifiers = require('shinnn/spdx-license-identifiers');
```

#### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/spdx-license-identifiers/master/spdx-license-identifiers.js)

### API

#### spdxLicenseIdentifiers

Type: `Array` of `String`

It returns an array of SPDX license identifiers.

```javascript
var spdxLicenseIdentifiers = require('spdx-license-identifiers');

spdxLicenseIdentifiers; //=> ['Glide', 'Abstyles', 'AFL-1.1', ... ]
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
