import 'whatwg-fetch'
import React from 'react';
import update from 'react-addons-update';
import Quiz from './components/Quiz';
import Result from './components/Result';

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
					type: data[$type][0].type,
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

	setNextQuestion() {
		const counter = this.state.counter + 1;
		const questionId = this.state.questionId + 1;

		this.setState({
			counter: counter,
			questionId: questionId,
			question: this.state.questions[counter].question,
			questionName: this.state.questions[counter].name,
			progress: this.state.questions[counter].progress,
			answerOptions: this.state.questions[counter].answers,
			answerConditional: this.state.questions[counter].answers[0].conditional,
			answerType: this.state.questions[counter].type,
			answer: ''
		});
	}

	getResults() {
		//get results

		console.log(this.state.answers);

		//TODO: fetch results
		this.state.results = this.state.answers

		return this.state.results;
	}

	setResults (result) {
		this.setState({ result: result });
	}

	handleInputSelected(event) {

		const inputType = event.currentTarget.type;

		var inputs = {
			'radio':() => {
				this.setUserAnswer(event.currentTarget.value);
				this.showNextScreen();
			},
			'submit': () => {
				this.showNextScreen();
			},
			'default': () => {
				console.log(`${type} doesn't have a function assigned to it`)
			}
		}

		return (inputs[inputType] || inputs['default'])();
	}

	handleConditionalSelected(event) {
		console.log('there is a conditional!');
	}

	handleTextTypeChange(event) {
		this.setUserAnswer(event.currentTarget.value);
	}

	showNextScreen(){
		if (this.state.questionId < this.state.questions.length) {
			setTimeout(() => this.setNextQuestion(), 300);
		} else {
			// quiz is done!
			setTimeout(() => this.setResults(this.getResults()), 300);
		}
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
				onConditionalSelected={this.handleConditionalSelected}
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
