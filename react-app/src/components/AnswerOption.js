import React from 'react';

function AnswerOption(props) {

	function handleKeyDown(e) {
		if (e.keyCode == 13 || e.keyIdentifier == 'Enter' || e.key == 'Enter') { 
			if (props.answerType == 'radio') {
				props.onAnswerSelected(e);
			} else {
				props.validateInput(e);
			}
		}
	}

	function handleClick(e) {
		// deal with click vs focus issue:
		// http://stackoverflow.com/a/33400670/3780922
		var clickedByMouse = false;

	    var keyboardPageX = (e.pageX === 0 || e.pageX === window.scrollLeft) ? true : false,
	        keyboardPageY = (e.pageY === 0 || e.pageY === window.scrollTop) ? true : false;

	    if((keyboardPageX && keyboardPageY) || (e.button === -1)){
	       //console.log("keyboard mouseup");
	    }else{
	       clickedByMouse = true;
	    }

	    if(clickedByMouse){
	        //Reset flag
	        clickedByMouse = false;

	        props.onAnswerSelected(e);
	    }
	}

	function renderRadioType(){
		return (
			<div className="rates-app-form__item rates-app-radio-btn rates-app-quiz__item">
				
				<label className="rates-app-radio-btn__label rates-app-quiz__label rates-app-quiz__label--radio" id={props.id + '_label'} htmlFor={props.id} onMouseUp={handleClick}>
				<input
					type="radio"
					className="rates-app-radio-btn__btn rates-app-quiz__radio-input"
					name="radioGroup"
					checked={props.answerValue === props.userAnswer}
					id={props.id}
					value={props.answerValue}
					disabled={props.userAnswer}
					onKeyDown={handleKeyDown}
					// onMouseUp={handleClick}
					aria-labelledby={props.id + '_label'}
				/>
					{props.answerLabel}
				</label>
			</div>
		);
	}

	function renderTextType(){
		//https://gist.github.com/markerikson/d71cfc81687f11609d2559e8daee10cc
		return (
			<div className="rates-app-form__item rates-app-quiz__item">
				<label className="rates-app-quiz__label sr-only" id={props.id + '_label'} htmlFor={props.id}>
					{props.answerLabel}
				</label>
				<input
					type="text"
					className="rates-app-quiz__input"
					name="textGroup"
					placeholder={props.answerLabel}
					checked={props.answerValue === props.userAnswer}
					id={props.id}
					value={props.answer}
					onChange={props.onTextTypeChange}
					onKeyDown={handleKeyDown}
					aria-labelledby={props.id + '_label'}
					aria-required="true"
				/>
				<button
					className="rates-app__btn"
					onClick={props.onAnswerSelected}>
						Continue
				</button>
			</div>
		);
	}

	function renderTextGroupType() {
		return (
			<div className="rates-app-form__item rates-app-quiz__item">
				{ props.id === "salesPrice2" ? <h2 className="rates-app-quiz__question">Down payment amount?</h2> : null }
				<label className="rates-app-quiz__label sr-only" htmlFor={props.id}>
					{props.answerLabel}
				</label>
				<input
					type="textGroup"
					className="rates-app-quiz__input"
					name="textGroupGroup"
					id={props.id}
					value={props.answer[props.id]}
					onChange={props.onTextTypeChange}
				/>
				{ props.id === "salesPrice3" ? <button className="rates-app__btn" onClick={props.onAnswerSelected}>Continue</button> : null }

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
