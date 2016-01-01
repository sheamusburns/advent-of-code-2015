var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day18Input.js', 'utf8')).options.split('\n');
var inputArr = [];
var keyArr = [];
input.forEach(function(obj){
	inputArr.push(obj.split(''));
});
var grid = {};
var neighborsDict = {};
var value, neighbors;
var gridCount = {
	on: 0,
	off: 0
};

inputArr.reduce(function(pre, curr, ind, arr){
	curr.reduce(function(prev, curre, inde, arra){
		grid[pre + '-' + inde] = curre;
		keyArr.push([pre + '-' + inde, curre]);
		return pre+1;
	}, 0)
	return pre+1;
}, 0);

keyArr.reduce(function(previous, current, index, array){
	neighborKeys(current[0]);
	return previous + 1;
}, 0)
console.log(neighborsDict);
console.log(neighborsDict['01-01']);
// for (i in grid) {
// 	neighborKeys(i.match(/\d+/g)[0], i.match(/\d+/g)[1])
// };

// var r, c;
// inputArr.forEach(function(item, index){
// 	outputArr[index] = item.map(function(curr, ind, arr){
// 		r = index, c = ind;
// 		neighArr = neighborsDict[r + '-' + c].slice();
// 		for (obj in neighArr){ {

// 		}

// 		}
// 	});
// });
// console.log(keyArr);
// cycle(1);
// console.log('on: %s\noff: %s', gridCount.on, gridCount.off);
// console.log(getNeighbors(0, 0));

function cycle(numSteps){
	for (var i = 0; i < numSteps; i++){
		for (var i in grid) {
			value = grid[i];
			neighbors = neighborsDict[i.match(/\d+/g)[0], i.match(/\d+/g)[1]];
			if (value === '#') {
				if (neighbors.filter(function(val){
					return val === '#';
				}).length === 2 || neighbors.filter(function(val){
					return val === '#';
				}).length === 3) {
				value = '.';
				} 
			} else if (value === '.') {
				if (neighbors.filter(function(val){
					return val === '#';
				}).length === 3){
				value = '#';
				}
			}
			(value === '#') ? gridCount.on++ : gridCount.off++;
		}
	}
}


function getVal(row, col){
	return grid[row + '-' + col];
}

function neighborKeys(str){
	row = str.match(/\d+/g)[0];
	col = str.match(/\d+/g)[1];
	var tempArr = [];
	for (var i = row - 1; i < row + 2; i ++){
		if (i >= 0 && i <= 100) {
			for (var j = col - 1; j < col + 2; j++){
				if  (j >= 0 && j <= 100 && (i+j) !== (row+col)){
					tempArr.push(row + '-' + col);
				}
			}
		}
	}
	neighborsDict[row + '-' + col] = tempArr;
}

function lookupNeighbors(row, col){
	return neighborsDict[row + '-' + col];
}


function getNeighbors(row, col){
	var tempArr = [];
	for (var i = row - 1; i < row + 2; i ++){
			for (var j = col - 1; j < col + 2; j++){
				if (i >= 0 && i <= 100 && j >= 0 && j <= 100 && (i+j) !== (row+col)){
					tempArr.push(getVal(i, j));
				}
			}
	}
	return tempArr;
}



