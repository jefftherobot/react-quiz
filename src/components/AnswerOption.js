import React from 'react';

function AnswerOption(props) {

	//Need a range picker for credit score

	function renderRadioType(){
		return (
			<div>
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
			</div>
		);
	}

	function renderTextType(){
		return (
			<div>
				<label className="radioCustomLabel" htmlFor={props.answerValue}>
					{props.answerLabel}
				</label>
				<input
					type="text"
					className="radioCustomButton"
					name="radioGroup"
					checked={props.answerValue === props.userAnswer}
					id={props.answerValue}
					value={props.answerValue}
					disabled={props.userAnswer}
					onChange={props.onChange}
				/>
				<button
					onClick={props.onAnswerSelected}>
						Next
				</button>
			</div>
		);
	}

	return (
		<li className="answerOption">
			{ props.answerType === "radio" ? renderRadioType() : renderTextType() }
		</li>
	);
}

export default AnswerOption;
