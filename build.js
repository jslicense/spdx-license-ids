'use strict';

var fs = require('fs');

var del = require('del');
var spdx = require('spdx-license-list');
var toSingleQuotes = require('to-single-quotes');

var pkg = require('./package.json');
var bower = require('./bower.json');

var banner = [
  '/*!',
  ' * ' + pkg.name + ' | MIT (c) Shinnosuke Watanabe',
  ' * https://github.com/shinnn/' + pkg.name,
  '*/'
].join('\n');

var identifiers = Object.keys(spdx);
var json = JSON.stringify(identifiers, null, '  ');

var js = [
  banner,
  '\'use strict\';',
  'module.exports = ' + toSingleQuotes(json) + ';'
].join('\n');

var cjs = [
  banner,
  '\'use strict\';',
  'window.spdxLicenseIdentifiers = ' + toSingleQuotes(json) + ';'
].join('\n');

del.sync('./' + pkg.name + '*');

function writeFile(filePath, content) {
  console.log('Writing... ' + filePath);
  fs.writeFileSync(filePath, content + '\n');
}

writeFile('spdx-license-identifiers.json', json);
writeFile(pkg.main, js);
writeFile(bower.main, cjs);

console.log('Completed.');
