'use strict';

const test = require('tape');

const expected = require('./spdx-license-ids.json');

function runTest(description, main) {
  test(description, t => {
    t.deepEqual(main, expected, 'should return an array of SPDX license identifiers.');
    t.end();
  });
}

runTest('require(\'spdx-license-ids\')', require('.'));

global.window = {};
require('./' + require('./bower.json').main);

runTest('window.spdxLicenseIds', global.window.spdxLicenseIds);
