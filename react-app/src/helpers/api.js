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
				purchaseCall += "DownPayment=" + quiz['SalesPrice.SalesPrice3'];
				purchaseCall += "&LoanPurpose=" + quizType;
				purchaseCall += "&creditScore=" + quiz.CreditScore;
				purchaseCall += "&downPaymentPercentage=" + quiz['SalesPrice.SalesPrice2'];
				purchaseCall += "&homeType=" + quiz.HomeType;
				purchaseCall += "&homeUse=" + quiz.HomeUse;
				purchaseCall += "&salesPrice=" + quiz['SalesPrice.SalesPrice1'];
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
	},

	mergeObjs: function(obj1, obj2) {
		//https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
		function extend(obj, src) {
		    for (var key in src) {
		        if (src.hasOwnProperty(key)) obj[key] = src[key];
		    }
		    return obj;
		}

		let merge = extend(obj1, obj2);
		return merge;
	},

	flatten: function(data) {
		//http://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
	    var result = {};
	    function recurse (cur, prop) {
	        if (Object(cur) !== cur) {
	            result[prop] = cur;
	        } else if (Array.isArray(cur)) {
	             for(var i=0, l=cur.length; i<l; i++)
	                 recurse(cur[i], prop + "[" + i + "]");
	            if (l == 0)
	                result[prop] = [];
	        } else {
	            var isEmpty = true;
	            for (var p in cur) {
	                isEmpty = false;
	                recurse(cur[p], prop ? prop+"."+p : p);
	            }
	            if (isEmpty && prop)
	                result[prop] = {};
	        }
	    }
	    recurse(data, "");
	    return result;
	}
}