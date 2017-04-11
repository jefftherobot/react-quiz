import React from 'react';

function AnswerOption(props) {

	//Need a range picker for credit score

	function renderRadioType(){
		if ( props.hasConditional == true ) {
			var onChangeTest = props.onConditionalSelected;
		} else {
			var onChangeTest = props.onAnswerSelected;
		}

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
					onChange={onChangeTest}
				/>
				<label className="radioCustomLabel" htmlFor={props.answerValue}>
					{props.answerLabel}
				</label>
			</div>
		);
	}

	function renderTextType(){
		//https://gist.github.com/markerikson/d71cfc81687f11609d2559e8daee10cc
		return (
			<div>
				<label className="textCustomLabel" htmlFor={props.answerValue}>
					{props.answerLabel}
				</label>
				<input
					type="text"
					className="textCustomButton"
					name="textGroup"
					checked={props.answerValue === props.userAnswer}
					id={props.answerValue}
					value={props.answer}
					onChange={props.onTextTypeChange}
				/>
				<button
					onClick={props.onAnswerSelected}>
						Continue
				</button>
			</div>
		);
	}

	function renderTextGroupType() {
		return (
			<div>
				<label className="textGroupCustomLabel" htmlFor={props.answerValue}>
					{props.answerLabel}
				</label>
				<input
					type="textGroup"
					className="textGroupCustomButton"
					name="textGroupGroup"
					checked={props.answerValue === props.userAnswer}
					id={props.answerValue}
					value={props.answer}
					onChange={props.onTextTypeChange}
				/>
				<button
					onClick={props.onAnswerSelected}>
						Continue
				</button>
			</div>
		)
	}

	function chooseAnswerType() {
		if ( props.answerType === "radio" ) {
			return ( 
				renderRadioType() 
			);
		} else if ( props.answerType === "text") {
			return ( 
				renderTextType() 
			);
		} else {
			return ( 
				renderTextGroupType()
			);
		}
	}

	return (
		<li className="answerOption">
			{ chooseAnswerType() }
		</li>
	);
}

export default AnswerOption;
