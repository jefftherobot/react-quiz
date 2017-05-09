import React from 'react';

function Question(props) {
	return (
		<h2 className={`rates-app-quiz__question rates-app-quiz__question--${props.questionType}`}>{props.content}</h2>
	);
}

export default Question;
