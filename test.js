'use strict';

var test = require('tape');

var expected = require('./spdx-license-identifiers.json');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(1);
    t.deepEqual(main, expected, 'should return an array of SPDX license identifiers.');
  });
}

runTest('require(\'spdx-license-identifiers\')', require('./'));

global.window = {};

var bowerMain = './' + require('./bower.json').main;
require(bowerMain);

runTest('window.spdxLicenseIdentifiers', window.spdxLicenseIdentifiers);
