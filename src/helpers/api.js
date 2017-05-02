// calls to apis go here
var api = {
	getState: function(zip) {
		let zipResultPromise = fetch(`https://api.zippopotam.us/us/${zip}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				let state = data.places[0]['state abbreviation'];

				return state;
			})
			.catch(function(err){
				console.error('API error: ', err);
				return 'api error';
			});

		return zipResultPromise;
	},

	buildLoanCall: function(quiz) {
		console.log('results', quiz);
		let quizType = document.querySelectorAll("[data-type='purchase']").length > 0 ? 'purchase' : 'refinance';
		
		if (quizType == 'purchase') {
			let purchaseCall = "https://stagesitecore.jgwentworth.com/api/mortgage/purchase?"
				purchaseCall += "DownPayment=" + quiz.SalesPrice.SalesPrice3;
				purchaseCall += "&LoanPurpose=" + quizType;
				purchaseCall += "&creditScore=" + quiz.CreditScore;
				purchaseCall += "&downPaymentPercentage=" + quiz.SalesPrice.SalesPrice2;
				purchaseCall += "&homeType=" + quiz.HomeType;
				purchaseCall += "&homeUse=" + quiz.HomeUse;
				purchaseCall += "&salesPrice=" + quiz.SalesPrice.SalesPrice1;
				purchaseCall += "&serviceMember=" + quiz.ServiceMember;
				purchaseCall += "&state=" + quiz.state;
				purchaseCall += "&zip_Code=" + quiz.ZipCode;

			return purchaseCall;
		} else {
			let AdditionalCashAmount = quiz.AdditionalCashAmount !== undefined ? quiz.AdditionalCashAmount : 0;
			let ServiceMemberVALoan = quiz.ServiceMemberVALoan !== undefined ? quiz.ServiceMemberVALoan : false;

			let refinanceCall = "https://stagesitecore.jgwentworth.com/api/mortgage/refinance?"
				refinanceCall += "additionalCash=" + AdditionalCashAmount;
				refinanceCall += "&LoanPurpose=" + quizType;
				refinanceCall += "&creditScore=" + quiz.CreditScore;
				refinanceCall += "&currentMortgageAmount=" + quiz.MortgageBalance;
				refinanceCall += "&homeType=" + quiz.HomeType;
				refinanceCall += "&homeUse=" + quiz.HomeUse;
				refinanceCall += "&homeValue=" + quiz.PurchasePrice;
				refinanceCall += "&serviceMember=" + quiz.ServiceMember;
				refinanceCall += "&currentVaLoan=" + ServiceMemberVALoan;
				refinanceCall += "&state=" + quiz.state;
				refinanceCall += "&zip_Code=" + quiz.ZipCode;

			return refinanceCall;
		}
	}
}