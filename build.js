'use strict';

const {join} = require('path');

const {green} = require('chalk');
const {files} = require('./package.json');
const getSpdxLicenseIds = require('get-spdx-license-ids');
const loudRejection = require('loud-rejection');
const rmfr = require('rmfr');
const writeFileAtomically = require('write-file-atomically');

loudRejection();

(async () => {
	const filePath = join(__dirname, files[0]);
	const [ids] = await Promise.all([getSpdxLicenseIds.all(), rmfr(filePath)]);
	await writeFileAtomically(filePath, `${JSON.stringify(ids, null, '\t')}\n`);

	console.log(green(`Wrote ${filePath}.`));
})();
