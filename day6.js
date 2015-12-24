var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day6input.js', 'utf8')).options.split('\n');
var lights = new LightGrid();
var commands = ['turn on ', 'turn off ', 'toggle '];

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
			//lights.turnOn(start, end);
			lights.adjustBrightness(start, end, 1);
			break;
		case commands[1]:
			//lights.turnOff(start, end);
			lights.adjustBrightness(start, end, -1);
			break;
		case commands[2]:
			//lights.toggle(start, end);
			lights.adjustBrightness(start, end, 2);
			break;
	}
});

var count = 0;
// console.log(lights.grid[0].length)
for (var i = 0; i < lights.grid.length; i++){
	for (var j = 0; j < lights.grid[i].length; j++) {
		if (lights.grid[i][j]) {
			count += lights.grid[i][j];
			//count++;
		}
	}
}
console.log('light brightness: ', count);
//console.log('lights on: %s\nlights off: %s', count, (1000*1000 - count));

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

	this.adjustBrightness = function(start, end, val) {
		var startX = parseInt(start[0]);
		var startY = parseInt(start[1]);
		var endX = parseInt(end[0]);
		var endY = parseInt(end[1]);
		
		for (var i = startX; i <= endX; i++){
			for (var j = startY; j <= endY; j++) {
				if (!that.grid[i][j]) {
					that.grid[i][j] = 0;
					that.grid[i][j] += val;
					if (that.grid[i][j] < 0) {
						that.grid[i][j] = 0;
					}
				} else {
					that.grid[i][j] += val;
					if (that.grid[i][j] < 0) {
						that.grid[i][j] = 0;
					}
				}
			}
		}
	};
	this.turnOn = function(start, end) {
		var startX = parseInt(start[0]);
		var startY = parseInt(start[1]);
		var endX = parseInt(end[0]);
		var endY = parseInt(end[1]);
		for (var i = startX; i <= endX; i++){
			for (var j = startY; j <= endY; j++) {
				if (!that.grid[i][j]) {
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
				that.grid[i][j] = !that.grid[i][j];
			}
		}
	};
}