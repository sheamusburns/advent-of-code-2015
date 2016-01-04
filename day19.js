var fs = require('fs');
var csv = require('csv');
var calibrator = 'CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF';
var input = csv.stringify(fs.readFileSync('./day19Input.js', 'utf8')).options.split('\n');
var keys = [];
var mutations = [];
var mutationRules = {};
var rules = {};
var key, val;

input.forEach(function(line, ind, arr){
	key = line.match(/\w+(?= \=>)/g)[0];
	val = line.match(/\w+$/g)[0];
	if (keys.indexOf(key) < 0) keys.push(key)
	if (mutations.indexOf(val) < 0)	mutations.push(val)
	if (!rules[key]) rules[key] = {
		mutatesTo: [],
		indices: [],
		combos: []
	};
	rules[key].mutatesTo.push(val);
});

for(mu in mutations){
	mutation = mutations[mu];
	for (i in rules) {
		obj = rules[i];
		if (obj.mutatesTo.indexOf(mutation) > -1) {
			if (!mutationRules[mutation]) mutationRules[mutation] = [];
			mutationRules[mutation].push(i);
		}
	}
}

reverseEngineer(calibrator);
genCombos(calibrator);


function reverseEngineer(mol){
count = 0;
var target = calibrator;
var tempStr = '';
while (target !== 'e'){
	for (i in mutations) {
		if (target.indexOf(mutations[i]) > -1){
			val = target.indexOf(mutations[i]);
			code = mutationRules[mutations[i]];
			target = target.slice(0, val) + code + target.slice(val + mutations[i].length)
			count++
		}
	}
}
console.log('reverse engineer from molecule to \'e\':', count);
}

function genCombos(mol) {
	var tempCombos = [];
	keys.forEach(function(key, ind, arr){
		regex = new RegExp(key, 'g');
		while(match = regex.exec(mol)) {
			rules[key].indices.push(match.index);
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
				rules[key].combos.push(tempStr)
			})
		}
	});
	console.log("calibration", tempCombos.length);
}