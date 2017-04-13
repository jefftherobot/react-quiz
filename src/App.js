import 'whatwg-fetch'
import React from 'react';
import update from 'react-addons-update';
import Quiz from './components/Quiz';
import Result from './components/Result';
import NotLicensed from './components/NotLicensed';
import validate from './helpers/validate';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			questions:{},
			counter: 0,
			questionId: 1,
			question: '',
			questionName: '',
			answerOptions: [],
			answerConditional: [],
			answer: '',
			answers: {},
			result: []
		};

		this.handleInputSelected = this.handleInputSelected.bind(this);
		this.handleTextTypeChange = this.handleTextTypeChange.bind(this);
	}

	componentDidMount() {
		//http://www.objgen.com/json/models/bZuG

		fetch('./data/quiz.json')
			.then(response => response.json())
			.then(data => {
				// console.log(data)

				// get data attr stating user selection of purchase or refinance
				let $type = document.getElementById('container').getAttribute('data-type');
				console.log("You're taking the " + $type + " quiz!");

				this.state.questions.length = data[$type].length;
			
				this.setState({
					questions: data[$type],
					question: data[$type][0].question,
					validation: data[$type][0].validation,
					progress: data[$type][0].progress,
					answerOptions: data[$type][0].answers,
					answerConditional: data[$type][0].answers[0].conditional,
					answerType: data[$type][0].type,
					questionName: data[$type][0].name
				})

				//console.log(this.state)
			})
			.catch(function (error) {
				console.log('Request failed', error);
		});
	}

	// HANDLE USER INPUT ==============================================================================

	// handlers called from AnswerOption
	handleTextTypeChange(event) {
		this.setUserAnswer(event.currentTarget.value);
	}

	handleInputSelected(event) {
		const inputType = event.currentTarget.type;

		var inputs = {
			'radio':() => {
				this.setUserAnswer(event.currentTarget.value);
				this.showNextScreen(event.currentTarget.value);
			},
			'submit': () => {
				this.validateInput(event.currentTarget.value);
			},
			'default': () => {
				console.log(`${type} doesn't have a function assigned to it`)
			}
		}

		return (inputs[inputType] || inputs['default'])();
	}

	setUserAnswer(answer) {
		console.log(`you picked ${answer}`)

		//https://facebook.github.io/react/docs/update.html
		const updatedAnswers = update(this.state.answers, {
			$merge: {[this.state.questionName] : answer}
		});

		this.setState({
			answer: answer,
			answers: updatedAnswers
		});
	}

	validateInput(input) {
		const validation = this.state.validation;
		const answer = this.state.answer;

		if ( validation == 'zip' ) {
			if ( validate.zip(answer) == true ) {
				// BEFORE SHOWING NEXT SCREEN, need to check which zip field we're testing, for zip to state conversion
				this.showNextScreen(event.currentTarget.value);
			} else {
				console.log('Please enter a 5-digit zip code');
			}	
		} else if ( validation == 'number' ) {
			if ( validate.number(answer) == true ) {
				this.showNextScreen(event.currentTarget.value);
			} else {
				console.log('Please enter numbers only');
			}	
		} 
	}

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

	setResults (result) {
		this.setState({ result: result });
	}

	getResults() {
		//get results

		console.log(this.state.answers);

		//TODO: fetch results
		this.state.results = this.state.answers

		return this.state.results;
	}

	renderQuiz() {
		return (
			<Quiz
				answer={this.state.answer}
				answerOptions={this.state.answerOptions}
				answerConditional={this.state.answerConditional}
				answerType={this.state.answerType}
				questionId={this.state.questionId}
				question={this.state.question}
				questionTotal={this.state.questions.length}
				progress={this.state.progress}
				onAnswerSelected={this.handleInputSelected}
				onTextTypeChange={this.handleTextTypeChange}
			/>
		);
	}

	renderResult() {
		return (
			<Result quizResult={this.state.result} />
		);
	}

	render() {
		return (
			<div className="App">
				{/*this.state.result ? this.renderResult() : this.renderQuiz()*/}
				{this.renderQuiz()}
			</div>
		);
	}
}

export default App;
