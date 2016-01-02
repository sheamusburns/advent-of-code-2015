var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day18Input.js', 'utf8')).options.split('\n');
var inputArr = [];
var cycleArr = [];
var grid = {};
var tempGrid = {};
var value, neighbors;
var gridCount = {
	on: 0,
	off: 0
};

input.forEach(function(obj){
	inputArr.push(obj.split(''));
});

inputArr.reduce(function(pre, curr, ind, arr){
	grid[pre] = {};
	curr.reduce(function(prev, curre, inde, arra){
		grid[pre][inde] = {
			val: curre, 
			neighbors: (function(r, c){
				var row = r, col = c, tempArr = [];
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

turnOnCorners();
cycle(100);



function turnOnCorners(){
	var len = inputArr.length-1;
	grid[0][0].val = '#';
	grid[0][len].val = '#';
	grid[len][0].val = '#';
	grid[len][len].val = '#';
}

function count(grid){
	gridCount.on = 0;
	gridCount.off = 0;
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
}

function cycle(numTimes){
	for (var nt = 0; nt < numTimes; nt++){
		for (obj in grid){
			thing = grid[obj];
			for (i in thing){
				thing[i].neighborVals = thing[i].neighbors.map(function(curr, ind, arr){
						return eval(curr);
				});
			}
		}
		cycleArr = [];
		for (key in grid) {
			row = grid[key];
			tempArr = [];
			for (item in row){
				value = row[item].val;
				tempVal = value;
				neighVals = row[item].neighborVals
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
				}
				tempArr.push(tempVal);
			}
			cycleArr.push(tempArr);
		}
		cycleArr.reduce(function(pre, curr, ind, arr){
			curr.reduce(function(prev, curre, inde, arra){
				grid[pre][inde].val = curre;
				grid[pre][inde].neighborVals = []; 
				return pre+1;
			}, 0)
			return pre+1;
		}, 0);
		turnOnCorners();
		count(grid);
		(nt === numTimes-1) ? console.log('\nrun # %s\non: %s\noff: %s', nt+1, gridCount.on, gridCount.off): 'cycle'
	}
}