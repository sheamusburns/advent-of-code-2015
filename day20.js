var input = 34000000;
var houses = [];

var arr = [];
var count = 0;


console.time('objOrArr'); //testing object vs array speed
for (var elf = 1; elf < 958309; elf ++) {
	if (count % 1000 === 0) {
		process.stdout.write('.')
	}
	for (var house = elf; house <= 958309; house += elf){
		// console.log(house, elf)
		if (!houses[house]) {
			houses[house] = 0;
		}
		if (house % elf === 0){
			houses[house] += 10*elf;
		}
		if (houses[house] >= input) {
			console.timeEnd('objOrArr');
			console.log('done bitches');
			console.log('house %s', house)
			return;
		}
	}
	count++
}
console.timeEnd('objOrArr');
console.log(houses);




// this does nothing

// equation(input);


// function equation(input) {
// 	var sum = 0;
// 	var count = 0;
// 	for (var elf = 1; elf < 1000000; elf ++) {
// 		if (input % elf === 0) {
// 			input = input - elf*10;
// 			count += elf*10;
// 			sum += elf;
// 			console.log(input, elf, count)
			
			
// 		}
// 		if (input === 0) {
// 			console.log(count);
// 			return;
// 		}
// 	}
// }


