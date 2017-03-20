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
			answerOptions: [],
			answer: '',
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
				//console.log(data)

				this.state.questions.length = data.purchase.length;

				this.setState({
					questions: data.purchase,
					question: data.purchase[0].question,
					type: data.purchase[0].type,
					answerOptions: data.purchase[0].answers,
					answerType: data.purchase[0].type
				})

				//console.log(this.state)
			})
			.catch(function (error) {
				console.log('Request failed', error);
		});
	}

	setUserAnswer(answer) {
		console.log(`you picked ${answer}`)

		this.setState({
			answer: answer
		});
	}

	setNextQuestion() {
		const counter = this.state.counter + 1;
		const questionId = this.state.questionId + 1;

		this.setState({
			counter: counter,
			questionId: questionId,
			question: this.state.questions[counter].question,
			answerOptions: this.state.questions[counter].answers,
			answerType: this.state.questions[counter].type,
			answer: ''
		});
	}

	getResults() {
		//get results

		console.log(this.state.results);

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
				answerType={this.state.answerType}
				questionId={this.state.questionId}
				question={this.state.question}
				questionTotal={this.state.questions.length}
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
