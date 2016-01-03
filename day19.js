var fs = require('fs');
var csv = require('csv');
var calibrator = 'CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF';
var input = csv.stringify(fs.readFileSync('./day19Input.js', 'utf8')).options.split('\n');
var keys = [];
var rules = {};
var combinations = [];

input.forEach(function(line, ind, arr){
	key = line.match(/\w+(?= \=>)/g)[0];
	if (keys.indexOf(key) < 0) keys.push(key);
	val = line.match(/\w+$/g)[0];
	if (!rules[key]) rules[key] = {
		mutatesTo: [],
		indices: [],
		combos: []
	};
	rules[key].mutatesTo.push(val);
});
// console.log(rules);
// console.log(keys);


// genCombos(calibrator);
var match = false;
var checkStepNum = 0;
genCombos(calibrator).length; //create first step



function run(){
	checkLastStep(combinations[checkStepNum]);
	if (!match) {
		createStep(combinations[checkStepNum]);
		checkStepNum++;
		run()
	}
}
function checkLastStep(lastStep){
	for (comb in lastStep){
		var s = combinations[comb];
		for (i in s){
			if (s[i].join('') === calibrator) {
				console.log('found it');
				match = true;
				return checkStepNum;
			}
		}
	}
}


// console.log(combinations.length);
// console.log(combinations[1])

var count = 0; 
function createStep(lastStep){
	for (var h = 0; h < lastStep.length; h++){
		// console.log(lastStep[h]);
		var initState = lastStep[h][0];
		var stepArr = [];
		// for (item in combinations){
		// 	stepArr = [];
		// 	var step = combinations[item];
		// 	var stepNum = item+1;
		// 	for (var i = 0; i < step.length; i++){
		// 		stepArr.push(genCombos(step[i].join('')));
		// 	}		
		stepArr.push(genCombos(initState));	
	}
	combinations.push(stepArr);
}
	

function genCombos(mol) {
	var tempCombos = [];
	keys.forEach(function(key, ind, arr){
		regex = new RegExp(key, 'g');
		while(match = regex.exec(mol)) {
			rules[key].indices.push(match.index);
			// console.log(match[0], match.index);
		}
		for (item in rules[key].mutatesTo){
			code = rules[key].mutatesTo[item];
			rules[key].indices.forEach(function(val, index, array){
				tempStr = ''
				keyLen = key.length;
				tempStr += mol.slice(0, val) + code + mol.slice(val + keyLen);
				if (tempCombos.indexOf(tempStr) < 0) {
					tempCombos.push(tempStr);
				}
				// console.log(tempStr, key);
				rules[key].combos.push(calibrator)
			})
		}
		// (matchArr) ? console.log(matchArr.length) : console.log('no matches');
		// console.log(matchArr);
	});
	console.log("number of combinations:", tempCombos.length);
	return tempCombos;
}