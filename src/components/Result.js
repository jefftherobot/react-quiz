import React from 'react';

function Result(props) {
	const resultObj = props.quizResult;
	const results = Object.keys(resultObj).map(function(key) {
				    return <li key={key}>{key}: {resultObj[key]}</li>
				  });

	return (
		<div>
			<p>Your answers:</p>
			<ul className="result__list">
				{ results }
			</ul>
		</div>
	);
}

export default Result;
