'use strict';

var test = require('tape');
var requireBowerFiles = require('require-bower-files');

var expected = require('./spdx-license-identifiers.json');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(1);
    t.deepEqual(
      main,
      expected,
      'should return an array of SPDX license identifiers.'
    );
  });
}

runTest('require(\'spdx-license-identifiers\')', require('./'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.spdxLicenseIdentifiers', window.spdxLicenseIdentifiers);
