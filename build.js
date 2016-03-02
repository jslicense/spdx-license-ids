'use strong';

const {cyan, green} = require('chalk');
const getSpdxLicenseIds = require('get-spdx-license-ids');
const loudRejection = require('loud-rejection');
const rimrafPromise = require('rimraf-promise');
const stringifyObject = require('stringify-object');
const writeFileAtomically = require('write-file-atomically');

const pkg = require('./package.json');

loudRejection();

rimrafPromise(pkg.name + '*')
.then(() => getSpdxLicenseIds())
.then(ids => {
  return {
    [pkg.main]: JSON.stringify(ids, null, '  ') + '\n',
    [require('./bower.json').main]: `window.spdxLicenseIds = ${stringifyObject(ids, {indent: '  '})};\n`
  };
})
.then(files => {
  return Promise.all(Object.keys(files).map(filename => {
    console.log('Writing... ' + cyan(filename));
    return writeFileAtomically(filename, files[filename]);
  }));
})
.then(() => console.log(green('Build completed.')));
