const https = require('https')
const marked = require('marked')
const fs = require('fs');

const { listOfFiles, baseUrl, extension } = require('./CONFIG');

for(var i in listOfFiles) {
	const filename = listOfFiles[i];
	const nameArray = filename.split('/');

	for (var i = 0; i < nameArray.length - 1; i++) {
		try {
		fs.mkdirSync(`${__dirname}/output/${nameArray[i]}`);
		}
		catch (e) {
			
		}
	}

	https.get(`${baseUrl}${filename}.${extension}`, (res) => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);

		res.on('data', (d) => {
			var html = marked(d.toString('utf8'));
			fs.writeFileSync(`${__dirname}/output/${filename}.html`, html);
		});

	})
	.on('error', (e) => {
		console.error(e);
	});
}