'use strict';

const {cyan, green} = require('chalk');
const getSpdxLicenseIds = require('get-spdx-license-ids');
const loudRejection = require('loud-rejection');
const rmfr = require('rmfr');
const stringifyObject = require('stringify-object');
const writeFileAtomically = require('write-file-atomically');

const pkg = require('./package.json');

loudRejection();

rmfr(`${pkg.files.join(',')}`, {glob: true})
.then(() => getSpdxLicenseIds())
.then(ids => ({
  [pkg.files[0]]: JSON.stringify(ids, null, '  ') + '\n',
  [pkg.files[1]]: `export default ${stringifyObject(ids, {indent: '  '})};\n`
}))
.then(files => Promise.all(Object.keys(files).map(filename => {
  console.log(`Writing... ${cyan(filename)}`);
  return writeFileAtomically(filename, files[filename]);
})))
.then(() => console.log(green('Build completed.')));
