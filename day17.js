var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day17Input.js', 'utf8')).options.split('\n');
var totEggnog = 150;
var containers = [];
var combos = [];
var matches = [];
var minMatch = [];
var count = 0;
var minCount = 0;

input.forEach(function(line, ind, arr){
	containers.push(Number(line));
});

combos = combinations(containers);

for (var item in combos) {
	count = 0;
	combo = combos[item];
	for (i in combo) {
		count += combo[i];
	}
	if (count === totEggnog) matches.push(combos[item]);
};

for (var i in matches){
	var match = matches[i];
	if (minCount === 0) {
		minCount = match.length;
	} else if (minCount > match.length) {
		minCount = match.length;
	}
}
for (var i in matches){
	if (matches[i].length === minCount){
		minMatch.push(matches[i]);
	}
}

console.log('matches totalling exactly %s: %s', totEggnog, matches.length);
console.log('mininum containers:', minCount);
console.log('number of combos of minimum containers:', minMatch.length);


/*
// After several attempts at writing a function to return all the possible
// combinations in the set, I ended up finding this useful pair of functions
// github gist.
//
// combinations.js
// gist.github.com/axelpale/3118596
// by @axelpale
*/

function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	if (k > set.length || k <= 0) {
		return [];
	}
	
	if (k == set.length) {
		return [set];
	}
	
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	
	// Assert {1 < k < set.length}
	
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i+1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function combinations(set) {
	var k, i, combs, k_combs;
	combs = [];
	
	// Calculate all non-empty k-combinations
	for (k = 1; k <= set.length; k++) {
		k_combs = k_combinations(set, k);
		for (i = 0; i < k_combs.length; i++) {
			combs.push(k_combs[i]);
		}
	}
	return combs;
}
