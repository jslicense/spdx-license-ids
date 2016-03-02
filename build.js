'use strong';

const assert = require('assert');
const fs = require('fs');

const eachAsync = require('each-async');
const got = require('got');
const rimraf = require('rimraf');
const stringifyObject = require('stringify-object');

const pkg = require('./package.json');

got('https://spdx.org/licenses/licenses.json', {json: true}, (gotError, json) => {
  assert.ifError(gotError);

  let array = json.licenses
    .filter(license => !license.licenseId.endsWith('+'))
    .map(license => license.licenseId);
  let files = [
    {
      path: pkg.main,
      contents: JSON.stringify(array, null, '  ')
    },
    {
      path: require('./bower.json').main,
      contents: `window.spdxLicenseIds = ${stringifyObject(array, {indent: '  '})};`
    }
  ];

  rimraf(pkg.name + '*', removeErr => {
    assert.ifError(removeErr);

    eachAsync(files, (file, index, next) => {
      console.log('Writing... ' + file.path);
      fs.writeFile(file.path, file.contents + '\n', next);
    }, writeErr => {
      assert.ifError(writeErr);
      console.log('Build completed.');
    });
  });
});
