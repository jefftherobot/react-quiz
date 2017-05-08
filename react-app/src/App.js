import 'whatwg-fetch'
import React from 'react';
import update from 'react-addons-update';
import Quiz from './components/Quiz';
import Result from './components/Result';
import NotLicensed from './components/NotLicensed';
import NextSteps from './components/NextSteps';
import validate from './helpers/validate';
import api from './helpers/api';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			questions:{},
			counter: 0,
			questionId: 1,
			question: '',
			questionName: '',
			view: 'Quiz',
			quizType: '',
			answerOptions: [],
			answerConditional: [],
			answer: '',
			answers: {
				salesPrice: {
					salesPrice1:'75000',
					salesPrice2:'0',
					salesPrice3:'0'
				}
			},
			result: []
		};

		this.handleInputSelected = this.handleInputSelected.bind(this);
		this.handleTextTypeChange = this.handleTextTypeChange.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.setNextSteps = this.setNextSteps.bind(this);
		this.postForm = this.postForm.bind(this);
	}

	componentDidMount() {
		//http://www.objgen.com/json/models/bZuG

		fetch('../react-app/data/quiz.json')
			.then(response => response.json())
			.then(data => {
				// console.log(data)

				// get data attr stating user selection of purchase or refinance
				let $type = document.getElementById('container').getAttribute('data-type');
				console.log("You're taking the " + $type + " quiz!");

				this.state.questions.length = data[$type].length;

				this.setState({
					quizType: $type,
					questions: data[$type],
					question: data[$type][0].question,
					validation: data[$type][0].validation,
					progress: data[$type][0].progress,
					answerOptions: data[$type][0].answers,
					answerConditional: data[$type][0].answers[0].conditional,
					answerType: data[$type][0].type,
					questionName: data[$type][0].name
				})

				let updatedAnswers = update(this.state.answers, {
					$merge: { LoanPurpose: this.state.quizType }
				});

				this.setState({ answers: updatedAnswers});

				//console.log(this.state)
			})
			.catch(function (error) {
				console.log('Request failed', error);
		});
	}


	// HANDLE USER INPUT ==============================================================================
	// ================================================================================================

	// handlers called from AnswerOption
	// this one watches the value in single line text components
	handleTextTypeChange(event) {
		let target = event.currentTarget;
		let purchasePrice            = (target.id.indexOf('salesPrice1')!=-1) ? target.value : this.state.answers.salesPrice.salesPrice1,
			downpaymentPercent       = (target.id.indexOf('salesPrice2')!=-1) ? target.value : this.state.answers.salesPrice.salesPrice2,
			downpaymentDollarAmount  = (target.id.indexOf('salesPrice3')!=-1) ? target.value : this.state.answers.salesPrice.salesPrice3;

		let setAnswers = {
			init:() => {
				setAnswers.update();
			},

			checkMin:() => {
				if (validate.minVal(target.value, 74999)) {
					document.getElementById('error-messages').innerHTML = '';
				} else if (validate.number(target.value) == false) { 
					validate.addError('error-messages', 'Please enter positive numbers only.  All fields are required.')
				} else {
					validate.addError('error-messages', 'Purchase price must be at least $75K')
				}
			},

			update:() => {
				if (validate.number(target.value) == true) {
					document.getElementById('error-messages').innerHTML = '';

					if (target.id == 'salesPrice1') {
						document.getElementById(target.id).addEventListener('focusout', function(){ setAnswers.checkMin(); });
					}
					
					if (target.id.indexOf('salesPrice2')!=-1 || target.id.indexOf('salesPrice1')!=-1){
						downpaymentDollarAmount = Math.floor(purchasePrice*(downpaymentPercent/100));
						if (downpaymentDollarAmount >= purchasePrice) {
							validate.addError('error-messages', 'Down payment percentage must be less than 100%.');
							downpaymentPercent = 99;
						 	downpaymentDollarAmount = Math.floor(purchasePrice*(downpaymentPercent/100));
						} else { document.getElementById('error-messages').innerHTML = ''; }
					} else if (target.id.indexOf('salesPrice3')!=-1){
						 downpaymentPercent     = Math.floor(((purchasePrice/(purchasePrice - downpaymentDollarAmount))-1)*100)
						 if (downpaymentPercent >= 100 || downpaymentPercent < 0) {
						 	validate.addError('error-messages', 'Down payment must be less than purchase price.');
						 	downpaymentPercent = 99;
						 	downpaymentDollarAmount = Math.floor(purchasePrice*(downpaymentPercent/100));
						 } else { document.getElementById('error-messages').innerHTML = ''; }
					}
				} else {
					validate.addError('error-messages', 'Please enter positive numbers only.  All fields are required.')
				}

				this.setUserAnswer({
					'salesPrice1':purchasePrice,
					'salesPrice2':downpaymentPercent,
					'salesPrice3':downpaymentDollarAmount

				}, true)
			}
		};

		if (target.id.indexOf('salesPrice')!=-1) {
			// Check for salesprice input group and do down payment calculations
			setAnswers.init();
		} else {
			// just set user answer and proceed onward!
			this.setUserAnswer(target.value);
		}
	}

	handleInputSelected(event) {
		const inputType = event.currentTarget.type;

		let inputs = {
			'radio':() => {
				this.setUserAnswer(event.currentTarget.value);
				this.showNextScreen(event.currentTarget.value);
			},
			'submit': () => {
				this.validateInput();
			},
			'default': () => {
				// check whether user is clicking label of radio button, actually button is hidden
				if (event.currentTarget.tagName == 'LABEL') {
					this.setUserAnswer(event.currentTarget.children[0].getAttribute('value'));
					this.showNextScreen(event.currentTarget.children[0].getAttribute('value'));
				} else {
					console.log(`${type} doesn't have a function assigned to it`)
				}
			}
		}

		return (inputs[inputType] || inputs['default'])();
	}


	// SET VALUES IN STATE, VALIDATE ANSWERS ==============================================================================
	// ====================================================================================================================

	setUserAnswer(answer, isTextGroup=false) {
		console.log('you picked',answer)

		//https://facebook.github.io/react/docs/update.html
		let updatedAnswers = {};

		if(!isTextGroup){
			updatedAnswers = update(this.state.answers, {
				$merge: {[this.state.questionName] : answer}
			});
		}else{
			updatedAnswers = update(this.state.answers, {
				[this.state.questionName] : {
					$apply: function(x){
						let _answer = answer;
						if(x){
							return update(x, {$merge: answer});
						}
						return _answer;
					}
				}
			});
		}

		this.setState({
			answer: answer,
			answers: updatedAnswers
		});
	}

	validateInput() {
		const validation = this.state.validation;
		const answer = this.state.answer;
		console.log(validation);

		let validationType = {
			'zip':() => {
				if ( validate.zip(answer) == true ) {
					// zip to state conversion
					this.getUsState(this.state.questionName, answer);
				} else {
					validate.addError('error-messages', 'Please enter a 5-digit zip code');
				}
			},
			'number': () => {
				if ( validate.number(answer) == true ) {
					this.showNextScreen(event.currentTarget.value);
				} else {
					validate.addError('error-messages', 'Please enter numbers only');
				}
			},
			'textGroup': () => {
				if ( Object.keys(answer).length == 0 ) {
					validate.addError('error-messages', 'Please enter positive numbers only.  All fields are required.');
				} else {
					for (var i = 0; i < Object.keys(answer).length; i++) {
						const itemKey = 'salesPrice' + [i+1];
						console.log(itemKey);
						if (validate.number(answer[itemKey]) == true ) {
							console.log('good');
							if (i == Object.keys(answer).length - 1) {
								console.log('last item, onward!');
								this.showNextScreen(event.currentTarget.value);
							}
						} else {
							validate.addError('error-messages', 'Please enter positive numbers only.  All fields are required.')
							console.log('no good');
							return;
						}
					}
				}
			},
			'default': () => {
				console.log(`${type} doesn't have a validation function assigned to it`)
				this.showNextScreen(event.currentTarget.value);
			}
		};

		(validationType[validation] || validationType['default'])();
	}

	getUsState(question, answer) {
		// Send ZIP to google API to get state
		api.getState(answer).then((result) => {
			console.log('result', result);

			// If not a valid ZIP code or there's another API error, give error message
			if (result == 'api error') {
				validate.addError('error-messages', 'Please enter a valid USA ZIP code');
			} else {
				let usState = result;

				// IN FUTURE: send ZIP to Mortech to check if it's a licensed state
				// TEMP: check from list
				if ( question == "ZipCode" && (usState == 'Alaska' || usState =='Hawaii' || usState =='Montana' || usState =='Missouri' || usState =='New York' || usState =='Nevada' || usState =='North Dakota' || usState =='South Dakota' || usState =='Wyoming' || usState =='Idaho')) {
						this.setState({ view: 'NotLicensed' }); // kick user out of quiz
				} else {
					// check which ZIP field we're looking at, property zip or current zip
					let propName = question == "ZipCode" ? 'State' : 'borrower-state';

					// hooray onward! add zip and state to answers object.
					let updatedAnswers = update(this.state.answers, {
						$merge: {
							[propName]: usState
						}
					});

					this.setState({ answers: updatedAnswers});
					this.showNextScreen(answer);
				}
			}
		});
	}


	// MOVE ON TO NEXT QUESTION ===========================================================================================
	// ====================================================================================================================

	showNextScreen(answerValue){
		if (this.state.questionId < this.state.questions.length) {
			setTimeout(() => this.setNextQuestion(answerValue), 300);
		} else {
			// quiz is done!
			setTimeout(() => this.setResults(this.getResults()), 300);
		}
	}

	setNextQuestion(answerValue) {
		const answers = this.state.questions[this.state.counter].answers;
		const errorContainer = document.getElementById('error-messages');

		// if error messages remain from last question, remove
		errorContainer.innerHTML = '';

		// identify which answer option is conditional
		for ( var i = 0; i < answers.length; i++ ) {
			if ( answers[i].value == answerValue ) {
				var position = i;
				var conditional = this.state.questions[this.state.counter].answers[position].conditional;
			}
		}

		// check whether answer is conditional and has follow up question
		if ( typeof conditional == 'object' && this.state.question !== conditional[0].question ) {
			console.log('conditional question');
			var counter = this.state.counter;
			var questionId = this.state.questionId;
			var question = conditional[0].question;
			var questionName = conditional[0].name;
			var answerOptions = conditional[0].answers;
			var answerType = conditional[0].type;
			var validation = conditional[0].validation;
		} else {
			var counter = this.state.counter + 1;
			var questionId = this.state.questionId + 1;
			var question = this.state.questions[counter].question;
			var questionName = this.state.questions[counter].name;
			var answerOptions = this.state.questions[counter].answers;
			var answerType = this.state.questions[counter].type;
			var validation = this.state.questions[counter].validation;
		}

		this.setState({
			counter: counter,
			questionId: questionId,
			question: question,
			questionName: questionName,
			progress: this.state.questions[counter].progress,
			answerOptions: answerOptions,
			answerConditional: this.state.questions[counter].answers[0].conditional,
			answerType: answerType,
			validation: validation,
			answer: ''
		});
	}


	// SET RESULTS AT END OF QUIZ =========================================================================================
	// ====================================================================================================================

	setResults(result) {
		this.setState({
			result: result
		});
	}

	getResults() {
		//flatten the answers object
		let flattened = api.flatten(this.state.answers);
		console.log(flattened);

		// build call for the api
		let call = api.buildLoanCall(flattened);
		console.log(call);
		
		//CURRENTLY GETTING ACCESS CONTROL ALLOW ORIGIN ERROR
		// fetch(call)
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((data) => {
		// 		this.state.result = data

		// 		//only set results view after data returns sucessfully

		// 		this.setState({
		// 			view: 'Result'
		// 		});
		// 	})
		// 	.catch(function(err){
		// 		console.error('API error: ', err);
		// 		return 'api error';
		// 	});
		fetch('http://www.mocky.io/v2/58f7bef7100000fb2a24f25c')
			.then(response => response.json())
			.then(data => {
				this.state.result = data

				//only set results view after data returns sucessfully

				this.setState({
					view: 'Result'
				});
			})
	}


	// NEXT STEPS AFTER LOAN SELECTION ====================================================================================
	// ====================================================================================================================

	setNextSteps(loan) {
		console.log(loan);
		this.setState({ 
			view: 'NextSteps',
			loan: loan 
		});
	}

	postForm(e) {
		e.preventDefault();
		
		//return call;
	}


	// RENDER VIEWS =======================================================================================================
	// ====================================================================================================================

	renderQuiz() {
		return (
			<Quiz
				answer={this.state.answer}
				answerOptions={this.state.answerOptions}
				answerConditional={this.state.answerConditional}
				answerType={this.state.answerType}
				questionId={this.state.questionId}
				question={this.state.question}
				questionName={this.state.questionName}
				questionTotal={this.state.questions.length}
				progress={this.state.progress}
				onAnswerSelected={this.handleInputSelected}
				onTextTypeChange={this.handleTextTypeChange}
				validateInput={this.validateInput}
			/>
		);
	}

	renderResult() {
		return (
			<Result
				quizResult={this.state.result}
				quizType={this.state.quizType}
				quizQuestions={this.state.questions}
				answerOptions={this.state.answerOptions}
				onLoanSelected={this.setNextSteps}
			/>
		);
	}

	renderNextSteps() {
		// flatten answers object and merge with loan object
		let flattened = api.flatten(this.state.answers);
		let merged = api.mergeObjs(flattened, this.state.loan);

		// directly edit the merged object, update field names for velocify reqs
		api.editKey(merged, 'salesPrice.salesPrice1', 'salesPrice');
		api.editKey(merged, 'salesPrice.salesPrice2', 'downPaymentPercentage');
		api.editKey(merged, 'salesPrice.salesPrice3', 'DownPayment');

		// put merged object into an array, in order to map it
		let hiddenFields = [];
		for (var item in merged) {
			hiddenFields.push({[item]: merged[item]});
		}

		return (
			<NextSteps
				hiddenFields={hiddenFields}
				loan={this.state.loan}
				onFormSubmit={this.postForm}
			/>
		)
	}

	render() {
		let view = this.state.view;
		let component;

		let viewType = {
			'NotLicensed':() => {
				component = <NotLicensed />;
			},
			'Result':() => {
				component = this.renderResult();
			},
			'NextSteps':() => {
				component = this.renderNextSteps();
			},
			'default':() => {
				component = this.renderQuiz();
			}
		};

		(viewType[view] || viewType['default'])();

		return (
			<div className="App">
				{component}
			</div>
		);
	}
}

export default App;
