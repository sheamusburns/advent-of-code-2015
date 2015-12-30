
var input = 'hxbxwxba';
counter(input, 2);

function counter(str, num) {
	var count = 0;
	var str = str;
	var arr = str.split('');
	var ind = arr.length-1;
	var column = ind;
	var activeVal;
	var goodPass = false;
	var charStraights = (function(){
		var tempArr = [];
		allStraights = [];
		for (char = 97; char < 121; char++) {
			tempArr = [];
			tempArr.push(char, char+1, char+2);
			tempArr.forEach(function(item, index, arr) {
				arr[index] = String.fromCharCode(item);
			});
			allStraights.push(tempArr.join(''));
		}
		return new RegExp(allStraights.join('|'));
	})();

	while (str !== 'zzzzzzzz' && goodPass < num) {
		if (count % 100000 === 0) {
			process.stdout.write('.');
		}
			tabulate();
	}
	if (str === 'zzzzzzzz') console.log('no available passwords based on input')


	function tabulate(){
		if (column < arr.length-1) column = arr.length-1;
		activeVal = arr[column].charCodeAt(0);
		if (validateChar(activeVal)) {
			activeVal++;
			arr[column] = String.fromCharCode(activeVal);
			str = arr.join('');
			if (validatePassword(str)) {
				goodPass++;
				console.log('new password:', str);
			} else {
				count++
				return false
			}
		}	else {
			carryOver();
			(validatePassword(str))
			? console.log('new password:', str)
			: function(){
				count++
				return false;
			}
		}	
	}

	function validateChar(charCode) {
		if (charCode > 96 && charCode < 122) return charCode
		else false;
	}	

	function carryOver() {
		arr[column] = 'a';
		column--;
		if (!validateChar(arr[column].charCodeAt(0))) {
			arr[column] = 'a'
			carryOver()
		} else {
			arr[column] = String.fromCharCode(arr[column].charCodeAt(0)+1);
		}
		str = arr.join('')
	}

	function validatePassword(pw) {
		var validate = true;
		if (pw.length !== 8) {
			//console.error('password needs to be 8 characters');
			validate = false;
		} if (!pw.match(charStraights)) {
			//console.error('password must contain 1 straight sequence');
			validate = false;
		} if (pw.match(/i|o|l/)) {
			//console.error('password cannot contain i, o, or l');
			validate = false;
		} if ((pw.match(/(\w)\1/g) && pw.match(/(\w)\1/g).length < 2) || (!pw.match(/(\w)\1/g))) {
			//console.error('password needs two sets of repeating characters');
			validate = false;
		} if (pw.match(/(\w)\1/g) && pw.match(/(\w)\1/g).length >= 2) {
			checkRep(pw);
		}
		function checkRep (pw){
			var repArr = pw.match(/(\w)\1/g);
			var repArrStr = repArr.join(' ');
			var dupl = false;
			var repCount= 0;
			for (i in repArr) {
				repCount = 0
				for (var j = 0; j < repArr.length; j++){
					if (repArr[i] === repArr[j]) {
						repCount++
					}
				}
				if (repCount > 1) {
					dupl = true;
					validate = false;
				}
			}
		}
		if (validate) {
			console.log('validation passed')
			return true;
		} else {
			return false;
		}
	}
}