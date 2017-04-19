import React from 'react';

function AnswerOption(props) {

	//Need a range picker for credit score

	function renderRadioType(){
		return (
			<div className="form__item answerOption">
				<input
					type="radio"
					className="radioCustomButton"
					name="radioGroup"
					checked={props.answerValue === props.userAnswer}
					id={props.id}
					value={props.answerValue}
					disabled={props.userAnswer}
					onChange={props.onAnswerSelected}
					aria-labelledby={props.id + '_label'}
				/>
				<label className="radioCustomLabel" id={props.id + '_label'} htmlFor={props.id}>
					{props.answerLabel}
				</label>
			</div>
		);
	}

	function renderTextType(){
		//https://gist.github.com/markerikson/d71cfc81687f11609d2559e8daee10cc
		return (
			<div className="form__item answerOption">
				<label className="textCustomLabel" id={props.id + '_label'} htmlFor={props.id}>
					{props.answerLabel}
				</label>
				<input
					type="text"
					className="textCustomButton"
					name="textGroup"
					checked={props.answerValue === props.userAnswer}
					id={props.id}
					value={props.answer}
					onChange={props.onTextTypeChange}
					aria-labelledby={props.id + '_label'}
					aria-required="true"
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
				<label className="textGroupCustomLabel" htmlFor={props.id}>
					{props.answerLabel}
				</label>
				<input
					type="textGroup"
					className="textGroupCustomButton"
					name="textGroupGroup"
					id={props.id}
					value={props.answer[props.id]}
					onChange={props.onTextTypeChange}
				/>
				{ props.id === "SalesPrice3" ? <button onClick={props.onAnswerSelected}>Continue</button> : null }

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
			)
		}
	}

	return (
		chooseAnswerType()
	);
}

export default AnswerOption;
