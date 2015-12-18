
var csv = require('csv'),
fs = require('fs'),
prompt = require('prompt'),
output,
tally = 0,
material,
amount,
inputSchema = {
	properties: {
		material: {
			type: 'number',
			message: 'Must be a number'
		}
	}
}


fs.readFile('./day2input.js', 'utf8', function(err, data){
	output = csv.stringify(data).options;
	output = output.split('\n');
	//console.log(output);
	prompt.start();
	console.log('Choose Ribbon [0] or Paper [1]')
	prompt.get(inputSchema, function(err, res){
		if (res.material === 0 || res.material === 1){
			switch (res.material) {
				case 0:
					material = 'ribbon';
					break;
				case 1:
					material = 'paper';
					break;
			}
			console.log('computing the amount of %s needed', material);
			output.forEach(function(item){
			item = item.split('x');
			//console.log(item);
			
			amount = amountMaterialsNeeded(item, material);
			tally += amount.needed;
		
		//console.log(tally);
			});
		} else {
		console.log('sorry you needed to enter 0 or 1 in the input')
		}

	console.log('final tally of how much %s is needed: %s feet', material, tally);
	});
	
});




function amountMaterialsNeeded(arr, material) {
	var l = Number(arr[0]),
	w = Number(arr[1]),
	h = Number(arr[2]),
	orderedArr = orderedSides(l, w, h), 
	paperNeeded, ribbonNeeded,
	smallestSideArea = orderedArr[0]*orderedArr[1],
	smallestSidePer = 2*orderedArr[0] + 2*orderedArr[1],
	volume = l*w*h;
	baseArea = function(){
		return (2*l*w) + (2*w*h) + (2*h*l);
	}();

	paperNeeded = baseArea + smallestSideArea;
	ribbonNeeded = smallestSidePer + volume;
	if (material === 'ribbon'){
		return {
			needed: ribbonNeeded
		};
	} else if (material === 'paper'){
		return {
			needed:paperNeeded
		};
	}

	function orderedSides(l, w, h){
		var orderedArr = [l, w, h];
		orderedArr = orderedArr.sort(sortNumber)
		//console.log(orderedArr);
		return orderedArr;
	}
}

function sortNumber(a,b){
	return(a-b);
}
