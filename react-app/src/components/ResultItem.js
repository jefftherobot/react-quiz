import React from 'react';

function ResultItem(props) {

	return (
		<li className="result__item loan">
			<div className="loan__intro">
				<p className="loan__title">{props.loanName}</p>
				<p className="loan__blurb">Consistent monthly payments over ? years</p>
			</div>
			<p className="loan__rate">Interest Rate: {props.loanRate}%</p>
			<div className="loan__details">
				<p className="loan__payment">Monthly Payment: ${props.loanPayment}</p>
				<p className="loan__APR">APR: {props.loanAPR}%</p>
			</div>
			<p className="loan__fees">J.G. Wentworth Fees or Credits: ${props.loanFees}</p>
			<button onClick={() => {props.onLoanSelected(props.loan)}}>I like this loan option</button>
		</li>
	)
}

export default ResultItem;