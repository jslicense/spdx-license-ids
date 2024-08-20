const test = require('node:test');
const assert = require('assert');
const deprecated = require('./deprecated');
const valid = require('.');

test('require(\'spdx-license-ids\')', t => {
	assert(Array.isArray(valid), 'should be an array.');

	assert(
		valid.includes('LGPL-3.0-or-later'),
		'should include non-deprecated license IDs.'
	);

	assert(
		!valid.includes('Nunit'),
		'should not include deprecated license IDs.'
	);
});

test('require(\'spdx-license-ids/deprecated\')', t => {
	assert(Array.isArray(deprecated), 'should be an array.');

	assert(
		deprecated.length < valid.length,
		'should be smaller than the main export.'
	);

	assert(
		deprecated.includes('eCos-2.0'),
		'should include deprecated license IDs.'
	);

	assert(
		!deprecated.includes('ISC'),
		'should not include non-deprecated license IDs.'
	);
});
