var md5 = require('md5');
var key = 'iwrupvqb',
var min = Number(process.argv[2] || 0),
var max = Number(process.argv[3] || 10000000);


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
				if (md5(key + chunkStart).substr(0,6)==='000000') {
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
