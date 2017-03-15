import React from 'react';

function AnswerOption(props) {
	return (
		<li className="answerOption">
			<input
				type="radio"
				className="radioCustomButton"
				name="radioGroup"
				checked={props.answerType === props.userAnswer}
				id={props.answerType}
				value={props.answerType}
				disabled={props.userAnswer}
				onChange={props.onAnswerSelected}
			/>
			<label className="radioCustomLabel" htmlFor={props.answerType}>
				{props.answerContent}
			</label>
		</li>
	);
}

export default AnswerOption;
