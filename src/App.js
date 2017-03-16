import React from 'react';
import update from 'react-addons-update';
import Quiz from './components/Quiz';
import quizQuestions from './api/quizQuestions';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			counter: 0,
			questionId: 1,
			question: '',
			answerOptions: [],
			answer: '',
			answersCount: {
				nintendo: 0,
				microsoft: 0,
				sony: 0
			},
			result: ''
		};

		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
	}

	componentWillMount() {

		this.setState({
			question: quizQuestions[0].question,
			answerOptions: quizQuestions[0].answers
		});
	}

	setUserAnswer(answer) {
		const updatedAnswersCount = update(this.state.answersCount, {
			[answer]: {$apply: (currentValue) => currentValue + 1}
		});

		console.log(updatedAnswersCount)

		this.setState({
			answersCount: updatedAnswersCount,
			answer: answer
		});
	}

	setNextQuestion() {
		const counter = this.state.counter + 1;
		const questionId = this.state.questionId + 1;

		this.setState({
			counter: counter,
			questionId: questionId,
			question: quizQuestions[counter].question,
			answerOptions: quizQuestions[counter].answers,
			answer: ''
		});
	}

	getResults() {
		//get results

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

		if (this.state.questionId < quizQuestions.length) {
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
				questionTotal={quizQuestions.length}
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
				<div className="App-header">
					{/*<img src={logo} className="App-logo" alt="logo" />*/}
					{/*<h2>React Quiz</h2>*/}
				</div>
				{this.state.result ? this.renderResult() : this.renderQuiz()}
			</div>
		);
	}
}

export default App;
