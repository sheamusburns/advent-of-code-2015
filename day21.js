
var costArr = [];
var comboCost = 0;
var boss = {
	hitPoints: 104,
	damage: 8,
	armor: 1
};
var player = {
	hitPoints: 100,
	damage: 0,
	armor: 0
};
var weapons = {
	Dagger: new Weapon(8, 4, 0),
	Shortsword: new Weapon(10, 5, 0),
	Warhammer: new Weapon(25, 6, 0),
	Longsword: new Weapon(40, 7, 0),
	Greataxe: new Weapon(74, 8, 0)
};
var armor = {
	Leather: new Armor(13, 0, 1),
	Chainmail: new Armor(31, 0, 2),
	Splintmail: new Armor(53, 0, 3),
	Bandedmail: new Armor(75, 0, 4),
	Platemail: new Armor(102, 0, 5)
};
var rings = {
	damage1: new Ring(25, 1, 0),
	damage2: new Ring(50, 2, 0),
	damage3: new Ring(100, 3, 0),
	defense1: new Ring(20, 0, 1),
	defense2: new Ring(40, 0, 2),
	defense3: new Ring(80, 0, 3)
};
var ringCombos = [];
for (item in Object.keys(rings)) {
	ringCombos.push([Object.keys(rings)[item]]);
}
ringCombos = ringCombos.concat(k_combinations(Object.keys(rings), 2));
// console.log(ringCombos);

console.log('testing 1 weapon');
for (i in weapons){
	comboCost = 0;
	reset();
	buySupplies([weapons[i]]);
	testArsenal();
}

console.log('testing 1 weapon and 1 armor');
for (i in weapons){
	for (j in armor) {
		comboCost = 0;
		reset();
		buySupplies([weapons[i], armor[j]]);
		testArsenal();
	}
}

console.log('testing 1 weapon, 1 armor, and combo rings');
for (i in weapons){
	for (j in armor) {
		for (k in ringCombos){
			comboCost = 0;
			reset();
			tempRings = [];
			for (r in ringCombos[k]){
				tempRings.push(rings[ringCombos[k][r]]);
			}
			console.log(tempRings)
			buySupplies([weapons[i], armor[j]].concat(tempRings));
			testArsenal();
		}
	}
}

/* // Part 1
costArr.sort(function(a,b){
	return a-b;
});*/
// Part 2
costArr.sort(function(a,b){
	return b-a
})
console.log(costArr[0])



function testArsenal() {
	if (boss.hitPoints > 0 && player.hitPoints > 0) {
		hitBoss();
		if (boss.hitPoints <= 0) {
			// Part 1
			console.log('player wins :) ', comboCost);
			// costArr.push(comboCost);		
		}
		hitPlayer();
		if (player.hitPoints <= 0) {
			// Part 2
			console.log('player dies :( --------', comboCost);
			costArr.push(comboCost);
		} 
		
		testArsenal();
	}
}
function hitBoss(){
	if (boss.armor < player.damage) {
		boss.hitPoints = boss.hitPoints - (player.damage - boss.armor);
	} else boss.hitPoints--;
}
function hitPlayer(){
	if (player.armor < boss.damage) {
		player.hitPoints = player.hitPoints - (boss.damage - player.armor);
	} else boss.hitPoints--;
}
function reset(){
	boss = {
		hitPoints: 104,
		damage: 8,
		armor: 1
	};

	player = {
		hitPoints: 100,
		damage: 0,
		armor: 0
	};
}

function buySupplies(supplies){
	for (item in supplies) {
		supplyItem = supplies[item];
		comboCost += supplyItem.cost;
		player.damage += supplyItem.damage;
		player.armor += supplyItem.armor;
	}

}

function Supplies (cost, damage, armor){
	this.cost = cost;
	this.damage = damage;
	this.armor = armor;
}
function Weapon(cost, damage, armor){
	Supplies.call(this, cost, damage, armor);
}
function Armor(cost, damage, armor){
	Supplies.apply(this, arguments);
}
function Ring(cost, damage, armor){
	Supplies.apply(this, arguments);
}
function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	if (k > set.length || k <= 0) {
		return [];
	}
	
	if (k == set.length) {
		return [set];
	}
	
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	
	
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i+1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}