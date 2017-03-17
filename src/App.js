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

		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
	}

	componentDidMount() {
		//http://www.objgen.com/json/models/bZuG

		fetch('./data/quiz.json')
			.then(response => response.json())
			.then(data => {
				console.log(data)

				this.state.questions.length = data.purchase.length;

				this.setState({
					questions: data.purchase,
					question: data.purchase[0].question,
					type: data.purchase[0].type,
					answerOptions: data.purchase[0].answers
				})

				console.log(this.state)
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
			answer: ''
		});
	}

	getResults() {
		//get results

		console.log(this.state.results);

		return 1;
	}

	setResults (result) {
		if (result.length === 1) {
			this.setState({ result: result });
		} else {
			this.setState({ result: 'Undetermined' });
		}
	}

	handleAnswerSelected(event) {

		this.setUserAnswer(event.currentTarget.value);

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
				questionId={this.state.questionId}
				question={this.state.question}
				questionTotal={this.state.questions.length}
				onAnswerSelected={this.handleAnswerSelected}
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
				{this.renderQuiz()}
			</div>
		);
	}
}

export default App;
