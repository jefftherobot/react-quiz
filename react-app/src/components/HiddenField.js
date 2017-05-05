import React from 'react';

function HiddenField(props) {

	return (
		<div className="rates-app-form__item rates-app-form__hidden">
			<label className="rates-app-form__label">
				   {props.fieldLabel}
			</label>
			<input className="rates-app-form__input" type="text" readOnly name={props.fieldLabel} value={props.fieldValue} />
		</div>
	);
}

export default HiddenField;
