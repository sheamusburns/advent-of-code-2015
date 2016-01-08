boss = {
	hitPoints: 51,
	damage: 9
}
player = {
	hitPoints: 50,
	mana: 500,
	armor: 0,
	damage: 0
}
var spells = {
	magicMissile: {
		cost: 53,
		damage: 4
	},
	drain: {
		cost: 73,
		damage: 2,
		healing: 2
	},
	shield: {
		cost: 113,
		effect: {
			duration: 6,
			armor: 7
		}
	},
	poison: {
		cost: 173,
		effect: {
			duration: 6,
			damage: 3
		}
	},
	recharge: {
		cost: 229,
		effect: {
			duration: 5,
			mana: 101
		}
	}
}
var availSpells = Object.keys(spells).slice();
var activeSpells = [];


playerTurn();
bossTurn();
console.log(activeSpells);

function playerTurn() {
	
	printStats();
	castSpell(selectSpell());
	

	function selectSpell() {
		var spell;
		shuffle(availSpells);
		if (availSpells.length > 0) {
			spell = availSpells.shift();
			if (!spell.duration) availSpells.push(spell)
			else activeSpells.push([spell, spells[spell].effect.duration]);
		}
		return spell
	}
	function castSpell(spell) {
		console.log('casting', spell);
		player.mana -= spells[spell].cost;
		if (availSpells.indexOf(spell) > 0) {
			boss.hitPoints -= spells[spell].damage;
		}
		for (i in activeSpells){
			 active = activeSpells[i];
			 (spells[active].damage || spells[active].effect) ? boss.hitPoints -= spells[active].damage : boss.hitPoints -= spells[active].effect.damage;
		}
		
		printStats();
	}
}
function bossTurn() {
	attackPlayer();
	function attackPlayer() {

	}
}
function printStats(){
	console.log('player', player);
	console.log('boss', boss);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}