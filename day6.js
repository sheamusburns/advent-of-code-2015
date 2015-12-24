var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day6input.js', 'utf8')).options.split('\n');
var lights = new LightGrid();
var commands = ['turn on ', 'turn off ', 'toggle '];
// lights.turnOn([0,0], [299, 1]);
// lights.turnOff([0,0], [0, 0]);
input.forEach(function(item, ind, arr) {
	var command;
	var start;
	var end;
	for (var i = 0; i < commands.length; i++) {
		if (item.indexOf(commands[i]) !== -1) {
			command = commands[i];
			throughInd = [];
			throughInd.push(item.indexOf('through ') -1);
			throughInd.push(item.indexOf('through ') + 8);
			start = item.slice(command.length, throughInd[0]);
			start = start.split(',');
			end  = item.slice(throughInd[1])
			end = end.split(',');

		}
	}
	switch (command) {
		case commands[0]:
			lights.turnOn(start, end);
			break;
		case commands[1]:
			lights.turnOff(start, end);
			break;
		case commands[2]:
			lights.toggle(start, end);
			break;
	}
})

var count = 0;
// console.log(lights.grid[0].length)
for (var i = 0; i < lights.grid.length; i++){
	for (var j = 0; j < lights.grid[i].length; j++) {
		if (lights.grid[i][j]) {
			count++
		}
	}
}
console.log('lights on: %s\nlights off: %s', count, (1000*1000 - count));


 


function LightGrid() {
	var that = this;

	
	var matrix= [];
	for (var i = 0; i <1000; i++) {
		var tempRow = new Array(1000);
		tempRow.forEach(function(item, ind, arr){
			arr[ind] = 0;
		})
		matrix.push(tempRow);
	}
		
	this.grid = matrix;
	//console.log(that.grid);

	this.turnOn = function(start, end) {
		var startX = parseInt(start[0]);
		var startY = parseInt(start[1]);
		var endX = parseInt(end[0]);
		var endY = parseInt(end[1]);
		//console.log(startX, startY, endX, endY)
		for (var i = startX; i <= endX; i++){
			//console.log(that.grid[i]);
			for (var j = startY; j <= endY; j++) {
				//console.log(that.grid[i][j])
				if (!that.grid[i][j]) {
					//console.log('switching on');
					that.grid[i][j] = true;
				}
			}
		}

	};
	this.turnOff = function(start, end) {
		var startX = parseInt(start[0]);
		var startY = parseInt(start[1]);
		var endX = parseInt(end[0]);
		var endY = parseInt(end[1]);

		for (var i = startX; i <= endX; i++){
			for (var j = startY; j <= endY; j++) {
				if (that.grid[i][j]) {
					that.grid[i][j] = false;
				}
			}
		}


	};
	this.toggle = function(start, end) {
		var startX = parseInt(start[0]);
		var startY = parseInt(start[1]);
		var endX = parseInt(end[0]);
		var endY = parseInt(end[1]);

		for (var i = startX; i <= endX; i++){
			for (var j = startY; j <= endY; j++) {
				//that.grid[i][j] = !that.grid[i][j];
				//console.log('original value', that.grid[i][j]);
				// if (!that.grid[i][j]) {
				// 	that.grid[i][j] = true;
				// } else {
				// 	that.grid[i][j] = false;
				// }
				//console.log('\n\ntoggling ' + i + ' ' + j +
				//	'\nOriginal Val: ' + that.grid[i][j]);
					that.grid[i][j] = !that.grid[i][j];
				//	console.log('New Value: ' + that.grid[i][j]);
			}
		}

	};
}