'use strict';

const assert = require('assert');
const fs = require('fs');
const got = require('got');

const eachAsync = require('each-async');
const rmrf = require('rm-rf');
const stringifyObject = require('stringify-object');

const pkg = require('./package.json');

got('http://spdx.org/licenses/licenses.json', {json: true}, (gotError, json) => {
  assert.ifError(gotError);

  let array = json.licenses.map(license => license.licenseId);
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

  rmrf(pkg.name + '*', removeErr => {
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
