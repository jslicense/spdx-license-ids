'use strict';

const {basename, join} = require('path');
const {writeFile} = require('fs').promises;

const {cyan, green} = require('chalk');
const {files} = require('./package.json');
const getSpdxLicenseIds = require('get-spdx-license-ids');
const rmfr = require('rmfr');

module.exports = (async () => {
	const paths = files.map(filename => join(__dirname, filename));

	const [[valid, deprecated]] = await Promise.all([
		getSpdxLicenseIds.both(),
		...paths.map(path => rmfr(path))
	]);

	await Promise.all(paths.map(async path => {
		const data = basename(path) === 'deprecated.json' ? deprecated : valid;
		await writeFile(path, `${JSON.stringify(data, null, '\t')}\n`);

		console.log(`${green('[OK]')} Created ${cyan(path)}`);
	}));

	console.log();
})();
