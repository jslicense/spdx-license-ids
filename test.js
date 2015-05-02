'use strict';

const test = require('tape');
const requireBowerFiles = require('require-bower-files');

let expected = require('./spdx-license-ids.json');

function runTest(description, main) {
  test(description, t => {
    t.plan(1);
    t.deepEqual(main, expected, 'should return an array of SPDX license identifiers.');
  });
}

runTest('require(\'spdx-license-ids\')', require('.'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.spdxLicenseIds', window.spdxLicenseIds);
