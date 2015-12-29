var passwordExactLength = 8;
var validateChar = function(charCode) {
	if (charCode > 96 && charCode < 122) { //checks if the character can be incremented
		return charCode
	}
	else {
		console.error('validation failed: %s', charCode);
		return false;
	}
}
var charStraights = (function(){
	tempArr = [];
	allStraights = [];
	for (char = 97; char < 121; char++) {
		tempArr = [];
		tempArr.push(char, char+1, char+2);
		tempArr.forEach(function(item, ind, arr) {
			arr[ind] = String.fromCharCode(item);
		});
		allStraights.push(tempArr.join(''));
	}
	console.log(allStraights);
	return new RegExp(allStraights);
})();
var oldPass = new Password('aaadzf');

function Password(pass) {
	that = this;
	this.pwOrigStr = pass;
	this.pwNewStr = '';
	this.pwArr = pass.split('');

	this.incr = function(){

		run(this.pwArr.length-1)
		console.log(this.pwArr);
		console.log('pass string: %s', this.pwArr.join(''))
		validatePassword(this.pwArr.join('')) ? console.log('good pass') : console.error('bad pass')

		function run(i){
			(i > 0) ? 
				(increment(i)) ? true : run(i-1)
			: false

			function increment(ind) {
				var activeVal = that.pwArr[ind];
				activeVal = activeVal.charCodeAt(0);
				console.log(activeVal);
				if (validateChar(activeVal)) {
					console.log("it's validated, incrementing");
					activeVal++;
					that.pwArr[ind] = String.fromCharCode(activeVal);
					return true;
				}	else {
					console.error('at index: ', that.pwArr.length-1);
					return false;
				}
			}
		}

		function validatePassword(pw) {
			var validate = true;
			if (pw.length !== 8) {
				console.error('password needs to be 8 characters');
				validate = false;
			} if (!pw.match(charStraights)) {
				console.error('password must contain a striaght');
				validate = false;
			} if (pw.match(/i|o|l/)) {
				console.error('password cannot contain i, o, or l');
				validate = false;
			} if (pw.match(/(\w)\1/g).length > 2
				&& pw.match(/(\w)\1)/g)[0] !== pw.match(/(\w)\1)/g)[1]) {
				validate = true;
			}
			if (validate) {
				return true;
			} else {
				return false;
			}
		}
	}
}

oldPass.incr();
