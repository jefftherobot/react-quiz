import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';


function Quiz(props) {

	function renderAnswerOptions(key) {
		return (
			<AnswerOption
				key={key.value} //need to figure out a better way to set this value
				answerValue={key.value}
				answerLabel={key.label}
				answer={props.answer}
				answerType={props.answerType}
				questionId={props.questionId}
				onAnswerSelected={props.onAnswerSelected}
				onTextTypeChange={props.onTextTypeChange}
			/>
		);
	}

	return (
		<div className="quiz">

			<QuestionCount counter={props.questionId} total={props.questionTotal} progress={props.progress}/>

			<Question content={props.question} />

			<ul className="answerOptions">
				{props.answerOptions.map(renderAnswerOptions)}
			</ul>

		</div>
	);
}
export default Quiz;
