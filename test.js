'use strict';

const main = require('.');
const test = require('tape');

test('require(\'spdx-license-ids\')', t => {
  t.ok(Array.isArray(main), 'should return an array of SPDX license identifiers.');
  t.end();
});
