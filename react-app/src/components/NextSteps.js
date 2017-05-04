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
						<label className="rates-app-form__label" 
							   id="rates-app__label1"
							   htmlFor="rates-app__input1">
							   First Name*
						</label>
						<input className="rates-app-form__input" 
							   id="rates-app__input1"
							   aria-labelledby="rates-app__label1" 
							   aria-required="true"
							   type="text" />
					</div>
					<div className="rates-app-form__item">
						<label className="rates-app-form__label" 
							   id="rates-app__label2"
							   htmlFor="rates-app__input2">
							   Last Name*
						</label>
						<input className="rates-app-form__input" 
							   id="rates-app__input2"
							   aria-labelledby="rates-app__label2" 
							   aria-required="true"
							   type="text" />
					</div>
					<div className="rates-app-form__item">
						<label className="rates-app-form__label" 
							   id="rates-app__label3"
							   htmlFor="rates-app__input3">
							   Email Address*
						</label>
						<input className="rates-app-form__input" 
							   id="rates-app__input3"
							   aria-labelledby="rates-app__label3" 
							   aria-required="true"
							   type="text" />
					</div>
					<div className="rates-app-form__item">
						<label className="rates-app-form__label" 
							   id="rates-app__label4"
							   htmlFor="rates-app__input4">
							   Phone Number*
						</label>
						<input className="rates-app-form__input" 
							   id="rates-app__input4"
							   aria-labelledby="rates-app__label4" 
							   aria-required="true"
							   type="text" />
					</div>
					<button className="rates-app-form__btn" type="submit">Submit</button>
					{/* TEMP disclaimer needs to be editable; should be conditional in footer*/}
					<p className="rates-app-form__disclaimer">By submitting this form, I am providing J.G Wentworth with express written consent to contact me regarging product offerings by SMS/text messages or by usig an auto dialer (or automated means) on the phone number(s) provided and such consent is not a condition of a purchase. I also consent and agree to J.G. Wentworth's Privacy Policy and Terms of Use.</p>
				</form>
			</div>
			<div className="rates-app-apply">
				<p>OR</p>
				<a href="/" className="">Apply Online Now</a>
				<p>Get the process started right away</p>
			</div>
		</div>
	);
}

export default NextSteps;
