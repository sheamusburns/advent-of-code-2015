var passwordExactLength = 8;
var validateChar = function(char) {
	if (char > 96 && char < 123) {
		return char
	}
	else {
		console.error('validation failed: %s', char);
		return false;
	}
}
var oldPass = new Password('abcdefghijklmnopqrstuvwxyz');

function Password(pass) {
	this.pwStr = pass;
	this.pwArr = (function(){
		return pass.split('');
	})();
	this.incr = function(){
		this.pwArr.forEach(function(va, ind, arr){
		va = va.charCodeAt(0);
		va++;
		(validateChar(va)) ? arr[ind] = va : console.error('conversion failed: %s', va);
		// va++;
		// arr[ind] = String.fromCharCode(va);
	})
	console.log(decodeURIComponent('%61'));
	//console.log(oldPass);
	}
}

oldPass.incr();
