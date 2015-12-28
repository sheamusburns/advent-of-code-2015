var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day9Input.js', 'utf8')).options.split('\n');
var regexLocation = /([A-Z])\w+/g;
var regexDistance = /\d+/g
var locations = {};
var cityList = [];
var locArr = [];

input.forEach(function(instruct){
	locArr = instruct.match(regexLocation);
	for (var i = 0; i < locArr.length; i++){
		item = locArr[i];
		if (cityList.indexOf(item) < 0) {
			cityList.push(item);
		}
		if (i === 0) {
			(!locations[item]) ? locations[item] = {} : locations[item];
			locations[item][locArr[i+1]] = Number(instruct.match(regexDistance)[0]);
		}
	}
});

day9([1,2]);

function day9(parts){
	var permArr = [];
	var usedChars = [];
	var temparr = [];
	permute(cityList).forEach(function(item, ind, arr){
			temparr.push(calcDist(item));
	});

	for (i in parts) {
		part = parts[i];
		(part === 1)
		? temparr.sort(function(a,b){
			return a - b;
			})
		: (part === 2)
		? temparr.sort(function(a,b){
			return b - a;
			})
		: 'nothing'
		console.log('the answer to part %s:', part, temparr[0]);
	}

	function permute(input) {
	  var i, ch;
	  for (i = 0; i < input.length; i++) {
	    ch = input.splice(i, 1)[0];
	    usedChars.push(ch);
	    if (input.length == 0) {
	      permArr.push(usedChars.slice());
	    }
	    permute(input);
	    input.splice(i, 0, ch);
	    usedChars.pop();
	  }
		return permArr;
	}

	function calcDist (permArr) {
		var totalDist = 0;
		for (var i = 0; i < permArr.length-1; i++){
			var temp1 = permArr[i];
			var temp2 = permArr[i+1];
				if (locations[temp1] && locations[temp1][temp2]) {
					totalDist += locations[temp1][temp2];
				} else {
					totalDist += locations[temp2][temp1]
				}
		}
		return totalDist;
	}
}
