import React from 'react';

function FormOption(props) {

	//Need a range picker for credit score

	function renderRadioType(){
		return (
			<div className="form__item">
				<input
					type="radio"
					className="radioCustomButton"
					name="radioGroup"
					id={props.answerValue}
					value={props.answerValue}
					disabled={props.userAnswer}
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
			<div className="form__item">
				<label className="textCustomLabel" htmlFor={props.answerValue}>
					{props.answerLabel}
				</label>
				<input
					type="text"
					className="textCustomButton"
					name="textGroup"
					id={props.answerValue}
				/>
			</div>
		);
	}

	function renderSelectType() {
		return (
			<div className="form__item">
				<label className="textGroupCustomLabel" htmlFor={props.answerValue}>
					{props.answerLabel}
				</label>
				<input
					type="textGroup"
					className="textGroupCustomButton"
					name="textGroupGroup"
					id={props.answerValue}
				/>
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
				renderSelectType()
			);
		}
	}

	return (
		<li className="formOption">
			{ chooseAnswerType() }
		</li>
	);
}

export default FormOption;
