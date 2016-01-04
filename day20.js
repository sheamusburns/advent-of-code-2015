var input = 34000000;
var houses = [];

var arr = [];
count = 0;


console.time('objOrArr'); //testing object vs array speed
for (var elf = 1; elf < 958309; elf ++) {
	elfHouseCount = 0;
	if (count % 1000 === 0) {
		process.stdout.write('.')
	}
	for (var house = elf; house <= 958309; house += elf){
		if (elfHouseCount === 50 ){ // Part 2
			break;
		} else if (!houses[house]) {
			houses[house] = 0;
		}
		if (house % elf === 0){
			//houses[house] += 10*elf; // Part 1
			houses[house] += 11*elf;  // Part 2
			elfHouseCount ++;
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
