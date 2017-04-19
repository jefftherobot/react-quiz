import React from 'react';
import FormOption from '../components/FormOption';

function Result(props) {
	const resultObj = props.quizResult;
	console.log(resultObj);

	/*const results = Object.keys(resultObj).map(function(key) {
		return <li className="results__item" key={key}>{key}: {resultObj[key]}</li>
	});*/

	return (
		<div>
			<ul className="results__list">
				{/* results */ }
			</ul>
		</div>
	);
}

export default Result;
