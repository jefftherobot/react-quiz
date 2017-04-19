import React from 'react';
import FormOption from '../components/FormOption';

function Result(props) {
	const resultObj = props.quizResult;
	const results = Object.keys(resultObj).map(function(key) {
		return <li className="results__item" key={key}>{key}: {resultObj[key]}</li>
	});
	const questObj = props.quizQuestions;
	const formQuestions = [];

	// get conditional questions for form creation
	function testConditional(answer) {
		for (var i = 0; i < answer.length; i++) {
			if ( typeof(answer[i].conditional) !== 'undefined' ) {
				const formItem = [];
				formItem.push(answer[i].conditional[0].question);
				formItem.push(answer[i].conditional[0].type);
				formItem.push(answer[i].conditional[0].validation);
			}
		}
	}
	
	// create form with all questions and conditional questions
	function renderForm() {
		for (var i = 0; i < questObj.length; i++) {
			const formItem = []
			formItem.push(questObj[i].question);
			formItem.push(questObj[i].type);
			formItem.push(questObj[i].validation);
			const answers = [];
			for (var j = 0; j < questObj[i].answers.length; j++) {
				answers.push(questObj[i].answers[j].label);
			}
			formItem.push(answers);
			formQuestions.push(formItem);
			testConditional(questObj[i].answers);
		}
		console.log(formQuestions);
	}

	// render each form item
	function renderFormOptions(key, index) {
		return (
			<FormOption
				key={index}
				answerValue={index}
				answerLabel={key}
				answerType={key[1]}
			/>
		);
	}

	return (
		<div>
			<form className="results">
				{ renderForm() }
				{ Object.keys(formQuestions).map(function(key) {
					console.log(key);
					return formQuestions[key].map(renderFormOptions)
				}) }
				<button>
					Update Rates
				</button>
			</form>

			<ul className="results__list">
				{ results }
			</ul>
		</div>
	);
}

export default Result;
