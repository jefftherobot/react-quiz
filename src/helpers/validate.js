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

	minVal: function(number, minimum) {
		const min = minimum;
		const test = +number > +minimum;

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