const Validator = {
	isValidEmail: function(email){
		return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);
	},

	isValidMobile: function(mobile){
		return /^\d+$/.test(mobile);
	},

	isValidPassword: function(password){
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&])(?=.{8,21})/.test(
			password
		);
	},

	isValidCode: function(code){
		return /^[a-z0-9_\d]+$/i.test(code);
	},

	isValidOTP: function(code){
		return /^[0-9]+$/i.test(code) && code.length === 6;
	},

	isEmpty: function(string){
		return string === "";
	},
	
	isNotEmpty: function(string){
		return string !== "";
	},

	isShort: function(string, length){
		return string.length <= length;
	},

	isFloat: function(number){
		return !isNaN(number);
	},

	isDigitsOnly: function(number){
		return /^[0-9]*$/.test(number);
	},
	
	isAllowedString: function(string){
		return /[A-Za-z0-9-_]/gm.test(string);
	}
};

export default Validator;
