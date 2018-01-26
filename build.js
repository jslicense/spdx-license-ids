'use strict';

const {basename, join} = require('path');

const {cyan} = require('chalk');
const {files} = require('./package.json');
const getSpdxLicenseIds = require('get-spdx-license-ids');
const loudRejection = require('loud-rejection');
const rmfr = require('rmfr');
const {success} = require('log-symbols');
const writeFileAtomically = require('write-file-atomically');

loudRejection();

module.exports = (async () => {
	const paths = files.map(filename => join(__dirname, filename));

	const [[valid, deprecated]] = await Promise.all([
		getSpdxLicenseIds.both(),
		...paths.map(path => rmfr(path))
	]);

	await Promise.all(paths.map(async path => {
		const data = basename(path) === 'deprecated.json' ? deprecated : valid;
		await writeFileAtomically(path, `${JSON.stringify(data, null, '\t')}\n`);

		console.log(`${success} Created ${cyan(path)}`);
	}));

	console.log();
})();
