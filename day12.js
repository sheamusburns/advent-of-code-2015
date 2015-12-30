var fs = require('fs');
var input = '';
var data = fs.readFileSync('./day12Input.js', 'utf8');
data = JSON.parse(data.split('\n').join(''));
var numbers = [];

crawlObj(data);
addArr(numbers);

function crawlObj(obj) {
	//remove second condition expression for solution to part 1
	if (!hasRed(obj) || (hasRed(obj) && Array.isArray(obj))){ 
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)){
				if (typeof obj[prop] === 'object') {
					crawlObj(obj[prop]);
				} else if (typeof obj[prop] === 'number'){
					numbers.push(obj[prop]);
				}
			} 
		}
	}
}

function hasRed(obj) {
	for (prop in obj){
		if (obj.hasOwnProperty(prop)){
			if (obj[prop] === 'red') {
				return true;
			}
		}
	}
	return false;
}

function addArr(arr){
	var sum = 0;
	for (i in arr){
		sum += Number(arr[i]);
	}
	console.log('sum total:', sum)
}