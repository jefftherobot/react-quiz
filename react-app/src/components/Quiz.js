import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';


function Quiz(props) {
	let counter = 0;

	function renderAnswerOptions(key) {

		counter++

		return (
			<AnswerOption
				key={props.questionName + counter}
				id={props.questionName + counter}
				answerValue={key.value}
				answerLabel={key.label}
				answerLabelHelper={key.labelHelper !== null ? key.labelHelper : ""}
				answer={props.answer}
				answerConditional={props.answerConditional}
				answerType={props.answerType}
				questionId={props.questionId}
				onAnswerSelected={props.onAnswerSelected}
				onTextTypeChange={props.onTextTypeChange}
				validateInput={props.validateInput}
			/>
		);
	}

	return (
		<div className={`rates-app-quiz rates-app-quiz--${props.answerType}`}>
			<div id="error-messages" className="error-messages" tabIndex="-1"></div>
			<Question content={props.question} questionType={props.answerType} />

			<div className={`rates-app-answer-options ${props.questionName == 'creditScore' ? 'columns' : ''}`}>
				{props.answerOptions.map(renderAnswerOptions)}
			</div>

			{/*<QuestionCount counter={props.questionId} total={props.questionTotal} progress={props.progress}/>*/}

		</div>
	);
}

export default Quiz;
