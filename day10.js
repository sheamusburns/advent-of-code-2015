var input = '1113222113';
var tempArr = [];
var regex = /(\d)\1+|\d/g

elfSpeak(50);

function elfSpeak(num) {
	var count = 0;
	//tested with while vs for loop. while is slightly faster.
	//console.time('loop');
	while (count < num) {
		input.match(regex).forEach(function(obj, ind, arr){
			tempArr[ind] = obj.length + obj.charAt(0);
		});
		input = tempArr.join('');
		count++
	}
	//console.timeEnd('loop');
	console.log('the length of the final number after %s iterations: %s', num, input.length);
}
