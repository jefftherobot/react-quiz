import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import ResultItem from '../components/ResultItem';

function showLoans() {
	const button = document.getElementById('result__button'),
		  resultList = document.getElementById('result__list');

	if (resultList.classList.contains('result__list--collapsed')) {
		button.textContent = 'See Less Loan Options';
		resultList.classList.remove('result__list--collapsed');
	} else {
		button.textContent = 'See More Loan Options';
		resultList.classList.add('result__list--collapsed');
	}
}

function Result(props) {
	let counter = 0;
	const resultObj = props.quizResult;
	console.log(resultObj);

	/*const result = Object.keys(resultObj).map(function(key) {
		return <li className="result__item" key={key}>{key}: {resultObj[key]}</li>
	});*/

	function renderResultItems(key) {
		counter++

		return (
			<ResultItem 
				key={'loan' + counter}
				id={'loan' + counter}
				loan={props.quizResult[counter - 1]}
				loanName={props.quizResult[counter - 1].name}
				loanRate={props.quizResult[counter - 1].rate}
				loanPayment={props.quizResult[counter - 1].monthlyPayment}
				loanAPR={props.quizResult[counter - 1].apr}
				loanFees={props.quizResult[counter - 1].lenderFees}
			/>
		);
	}

	return (
		<div>
			<QuestionCount counter={props.questionId} total={props.questionTotal} progress={props.progress}/>
			<Question content={props.question} />

			<h1>Your personalized rate quote:</h1>
			<ul id="result__list" className="result__list result__list--collapsed">
				{props.quizResult.map(renderResultItems)}
			</ul>

			<button id="result__button" className="result__button" onClick={showLoans}>See More Loan Options</button>
		</div>
	);
}

export default Result;
