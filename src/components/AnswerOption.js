import React from 'react';

function AnswerOption(props) {
	return (
		<li className="answerOption">
			<input
				type="radio"
				className="radioCustomButton"
				name="radioGroup"
				checked={props.answerValue === props.userAnswer}
				id={props.answerValue}
				value={props.answerValue}
				disabled={props.userAnswer}
				onChange={props.onAnswerSelected}
			/>
			<label className="radioCustomLabel" htmlFor={props.answerValue}>
				{props.answerLabel}
			</label>
		</li>
	);
}

export default AnswerOption;
