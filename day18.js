var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day18Input.js', 'utf8')).options.split('\n');
var inputArr = [];
input.forEach(function(obj){
	inputArr.push(obj.split(''));
});
var grid = {};
var tempGrid = {};
var value, neighbors;
var gridCount = {
	on: 0,
	off: 0
};
// console.log(input);
inputArr.reduce(function(pre, curr, ind, arr){
	grid[pre] = {};
	curr.reduce(function(prev, curre, inde, arra){
		grid[pre][inde] = {
			val: curre, 
			neighbors: (function(r, c){
				row = r, col = c, tempArr = [], origin = [r, c]
				// console.log('[' + row + '][' + col + ']');
				for (var i = row - 1; i < row + 2; i ++){
					for (var j = col - 1; j < col + 2; j++){
						if  (i >= 0 && i <= input.length-1 && j >= 0 && j <= input.length-1){
							if ((i + ',' + j) !== (row + ',' + col)){
								tempArr.push('grid' + '[' + i + '][' + j+ '].val');
							}
						}
					}
				}
				return tempArr;
			})(pre, inde), 
			neighborVals: []
		} 
		return pre+1;
	}, 0)
	return pre+1;
}, 0);

// console.log(tempGrid);



initialCount();
cycle(100);
// console.log(tempGrid);
// cycle(4);
function initialCount(){
	for (key in grid){
		row = grid[key];
		for (item in row){
			val = row[item].val;
			if (val === '#'){
				gridCount.on++;
			} else {
				gridCount.off++
			}
		}
	}
	console.log('on: %s\noff: %s', gridCount.on, gridCount.off);
}

function cycle(numTimes){
	for (var nt = 0; nt < numTimes; nt++){
		gridCount.on = 0;
		gridCount.off = 0;
		for (obj in grid){
			thing = grid[obj];
			for (i in thing){
				// console.log(thing[i].neighbors);
				thing[i].neighborVals = thing[i].neighbors.map(function(curr, ind, arr){
						return eval(curr);
				})
				// console.log(thing[i].neighbors);
				// console.log('sndsndsnd', thing[i].neighborVals);
			}
		}
		masterArr = [];

		for (key in grid) {
			row = grid[key];
			tempArr = [];
			for (item in row){
				value = row[item].val;
				tempVal = value;
				neighVals = row[item].neighborVals
				// console.log('temtemptempt', tempArr);
				// console.log('nighedddd', row[item].neighbors);
				// console.log(tempArr);
				// console.log(tempArr.filter(function(val){
				// 	return val === '#';
				// }))
				if (tempVal === '#') {
					if (neighVals.filter(function(val){
						return val === '#';
					}).length !== 2 && neighVals.filter(function(val){
						return val === '#';
					}).length !== 3){
						tempVal = '.';
					} 
				}
				if (tempVal === '.') {
					if (neighVals.filter(function(val){
						return val === '#';
					}).length === 3){
					tempVal = '#';
					}
					// console.log('sssssss:', tempVal)
				}
				(tempVal === '#') ? gridCount.on++ : gridCount.off++;
				// console.log(key, item, tempval);
				tempArr.push(tempVal);
				// console.log('v', value);
				// console.log('tv', tempVal);
				// console.log('2', tempGrid[key][item].val);
			}
			masterArr.push(tempArr);
		}
		masterArr.reduce(function(pre, curr, ind, arr){
			curr.reduce(function(prev, curre, inde, arra){
				// console.log('before:     ', grid[pre][inde]);
				grid[pre][inde].val = curre;
				grid[pre][inde].neighborVals = []; 
				// console.log('after:       ', grid[pre][inde]);
				return pre+1;
			}, 0)
			return pre+1;
		}, 0);
		console.log('run # %s\non: %s\noff: %s', nt+1, gridCount.on, gridCount.off);
	}
}