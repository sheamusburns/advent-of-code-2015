var fs = require('fs'),
csv = require('csv'),
input = csv.stringify(fs.readFileSync('./day5input.js', 'utf8')).options.split('\n'),
cond4, cond5, part2Conditions, finArr;

/*
// Part 1 Conditions

var reCond1 = /[aeiou].*?[aeiou].*?[aeiou]/;

var cond2 = 'abcdefghijklmnopqrstuvwxyz',
cond2 = cond2.split('');
cond2.map(function(val, index, arr){
	arr[index] = val+'{2}';
});
var reCond2 = new RegExp(cond2.join("|"), "i");

var cond3= ['ab', 'cd', 'pq', 'xy'];
var reCond3 = new RegExp(cond3.join("|"), "i");
var conditions = [reCond1, reCond2, reCond3];
console.log(conditions)
*/

// Part 2 Conditions



cond4 = /(..).*\1/;
cond5 = /(.).\1/;
part2Conditions = [cond4, cond5];
finArr = [];


console.log("start count: %s", input.length);
input.forEach(function(item, ind, arr){
	// var toSplice = false;
	if (testInput(cond4, item) && testInput(cond5, item)) {
		finArr.push(item);
	}
	
	/*
	// Part 1 Tests

	for (var i = 0; i < conditions.length; i++) {
		if (i < 2) {
			if (!testInput(conditions[i], item)){
				toSplice = true;
				console.log('does not meet: condition %s : %s', i, item)
			}
		}
		if (i === 2) {
			if (testInput(conditions[i], item)) {
				toSplice = true;
				console.log('meets: condition %s : %s', i, item);
			}
		} 
	}
	if (!toSplice) {
		finArr.push(item);
	}
	*/

});
console.log("end count: %s", finArr.length)

function testInput(re, str) {
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}