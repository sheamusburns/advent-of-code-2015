var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day17Input.js', 'utf8')).options.split('\n');
var containers = [];
var totEggnog = 150;
input.forEach(function(line, ind, arr){
	containers.push(Number(line));
});
console.log(containers);

var conArr = [];


for (var a = 0; a < containers.length; a++){
	tempArr = [];
	tempArr.push(containers[a]);
	for (con in containers) {
		permuteCon();
		
	}
}
console.log(conArr);

function permuteCon(){
	if (containers[con] !== containers[a]){
		tempCount = 0;
		if (containers[con] + containers[a] < 100){
			tempArr.push(containers[a]);
			con++
			permuteCon()
		}
	}
}	