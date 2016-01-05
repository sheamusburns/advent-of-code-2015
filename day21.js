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

for (i in weapons){
	console.log(i);
	if(weapons.hasOwnProperty(i)){
		console.log(weapons[i].cost);
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