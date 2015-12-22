var md5 = require('md5');
var key = 'iwrupvqb';


var min = Number(process.argv[2] || 0);
var max = Number(process.argv[3] || 10000000);
var count = min;
var hash = '';

while (hash.substr(0, 6) !== '000000' && count <= max) {
	hash = md5(key+count);
	console.log(count + ' : ' + hash);
	count++;
};