var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day8Input.js', 'utf8')).options.split('\n');

day8([1,2]);

function day8(parts){
	var charCount = 0;
	var strCount = 0;
	var newEncodeCount = 0;
	var diff = 0;
	var part;

	input.forEach(function(str){
		charCount += str.length;
		strCount += eval(str).length;
		newEncodeCount += JSON.stringify(str).length;
	});

	for (i in parts) {
		part = parts[i];
		diff = (part === 1) ? (charCount - strCount)
		: (part === 2) ? (newEncodeCount - charCount) : diff;
		console.log('the answer for part %s: %s', part, diff);
	}
}
