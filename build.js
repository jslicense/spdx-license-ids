'use strict';

var assert = require('assert');
var fs = require('fs');

var eachAsync = require('each-async');
var rmrf = require('rm-rf');
var stringifyObject = require('stringify-object');

var pkg = require('./package.json');
var banner = require('tiny-npm-license')(pkg);

var array = Object.keys(require('spdx-license-list'));
var stringifiedArray = stringifyObject(array, {indent: '  '}) + ';';

var files = [
  {
    path: 'spdx-license-identifiers.json',
    contents: JSON.stringify(array, null, '  ')
  },
  {
    path: pkg.main,
    contents: banner + 'module.exports = ' + stringifiedArray
  },
  {
    path: require('./bower.json').main,
    contents: banner + 'window.spdxLicenseIdentifiers = ' + stringifiedArray
  }
];

rmrf(pkg.name + '*', function(err) {
  assert.ifError(err);

  eachAsync(files, function(file, index, next) {
    console.log('Writing... ' + file.path);
    fs.writeFile(file.path, file.contents + '\n', next);
  }, function(err) {
    assert.ifError(err);
    console.log('Build completed.');
  });
});
