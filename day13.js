var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day13Input.js', 'utf8')).options.split('\n');;
var names = [];
var arrangements = [];
var permArr = [];
var usedChars = [];
var rules = {};
var globalCount;

input.forEach(function(item, ind, arr){
	setRules(item);
	var tempNames= item.match(/[A-Z]\w+/g);
	for (i in tempNames){
		if (names.indexOf(tempNames[i]) < 0) {
			names.push(tempNames[i]);
		}
	}
});
// this function adds me into the mix (part 2)
//patchMeIn('Sheam-o', 0);
arrangements = permRoundTable(names);
findHappiness('max');

/* Functions ----------------------------- */
/* --------------------------------------- */

function findHappiness(val){
	globalCount = 0;
	tableCount = 0;
	if (val === 'max') {
		arrangements.forEach(function(item, ind, arr){
			item.forEach(function(name, index, array){
				if (index <= array.length-2){
					var tempPl1 = name;
					var tempPl2 = array[index+1];
					tableCount += rules[tempPl1][tempPl2] + rules[tempPl2][tempPl1];
				}
			});
			globalCount = (tableCount > globalCount) ? tableCount : globalCount;
			tableCount = 0;
		});
		console.log('max happiness:', globalCount);
	}
}

// permRoundTable() is a normal permute function
// but also adds index 0 to index last in the array

function permRoundTable(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
      permArr[permArr.length-1].push(permArr[permArr.length-1][0]);
    }
    permRoundTable(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
	return permArr;
}

function patchMeIn(player, happyVal) {
		for (per in rules){
			rules[per][player] = happyVal;
		};
		rules[player]={};
		for (i in names) {
			rules[player][names[i]] = happyVal;
		}
		names.push(player);
		console.log(rules);
}

function setRules(line) {
	var player1;
	var player2;
	var amount;

	player1 = line.match(/^[A-Z]\w+/g);
	player2 = line.match(/[A-Z]\w+(?=\.)/g);
	amount = (line.match(/lose/)) ? Number('-'+line.match(/\d+/)[0]) : Number(line.match(/\d+/)[0])
	assignRules(player1, player2, amount);
}

function assignRules(p1, p2, am){
	if (!rules[p1]) {
		rules[p1] = {}
		rules[p1][p2] = am;
	} else {
		if (!rules[p1][p2]) {
			rules[p1][p2] = am;
		}
	}
}