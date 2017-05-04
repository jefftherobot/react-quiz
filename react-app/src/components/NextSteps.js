import React from 'react';

function NextSteps(props) {

	return (
		<div>
			<div className="rates-app-contact">
				<h1>Talk to a Home Loan Specialist</h1>
				<div className="rates-app-contact__loan">
					<p className="rates-app-contact__loan-type">{props.loan.name}</p>
					<p className="rates-app-contact__loan-designation">{props.loan.ProductId}</p>
					<p className="rates-app-contact__loan-rate">Interest Rate: {props.loan.rate}%</p>
					<p className="rates-app-contact__loan-APR">APR: {props.loan.apr}%</p>
					<p className="rates-app-contact__loan-payment">Monthly Payment: ${props.loan.monthlyPayment}</p>
					<p className="rates-app-contact__loan-fees">J.G. Wentworth Fees or Credits: ${props.loan.lenderFees}</p>
				</div>
				<form className="rates-app-form">
					<p>* required field</p>
					<div className="rates-app-form__item">
						<label className="rates-app-text__label" 
							   id="rates-app__label1"
							   htmlFor="rates-app__input1">
							   First Name*
						</label>
						<input className="rates-app-text__input" 
							   id="rates-app__input1"
							   aria-labelledby="rates-app__label1" 
							   aria-required="true"
							   type="text" />
					</div>
					<div className="rates-app-form__item">
						<label className="rates-app-text__label" 
							   id="rates-app__label2"
							   htmlFor="rates-app__input2">
							   Last Name*
						</label>
						<input className="rates-app-text__input" 
							   id="rates-app__input2"
							   aria-labelledby="rates-app__label2" 
							   aria-required="true"
							   type="text" />
					</div>
					<div className="rates-app-form__item">
						<label className="rates-app-text__label" 
							   id="rates-app__label3"
							   htmlFor="rates-app__input3">
							   Email Address*
						</label>
						<input className="rates-app-text__input" 
							   id="rates-app__input3"
							   aria-labelledby="rates-app__label3" 
							   aria-required="true"
							   type="text" />
					</div>
					<div className="rates-app-form__item">
						<label className="rates-app-text__label" 
							   id="rates-app__label4"
							   htmlFor="rates-app__input4">
							   Phone Number*
						</label>
						<input className="rates-app-text__input" 
							   id="rates-app__input4"
							   aria-labelledby="rates-app__label4" 
							   aria-required="true"
							   type="text" />
					</div>
					<button className="rates-app-form__btn" type="submit">Submit</button>
				</form>
			</div>
			<div className="rates-app-apply">
			</div>
		</div>
	);
}

export default NextSteps;
