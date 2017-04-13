// validation logic for quiz and form elements

var validate = {
	zip: function(zipcode) {
		const re = /\b\d{5}\b/g;
		const test = re.test(zipcode);

		return test;
	},

	number: function(number) {
		const re = /^-?\d*[\.]?\d+$/;
		const test = re.test(number);

		return test;
	}
}

export default validate