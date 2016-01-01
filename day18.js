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
						if  (i >= 0 && i <= 99 && j >= 0 && j <= 99){
							if ((i + ',' + j) !== (row + ',' + col)){
								tempArr.push('grid' + '[' + i + '][' + j+ '].val');
							}
						}
					}
				}
				return tempArr;
			})(pre, inde)
		} 
		return pre+1;
	}, 0)
	return pre+1;
}, 0);

tempGrid = grid;
// console.log(tempGrid);
cycle(4);


function cycle(numTimes){
	for (var nt = 0; nt < numTimes; nt++){
		gridCount.on = 0;
		gridCount.off = 0;
		for (key in grid) {
			row = grid[key];
			for (item in row){
				value = row[item].val;
				tempVal = value;
				neighbors = row[item].neighbors;
				tempArr = neighbors.map(function(thing){
					return eval(thing);
				});
				if (tempVal === '#') {
					if (tempArr.filter(function(val){
						return val === '#';
					}).length === 2 || tempArr.filter(function(val){
						return val === '#';
					}).length === 3) {
					tempval = '.';
					} 
				} else if (tempVal === '.') {
					if (tempArr.filter(function(val){
						return val === '#';
					}).length === 3){
					tempVal = '#';
					}
				}
				(tempVal === '#') ? gridCount.on++ : gridCount.off++;
				tempGrid[key][item].val = tempVal;
				// console.log('2', tempGrid[key][item].val);
			}
		}
		grid = tempGrid;
		console.log('run # %s\non: %s\noff: %s', nt+1, gridCount.on, gridCount.off);
	}
}