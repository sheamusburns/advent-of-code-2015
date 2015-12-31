var fs = require('fs');
var csv = require('csv');
var input = csv.stringify(fs.readFileSync('./day14Input.js', 'utf8')).options.split('\n');
var rules = {};
var leaderBoard = [];
var points = {};
var pointsBoard = [];


//set values
input.forEach(function(line, ind, arr){
	var reindeer = line.match(/[A-Z]\w+/g)[0];
	var speed = line.match(/\d+(?= km)/g)[0];
	var flyTime = line.match(/\d+(?= sec)/g)[0];
	var restTime = line.match(/\d+(?= sec)/g)[1];
	points[reindeer] = 0
	rules[reindeer] = {
		speed: Number(speed),
		flyTime: Number(flyTime),
		restTime: Number(restTime)
	}
})


//run program
for (var i = 0; i < 2503; i++) {
	reindeerPositions(i);
	points[leaderBoard[0][0]]++;
}
setPointsBoard();
console.log('Part 1: final leaderboard by distance\n', leaderBoard);
console.log('Part 2: final points for each reindeer\n', pointsBoard);


//define functions
function reindeerPositions(numSecs){
	var rein, reinDist, reinTime;
	leaderBoard = [];
	for (prop in rules){
		if (rules.hasOwnProperty(prop)){
			rein = rules[prop];
			reinTime = 0;
			reinDist = 0;
			for (var second= 0; second <= numSecs; second++){
				go(second);
			}
		}
		leaderBoard.push([prop, reinDist]);
	}
	leaderBoard.sort(function(a, b){
			return b[1] - a[1];
	});

	function go(second){
		if (second < reinTime + rein.flyTime) {
			reinDist += rein.speed;
		} else if (second >= reinTime + rein.flyTime && second < reinTime + rein.flyTime +rein.restTime) {
			'rest';
		} else {
			reinTime = second;
			go(second); 
		}
	}
}

function setPointsBoard(){
	for (prop in points){
		pointsBoard.push([prop, points[prop]]);
	}
	pointsBoard.sort(function(a, b){
			return b[1] - a[1];
	});
}
