var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day16Input.js', 'utf8')).options.split('\n');
var criteria = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1,
}
var sues = {};

input.forEach(function(line, ind, arr){
	lineInd = line.match(/\d+(?=:)/)[0];
	startObj = line.match(/\b[a-z]/).index;
	line = '{' + line.slice(startObj) + '}';
	eval('sues[parseInt(lineInd)] = ' + line);
})

var critVal;
var match = [];
for (i in sues){
	matchAll = 0;
	for (prop in criteria){
		critVal = criteria[prop];
		// First two conditionals below are for part 2 //
		if (prop === 'cats' || prop === 'trees') {
			if (sues[i][prop] > critVal){
				matchAll++;
			}
		} else if (prop === 'pomeranians' || prop === 'goldfish') {
			if (sues[i][prop] < critVal){
				matchAll++;
			}
		} else if (sues[i][prop] === critVal) {
			matchAll++;
		}
	}
	if (matchAll === 3){
		match.push(i);
	}
}

console.log('Sue # that matches all the criteria:', match[0]);