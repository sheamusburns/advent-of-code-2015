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


playerTurn()


function playerTurn() {
	
	printStats();
	castSpell(selectSpell());
	

	function selectSpell() {
		var spell;
		shuffle(availSpells);
		if (availSpells.length > 0) {
			spell = availSpells.shift();
			if (!spell.duration) availSpells.push(spell)
			else activeSpells.push(spell);
		}
		return spell
	}
	function castSpell(spell) {
		console.log('casting', spell);
		player.mana -= spells[spell].cost;
		(spells[spell].damage || spells[spell].effect) ? boss.hitPoints -= spells[spell].damage : boss.hitPoints -= spells[spell].effect.damage;
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