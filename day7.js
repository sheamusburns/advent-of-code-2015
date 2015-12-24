var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day7input.js', 'utf8')).options.split('\n');

console.log(input);
var wires = {};
var reWireNames = /[a-z]+/g;
var reOperator = /[A-z]+/g;
var reDigit = /\d+/g;
var reInit = /^\d+\s->\s[a-z]+/g;
var reKey = /[a-z]+$/g;
var reFormula = /^.*(?=\s->)/g;
/*var operators = {
	AND: &,
	OR: |,
	NOT: ~,
	LSHIFT: <<,
	RSHIFT: >>
}*/
input.forEach(function(item, ind, array){
	wires[item.match(reKey)] = item.match(reFormula)[0];
	// var tempArr = item.match(reWireNames);
	// tempArr.forEach(function(match){
	// 	if (!wires[match]) {
	// 		wires[match] = null;
	// 	}
	// });
	// if (item.match(reInit)) {
	// 	wires[item.match(reWireNames)] = Number(item.match(reDigit));
	// 	array[ind] = '';
	// }
	//console.log(item.match(/->.$'/g));
});
function lookup(wireName){
	if (typeof wires[wireName] === Number) {

	} else {
		lookup()
	}
}
console.log(wires.a);
// console.log(input);