/*
* command format:
* node day4.js <num of zeroes to match> <min for check> <max for check>
*/

var md5 = require('md5'),
key = 'iwrupvqb',
numZeroes = Number(process.argv[2] || 5),
stringMatch = (function(numZeroes){
	var tempStr = '';
	for (var i = 0; i < numZeroes; i++) {
		tempStr += '0';
	}
	return tempStr;
})(numZeroes);
min = Number(process.argv[2] || 0),
max = Number(process.argv[3] || 1000000000);




(function mine(md5, key, min, max) {
	var chunkCount = 0,
	chunkStart,
	chunkEnd,
	chunkArr= [];

	getChunks(min);
	checkChunks();

	function getChunks(min) {
		var tempMin = min;
		for (var i = 0; i < parseInt(max/50000); i++){
			chunkArr.push([tempMin, tempMin + 50000]);
			tempMin = tempMin +50000;
		}
	}

	function checkChunks() {
		for (c in chunkArr) {
			chunkStart = chunkArr[c][0];
			chunkEnd = chunkArr[c][1];
			for (chunkStart; chunkStart <= chunkEnd; chunkStart++){
				if (md5(key + chunkStart).substr(0,numZeroes)===stringMatch) {
					console.log("we have a winner:\n%s : %s", chunkStart, md5(key+chunkStart));
					return chunkStart;
				}

				/* 
				* Lesson Learned -- console.log causes your memory to grow rapidly
				* Be careful logging to console inside long loops.
				* process.memoryUsage() function below was used to check the 
				* memory management during my testing. 
				*/

				// else {
				// 	console.log('nope: %s', chunkStart);
				// }

			}
			console.log(process.memoryUsage());
		}	
	}
})(md5, key, min, max);
