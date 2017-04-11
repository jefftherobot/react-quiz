import React from 'react';

function QuestionCount(props) {
	const percent = props.progress + '%';
	const styles = {
		bar: {
			width: percent
		}
	}

	return (
		<div>
			<div className="questionCount">
				Question <span>{props.counter}</span> of <span>{props.total}</span>
			</div>
			<div className="progress">
				<div className="progress__bar" style={styles.bar}></div>
				<div className="progress__circle progress__circle--1"></div>
				<div className="progress__circle progress__circle--2"></div>
				<div className="progress__circle progress__circle--3"></div>
				<div className="progress__circle progress__circle--4"></div>
			</div>
		</div>
	);
}

export default QuestionCount;
