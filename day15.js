var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day15Input.js', 'utf8')).options.split('\n');
var rules = {};
var points = [];
var capacity = 0, durability = 0, flavor = 0, texture = 0, calories = 0;

/* assign rules based on the instructions */

input.forEach(function(item, ind, arr){
	var cat = item.match(/^[A-Z]\w+/g)[0];
	rules[cat] = {};
	rules[cat].capacity = Number(item.match(/[\S]+(?=, durability)/g)[0]);
  rules[cat].durability = Number(item.match(/[\S]+(?=, flavor)/g)[0]);
	rules[cat].flavor = Number(item.match(/[\S]+(?=, texture)/g)[0]);
	rules[cat].texture = Number(item.match(/[\S]+(?=, calories)/g)[0]);
	rules[cat].calories = Number(item.match(/[\S]$/g)[0]);
});

/* generate combinations of tbs that add up to 100 */

var a, b, c, d;
var combos = [];

for (a = 1; a < 101; a++){
	for (b = 1; b < 101; b++) {
		for (c = 1; c < 101; c++) {
			for (d = 1; d < 101; d++) {
				if ((a + b + c + d) === 100) {
					combos.push([a, b, c, d]);
				}
			}
		}
	}
}

combos.forEach(function(combo, ind, arr){
	calcPoints(combo);
	/* part 2 if statement */
	if (calories === 500)	points.push([ind, (capacity*durability*flavor*texture)]);
	resetProps();
});
points.sort(function(a,b){
	return b[1] - a[1];
});
console.log('The winner **at %s points**:\n  Sprinkles: %s tbs\n  Butterscotch: %s tbs\n  Chocolate: %s tbs\n  Candy: %s tbs',
	points[0][1], combos[points[0][0]][0], combos[points[0][0]][1], combos[points[0][0]][2], combos[points[0][0]][3]);

function calcPoints(combo){
	var rule;
	var count = 0;
	sprinklesTb = combo[0];
	butterscotchTb = combo[1];
	chocolateTb = combo[2];
	candyTb = combo[3];
	for (prop in rules) {
		if (rules.hasOwnProperty(prop)){
			rule = rules[prop];
			switch (prop) {
				case 'Sprinkles':
					addPoints(prop, sprinklesTb);
					break;
				case 'Butterscotch':
					addPoints(prop, butterscotchTb);
					break;
				case 'Chocolate':
					addPoints(prop, chocolateTb);
					break;
				case 'Candy':
					addPoints(prop, candyTb);
					break;
			}
		}
	}
	if (capacity < 0) capacity = 0;
	if (durability < 0) durability = 0;
	if (flavor < 0) flavor = 0;
	if (texture < 0) texture = 0;
	if (calories < 0) calories = 0;
}

function addPoints(ingredient, tb){
	capacity += tb * rules[ingredient].capacity;
	durability += tb * rules[ingredient].durability;
	flavor += tb * rules[ingredient].flavor;
	texture += tb * rules[ingredient].texture;
	calories += tb * rules[ingredient].calories;
}

function resetProps(){
	capacity = 0, durability = 0, flavor = 0, texture = 0, calories = 0;
}
