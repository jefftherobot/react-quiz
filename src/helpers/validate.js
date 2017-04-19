// validation logic for quiz and form elements

var validate = {
	zip: function(zipcode) {
		const re = /\b\d{5}\b/g;
		const test = re.test(zipcode);

		return test;
	},

	number: function(number) {
		const re = /^\d*[\.]?\d+$/;
		const test = re.test(number);

		return test;
	},

	numberGroup: function(number, id) {
		const re = /^\d*[\.]?\d+$/;
		const test = re.test(number);

		// IN PROG - min purchase price of 75K
		// if (test == true && id == 'SalesPrice1') {
		// 	if ( number < 75000 ) {
		// 		console.log('too small')
		// 		validate.addError('error-messages', 'Purchase price must be at least $75K')

		// 		// return test;
		// 	} else {
		// 		console.log('return!');
		// 		// return test;
		// 	}
		// } else {
		// 	console.log('not the first');
		// 	// return test;
		// }

		return test;
	},

	addError: function(cls, message) {
		const errorContainer = document.getElementById(cls);
		const spanError = document.createElement('p');
		const text = document.createTextNode(message);
		const errorTitle = document.createElement('p');
		const textTitle = document.createTextNode('Error Messages');
		
		// create error container title
		errorTitle.setAttribute('tabindex', -1);
		errorTitle.appendChild(textTitle);

		// create the error element with message
		spanError.setAttribute('class', 'error');
		spanError.appendChild(text);
		
		// add error message.  if there is an existing message, remove it
		errorContainer.innerHTML = '';

		// append the error message and focus on it
		errorContainer.appendChild(errorTitle);
		errorContainer.appendChild(spanError);
		errorTitle.focus();
	}
}

export default validate