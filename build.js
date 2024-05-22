const https = require('https');
const fs = require('fs');

https.get('https://spdx.org/licenses/licenses.json', response => {
	const chunks = [];
	response
	.on('data', chunk => {
		chunks.push(chunk);
	})
	.once('error', error => {
		throw error;
	})
	.once('end', () => {
		const buffer = Buffer.concat(chunks);
		const data = JSON.parse(buffer);
		const {licenses} = data;
		const index = [];
		const deprecated = [];
		for (const {licenseId: id, isDeprecatedLicenseId: isDeprecated} of licenses) {
			if (isDeprecated) {
				if (!id.endsWith('+')) deprecated.push(id);
			} else {
				index.push(id);
			}
		}
		index.sort();
		deprecated.sort();
		fs.writeFileSync('index.json', stringify(index, null, 2));
		fs.writeFileSync('deprecated.json', stringify(deprecated, null, 2));
	});
});

function stringify(data) {
	return `${JSON.stringify(data, null, '\t')}\n`;
}
