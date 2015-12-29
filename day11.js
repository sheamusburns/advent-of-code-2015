

var oldPass = new Password('abcdefgd');
oldPass.findNextPassword();


function Password(pass) {
	that = this;
	this.pwOrigStr = pass;
	this.pwNewStr = '';
	this.pwArr = pass.split('');

	this.findNextPassword = function(){


		console.log('input password: %s', this.pwOrigStr)
		run(this.pwArr.length-1)
		this.pwNewStr = this.pwArr.join('');
		console.log(this.pwNewStr);
		validatePassword(this.pwNewStr) ? console.log('validation passed') : function(){
			console.error('validation failed');
		}()
	

		function run(i){
			(i > 0) ? 
				(increment(i)) ? true : run(i-1)
			: false

			function increment(ind) {
				var activeVal = that.pwArr[ind];
				activeVal = activeVal.charCodeAt(0);
				if (validateChar(activeVal)) {
					activeVal++;
					that.pwArr[ind] = String.fromCharCode(activeVal);
					return true;
				}	else {
					console.error('could not increment at index: ', that.pwArr.length-1);
					return false;
				}
			}
			function validateChar(charCode) {
				if (charCode > 96 && charCode < 122) { //checks if the character can be incremented
					return charCode
				}
				else {
					console.error('validation failed: %s', charCode);
					return false;
				}
			}	
		}

		function validatePassword(pw) {
			var validate = true;
			var charStraights = (function(){
				tempArr = [];
				allStraights = [];
				for (char = 97; char < 121; char++) {
					tempArr = [];
					tempArr.push(char, char+1, char+2);
					tempArr.forEach(function(item, ind, arr) {
						arr[ind] = String.fromCharCode(item);
					});
					allStraights.push(tempArr.join('|'));
				}
				return new RegExp(allStraights);
			})();
			
			if (pw.length !== 8) {
				console.error('password needs to be 8 characters');
				validate = false;
			} if (!pw.match(charStraights)) {
				console.error('password must contain 1 straight sequence');
				validate = false;
			} if (pw.match(/i|o|l/)) {
				console.error('password cannot contain i, o, or l');
				validate = false;
			}// if (pw.match(/(\w)\1/g) && pw.match(/(\w)\1/g) < 2) {
			// 	checkRep(pw)
			// 	console.error('password needs two sets of repeating characters');
			// 	validate = false;
			// }
			function checkRep (pw){
				var repArr = pw.match(/(\w)\1/g);
				var repArrStr = repArr.join(' ');
				var rep = false;
				for (i in repArr) {
					var tRegEx = new RegExp(repArr[i]);
					if (repArrStr.match(tRegEx)) {
						validate = false;
						rep = true;
					}
				}
				if (rep) console.log('password cannot contain duplicate sets of repeating characters');
			}
			if (validate) {
				return true;
			} else {
				return false;
			}
		}
	}
}
